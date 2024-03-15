function waitUntilAllLocationsInitialized(cb) {
    if (typeof allLocations !== "undefined") {
        cb();
    } else {
        window.setTimeout(function () {
            waitUntilAllLocationsInitialized(cb)
        }, 100);
    }
}

// Enable reachDebugMap to disable script for live debugging
window.reachDebugMap !== true && waitUntilAllLocationsInitialized(function () {

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
                    <h2 class="search__title"><%= listing.properties.addressShort %></h2>
                    <div class="search__address"><%= listing.properties.city %>, <%= listing.properties.state %> <%= listing.properties.zip %></div>
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
        return ejs.render(template, {listings: listings.features});
    }

// Set these variables during migration to hhc.ooo
    const geocoderContainerId = 'Search-Map-Form';
    const mapContainerId = 'map';
    const mapboxAccessToken = 'pk.eyJ1IjoiY2hvb3NlcmVhY2giLCJhIjoiY2tzMmZwaXRoMDB3czJxcDlpbTgyY2I3MiJ9.lG3fr5o7dEr-9Cj3C4dgbg';
    const mapboxStyle = 'mapbox://styles/choosereach/ckrjazfmp4px617p0h6oyj9dd';
    // Center the map on Green Valley Parkway HHC by default
    const mapCenter = [-98.178549, 37.409927];
    const mapZoom = 3.85;

    mapboxgl.accessToken = mapboxAccessToken

    const map = new mapboxgl.Map({
        container: mapContainerId,
        style: mapboxStyle,
        center: mapCenter,
        zoom: mapZoom,
        scrollZoom: true
    });


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
            "properties": {
                'icon': 'hhc-chicken-icon-original',
                ...hccLocation
            }
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
        map.addSource('stores', {
            'type': 'geojson',
            'data': stores,
            // Group close stores under the same marker
            cluster: true,
            // Max zoom to cluster points on
            clusterMaxZoom: 14,
            // Radius of each cluster when clustering points
            clusterRadius: 50
        })

        // Create a layer to cluster close stores together
        map.addLayer({
            id: 'clusters',
            type: 'symbol',
            source: 'stores',
            layout: {
                'icon-image': ['get', 'icon'],
                'icon-allow-overlap': true
            },
            filter: ['has', 'store_count'],
        });

        // Add a text field inside chicken to show how many locations are in a cluster
        map.addLayer({
            id: 'cluster-count',
            type: 'symbol',
            source: 'earthquakes',
            filter: ['has', 'store_count'],
            layout: {
                'text-field': ['get', 'store_count_abbreviated'],
                'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                'text-size': 12
            }
        });

        map.addLayer({
            'id': 'stores',
            'type': 'symbol',
            'source': 'stores',
            'layout': {
                'icon-image': ['get', 'icon'],
                'icon-allow-overlap': true
            }
        });

        // Build the left side list of locations
        buildLocationList(stores);

        map.on('click', 'stores', (e) => {
            window.location.href = e.features[0].properties.link
        });

        // Zoom into a cluster of stores when clicked
        // Example cluster app here: https://docs.mapbox.com/mapbox-gl-js/example/cluster/
        map.on('click', 'clusters', (e) => {
            const features = map.queryRenderedFeatures(e.point, {
                layers: ['clusters']
            });
            const clusterId = features[0].properties.cluster_id;
            map.getSource('stores').getClusterExpansionZoom(
                clusterId,
                (err, zoom) => {
                    if (err) return;

                    map.easeTo({
                        center: features[0].geometry.coordinates,
                        zoom: zoom
                    });
                }
            );
        });
    });


    const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    })

    const geocoderInput = geocoder.onAdd(map);
    document.getElementById(geocoderContainerId).appendChild(geocoderInput);
    geocoderInput.placeholder = "Search by city, state, zipcode etc"

    // When a location is selected from the dropdown, sort the listings by distance to that location
    geocoder.on('result', function (result) {

        // State / Neighborhood / County / Etc
        // Example: ['Summerlin South', 'Las Vegas', 'Clark County', 'Nevada', 'United States']
        const contexts = result.result.context.map(x => x['text_en-US'])
        // The address selected by the user
        // This could be a State like 'Texas' or a full street address
        const searchText = result.result['text_en-US']

        const address = result.result

        // If we successfully found an address from the search box
        if (address) {
            const latitude = address.center[0];
            const longitude = address.center[1];

            // Append the distance of each store from the geocoder search result so that we can filter out far away locations
            stores.features.forEach(store => {
                const storeLat = store.geometry.coordinates[0]
                const storeLon = store.geometry.coordinates[1]

                store.distanceFromSearch = calculateDistanceBetweenTwoCoordinates(storeLat, storeLon, latitude, longitude)
            })

            // Filter to stores that:
            const filteredStores = stores.features.filter(store => {
                // Are within 100 miles of the geocoder search
                return store.distanceFromSearch <= 100 ||
                    // Are within the same state
                    contexts.includes(store.properties.state) ||
                    // Are an exact state match
                    searchText === store.properties.state
            })

            // Sort stores from closest to furthest
            const sortedStores = filteredStores.sort((store1, store2) => {
                return store1.distanceFromSearch - store2.distanceFromSearch
            })

            const closestStore = sortedStores[0]

            // Resize map to fit closet store and geocoder search result location
            if (!!closestStore) {

                // const coordinates = [
                //     // Closest Store
                //     [sortedStores[0].geometry.coordinates[0], sortedStores[0].geometry.coordinates[1]],
                //     // Geocoder Search Result Location
                //     [latitude, longitude]
                // ]
                //
                // const bounds = getBoundsOfCoordinates(coordinates)
                //
                // map.fitBounds(bounds, {
                //     padding: {top: 50, bottom:50, left: 50, right: 50} // Padding in pixels
                // });
            }

            // Resize map to fit all stores within the mile range
            if (sortedStores.length > 0) {
                const storeCoordinates = filteredStores.map((store) => store.geometry.coordinates);

                const bounds = getBoundsOfCoordinates(storeCoordinates.concat([address.center]))

                map.fitBounds(bounds, {
                    padding: {top: 50, bottom:100, left: 50, right: 50} // Padding in pixels
                });
            }


            // Rebuild the listings sorted by distance
            buildLocationList({
                "type": "FeatureCollection",
                "features": sortedStores
            });
        }
    })

    // Gets geographical area containing all supplied coordinates
    function getBoundsOfCoordinates(coordinates) {
        let ne = [coordinates[0][0], coordinates[0][1]]
        let sw = [coordinates[0][0], coordinates[0][1]]

        coordinates.map((coordinate) => {
            if (coordinate[0] > ne[0]){
                ne[0] = coordinate[0];
            }
            if (coordinate[1] > ne[1]){
                ne[1] = coordinate[1];
            }
            if (coordinate[0] < sw[0]){ //sw = south west
                sw[0] = coordinate[0];
            }
            if (coordinate[1] < sw[1]){
                sw[1] = coordinate[1];
            }
        });

        // Add some padding around bound

        return [ne,sw]
    }


    function buildLocationList(stores) {
        const listings = document.getElementById('Search-Map-List');
        listings.innerHTML = "";

        listings.innerHTML = renderListingsTemplate(stores)
    }

    // Returns distance in miles between two coordinates
    function calculateDistanceBetweenTwoCoordinates(latt1, lonn1, latt2, lonn2) {
        const R = 6371; // km
        const dLat = toRad(latt2 - latt1);
        const dLon = toRad(lonn2 - lonn1);
        const lat1 = toRad(latt1);
        const lat2 = toRad(latt2);

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d;
    }

    // Converts numeric degrees to radians
    function toRad(Value) {
        return Value * Math.PI / 180;
    }
});
