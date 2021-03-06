var bounds = [[0,0], [940,500]];

var map = L.map('rightCourt', {
    crs: L.CRS.Simple,
    center: [250, 250],
    zoom: 0,
    maxBounds: bounds,
    maxBoundsViscosity: 1.0
});

var image = L.imageOverlay("./img/court2.png", bounds).addTo(map);

// map.fitBounds(bounds);

//https://gis.stackexchange.com/questions/238414/adding-a-new-and-removing-an-old-marker-every-time-the-user-click-on-the-map






function renderdata(y) {
      
    d3.json("data/halfcourt2.json").then(function(data2) {

        geojson = {
            type: "FeatureCollection",
            features: [],
        };

        for (var key in data2.shooter) {
            geojson.features.push({

                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [data2.LOC_X[key], data2.LOC_Y[key]]
                },
                "properties": {
                    "Player": data2.shooter[key],
                    "Position": data2.position[key],
                    "Outcome": data2.current_shot_outcome[key]
                }
            });
        };
    
    });
    
    console.log(y);

    console.log(geojson);

    var dataLayerGroup;

    var filterVal = document.getElementById("dropDown").value;

    console.log(filterVal);
    
    var nameFilter = function (feature) {
        if (String(feature.properties.Position) === String(filterVal)) return true
    }

    var customColor = "green";

    var determineColor = function (feature) {

        if (String(feature.properties.Outcome) === "Missed") customColor = "orange";

        if (String(feature.properties.Outcome) === "Blocked") customColor = "red"

    }
    

    function addLayerToMap(){
        
        if (map.hasLayer(dataLayerGroup)){
            dataLayerGroup.remove();
        }
        
        dataLayerGroup = L.geoJson(geojson, {
            filter: nameFilter,
            pointToLayer: function (feature, latlng) {
                return new L.CircleMarker(latlng, {radius: 1, fillOpacity: 0.8, color: getColor(feature.properties.Outcome)});
            },
            onEachFeature: function (feature, layer) {
                layer.bindPopup("<h5>" + feature.properties.Outcome + "</h5> <hr> <p>" + feature.properties.Player + "<br>" + feature.properties.Position)
            },

        }).addTo(map);

    }

    $("#dropDown").on("input", function(){
        filterVal = document.getElementById("dropDown").value;
        console.log("the filter was changed to ", filterVal); 
        //add the layer to the map again, now that we have changed the filter value. 
        addLayerToMap();
    });

    addLayerToMap();

}

// https://stackoverflow.com/questions/30367076/leaflet-circle-color-depend-on-variable

function getColor(Outcome) {
    switch(Outcome) {
        case "BLOCKED":
            return "red";
        case "MISSED":
            return "orange";
        default: 
            return "green";
    }
}

function choice(y) {
    renderdata(y);
}




function kickoff() {
    
    d3.json("data/halfcourt2.json").then(function(data) {

        geojson = {
            type: "FeatureCollection",
            features: [],
        };

        for (var key in data.shooter) {
            geojson.features.push({

                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [data.LOC_X[key], data.LOC_Y[key]]
                },
                "properties": {
                    "Player": data.shooter[key],
                    "Position": data.position[key],
                    "Outcome": data.current_shot_outcome[key]
                }
            });
        };
    
    });
    
    
    let dropdown = d3.select("#dropDown");
    
    var uniquePositions = new Set();

    d3.json("data/halfcourt2.json").then(function(data) {

        console.log(typeof data.position);

        for (var key in data.position) {
            uniquePositions.add(data.position[key])
        }

        console.log(uniquePositions);
        
        uniquePositions.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        renderdata(uniquePositions[0]);

    });
}

kickoff();