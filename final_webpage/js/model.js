var bounds = [[0,0], [940,500]];

var map = L.map('leftCourt', {
    crs: L.CRS.Simple,
    // center: bounds.getCenter(),
    zoom: 1,
    maxBounds: bounds,
    maxBoundsViscosity: 1.0
});

var image = L.imageOverlay("img/court2.png", bounds).addTo(map);

map.fitBounds(bounds);

//https://gis.stackexchange.com/questions/238414/adding-a-new-and-removing-an-old-marker-every-time-the-user-click-on-the-map

var theMarker = {};

let shooter = "Point Guard";

let probability = "0.57";


map.on('click',function(e){
    posLat = parseInt(e.latlng.lat);
    posLon = parseInt(e.latlng.lng);

    console.log("You clicked the map at LAT: "+ posLat+" and LONG: "+posLon );
      //Clear existing marker, 

    if (theMarker != undefined) {
        map.removeLayer(theMarker);
    };

    emptyTheBoxes();

  //Add a marker to show where you clicked.
    theMarker = L.marker([posLat,posLon]).addTo(map);

    fillTheBoxes();
});



function emptyTheBoxes() {
    let shooterInformation = d3.select("#positionShotResponse");
    let probabilityInformation = d3.select("#positionProbabilityResponse")

    shooterInformation.html("");
    probabilityInformation.html("");
}

function fillTheBoxes() {
    let shooterInformation = d3.select("#positionShotResponse");
    let probabilityInformation = d3.select("#positionProbabilityResponse")

    shooterInformation.append("h5").text(shooter);
    probabilityInformation.append("h5").text(probability);

}

function choice(y) {
    console.log(y);
}

