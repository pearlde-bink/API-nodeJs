//
let map = L.map('map', {
    layers: MQ.mapLayer(),
    center: [48.890395, 77.616129],
    zoom: 3
});


function runDirection(start, end) {

    // recreating new map layer after removal
    map = L.map('map', {
        layers: MQ.mapLayer(),
        center: [48.890395, 77.616129],
        zoom: 3
    });

    var direction = MQ.routing.directions();

    direction.route({
        locations: [
            start,
            end
        ]
    });


    MainRouteLayer = MQ.Routing.RouteLayer.extend({
        initstartmarker: (location) => {
            var icon1;
            var startmarker;

            icon1 = L.icon({
                iconUrl: 'red.png',
                iconSize: [20, 29],
                iconAnchor: [10, 29],
                popupAnchor: [0, -29]
            });

            startmarker = L.marker(location.latLng, { icon: icon1 }).addTo(map);

            return startmarker;
        },

        initEndmarker: (location) => {
            var icon2;
            var endmarker;

            icon2 = L.icon({
                iconUrl: 'blue.png',
                iconSize: [20, 29],
                iconAnchor: [10, 29],
                popupAnchor: [0, -29]
            });

            endmarker = L.marker(location.latLng, { icon: icon2 }).addTo(map);

            return endmarker;
        }
    });

    map.addLayer(new MainRouteLayer({
        directions: direction,
        fitBounds: true
    }));
}


//
function submitForm(event) {
    event.preventDefault();

    //
    map.remove();

    //
    start = document.getElementById("start").value;
    end = document.getElementById("destination").value;

    //
    runDirection(start, end);

    //
    document.getElementById("form").reset();
}

const form = document.getElementById('form');
//

//
form.addEventListener('submit', submitForm);