import { useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import { getColor } from "./utils"

const Legend = () => {
  const  map  = useMap();
  
  useEffect(() => {
    // get color depending on population density value
    

    const legend = L.control({ position: "bottomright" });

    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend");
      const grades = [0, 800, 900, 950, 1000];
      let labels = [];
      let from;
      let to;

      for (let i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];

        labels.push(
          '<i style="background:' +
            getColor(from + 1) +
            '"></i> ' +
            from +
            (to ? "&ndash;" + to : "+")
        );
      }

      div.innerHTML = labels.join("<br>");
      return div;
    };
    legend.addTo(map);
  });
  return null;
};

export default Legend;
