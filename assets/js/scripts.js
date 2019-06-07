//Creating map options
var mapOptions = {
    center: [40.4168, -3.7038],
    zoom: 2,
    minZoom: 2,
    maxZoom: 18
}

// Creating a map object
var map = new L.map('map', mapOptions);

// Creating a Layer object
var layer = new L.TileLayer('http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png');


// Adding layer to the map
map.addLayer(layer);


//Adding geoJson data

var geojsonMarkerOptions = {
    radius: 3,
    fillColor: "#F08080",
    color: "#000",
    weight: 1,
    opacity: 0.2,
    fillOpacity: 0.8
};

function volcanoSearch(feature, layer) {
    layer.bindPopup("<h6>Name:" + feature.properties.NAME_ + "</h6><p>Type:" + feature.properties.TYPE_ + "</p>");
    

};

L.geoJson(volcano, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
            
        },
    onEachFeature: volcanoSearch
}).addTo(map);


//Button On/Off

