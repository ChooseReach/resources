const locations = [
    {
        name: "Oceanside",
        latitude: 33.1959,
        longitude: -117.3795
    },
    {
        name: "La Jolla",
        latitude: 32.50336264,
        longitude: -117.15279612
    },
    {
        name: "Home",
        latitude: 32.7187786,
        longitude: -117.1689295
    },
    {
        name: "Downtown",
        latitude: 32.7167,
        longitude: -117.1661
    }
]

/**
  * Find the closest location to a target location out of an array of locations
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

function findClosestLocation() {
  function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Get the closest location to the user's location based on geo coordinates
    const closestLocation = closestCoordinate(position.coords, locations);
    console.log(closestLocation);
  }

  function error() {
    status.textContent = 'Unable to retrieve your location';
  }

  if(!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
  } else {
    status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
  }

}

document.querySelector("#Download-App-Button").addEventListener('click', geoFindMe);
