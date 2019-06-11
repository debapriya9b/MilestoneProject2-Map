
//Modal will open with page load

$(document).ready(function(){
        $("#myModal").modal('show');
    });



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
var layer = new L.TileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=8vFNrApGjV6jRicu4ins',);


// Adding layer to the map
map.addLayer(layer);


//Adding geoJson data and adding the marker


var geojsonMarkerOptions = {
    radius: 3,
    fillColor: "#F08080",
    color: "#000",
    weight: 1,
    opacity: 0.2,
    fillOpacity: 0.8
};

function volcanoSearch(feature, layer) {
    layer.bindPopup("<p>Name: " + feature.properties.NAME_ + "</p><p>Type: " + feature.properties.TYPE_ + "</p><p>Location: "+ feature.properties.LOCATION +"</p>");    //LOCATION.layer = layer;

};


L.geoJson(volcano, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
            
        },
    onEachFeature: volcanoSearch
}).addTo(map)



//Search control

var searchCtrl = L.control.fuseSearch()
searchCtrl.addTo(map);

//  Loading GeoJSON layer and index the features, choosing the properties I want to index
searchCtrl.indexFeatures(volcano, ['properties/LOCATION', 'properties/TYPE_']);




