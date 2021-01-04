import React, { Component } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import data from '../assets/tdata';
import Markers from './VenueMarkers';
import HighlightedStates from './HighlightedStates';
import Legend from './StatesLegend'
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

class MapView extends Component {
  
  state = {
    currentLocation: { lat: 23.41602567180082, lng: 80.1954253360062 },
    zoom: 5,
  }

  render() {
    return (
      <MapContainer center={this.state.currentLocation} zoom={this.state.zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />

        <Markers venues={data.venues} />
        <HighlightedStates/>
        <Legend/>
      </MapContainer>
    );
  }
}

export default MapView;
