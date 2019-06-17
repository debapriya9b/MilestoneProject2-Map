
/* global L */


//-------------------------------------------------Modal


//Modal will open with page load

$(document).ready(function(){
        $("#myModal").modal('show');
    });

//------------------------------------------------Creating map/Tile Layer/Popup

//Creating map options
var mapOptions = {
    center: [40.4168, -3.7038],
    zoom: 2,
    minZoom: 2,
    maxZoom: 18
}

// Creating a map object
var map = new L.map('map', mapOptions);

// Add Tile Layer and add to map
L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=8vFNrApGjV6jRicu4ins').addTo(map);

//Adding geoJson data and adding the marker and popup

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

//-------------------------------------------Creating interactive buttons:Toggler button to show on/off worldwide volcanoes

var volcanoPoints = null;


// Create event listener for the add Volcanoes Worldwide Button
document.getElementById("addButton").addEventListener("click", addVolcanoWorldwide);

// Add volcano worldwide function
function addVolcanoWorldwide() {
    volcanoPoints.addTo(map);
};

function addVolcanoWorldwide() {
    if(map.hasLayer(volcanoPoints)){
    removeVolcanoWorldwide();
    };
    volcanoPoints = L.geoJson(volcano, {
        pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
        },
    onEachFeature: volcanoSearch
    }).addTo(map);
   };


// Create event listener for the remove Volcanoes Worldwide Button
document.getElementById("removeButton").addEventListener("click", removeVolcanoWorldwide);

// Remove volcano worldwide function
function removeVolcanoWorldwide() {
    volcanoPoints.remove(map);
};

document.getElementById("toggleButton").addEventListener("click", toggleVolcanoes);

// Toggle Volcanoes
function toggleVolcanoes(){
    if(map.hasLayer(volcanoPoints)){
        removeVolcanoWorldwide();
    } else {
        addVolcanoWorldwide();
    }
};

//----------------------------------------------------------Filtering to show Active Volcanoes

// Event Listener for a click on the Active button
document.getElementById("filterActiveVol").addEventListener("click", filterActiveVol);


// Function to update volcanoPoints to filtered subset of data showing Active volcanoes
function filterActiveVol(){
    if(map.hasLayer(volcanoPoints)){
    removeVolcanoWorldwide();
    };
 volcanoPoints = L.geoJson(volcano, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
        },
    onEachFeature: volcanoSearch,
    filter: function (feature, layer) {
            return feature.properties.STATUS == "Active";
    }
}).addTo(map);
}

//----------------------------------------------------------Filtering to show Dormant Volcanoes

// Event Listener for a click on the Dormant button
document.getElementById("filterDormantVol").addEventListener("click", filterDormantVol);


// Function to update volcanoPoints to filtered subset of data showing Dormant volcanoes
function filterDormantVol(){
    if(map.hasLayer(volcanoPoints)){
    removeVolcanoWorldwide();
    };
   volcanoPoints = L.geoJson(volcano, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
        },
    onEachFeature: volcanoSearch,
    filter: function (feature, layer) {
            return feature.properties.STATUS == "Dormant";
    }
}).addTo(map);
}

//----------------------------------------------------------Filtering to show Extinct Volcanoes

// Event Listener for a click on the Extinct button
document.getElementById("filterExtinctVol").addEventListener("click", filterExtinctVol);


// Function to update volcanoPoints to filtered subset of data showing Extinct volcanoes
function filterExtinctVol(){
    if(map.hasLayer(volcanoPoints)){
    removeVolcanoWorldwide();
    };
  volcanoPoints = L.geoJson(volcano, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
        },
    onEachFeature: volcanoSearch,
    filter: function (feature, layer) {
            return feature.properties.STATUS == "Extinct";
    }
}).addTo(map);
}



//----------------------------------------------------------------Map popup

/*

// create an empty popup element
var popup = L.popup();

// A function that will populate the popup element using methods from the popup object
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

// on click, run function to populate popup and open it on the map
map.on('click', onMapClick);*/






//----------------------------------------------------------------Map search

        // flyTo the latitude/longitude + zoom level based on the user selection
        $("#countries").on("change", function () {
            var countryData = $(this).val().split(","),
                MapLat = countryData[0],
                MapLng = countryData[1],
                MapZoom = parseInt(countryData[2]);
            map.flyTo([MapLat, MapLng], MapZoom);
        });





