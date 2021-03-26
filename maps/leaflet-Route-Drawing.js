// FeatureGroup is to store editable layers and allows for drawing on the map
var drawnItems = new L.FeatureGroup();
mymap.addLayer(drawnItems);
window.drawControl = new L.Control.Draw({
    edit: {
        featureGroup: drawnItems
    },
    draw: {
        // having the following as false, hides them from the draw toolbar
        polygon: false,
        rectangle: false,
        circle: false,
        circlemarker: false
    }
});

// This section allows for drawn shapes to remain on the map after completion
mymap.on(L.Draw.Event.CREATED, function (event) {
    var layer = event.layer;

    drawnItems.addLayer(layer);
});

// on click, clear all layers
document.getElementById('delete').onclick = function(e) {
    drawnItems.clearLayers();
}

document.getElementById('export').onclick = function(e) {
    // Extract GeoJson from drawnItems
    var data = drawnItems.toGeoJSON();

    // Stringify the GeoJson
    var convertedData = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));

    // Create export
    document.getElementById('export').setAttribute('href', 'data:' + convertedData);
    document.getElementById('export').setAttribute('download','data.geojson');
}