//Creating map options
var mapOptions = {
    center: [53.4239, -7.9407],
    zoom: 5,
    minZoom: 2,
    maxZoom: 18
}

// Creating a map object
var map = new L.map('map', mapOptions);

// Creating a Layer object
var layer = new L.TileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png');


// Adding layer to the map
map.addLayer(layer);


//Adding geoJson data

function volcanoSearch (feature, layer){
    layer.bindPopup("Hi, I am volcano");
};

L.geoJson(volcano,{
    onEachFeature: volcanoSearch
}).addTo(map);