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

function closestLocation(targetLocation, locationData) {
    function vectorDistance(dx, dy) {
        const distance = Math.sqrt(dx * dx + dy * dy);
        console.log("Distance: " + distance)
        return distance;
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

function geoFindMe() {

//   const status = document.querySelector('#status');
//   const mapLink = document.querySelector('#map-link');

//   mapLink.href = '';
//   mapLink.textContent = '';

  function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    console.log(position.coords)

    const closestLoc = closestLocation(position.coords, locations);
    console.log(closestLoc);
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
