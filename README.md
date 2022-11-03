# README

App básica de Rails 7 para utilizar un mapa en una vista show con Stimulus



* Ruby version : 3.1.2

* Raisl version: 7.0.4

* System dependencies
 
  gem "geocoder", "~> 1.8"

* Database creation

  rails db:create db:migrate

#app/controllers/posts_controller.rb ###################################

def show
   @coordinates = {
      lat: @post.latitude,
      lng: @post.longitude
    }
end

#app/views/posts/show.html.erb ##########################################

<p style="color: green"><%= notice %></p>

<%= render @post %>
<%= @coordinates.to_json %>
<div>
  <%= link_to "Edit this post", edit_post_path(@post) %> |
  <%= link_to "Back to posts", posts_path %>

  <%= button_to "Destroy this post", @post, method: :delete %>
</div>
<div id='map' style='width: 400px; height: 300px;'
data-controller="map" data-map-marker-value="<%=@coordinates.to_json%>"
></div>
    
#app/javascript/controllers/map_controller.js ############################

import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="map"
export default class extends Controller {

  static values = {
    marker: Object
  }

  connect() {
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
