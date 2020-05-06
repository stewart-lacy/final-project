

// Array.prototype.unique = function() {
//     var arr = [];
//     for(var i = 0; i < this.length; i++) {
//         if(!arr.includes(this[i])) {
//             arr.push(this[i]);
//         }
//     }
//     return arr;
// }

function populatePositionList() {
    d3.json("data/chicago_top_player.json").then(function(data) {

        var uniquePositions = $.unique(data.POSITION.map(function (d) {return d.name;}));

        console.log(uniquePositions);
    });
}

function kickoff() {
    populatePositionList()
}


kickoff();



    // let dropdown = d3.select("#dropDown");
    
    // d3.json("data/standin_data.json").then(function(data) {

    //     console.log(data);

    //     data.names.forEach(function(name) {
    //         dropdown.append("option").text(name).property("value");
    //     });

    // });