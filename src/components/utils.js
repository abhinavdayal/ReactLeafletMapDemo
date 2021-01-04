import census from '../assets/data/csv/statescensus';

// get color depending on population density value
export const getColor = d => {
    return d > 1000 ? '#bd0026' :
        d > 950 ? '#f03b20' :
            d > 900 ? '#fd8d3c' :
                d > 800 ? '#fecc5c' :
                    '#ffffb2';
};

export const style = feature => {
    return {
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
        fillColor: getColor(feature && census.find(x => { return x.state === feature.properties.ST_NM })['2011'])
    };
};
