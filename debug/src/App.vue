<template>
  <div id="app"></div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import marker2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import createHull from '../../src/main'

// Hack to get the markers into Vue correctly
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: marker2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
})

const trouble = require('../../test/fixtures/FeatureCollection10.geojson')

export default {
  name: 'App',
  mounted: function () {
    
    const layer = L.geoJSON(trouble)
    let map = window.map = L.map('app', {
      crs: L.CRS.Simple
    }).fitBounds(layer.getBounds())

    layer.addTo(map)

    // L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    //   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    //   subdomains: 'abcd',
    //   maxZoom: 19
    // }).addTo(map)

    const out = createHull(trouble.features.map(function (f) {
      return f.geometry.coordinates
    }))
    L.geoJSON({type: 'Polygon', coordinates: [out]}).addTo(map)

  }
}

</script>

<style>
 html, body, #app {
  height: 100%;
  width: 100%;
  margin: 0px;
 }
</style>
