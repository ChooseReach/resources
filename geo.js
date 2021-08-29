/**
  * Find the closest location to a target location out of an array of locations
  *
  * Example input:  (
  *                   {...,"latitude": 23.456, "longitude": -117.833},
  *                   [{...,"latitude": 23.456, "longitude": -117.833}, {...,"latitude": 23.456, "longitude": -117.833}, ...]
  *                 )
  */
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
function findClosestLocation(locations, callback) {
  function success(position) {
    // Get the closest location to the user's location based on geo coordinates
    const closestLocation = closestCoordinate(position.coords, locations);
    console.log("Closest location: " + JSON.stringify(closestLocation));
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

 var myLocationButton = document.getElementById("Use-My-Location-Button");

// Injects the closet location name and link into the store locator button
function displayClosestLocation() {
    // Grab the list of locations from the dynamically generated list based on webflow cms
    const locations = Array.from(document.querySelectorAll("#geoList div.w-embed")).map(element => JSON.parse(element.innerHTML))


    var myLocationLoader = document.getElementById("myLocationLoader");
    var myLocationTop = document.getElementById("myLocationTop");
    var myLocationBottom = document.getElementById("myLocationBottom");


    myLocationLoader.style.display = "block";
    findClosestLocation(
    locations,
    function (closestLocation, err) {
        myLocationLoader.style.display = "none";
        if (!!err) {
          myLocationBottom.innerHTML = "Unavailable";
          console.error(err);
        } else {
         console.log(closestLocation);         
         myLocationButton.classList.remove("nav__location--inactive");
         myLocationLoader.style.display = "none";
         myLocationBottom.href = "/location/1500-north-green-valley-pkwy-suite-110-henderson-nv-89074"
         myLocationTop.innerHTML = "Location nearest you:"
         myLocationBottom.innerHTML = "Green Valley Pkwy";
        }
    }
    )
}

myLocationButton.addEventListener('click', displayClosestLocation);
