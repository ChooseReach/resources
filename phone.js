// Associates phone numbers with behavior user ids

try {
  // Add the crypt-js library so we can decrypt the Rudderstack Anonymous User Id
  var cryptoJs = document.createElement("script");
  cryptoJs.setAttribute(
    "src",
    "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"
  );
  document.head.appendChild(cryptoJs);

  const rudderstackTrim = (value) => value.replace(/^\s+|\s+$/gm, "");

  function getRudderstackAnonymousId() {
    const encryptionPrefix = "RudderEncrypt";
    const encryptionKey = "Rudder";
    const value = document.cookie
      .split("; ")
      .filter((cookie) => cookie.includes("rl_anonymous_id"))[0]
      .split("=")[1];
    if (!value || (typeof value === "string" && rudderstackTrim(value) == "")) {
      return undefined;
    }
    if (value.substring(0, encryptionPrefix.length) == encryptionPrefix) {
      const encryptedAnonymousId = decodeURIComponent(
        value.substring(encryptionPrefix.length)
      );
      return CryptoJS.AES.decrypt(
        encryptedAnonymousId.substring(1),
        encryptionKey
      ).toString(CryptoJS.enc.Utf8);
    }
  }

  const rudderstackAnonymousUserId = getRudderstackAnonymousId();

  // Associate tracking number with segment io user id
  // (waits 10 seconds for call rail and segment code snippets to fire first)
  window.setTimeout(function () {
    typeof rudderstackAnonymousUserId !== "undefined" &&
      (function () {
        var userId = rudderstackAnonymousUserId;

        function distinct(values) {
          var acc = {};
          values.forEach(function (value) {
            acc[value] = 1;
          });
          return Object.keys(acc);
        }

        // TODO - How can we differentiate tracking numbers from non tracking numbers
        var allPhoneNumbers = Array.from(document.querySelectorAll("a"))
          .filter(function (a) {
            return a.href.includes("tel:");
          })
          .map(function (a) {
            return a.href.replace("tel:", "");
          });
        var distinctPhoneNumbers = distinct(allPhoneNumbers);

        if (!!userId) {
          distinctPhoneNumbers.forEach(function (trackingNumber) {
            $.ajax({
              method: "POST",
              url: "https://api.choosereach.com/v7/analytics/segmentIOAndTrackingNumber",
              data: JSON.stringify({
                segmentIOUserId: userId,
                trackingNumber: trackingNumber,
              }),
              headers: {
                "Content-Type": "application/json",
              },
              complete: function () {
                console.log("Sent contact info to Reach.");
              },
            });
          });
        }
      })();
  }, 10000);
} catch (error) {
  console.warn(error);
}
