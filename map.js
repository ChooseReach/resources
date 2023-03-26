const template = `
<% for (let listing of listings) { %>
    <div class="search__item">
    <article>
        <a href="<%= listing.properties.link %>" class="search__link w-inline-block">
            <div class="search__thumb">
            <img alt="<%= listing.properties.shortName %>" loading="lazy" src="https://assets-global.website-files.com/60f9c1b675841a19d29d576e/6258a80a42e151546994817d_map_0006_sandiego_png.jpeg" class="results__map border-md">
            <div class="search__overlay">
                <div class="icon w-embed">
                    <svg width="100%" height="100%" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 741.5 838.6"><path d="M733.5 388.3c-13-48.9-41.5-93.9-81.8-124.6-39-29.7-89.1-46.4-137.7-40.3-48.7 6.1-94.9 36.9-114.3 82-11.6 26.8-15.1 59.5-38.1 77.5-21.1 16.5-53 13.6-75-1.6s-35.5-40.3-43.1-66-10.2-52.5-15.4-78.8c-6.1-30.6-15.7-60.6-28.7-89-8.6-18.8-19-38.8-15.3-59.1 3.8-21.1 21.5-36.4 38.2-49.9l-28.2-2.3-.2-18c-9.7-3.5-21.2-1.5-29.2 5.1 5.2-13.6-13-26.6-27-22.8s-23.1 17-31 29.2c1.7-12.1-14-20.8-25.7-17.2-11 3.4-26.8 18.1-30.2 29.3-5.1 16.5 2.2 38.5 11.6 52l-61.9 25 68.1 11.5c-21.5 12.1-33.8 38.7-29.1 63 16.7-3.1 32.3-11.7 43.8-24.1C90 216.8 62 261.3 46.1 306.6c-30.9 88.1-14.4 191.2 42.4 265.2C145 645.6 234.2 687 299.1 753.7c9.3 9.6 18.7 22.1 15.3 35-1.9 7.1-7.3 12.6-12.9 17.3-18.9 16.1-41.8 27.4-66.1 32.6l217 .1c-16.9-11.1-36.4-18.1-52-30.8-15.7-12.7-27.1-34.3-19.5-53.1 3.8-9.4 11.8-16.5 20.1-22.4 19.1-13.4 41.1-22.1 61.4-33.6 95.7-54.1 146.6-176.7 117.4-282.6 45.6 34.4 80.2 83.1 97.6 137.5 8.1-63.3-16.6-130-64.2-172.6 57.2 32.2 77.8 103.1 93.2 166.9 8.8-78-19.6-159.4-75-214.9 31.2 12.1 55.5 38.2 71.6 67.6s24.9 62.1 33.1 94.6c7.9-35.3 6.6-72.1-2.6-107z" fill="#e30613"></path></svg>
                    </div>
                    </div>
                    </div>
                    <div class="search__details">
                    <h2 class="search__title"><%= listing.properties.address %></h2>
                    <div class="search__address"><%= listing.properties.city %>, <%= listing.properties.state %> <%= listing.properties.zip %> | Under Construction</div>
                    <div class="search__label">
                    <div>View&nbsp;Details&nbsp;&nbsp;</div>
                    <div class="icon w-embed">
                    <svg width="100%" height="100%" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-6 400H54a6 6 0 0 1-6-6V86a6 6 0 0 1 6-6h340a6 6 0 0 1 6 6v340a6 6 0 0 1-6 6zm-54-304H204.015c-10.658 0-16.04 12.93-8.485 20.485l48.187 48.2L99.515 340.888c-4.686 4.686-4.686 12.284 0 16.97l22.627 22.627c4.687 4.686 12.285 4.686 16.97 0l144.2-144.2 48.2 48.192C339.028 292 352 286.712 352 275.992V140c0-6.627-5.373-12-12-12z"></path></svg>
                </div>
            </div>
        </div>
        </a>
    </article>
</div>
<% } %>
`

function renderListingsTemplate(listings) {
    return ejs.render(template, {listings: listings.features });
}

// Set these variables during migration to hhc.ooo
const mapContainerId = 'map';
const mapboxAccessToken = 'pk.eyJ1IjoiY2hvb3NlcmVhY2giLCJhIjoiY2tzMmZwaXRoMDB3czJxcDlpbTgyY2I3MiJ9.lG3fr5o7dEr-9Cj3C4dgbg';
const mapboxStyle = 'mapbox://styles/mapbox/light-v11';
// Center the map on Green Valley Parkway HHC by default
const mapCenter = [-115.08585, 36.02941];
const mapZoom = 13;
// TODO - Need to figure out how to adopt HHC mapbox styles !!!

mapboxgl.accessToken = mapboxAccessToken

const map = new mapboxgl.Map({
    container: mapContainerId,
    style: mapboxStyle,
    center: mapCenter,
    zoom: mapZoom,
    scrollZoom: true
});

const allLocations = JSON.parse('[{"name":"Louetta Rd","openStatus":"Now Hiring","map":"https://assets-global.website-files.com/60f9c1b675841a19d29d576e/63b9ce958e4ca008d22f89b2_fziXi8FuSPrbE7VA8yGa9JbG9rbFEKXwPsQlKJ-GdU4.jpeg","street":"Louetta Rd","crossStreets":"Tomball Pkwy &amp; Louetta Rd","addressLong":"10111 Louetta Rd #800, Houston, Texas, 77070","addressShort":"10111 Louetta Rd #800","city":"Houston","state":"Texas","zip":"77070","latitude":30.00017,"longitude":-95.56084,"geoEnabled":true,"link":"https://www.hhc.ooo/location/10111-louetta-rd-800-houston-texas-77070"},{"name":"Traverse Pkwy","openStatus":"Now Open","map":"https://assets-global.website-files.com/60f9c1b675841a19d29d576e/638152ab122a500c2b6ec455_jHxJpBVYi9jpAHfkfuUVzoQj-qWToK1EczddfxAylXo.jpeg","street":"Traverse Pkwy","crossStreets":"I-15 &amp; Route 92","addressLong":"1712 West Traverse Pkwy, Lehi, Utah, 84043","addressShort":"1712 West Traverse Pkwy","city":"Lehi","state":"Utah","zip":"84043","latitude":40.43331,"longitude":-111.87755,"geoEnabled":true,"link":"https://www.hhc.ooo/location/1712-west-traverse-pkwy-lehi-utah-84043"},{"name":"Friant Rd","openStatus":"Now Hiring","map":"https://assets-global.website-files.com/60f9c1b675841a19d29d576e/62d5dab08be8a77dc40b28e1_fresno.jpeg","street":"Friant Rd","crossStreets":"Yosemite Fwy &amp; Friant Rd","addressLong":"8482 N Friant Rd #107, Fresno, California, 93720","addressShort":"8482 N Friant Rd #107","city":"Fresno","state":"California","zip":"93720","latitude":36.859,"longitude":-119.783182,"geoEnabled":true,"link":"https://www.hhc.ooo/location/8482-n-friant-rd-107-fresno-california-93720"},{"name":"Village Center Cir","openStatus":"Now Open","map":"https://assets-global.website-files.com/60f9c1b675841a19d29d576e/62d5daacb0ec997e52079d77_summerlin.jpeg","street":"Village Center Cir","crossStreets":"Summerlin Pkwy &amp; Town Center","addressLong":"1910 Village Center Circle #1, Las Vegas, Nevada, 89134","addressShort":"1910 Village Center Circle #1","city":"Las Vegas","state":"Nevada","zip":"89134","latitude":36.193299,"longitude":-115.303101,"geoEnabled":true,"link":"https://www.hhc.ooo/location/1910-village-center-circle-1-las-vegas-nevada-89134"},{"name":"University Dr","openStatus":"Now Open","map":"https://assets-global.website-files.com/60f9c1b675841a19d29d576e/62aa5114698030df79841916_hhc-university-drive-thumb.jpeg","street":"University Dr","crossStreets":"University Dr &amp; Rural Rd","addressLong":"927 E University Dr, Tempe, Arizona, 85281","addressShort":"927 E University Dr","city":"Tempe","state":"Arizona","zip":"85281","latitude":33.421705,"longitude":-111.925357,"geoEnabled":true,"link":"https://www.hhc.ooo/location/927-e-university-dr-tempe-arizona-85281"},{"name":"Sahara Blvd","openStatus":"Now Hiring","map":"https://assets-global.website-files.com/60f9c1b675841a19d29d576e/6258a80bfe0d564d9f6efa19_map_0005_sahara_png.jpeg","street":"Sahara Blvd","crossStreets":"Sahara Ave &amp; Jones Blvd","addressLong":"5915 West Sahara Ave, Las Vegas, Nevada, 89146","addressShort":"5915 West Sahara Ave","city":"Las Vegas","state":"Nevada","zip":"89146","latitude":36.14384,"longitude":-115.22275,"geoEnabled":true,"link":"https://www.hhc.ooo/location/5915-west-sahara-ave-las-vegas-nevada-89146"},{"name":"Ann Rd","openStatus":"Now Open","map":"https://assets-global.website-files.com/60f9c1b675841a19d29d576e/6258a8060a79b6d3f07944c1_map_0008_westann_png.jpeg","street":"Ann Rd","crossStreets":"US-95 &amp; Ann Road","addressLong":"7155 West Ann Rd, Las Vegas, Nevada, 89130","addressShort":"7155 West Ann Rd","city":"Las Vegas","state":"Nevada","zip":"89130","latitude":36.26203,"longitude":-115.24965,"geoEnabled":true,"link":"https://www.hhc.ooo/location/7155-west-ann-rd-las-vegas-nevada-89130"},{"name":"Green Valley Pkwy","openStatus":"Now Open","map":"https://assets-global.website-files.com/60f9c1b675841a19d29d576e/6258a8055984272145602dd9_map_0001_green-valley_png.jpeg","street":"Green Valley Pkwy","crossStreets":"I-215 &amp; Green Valley Pkwy","addressLong":"1500 N Green Valley Pkwy #110, Henderson, Nevada, 89074","addressShort":"1500 N Green Valley Pkwy #110","city":"Henderson","state":"Nevada","zip":"89074","latitude":36.02941,"longitude":-115.08585,"geoEnabled":true,"link":"https://www.hhc.ooo/location/1500-n-green-valley-pkwy-110-henderson-nevada-89074"}]');

function mapHHCLocationToMapboxFormat(hccLocation) {
    return {
        type: "Feature",
        geometry: {
            type: "Point",
            coordinates: [
                hccLocation.longitude,
                hccLocation.latitude,
            ]
        },
        "properties": hccLocation
    }
}
//
const stores = {
    "type": "FeatureCollection",
    "features": allLocations.map(mapHHCLocationToMapboxFormat)
}

/* Assign a unique ID to each store */
stores.features.forEach(function (store, i) {
    store.properties.id = i;
});

map.on('load', () => {
    /* Add the data to your map as a layer */
    map.addLayer({
        id: 'locations',
        type: 'circle',
        /* Add a GeoJSON source containing place coordinates and information. */
        source: {
            type: 'geojson',
            data: stores
        }
    });

    buildLocationList(stores);
});

map.on('click', (event) => {
    /* Determine if a feature in the "locations" layer exists at that point. */
    const features = map.queryRenderedFeatures(event.point, {
        layers: ['locations']
    });

    /* If it does not exist, return */
    if (!features.length) return;

    const clickedPoint = features[0];

    /* Fly to the point */
    flyToStore(clickedPoint);

    /* Close all other popups and display popup for clicked store */
    // Optionally enable popups
    createPopUp(clickedPoint);

    /* Highlight listing in sidebar (and remove highlight for all other listings) */
    const activeItem = document.getElementsByClassName('active');
    if (activeItem[0]) {
        activeItem[0].classList.remove('active');
    }
    const listing = document.getElementById(
        `listing-${clickedPoint.properties.id}`
    );
    listing.classList.add('active');
});

const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
})

document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

// When a location is selected from the dropdown, sort the listings by distance to that location
geocoder.on('result', function(result) {
    console.log(result);
    const address = result.result

    // If we successfully found an address from the search box
    if (address) {
        const latitude = address.center[0];
        const longitude = address.center[1];

        console.log(latitude, longitude);

        console.log(stores)

        const sortedStores = stores.features.sort((store1, store2) => {
            const store1Lat = store1.geometry.coordinates[0]
            const store1Lon = store1.geometry.coordinates[1]
            const store2Lat = store2.geometry.coordinates[0]
            const store2Lon = store2.geometry.coordinates[1]

            const store1Distance = calculateDistanceBetweenTwoCoordinates(store1Lat, store1Lon, latitude, longitude)
            const store2Distance = calculateDistanceBetweenTwoCoordinates(store2Lat, store2Lon, latitude, longitude)

            return store1Distance - store2Distance
        })

        // Rebuild the listings sorted by distance
        buildLocationList({
            "type": "FeatureCollection",
            "features": sortedStores
        });
    }

})


function buildLocationList(stores) {

    const listings = document.getElementById('Search-Map-List');
    listings.innerHTML = "";

    debugger

    listings.innerHTML = renderListingsTemplate(stores)

    for (const store of stores.features) {
        /* Add a new listing section to the sidebar. */

        link.addEventListener('click', function () {
            for (const feature of stores.features) {
                if (this.id === `link-${feature.properties.id}`) {
                    flyToStore(feature);
                    createPopUp(feature);
                }
            }
            const activeItem = document.getElementsByClassName('active');
            if (activeItem[0]) {
                activeItem[0].classList.remove('active');
            }
            this.parentNode.classList.add('active');
        });
    }
}

function flyToStore(currentFeature) {
    map.flyTo({
        center: currentFeature.geometry.coordinates,
        zoom: 15
    });
}

function createPopUp(currentFeature) {
    const popUps = document.getElementsByClassName('mapboxgl-popup');
    /** Check if there is already a popup on the map and if so, remove it */
    if (popUps[0]) popUps[0].remove();

    const popup = new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat(currentFeature.geometry.coordinates)
        .setHTML(`<h3>Sweetgreen</h3><h4>${currentFeature.properties.address}</h4>`)
        .addTo(map);
}

function calculateDistanceBetweenTwoCoordinates(latt1, lonn1, latt2, lonn2)
{
    const R = 6371; // km
    const dLat = toRad(latt2-latt1);
    const dLon = toRad(lonn2-lonn1);
    const lat1 = toRad(latt1);
    const lat2 = toRad(latt2);

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c;
    return d;
}

// Converts numeric degrees to radians
function toRad(Value)
{
    return Value * Math.PI / 180;
}
