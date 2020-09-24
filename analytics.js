/** Loads a script synchronously */
function reachLoadScriptSync (src) {
  var s = document.createElement('script');
  s.src = src;
  s.type = "text/javascript";
  s.async = false;                                 // <-- this is important
  document.getElementsByTagName('head')[0].appendChild(s);
}

function isElementScrolledIntoView(elem)
{
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();

  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop + $(elem).height();

  return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function reachDistinct(values) { var acc = {}; values.forEach(function(value) { acc[value] = 1; }); return Object.keys(acc);}

function reachDebounce(func, timeoutMS) {
  var timer = undefined;
  return function () {
      if (timer) {
          clearTimeout(timer);
      }
      timer = setTimeout(func, timeoutMS > 0 ? timeoutMS : 300)
  }
}

console.log("reach script");

// If we the script is for Doctor Suits or Alison Rachiell or Burn Foundation, track every page visit



// Wrapped in set time out so errors don't propagate and interfere with other scripts
window.setTimeout(function() {

window.consentManagerConfig = function(exports) {
  return {
      container: '#consent-manager',
      writeKey: 'QMkpQAFYFlpRm7UB0Zw9Sx324Q5yp5EV',
      bannerContent:
          'By using our website, you agree to our',
      bannerSubContent: 'Cookie Policy',
      preferencesDialogTitle: 'Data Collection Preferences',
      preferencesDialogContent:
          'We collect data to analyze site traffic, deliver personalized content, and improve the performance of our site.',
      cancelDialogTitle: 'Your settings have not been saved.',
      cancelDialogContent:
          "By continuing to use our website, you're agreeing to our Cookie Policy",
      closeBehavior: 'accept',
      implyConsentOnInteraction: 'true'
  }
}

reachLoadScriptSync('https://www.unpkg.com/@segment/consent-manager@5.0.1/standalone/consent-manager.js');

!(function() {
  var analytics = (window.analytics = window.analytics || []);
  if (!analytics.initialize)
      if (analytics.invoked)
          window.console && console.error && console.error('Segment snippet included twice.');
      else {
          analytics.invoked = !0;
          analytics.methods = [
              'trackSubmit',
              'trackClick',
              'trackLink',
              'trackForm',
              'pageview',
              'identify',
              'reset',
              'group',
              'track',
              'ready',
              'alias',
              'debug',
              'page',
              'once',
              'off',
              'on'
          ];
          analytics.factory = function(t) {
              return function() {
                  var e = Array.prototype.slice.call(arguments);
                  e.unshift(t);
                  analytics.push(e);
                  return analytics
              }
          };
          for (var t = 0; t < analytics.methods.length; t++) {
              var e = analytics.methods[t];
              analytics[e] = analytics.factory(e)
          }
          analytics.load = function(t, e) {
              var n = document.createElement('script');
              n.type = 'text/javascript';
              n.async = !0;
              n.src =
                  ('https:' === document.location.protocol ? 'https://' : 'http://') +
                  'cdn.segment.com/analytics.js/v1/' +
                  t +
                  '/analytics.min.js';
              var o = document.getElementsByTagName('script')[0];
              o.parentNode.insertBefore(n, o);
              analytics._loadOptions = e
          };
          analytics.SNIPPET_VERSION = '4.1.0';
          window.analytics.page("Page Viewed", {});

          // Persist the last scroll percentage so we don't send duplicate events one after another (in case of slow scrolling)
          var lastScrollPercentage = null;
          var reachBadgeAlreadyScrolledIntoView = false;
          var reachBadge = document.querySelector("#Reach-Badge");

          // Send scroll events to segment every 25%
          window.addEventListener('scroll', function() {
              var scrolledPixels = document.body.scrollTop || document.documentElement.scrollTop
              var currentScrollPercentage = Math.round((scrolledPixels / ( document.body.scrollHeight - window.innerHeight ) ) * 100);

              if (currentScrollPercentage % 25 === 0 && lastScrollPercentage !== currentScrollPercentage) {
                  window.analytics.track('Page Scrolled', {
                      scroll_threshold: '' + currentScrollPercentage,
                      scroll_units: 'percent',
                      scroll_direction: 'vertical',
                      category: 'Scroll',
                      label: window.location.href,
                      value: 0
                  });
                  lastScrollPercentage = currentScrollPercentage;
                  console.log( currentScrollPercentage );

                  if (!!reachBadge && !reachBadgeAlreadyScrolledIntoView && isElementScrolledIntoView(reachBadge)) {
                      console.log("Reach badge scrolled into view.")
                      window.analytics.track('Reach Badge Scrolled Into View', {
                          category: 'Visibility',
                          label: window.location.href,
                          value: 0
                      });
                      reachBadgeAlreadyScrolledIntoView = true
                  }
              }
          });

          // Listen to all click events
          document.addEventListener('click', function (event) {

              var closestAnchorTag = event.target.closest("a");

              var clickedElement = closestAnchorTag || event.target;

              console.log("Click");
              // Log the clicked element in the console
              console.log(clickedElement);

              // If the clicked element is not a link, don't do anything
              // Removed this so that we track more click events
              // if (!event.target.matches('a')) return;

              var tagName = clickedElement.tagName.toLowerCase();

              var eventName = 'Element Clicked';
              if (tagName === "a") {
                  eventName = "Link Clicked";
              } else if (tagName === "button") {
                  eventName = "Button Clicked";
              }

              if (eventName !== "Element Clicked") {
                  window.analytics.track(eventName, {
                      element_tag_name: tagName,
                      element_id: clickedElement.id,
                      element_classes: clickedElement.className,
                      element_href: clickedElement.href,
                      element_src: clickedElement.src,
                      element_name: clickedElement.name,
                      element_text_content: clickedElement.textContent,
                      category: 'Click'
                  });
              }
          }, false);

          document.addEventListener('submit', function(event) {
              // If this is not a form, do nothing
              if (!event.target.matches('form')) return;

              var form = event.target;

              var maybeNameElement = form.querySelector("[data-reach-input='name']");
              var maybeEmailElement = form.querySelector("[data-reach-input='email']");
              var maybePhoneElement = form.querySelector("[data-reach-input='phone']");

              window.analytics.identify({
                  name: maybeNameElement && maybeNameElement.value,
                  email: maybeEmailElement && maybeEmailElement.value,
                  phone: maybePhoneElement && maybePhoneElement.value,
              });

              window.analytics.track('Form Submitted', {
                  form_id: form.id,
                  form_name: form.name,
                  form_classes: form.className,
                  form_text: form.textContent,
                  category: 'Form',
                  label: window.location.href,
                  formData: JSON.stringify($(form).serializeArray())
              });
          });

          window.analytics.ready(function() {
              console.log("window analytics ready");
              var userId = window.analytics.user().anonymousId()

              var allPhoneNumbers = Array.from(document.querySelectorAll("a")).filter(function(a) { return a.href.includes("tel:"); }).map(function(a) { return a.href.replace("tel:", "")});

              var distinctPhoneNumbers = reachDistinct(allPhoneNumbers)

              if (!!userId) {
                  distinctPhoneNumbers.forEach(function(trackingNumber) {

                      $.ajax( {
                          method: "POST",
                          url: "https://api.choosereach.com/v7/analytics/segmentIOAndTrackingNumber" ,
                          data: JSON.stringify({
                              segmentIOUserId: userId,
                              trackingNumber: trackingNumber
                          }),
                          headers: {
                              "Content-Type": "application/json"
                          },
                          complete: function() {
                              console.log("Sent contact info to Reach.");
                          }
                      });
                  })
              }
          });
      }
})();
}, 0);


// Wrapped in set time out so errors don't propagate and interfere with other scripts
window.setTimeout(function() {

console.log("Loading Reach.");
function loadReach() {
  function sendFormToReach (formName, formType) {
      return function (event) {
          console.log("Sending contact info to Reach2.");

          if (window.reachTest === true) {
              // Don't submit form
              event.preventDefault()
          }

          // not sure if you wanted this, but I thought I'd add it.
          // get an associative array of just the values.
          var formValues = {};
          $(event.target).find("input[data-reach-input],textarea[data-reach-input],select[data-reach-input]").each(function() {
              var t = $(this);
              formValues[t.attr("data-reach-input")] = t.val();
          });
          $(event.target).find("input[data-reach-input][type='checkbox']").each(function() {
              var t = $(this);
              formValues[t.attr("data-reach-input")] = this.checked
          });
          $(event.target).find("input[data-reach-input][type='radio']").each(function() {
              var t = $(this);
              var name = t.attr("data-reach-input");
              if (this.checked) {
                  formValues[name] = t.val()
              }
          });

          console.log("Form Values: " + JSON.stringify(formValues));

          var urlParams = new URLSearchParams(window.location.search);

          var hardCodedKeys = ["name", "phone", "email", "message"];
          var additionalDetails = [];
          Object.keys(formValues).map(function(key) {
              if (!hardCodedKeys.includes(key)) {
                  additionalDetails.push({name: key, value: formValues[key]})
              }
          });

          var payload = JSON.stringify({
              name: formValues.name,
              phone: formValues.phone,
              email: formValues.email,
              message: formValues.message,
              context: {
                  category: 'unspecified',
                  referrer: document.referrer || "",
                  formName: formName,
                  formType: formType,
                  businessId: formValues.business || `5f2887249a69e2701c094baf`,
                  agencyId: formValues.agency || `5f2885529a69e2701c094a50`,
                  websiteId: formValues.website || `5f2887f24c91e56e2c40e8f2`
              },
              additionalDetails: additionalDetails,
              segmentIOUserId: (typeof analytics !== "undefined" && typeof analytics.user === "function" && typeof analytics.user().anonymousId === "function" && analytics.user().anonymousId()) || undefined,
              utmSource: urlParams.get('utm_source') || undefined,
              utmCampaign: urlParams.get('utm_campaign') || undefined,
              utmMedium: urlParams.get('utm_medium') || undefined,
              utmTerm: urlParams.get('utm_term') || undefined
          });


          // Send the data using post
          $.ajax( {
              method: "POST",
              url: "https://api.choosereach.com/v7/leadGeneration/lead" ,
              data: payload,
              headers: {
                  "Content-Type": "application/json"
              },
              complete: function() {
                  console.log("Sent contact info to Reach.");
              }
          });

      };

  }

  $("form[data-reach-form]").each(function(index, reachForm) {
      $(reachForm).submit(
          sendFormToReach(
              $(reachForm).attr("data-reach-form") || "",
              $(reachForm).attr("data-reach-form-type") || "lead" // Default form type to 'lead'
          )
       );
  });

  console.log("Loaded Reach.");
}

function waitForFormHandlerJquery() {
  if( window.$ ) {
      $(document).ready(function () {
          loadReach();
      });
  } else {
      window.setTimeout( waitForFormHandlerJquery, 50 );
  }
}

waitForFormHandlerJquery();

}, 0);

// Wrapped in set time out so errors don't propagate and interfere with other scripts
window.setTimeout(function() {

console.log("Loading Reach.");
function loadReachReviewForm() {
  function sendReviewFormToReach (formName) {
      return function (event) {
          console.log("Sending review info to Reach.");

          if (window.reachTest === true) {
              // Don't submit form
              event.preventDefault()
          }

          // not sure if you wanted this, but I thought I'd add it.
          // get an associative array of just the values.
          var formValues = {};
          $(event.target).find("input[data-reach-input],textarea[data-reach-input],select[data-reach-input]").each(function() {
              var t = $(this);
              formValues[t.attr("data-reach-input")] = t.val();
          });
          $(event.target).find("input[data-reach-input][type='checkbox']").each(function() {
              var t = $(this);
              formValues[t.attr("data-reach-input")] = this.checked
          });

          var ratingGroupNames = reachDistinct($(event.target).find("input[data-reach-rating-group]")
              .map(function(index, element) {
                  return element.getAttribute("data-reach-rating-group");
              })
              .get());

          var ratings = ratingGroupNames.map(function(ratingGroupName) {
              var maybeCheckedRating = $(event.target).find("input[data-reach-rating-group='" + ratingGroupName + "']:checked");
              var anyRating = $(event.target).find("input[data-reach-rating-group='" + ratingGroupName + "']");
              var outOf = window.parseFloat(anyRating[0].getAttribute("data-reach-rating-out-of"));
              if (maybeCheckedRating.length === 0) {
                  return {
                      name: ratingGroupName,
                      rating: null,
                      outOf: outOf
                  };
              }
              return {
                  name: ratingGroupName,
                  rating: window.parseFloat(maybeCheckedRating[0].value),
                  outOf: outOf
              }
          })

          var urlParams = new URLSearchParams(window.location.search);

          var allReviewData = $.extend(
              {ratings: ratings},
              formValues,
              {
                  referer: document.referrer || "",
                  businessId: formValues.business || `5f2887249a69e2701c094baf`,
                  agencyId: formValues.agency || `5f2885529a69e2701c094a50`,
                  websiteId: formValues.website || `5f2887f24c91e56e2c40e8f2`,
                  formName: formName,
                  segmentIOUserId: (typeof analytics !== "undefined" && typeof analytics.user === "function" && typeof analytics.user().anonymousId === "function" && analytics.user().anonymousId()) || undefined,
                  utmSource: urlParams.get('utm_source') || undefined,
                  utmCampaign: urlParams.get('utm_campaign') || undefined,
                  utmMedium: urlParams.get('utm_medium') || undefined,
                  utmTerm: urlParams.get('utm_term') || undefined
              }
          );

          console.log("Form Values: " + JSON.stringify(allReviewData));

          var payload = JSON.stringify(allReviewData);

          // Send the data using post
          $.ajax( {
              method: "POST",
              url: "https://api.choosereach.com/v7/websiteReviews" ,
              data: payload,
              headers: {
                  "Content-Type": "application/json"
              },
              complete: function() {
                  console.log("Sent review info to Reach.");
              }
          });

      };

  }

  $("form[data-reach-review]").each(function(index, reachForm) {
      $(reachForm).submit(sendReviewFormToReach($(reachForm).attr("data-reach-review") || ""));
  });

  console.log("Loaded Reach.");
}

function waitForReviewFormHandlerJquery() {
  if( window.$ ) {
      $(document).ready(function () {
          loadReachReviewForm();
      });
  } else {
      window.setTimeout( waitForReviewFormHandlerJquery, 50 );
  }
}

waitForReviewFormHandlerJquery();

}, 0);

// Wrapped in set time out so errors don't propagate and interfere with other scripts
window.setTimeout(function() {

function loadReachFeedbackForm() {
  function sendFeedback(name, rating, outOf, container) {
          console.log("Sending feedback to Reach.");

          if (window.reachTest === true) {
              // Don't submit form
              event.preventDefault()
          }

          var payload = JSON.stringify({
              websiteId: '5f2887f24c91e56e2c40e8f2',
              href: window.location.href,
              ratings: [{"name": name, "rating": rating, "outOf": outOf}],
              segmentIOUserId: (typeof analytics !== "undefined" && typeof analytics.user === "function" && typeof analytics.user().anonymousId === "function" && analytics.user().anonymousId()) || undefined,
          });

          // Send the data using post
          $.ajax( {
              method: "POST",
              url: "https://api.choosereach.com/v7/feedback" ,
              data: payload,
              headers: {
                  "Content-Type": "application/json"
              },
              complete: function(resp) {
                  var feedbackId = resp.responseJSON.id;
                  container.attr("data-reach-feedback-id", feedbackId);
                  console.log("Sent feedback to Reach.");
              }
          });
  }

  function sendFeedbackAdditionalDetails (container) {
      return function (event) {
          console.log("Sending review info to Reach.");

          if (window.reachTest === true) {
              // Don't submit form
              event.preventDefault()
          }

          // not sure if you wanted this, but I thought I'd add it.
          // get an associative array of just the values.
          var formValues = {};
          $(event.target).find("input[data-reach-input],textarea[data-reach-input],select[data-reach-input]").each(function() {
              var t = $(this);
              formValues[t.attr("data-reach-input")] = t.val();
          });

          var payload = JSON.stringify(formValues);

          var feedbackId = container.attr("data-reach-feedback-id");

          // Send the data using post
          $.ajax( {
              method: "PUT",
              url: "https://api.choosereach.com/v7/feedback/" + feedbackId + "/details" ,
              data: payload,
              headers: {
                  "Content-Type": "application/json"
              },
              complete: function(resp) {
                  console.log("Sent feedback details to Reach.");
              }
          });

      };

  }

  $("[data-reach-feedback][data-reach-feedback-out-of]").each(function(index, reachFeedbackWidget) {
      // [data-reach-feedback-rating-out-of]
      var $reachFeedbackWidget = $(reachFeedbackWidget);
      var outOf = parseFloat($reachFeedbackWidget.attr("data-reach-feedback-out-of"));
      var name = $reachFeedbackWidget.attr("data-reach-feedback");
      $(reachFeedbackWidget).find("[data-reach-feedback-rating]").each(function(index, element) {
          var $element = $(element);
          var rating = parseFloat($element.attr("data-reach-feedback-rating"));
          $element.click(function () { sendFeedback(name, rating, outOf, $reachFeedbackWidget); })
      });

      $(reachFeedbackWidget).find("[data-reach-feedback-form]").submit(sendFeedbackAdditionalDetails($reachFeedbackWidget));
  });

  console.log("Loaded Reach.");
}

function waitForFeedbackFormHandlerJquery() {
  if( window.$ ) {
      $(document).ready(function () {
          loadReachFeedbackForm();
      });
  } else {
      window.setTimeout( waitForFeedbackFormHandlerJquery, 50 );
  }
}

waitForFeedbackFormHandlerJquery();

}, 0);

// Wrapped in set time out so errors don't propagate and interfere with other scripts
window.setTimeout(function() {
  function waitForBeaconJquery() {
  if( window.$ ) {
      $(document).ready(function () {
          $("[data-reach-beacon]").css("display", "block");
      });
  } else {
      window.setTimeout( waitForBeaconJquery, 50 );
  }
}

waitForBeaconJquery();
}, 0);

// Wrapped in set time out so errors don't propagate and interfere with other scripts
window.setTimeout(function() {
  var displayAfterPageViewsDataTag = "data-display-after-page-views";
var displayAfterPageViewsIdDataTag = "data-display-after-page-views-id";
var displayAfterPageViewElements = Array.from(document.querySelectorAll("[" + displayAfterPageViewsDataTag + "][" + displayAfterPageViewsIdDataTag + "]"));

displayAfterPageViewElements.forEach(element => {
  var displayAfterPageViewsCount = parseInt(element.dataset["displayAfterPageViews"]);
  var storageKey = "reach-page-views:" + element.dataset["displayAfterPageViewsId"];
  var lastViewCount = parseInt(localStorage.getItem(storageKey) || 0);
  // If we've set this in local storage to -1, don't show anything this means it has already been shown
  if (lastViewCount > -1) {
      var currentPageViewCount = (lastViewCount || 0) + 1;
      if (currentPageViewCount >= displayAfterPageViewsCount) {
          element.style.display = "block";
          localStorage.setItem(storageKey, "-1");
      } else {
          localStorage.setItem(storageKey, "" + currentPageViewCount);
      }
  }
});
}, 0);
