//Creating map options
var mapOptions = {
    center: [53.4239, -7.9407],
    zoom: 3
}

// Creating a map object
var map = new L.map('map', mapOptions);

// Creating a Layer object
var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');


// Adding layer to the map
map.addLayer(layer);
