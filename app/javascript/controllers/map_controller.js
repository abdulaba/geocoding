import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="map"
export default class extends Controller {

  static values = {
    marker: Object
  }

  connect() {
    console.log(this.markerValue.lat)
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWJkdWxhYmEiLCJhIjoiY2w4cHg2ZGVyMXR0azN2cDRiaGszemdiciJ9.GMr4gUtLVUQ-skCzx-ZCxA';
    this.map = new mapboxgl.Map({
      container: this.element, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [this.markerValue.lng, this.markerValue.lat], // starting position [lng, lat]
      zoom: 18, // starting zoom
    });
    this.#addMarkersToMap()
  }

  #addMarkersToMap() {
    new mapboxgl.Marker()
      .setLngLat([ this.markerValue.lng, this.markerValue.lat ])
      .addTo(this.map)
  }

}
