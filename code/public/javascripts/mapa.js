

var mymap = L.map('mapid').setView([38.70722, -9.15252], 15);
var mapMark = L.icon({
  iconUrl: '\images\orangemapmarker.png',
  iconSize: [38, 95], // size of the icon
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});



L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 21,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoiMjAwMHl0cmljYXJkbyIsImEiOiJja2llYzA2aDkweDJsMnRyc2NmYTdlb2hmIn0.wvxtVtYjr_2Us5p1V6lGyg'
}).addTo(mymap);


var searchControl = L.esri.Geocoding.geosearch().addTo(mymap);

var results = L.layerGroup().addTo(mymap);

searchControl.on('results', function (data) {
  results.clearLayers();
  //  for (var i = data.results.length - 1; i >= 0; i--) {
  //    results.addLayer(L.marker(data.results[i].latlng));
  // }
});



function parquesMarkers(long, lat, nome){
  var marker = L.marker([long, lat]).addTo(mymap);
  console.log(long, lat, nome);
  marker.bindPopup("<b id = 'parquepopup'>"+ nome +"</b>");
  //document.getElementById("parquepopup").onclick = getParqueNome(nome);
  // 38.70722, -9.15254
}

function getParqueNome(nomeParque){
  sessionStorage.setItem("parqueNome", nomeParque);
  console.log(sessionStorage.getItem("parqueNome"));
  getRota();
}


function getRota(){
  L.Routing.control({
    waypoints: [
        L.latLng(38.70722, -9.15254),
        L.latLng(38.706138, -9.151017)
    ],
    routeWhileDragging: true
}).addTo(map);
}

//var button = document.createElement("button");
//button.class = "profileB";
//button.innerHTML = '<i class="material-icons" style="font-size:45px;color:white">person</i>';

//document.getElementById("body").appendChild(button);