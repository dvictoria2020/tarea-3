// Mapa Leaflet
var mapa = L.map('mapid').setView([9.95, -84.15], 13);

// Definición de capas base
var capa_osm = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?', 
  {
    maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }
).addTo(mapa);	

// Otra capa base esri
var capa_esri = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', 
    {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }
).addTo(mapa)

// Conjunto de capas base
var capas_base = {
  "ESRI": capa_esri,
  "OSM": capa_osm,
};
	    
// Control de capas
control_capas = L.control.layers(capas_base).addTo(mapa);	

// Control de escala
L.control.scale().addTo(mapa);

// Capa vectorial de terrenos del estado en formato GeoJSON
$.getJSON("https://dvictoria2020.github.io/tarea-3/tarea-3/datos/terrenos/terrenos_estado.geojson", function(geodata) {
  var terrenos = L.geoJson(geodata, {
    style: function(feature) {
	  return {'color': "red", 'weight': 1.5, 'fillOpacity': 0.0}
    },
    onEachFeature: function(feature, layer) {
      var popupText = "<strong>Propietario</strong>: " + feature.properties.nom_juridi + "<br>" + "<strong>Tipo de Inmueble</strong>: " + feature.properties.t_inmueb + "<br>" + "<strong>Clasificación</strong>: " + feature.properties.clasific + "<br>" + "<strong>Amenazas</strong>: " + feature.properties.r_fisica + "<br>" + "<strong>Número de finca</strong>: " + feature.properties.finca;
      layer.bindPopup(popupText);
    }			
  }).addTo(mapa);

  control_capas.addOverlay(terrenos, 'Terrenos del Estado');
});

// Capa vectorial de terrenos del estado en formato GeoJSON
$.getJSON("https://dvictoria2020.github.io/tarea-3/tarea-3/datos/terrenos/terrenos_estado2.geojson", function(geodata) {
  var terrenos = L.geoJson(geodata, {
    style: function(feature) {
	  return {'color': "red", 'weight': 1.5, 'fillOpacity': 0.0}
    },
    onEachFeature: function(feature, layer) {
      var popupText = "<strong>Propietario</strong>: " + feature.properties.nom_juridi + "<br>" + "<strong>Tipo de Inmueble</strong>: " + feature.properties.t_inmueb + "<br>" + "<strong>Clasificación</strong>: " + feature.properties.clasific + "<br>" + "<strong>Amenazas</strong>: " + feature.properties.r_fisica + "<br>" + "<strong>Número de finca</strong>: " + feature.properties.finca;
      layer.bindPopup(popupText);
    }			
  }).addTo(mapa);

  control_capas.addOverlay(terrenos, 'Terrenos del Estado');
});

// Agregar capa WMS Asentamientos Informales
  var capa_localidades = L.tileLayer.wms('http://mapassociales.inec.cr/geopc?service=wms', {
  layers: 'localidades_02012017',
  format: 'image/png',
  transparent: true
}).addTo(mapa);

// Se agrega al control de capas como de tipo "overlay"
control_capas.addOverlay(capa_localidades, 'Localidades de Costa Rica WMS');