// opens the side navigation bar
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
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