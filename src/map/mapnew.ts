import maplibregl,{Map} from 'maplibre-gl';

export const createMap = (): Map => {
  const map = new maplibregl.Map({
    container: 'map', 
    style: 'https://api.maptiler.com/maps/fefc1891-4e0d-4102-a51f-09768f839b85/style.json?key=S1qTEATai9KydkenOF6W', 
    // style: {
    //   "version": 8,
    //   "name": "Empty",
    //   "metadata": {
    //     "mapbox:autocomposite": true
    //   },
    //   "glyphs": "https://api.maptiler.com/fonts/{fontstack}/{range}.pbf?key=S1qTEATai9KydkenOF6W",
    //   "sources": {},
    //   "layers": [
    //     {
    //       "id": "background",
    //       "type": "background",
    //       "paint": {
    //       "background-color": "#deeed2"
    //       }
    //     }
    //   ]
    // }, 
    center: [105.843484, 21.005532],
    zoom: 17,
    maxZoom: 18.5,
    minZoom: 15.5,
    hash: 'map',
    pitch: 60,
    maxPitch: 85,
    antialias: true
  });

  return map;
};
