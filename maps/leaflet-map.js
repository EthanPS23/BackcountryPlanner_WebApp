// Script for the leaflet map

window.mymap = L.map('mapid').setView([51.0447, -114.0719], 10);

window.toggleDrawFeatures = false;

L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',{
    minZoom: 3,
    maxZoom: 17,
    detectRetina: false,
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);