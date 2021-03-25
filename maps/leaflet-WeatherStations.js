// Script to display the weather stations from ACIS and AvyCan

// Display avy Canada weather stations on the map
$.getJSON("https://api.avalanche.ca/weather/stations", function(data){
    window.avyCanWeather = L.markerClusterGroup({
        iconCreateFunction: function(cluster) {
            var html = '<div class="weatherStation">' + cluster.getChildCount() + '</div>';
            return L.divIcon({ html: html, className: 'weatherCluster',iconSize: L.point(24,24) });
        }
    });
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
            return L.marker(latlng, {icon: weatherStations});
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

    // document.getElementById("toggleWeather").style.color = '#f1f1f1';
    window.toggleWeather = true;
})

// Display ACIS weather stations on the map
$.getJSON("http://localhost/stationsGEO.json", function(data){
    window.ACISWeather = L.markerClusterGroup({
        iconCreateFunction: function(cluster) {
            var html = '<div class="weatherStation">' + cluster.getChildCount() + '</div>';
            return L.divIcon({ html: html, className: 'weatherCluster',iconSize: L.point(24,24) });
        }
    });
    L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng, {icon: weatherStations});
        },
        onEachFeature: function (feature,layer){
            layer.bindTooltip(feature.properties.name, {sticky: true});

            layer.addTo(ACISWeather);

            layer.on('click', function(){
                window.open(feature.properties.url);
            });
        }
    });

    mymap.addLayer(ACISWeather);

    // document.getElementById("toggleACISWeather").style.color = '#f1f1f1';
    // window.toggleACISWeather = true;
});