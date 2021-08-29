const myLocationButton = document.getElementById("Use-My-Location-Button");

// Get list of locations from Webflow CMS items on page load
const allLocations = Array.from(document.querySelectorAll("#geoList div.w-embed")).map(element => JSON.parse(element.innerHTML))

// Find the closest location to a target location out of an array of locations
function closestCoordinate(targetLocation, locationData) {
    function vectorDistance(dx, dy) {
        return Math.sqrt(dx * dx + dy * dy);
    }

    function locationDistance(location1, location2) {
        var dx = location1.latitude - location2.latitude,
            dy = location1.longitude - location2.longitude;

        return vectorDistance(dx, dy);
    }

    return locationData.reduce(function(prev, curr) {
        var prevDistance = locationDistance(targetLocation , prev),
            currDistance = locationDistance(targetLocation , curr);
        return (prevDistance < currDistance) ? prev : curr;
    });
}

// Find the closest location to a user's location and execute the callback function with it
function findClosestLocation(allLocations, callback) {
  function success(position) {
    // Get the closest location to the user's location based on geo coordinates
    const closestLocation = closestCoordinate(position.coords, allLocations);
    //console.log("Closest location: " + JSON.stringify(closestLocation));
    callback(closestLocation, null)
  }

  function error() {
    callback(null, true)
    console.log('Unable to retrieve your location');
  }

  if(!navigator.geolocation) {
    console.log('Geolocation is not supported by your browser')
  } else {
    status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
  }

}

// Update button details with text, link, and id of closest location.
function displayClosestLocation() {
    var myLocationLoader = document.getElementById("myLocationLoader");
    var myLocationTop = document.getElementById("myLocationTop");
    var myLocationBottom = document.getElementById("myLocationBottom");

    myLocationLoader.style.display = "block";
    findClosestLocation(
        allLocations,
        function (closestLocation, err) {
            myLocationLoader.style.display = "none";
            if (!!err) {
              myLocationBottom.innerHTML = "GeoLocation Unavailable";
              console.error(err);
            } else {
             window.closestLocation = closestLocation;
             console.log('Geo: User Location Requested', closestLocation);       
             myLocationButton.classList.remove("nav__location--inactive");
             myLocationLoader.style.display = "none";
             myLocationButton.href = window.closestLocation.link;
             myLocationButton.id = "Location-Nearest-You-Button"
             myLocationTop.innerHTML = "Location nearest you:"
             myLocationBottom.innerHTML = window.closestLocation.name;
            }
        }
    )
}

myLocationButton.addEventListener('click', displayClosestLocation);
