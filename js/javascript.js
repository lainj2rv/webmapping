let map = L.map('map').setView([58.373523, 26.716045], 12)

const osm =
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
            {maxZoom: 19,
attribution: 'OpenStreetMap contributors',})

osm.addTo(map)

// add popup to each feature
function popUPinfo(feature, layer) {
layer.bindPopup(feature.properties.NIMI)
}

// polygon style
function polygonStyle(feature) {
return {
fillColor: '#60948E',
fillOpacity: 0.8,
weight: 1.5,
opacity: 1,
color: '#fff',
}
}

// add geoJSON polygons layer
async function addDistrictsGeoJson(url) {
const response = await fetch(url)
const data = await response.json()
const polygons = L.geoJson(data, {
onEachFeature: popUPinfo,
style: polygonStyle,
})
polygons.addTo(map)
}
addDistrictsGeoJson('geojson/tartu_city_districts_edu.geojson')

function createCircle(feature, latlng) {
let options = {
radius: 5,
fillColor: '#0D4B8C',
fillOpacity: 0.8,
color: '#0D4B8C',
weight: 1,
opacity: 1,
}
return L.circleMarker(latlng, options)
}

// add geoJSON layer
async function addCelltowersGeoJson(url) {
const response = await fetch(url)
const data = await response.json()
const circles = L.geoJson(data, {
pointToLayer: createCircle,
})
const clusters = L.markerClusterGroup()
clusters.addLayer(circles)
clusters.addTo(map)
}
addCelltowersGeoJson('geojson/tartu_city_celltowers_edu.geojson')

// default map settings
function defaultMapSettings() {
map.setView([58.373523, 26.716045], 12)
}
