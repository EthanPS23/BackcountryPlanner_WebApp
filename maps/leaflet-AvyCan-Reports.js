// This script is used to call the different AvyCan reports, use custom marker symbols, cluster them, and display upon the map

///////////////////////////////////////////////////////////////////////////////////////////////

// Function to get date
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

var todaysDate = new Date();

var last7days = new Date();
last7days.setDate(todaysDate.getDate()-7);
todaysDate = formatDate(todaysDate);

last7days = formatDate(last7days);

var avyCanadaMIN_URL = "https://api.avalanche.ca/min/en/submissions?fromdate=" + last7days + "&todate=" + todaysDate + "&pagesize=1000";

///////////////////////////////////////////////////////////////////////////////////////////////

// Display avy Canada MIN reports on the map 
$.getJSON(avyCanadaMIN_URL, function(dataSubs){
    window.minReports = L.markerClusterGroup({
        iconCreateFunction: function(cluster) {
            var html = '<div class="iconMIN">' + cluster.getChildCount() + '</div>';
            return L.divIcon({ html: html, className: 'MINCluster',iconSize: L.point(24,24) });
        }
    });
    var jsonFeatures = [];
    dataSubs = JSON.parse(JSON.stringify(dataSubs.items.data));
    dataSubs.forEach(element => {
        var lat = element.location.latitude;
        var lon = element.location.longitude;

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
        pointToLayer: function (feature,latlng) {
            // check to see if the MIN is an incident, if it is not then use normal MIN icon, if it is, use the MIN incident icon
            if (feature.properties.observations.incident == 0) {
                return L.marker(latlng, {icon: avyCanadaMINReports});
            } else {
                return L.marker(latlng, {icon: avyCanadaMINReportsIncident});
            }
        },
        onEachFeature: function (feature, layer) {
            layer.bindTooltip(feature.properties.title, {sticky: true});

            layer.addTo(minReports);

            layer.on('click', function(){
                window.open("https://www.avalanche.ca/mountain-information-network/submissions/" + feature.properties.id);
            });
        }
    });

    mymap.addLayer(minReports);

    // document.getElementById("toggleMINs").style.color = '#f1f1f1';
    window.toggleMINReports = true;
})

$.getJSON("https://avalancheca.cdn.prismic.io/api/v2",function (apiData) {
    apiData = JSON.parse(JSON.stringify(apiData.refs));
    var apiRef = apiData[0].ref;

    fatalityReports(apiRef)
})

// Display fatality reports
function fatalityReports(apiRef){
    $.getJSON("https://avalancheca.cdn.prismic.io/api/v2/documents/search?page=1&pageSize=100&q=[[:d%20=%20date.after(my.fatal-accident.dateOfAccident,%20%222020-09-30%22)][:d%20=%20date.before(my.fatal-accident.dateOfAccident,%20%222021-10-01%22)]]&ref=" + apiRef,function(dataFat){
        window.fatalityReports = L.markerClusterGroup({
            iconCreateFunction: function(cluster) {
                var html = '<div class="iconFatality">' + cluster.getChildCount() + '</div>';
                return L.divIcon({ html: html, className: 'fatalityCluster',iconSize: L.point(24,24) });
            }
        });
        var jsonFeatures = [];
        dataFat = JSON.parse(JSON.stringify(dataFat.results));
        dataFat.forEach(element =>{
            var lat = element.data.location.latitude;
            var lon = element.data.location.longitude;
    
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
            pointToLayer: function (feature,latlng) {
                return L.marker(latlng, {icon: avyCanadaFatality});
            },
            onEachFeature: function (feature, layer) {
                layer.bindTooltip(feature.properties.data.title, {sticky: true});
    
                layer.addTo(fatalityReports);
    
                layer.on('click', function(){
                    window.open(feature.properties.href);
                });
            }
        });
        mymap.addLayer(fatalityReports);
    
        // document.getElementById("toggleFatalityReports").style.color = '#f1f1f1';
        window.toggleFatalityReports = true;
    })
}

// Display the MCRs from avy Canada
$.getJSON("https://avalanche.ca/api/mcr/", function(data){
    window.mountainConditionReports = L.markerClusterGroup({
        iconCreateFunction: function(cluster) {
            var html = '<div class="iconMCR">' + cluster.getChildCount() + '</div>';
            return L.divIcon({ html: html, className: 'MCRCluster',iconSize: L.point(24,24) });
        }
    });
    var jsonFeatures = [];
    data.forEach(element => {
        var lat = element.location[1];
        var lon = element.location[0];

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

    var geoJson = { type: 'FeatureCollection', features: jsonFeatures};

    L.geoJson(geoJson,{
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng, {icon: avyCanadaMCR});
        },
        onEachFeature: function(feature,layer){
            layer.bindTooltip(feature.properties.title, {sticky: true});

            layer.addTo(mountainConditionReports);

            layer.on('click', function(){
                window.open(feature.properties.permalink);
            });
        }
    });
    mymap.addLayer(mountainConditionReports);

    // document.getElementById("toggleMCRs").style.color = '#f1f1f1';
    window.toggleMCRs = true;
})