//initializing map 
let myMap = L.map("map", {
    center: [-32.8, 117.9],
    zoom: 1
  });

//adding title layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

//json earthquake data 
let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

//Marker color function based on depth
function markerColor(depth) {
    let color = "";
    if(depth<=10 && depth>-10){
        color = "rgb(50,255,50)";
    }
    else if (depth<=30 && depth>10){
        color ="rgb(230,248,3)";
    }
    else if (depth<=50 && depth>30){
        color ="rgb(253,225,30)";
    }
    else if (depth<=70 && depth>50){
        color ="rgb(243,144,63)";
    }
    else if (depth<=90 && depth>70){
        color ="rgb(237,104,60)";
    }
    else if (depth>90){
        color ="rgb(233,62,58)";
    }

    return color;
  };


d3.json(url).then(function(response) {
    console.log(response);
    features = response.features;

    //loop through earthquakes in data set
    for (let i = 0; i < features.length; i++) {
        let location = (features[i].geometry.coordinates);
        let depth = features[i].geometry.coordinates[2]

        //Creates circles with correct attributes for each eathquake
        L.circle(location, {
          fillOpacity: 0.75,
          color: "black",
          weight: 1,
          fillColor: markerColor(depth),
          radius:(features[i].properties.mag) *50000
        }).bindPopup('<h1>Coordinates: ' +features[i].geometry.coordinates+'</h1> <hr> <h2> Place: ' +features[i].properties.place +'</h2> <hr> <h3> Magnitude: '+features[i].properties.mag+'</h3> <hr> <h3> Type: '+features[i].properties.type).addTo(myMap);
      }

   
})

//Legend code commented out due to errors
//let legend = L.control({position:'bottomright'});
//legend.onAdd = function(myMap){
//    var div = L.DomUtil.create('div','info legend'),
//    let colors = ["rgb(50,255,50)","rgb(230,248,3)","rgb(253,225,30)","rgb(243,144,63)","rgb(237,104,60)", "rgb(233,62,58)"],
//    let labels = ['-10-10','10-30', '30-50', '50-70', '70-90', '90+'];


//    for(var i=0; i<labels.length; i++){
//        div.innerHTML += '<i style = "background: ' + color +'"></i> ');
//    }
//    return div;
//};
//legend.addTo(myMap);
