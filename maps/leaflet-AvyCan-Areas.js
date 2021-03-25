// This script displays the Avalanche Canada avy areas on the map
$.getJSON( "https://avalanche.ca/api/forecasts", function(data) {
    window.avyCanForecastRegions = L.geoJson(data,{
        style: avyCanadaLayerStyle,
        onEachFeature: function (feature, layer) {
            layer.on('mouseover', function () {
                this.setStyle({
                    'weight': 5.5
                });
            });

            layer.on('mouseout', function () {
                this.setStyle({
                    'weight': 2.5
                });
            });

            layer.on('click',onPolyClick);

            layer.bindPopup(
                createPopupContent(feature)
            );

            layer.bindTooltip(feature.properties.name, {sticky: true});
        },
        filter: areaFilter // filter the data based upon areaFilter
    }).addTo(mymap);

    // document.getElementById("toggleAvyCanForecasts").style.color = '#f1f1f1';
    window.toggleAvyCanForecasts = true;
})

// Script to determine if a feature is of geometry type polygon to avoid adding areas for points
function areaFilter(feature) {
    if(feature.geometry.type === "Polygon") return true;
}