import maplibregl,{Map} from 'maplibre-gl';

export const createMap = (): Map => {
  // const west: number = 105.84117; // Tọa độ tây
  // const east: number = 105.84846; // Tọa độ đông
  // const north: number = 21.00845; // Tọa độ bắc
  // const south: number = 21.00174; // Tọa độ nam

  // const bounds: maplibregl.LngLatBoundsLike = [
  //   [west, south],
  //   [east, north],
  // ];

  const map = new maplibregl.Map({
    container: 'map',
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
    style: 'https://api.maptiler.com/maps/fefc1891-4e0d-4102-a51f-09768f839b85/style.json?key=S1qTEATai9KydkenOF6W', 
    center: [105.84513, 21.005532],
    zoom: 16,
    maxZoom: 18.5,
    minZoom: 15.5,
    hash: 'map',
    // bounds: bounds,
    // maxBounds: bounds,
    pitch: 60,
    maxPitch: 85,
    antialias: true
  });

  return map;
};
