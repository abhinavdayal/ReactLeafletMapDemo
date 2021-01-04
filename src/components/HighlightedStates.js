import { useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import states from '../assets/data/geojson/states';
import census from '../assets/data/csv/statescensus';
import { style } from './utils';

const HighlightedStates = () => {
  const  map = useMap();

  useEffect(() => {
    // control that shows state info on hover
    const info = L.control();

    info.onAdd = () => {
      info._div = L.DomUtil.create("div", "info");
      info.update();
      return info._div;
    };

    info.update = (props) => {
      info._div.innerHTML =
        "<h4>India States</h4>" +
        (props
          ? "<b>" +
            props.state +
            "</b><br />" +
            props['2011'] +
            " people / mi<sup>2</sup>"
          : "Hover over a state");
    };

    info.addTo(map);
    const highlightFeature = (e) => {
      const layer = e.target;

      layer.setStyle({
        weight: 5,
        color: "#666",
        dashArray: "",
        fillOpacity: 0.7
      });

      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }

      info.update(census.find(x => { return x.state === layer.feature.properties.ST_NM }));
    };

    let geojson;

    const resetHighlight = (e) => {
      geojson.resetStyle(e.target);
      info.update();
    };

    const zoomToFeature = (e) => {
      map.fitBounds(e.target.getBounds());
    };

    const onEachFeature = (feature, layer) => {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
      });
    };

    geojson = L.geoJson(states, {
      style,
      onEachFeature: onEachFeature
    }).addTo(map);
  }, [map]);

  return null;
};

export default HighlightedStates;
