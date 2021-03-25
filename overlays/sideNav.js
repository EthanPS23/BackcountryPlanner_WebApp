// opens the side navigation bar
function openNav() {
    document.getElementById("mySidenav").style.width = "260px";
}

// closes the side navigation bar
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

// opens the overlay on top off the map
function openMainCanvas(){
    document.getElementById("mainCanvas").style.width = "100%";
    document.getElementById("mainCanvas").style.opacity = "0.8";  
}

// closes the overlay on top off the map
function closeMainCanvas(){
    document.getElementById("mainCanvas").style.width = "0%";
    document.getElementById("mainCanvas").style.opacity = "0";  
}

// Script that enables and disables viewing of the Avy Can MIN reports
document.getElementById('toggleMINs').onclick = function(e) {
    // if MIN reports is toggled then remove the MIN reports cluster layer, else add
    if (toggleMINReports) {
        mymap.removeLayer(minReports);
        document.getElementById("toggleMINs").style.backgroundColor = '#7386D5'; 
    }else{
        mymap.addLayer(minReports);
        document.getElementById("toggleMINs").style.backgroundColor = '#6d7fcc'; 
    }
    toggleMINReports = !toggleMINReports; // set the toggleMINReports variable to oppite of current
}

// Script that enables and disables viewing of the weather stations
document.getElementById('toggleWeather').onclick = function(e) {
    // if toggled then remove the cluster layer, else add
    if (toggleWeather) {
        mymap.removeLayer(ACISWeather);
        mymap.removeLayer(avyCanWeather);
        document.getElementById("toggleWeather").style.backgroundColor = '#7386D5'; 
    }else{
        mymap.addLayer(ACISWeather);
        mymap.addLayer(avyCanWeather);
        document.getElementById("toggleWeather").style.backgroundColor = '#6d7fcc'; 
    }
    toggleWeather = !toggleWeather; // set the toggleACISWeather variable to oppite of current
}

// Script that enables and disables viewing of the Fatal Recreational Accidents
document.getElementById('toggleFatalityReports').onclick = function(e) {
    // if toggled then remove the cluster layer, else add
    if (toggleFatalityReports) {
        mymap.removeLayer(fatalityReports);
        document.getElementById("toggleFatalityReports").style.backgroundColor = '#7386D5'; 
    }else{
        mymap.addLayer(fatalityReports);
        document.getElementById("toggleFatalityReports").style.backgroundColor = '#6d7fcc'; 
    }
    toggleFatalityReports = !toggleFatalityReports; // set the toggleFatalityReports variable to oppite of current
}

// Script that enables and disables viewing of MCRs
document.getElementById('toggleMCRs').onclick = function(e) {
    // if toggled then remove the cluster layer, else add
    if (toggleMCRs) {
        mymap.removeLayer(mountainConditionReports);
        document.getElementById("toggleMCRs").style.backgroundColor = '#7386D5'; 
    }else{
        mymap.addLayer(mountainConditionReports);
        document.getElementById("toggleMCRs").style.backgroundColor = '#6d7fcc'; 
    }
    toggleMCRs = !toggleMCRs; // set the toggleMCRs variable to oppite of current
}

// Script that enables and disables viewing of Avy Can Avalanche Forecasts 
document.getElementById('toggleAvyCanForecasts').onclick = function(e) {
    // if toggled then remove the cluster layer, else add
    if (toggleAvyCanForecasts) {
        mymap.removeLayer(avyCanForecastRegions);
        mymap.removeLayer(avyCanForecasts);
        document.getElementById("toggleAvyCanForecasts").style.backgroundColor = '#7386D5'; 
    }else{
        mymap.addLayer(avyCanForecastRegions);
        mymap.addLayer(avyCanForecasts);
        document.getElementById("toggleAvyCanForecasts").style.backgroundColor = '#6d7fcc'; 
    }
    toggleAvyCanForecasts = !toggleAvyCanForecasts; // set the toggleAvyCanForecasts variable to oppite of current
}