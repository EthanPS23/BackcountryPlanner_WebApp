// Script to display the weather stations from ACIS and AvyCan

// Display avy Canada weather stations on the map
$.getJSON("https://api.avalanche.ca/weather/stations", function(data){
    window.avyCanWeather = L.markerClusterGroup();
    var jsonFeatures = [];
    data.forEach(element => {
        var lat = element.latitude;
        var lon = element.longitude;

        var feature = {
            type: 'Feature',
            properties: element,
            geometry: {
                type: 'Point',
                coordinates: [lon,lat]
            }
        };
        jsonFeatures.push(feature);
    });

    var geoJson = { type: 'FeatureCollection', features: jsonFeatures };

    L.geoJson(geoJson,{
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng, {icon: avyCanadaWeatherStations});
        },
        onEachFeature: function(feature,layer){
            layer.bindTooltip(feature.properties.name, {sticky: true});

            layer.addTo(avyCanWeather);

            layer.on('click', function(){
                window.open("https://www.avalanche.ca/weather/stations/" + feature.properties.stationId);
            });
        }
    });

    mymap.addLayer(avyCanWeather);

    document.getElementById("toggleAvyCanWeather").style.color = '#f1f1f1';
    window.toggleAvyCanWeather = true;
})

// Display ACIS weather stations on the map
$.getJSON("http://localhost/stationsGEO.json", function(data){
    window.ACISWeather = L.markerClusterGroup();
    L.geoJSON(data, {
        onEachFeature: function (feature,layer){
            layer.bindTooltip(feature.properties.name, {sticky: true});

            layer.addTo(ACISWeather);

            layer.on('click', function(){
                window.open(feature.properties.url);
            });
        }
    });

    mymap.addLayer(ACISWeather);

    document.getElementById("toggleACISWeather").style.color = '#f1f1f1';
    window.toggleACISWeather = true;
});