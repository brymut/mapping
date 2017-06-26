var mymap = L.map('mapid').setView([51.505, -0.09], 16);
var latlng = [51.505, -0.09];
// var popup = L.popup()
//     .setLatLng(latlng)
//     .setContent('<p>Hello world!<br />This is a nice popup.</p>')
//     .openOn(mymap);

L.tileLayer('https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiYnJ5YW5tdXRhaSIsImEiOiJjajNwcTQ5cDMwMDN0MnhrY2ltNHIwZWZqIn0.Fo6DBSpAvYCgx5r12y5Rqg'
}).addTo(mymap);


var pinButtonControl = L.Control.extend({

  options: {
    position: 'topright' 
    //control position - allowed: 'topleft', 'topright', 'bottomleft', 'bottomright'
  },
  onAdd: function (map) {
    var pinButton = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom pin-button');
    pinButton.title = "drop a pin";
    pinButton.style.backgroundColor = 'white';
    //container.style.backgroundImage
    pinButton.style.width = '30px';
    pinButton.style.height = '30px';

    

    
    var placing_pin = false;

    var getcoord = function(e) {
      if (placing_pin && !e.originalEvent.target.classList.contains("pin-button") ){
            console.log("Lat, Lon : " + e.latlng + ", " + e.latlng.lng);
            L.marker([e.latlng.lat,e.latlng.lng]).addTo(map);
            placing_pin = false;
      }
    };
    map.on('click', getcoord);

    pinButton.onclick = function(){
       placing_pin = !placing_pin;
       
    };
    return pinButton;
  }

});

mymap.addControl(new pinButtonControl());


var polygonButtonControl = L.Control.extend({

  options: {
    position: 'topright' 
    //control position - allowed: 'topleft', 'topright', 'bottomleft', 'bottomright'
  },
  onAdd: function (map) {
    var polygonButton = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom polygon-button');

    polygonButton.style.backgroundColor = 'white';
    //container.style.backgroundImage
    polygonButton.style.width = '30px';
    polygonButton.style.height = '30px';
    
    var drawing = false;
    var myIcon = L.icon({
      iconUrl: 'red-pin.png',
      iconSize: [38, 95],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
      });
    var points = []
    var markerGroup = L.layerGroup().addTo(map);
    
    var addPoint = function(e){
      if (drawing && !e.originalEvent.target.classList.contains("polygon-button") ){
        console.log("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng);
        L.marker([e.latlng.lat,e.latlng.lng],{icon: myIcon}).addTo(markerGroup);
        points.push([e.latlng.lat,e.latlng.lng]);
      }
    }

    var removePoints = function (e){
     if (!drawing && e.originalEvent.target.classList.contains("polygon-button") ){
      map.removeLayer(markerGroup);
      var polygon = L.polygon(points).addTo(map);
      points = [];
      markerGroup = L.layerGroup().addTo(map);
     }
    }
    map.on('click', addPoint);
    map.on('click', removePoints);
    polygonButton.onclick = function(){
      drawing = !drawing;
    };
    return polygonButton;
  }

});

mymap.addControl(new polygonButtonControl());

