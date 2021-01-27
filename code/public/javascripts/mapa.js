

var mymap = L.map('mapid').setView([38.727168, -9.110647], 14);
// var mapMark = L.icon({
//   iconUrl: '\images\orangemapmarker.png',
//   iconSize: [38, 95], 
//   iconAnchor: [22, 94],
//   popupAnchor: [-3, -76] 
// });
var markersLayer = L.layerGroup();
mymap.addLayer(markersLayer);


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
});


function parquesMarkers(lat, long, nome, parqueID){
  var marker = markersLayer.addLayer(L.marker([lat, long]).bindPopup("<input type='button' class='markerInput' onclick='selecionarMarkerParque(" + parqueID + ")' id = 'parquepopup' value='"+ nome +"'>").addTo(mymap));
}

function parquesMarkersInfo(lat, long){
  var marker = markersLayer.addLayer(L.marker([lat, long]).addTo(mymap));
}

function selecionarMarkerParque(parqueID) {
  // sessionStorage.removeItem("parqueID");
  sessionStorage.setItem("parqueID", parqueID);
  window.location = "infoParque.html";
}

function getParqueNome(nomeParque){
  sessionStorage.setItem("parqueNome", nomeParque);
  console.log(sessionStorage.getItem("parqueNome"));
  getRota();
}

// function getRota() {
//   L.Routing.control({
//     waypoints: [
//         L.latLng(38.70722, -9.15254),
//         L.latLng(38.706138, -9.151017)
//     ],
//     routeWhileDragging: true
// }).addTo(map);
// }

function clearMarker() {
  markersLayer.clearLayers();
}


// directions



