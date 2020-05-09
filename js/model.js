var bounds = [[0, 0], [940, 500]];

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

var data = [];
let shooter = d3.select("#probability");
let dropdown = d3.select("#target_names");
let probability = "0.57";


shooter.on("click", function () {
    console.log(dropdown.text())
    var currentSelect = dropdown.node().selectedOptions[0].label
    var currentSelect1 = dropdown.node().value

    data.push(["upvote", currentSelect]);
    console.log(data)
    d3.select('#outputposition').text(currentSelect);
    d3.select('#outputprob').text(currentSelect1);
   // d3.json("http://localhost:5000/predict").then(function (json) {
    //    console.log(json);
      //  d3.select('#outputprob').text(json.toString());
    //});


});



