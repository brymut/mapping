var mymap = L.map('mapid').setView([51.505, -0.09], 13)

L.tileLayer('https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiYnJ5YW5tdXRhaSIsImEiOiJjajNwcTQ5cDMwMDN0MnhrY2ltNHIwZWZqIn0.Fo6DBSpAvYCgx5r12y5Rqg'
}).addTo(mymap);


var ourCustomControl = L.Control.extend({

  options: {
    position: 'topright' 
    //control position - allowed: 'topleft', 'topright', 'bottomleft', 'bottomright'
  },
  onAdd: function (map) {
    var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');

    container.style.backgroundColor = 'white';
    //container.style.backgroundImage
    container.style.width = '30px';
    container.style.height = '30px';
    
    var placing_pin = false;

    var getcoord = function(e) {
      if (placing_pin && !e.originalEvent.target.classList.contains("leaflet-control-custom") ){
            console.log("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng);
            L.marker([e.latlng.lat,e.latlng.lng]).addTo(map);
            placing_pin = false;
      }
    };
    map.on('click', getcoord);

    container.onclick = function(){
       placing_pin = !placing_pin;
    };
    return container;
  }

});

mymap.addControl(new ourCustomControl());

