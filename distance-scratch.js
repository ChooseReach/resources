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
    callback(closestLocation)
  }

  function error() {
    console.log('Unable to retrieve your location');
  }

  if(!navigator.geolocation) {
    console.log('Geolocation is not supported by your browser')
  } else {
    status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
  }

}

const locations = window.geoLocations.filter(location => location.geoEnabled)

// Injects the closet location name and link into the store locator button
function displayClosestLocation(nameElement, linkElement) {
    return function (closestLocation) {
        nameElement.innerHtml = closetLocation.name;
        linkElement.innerHtml = closetLocation.link;
    }
}

document.querySelector("#Download-App-Button").addEventListener('click', geoFindMe(locations, );
