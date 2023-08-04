import maplibregl, { Map } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import data from '../hust/data.json';
import nha from '../hust/nha.json';
import features from '../hust/features.json';
import { object3d, object3dcar, object3dcube} from './object3d';

const roads = require('../hust/bd.geojson');
const border = require('../hust/water_areas.geojson');
const building = require('../hust/buildings.geojson');
const imgbd =  require('../image/map6.png');


function overMap(map: Map){
  map.on('load',(e)=>{
    map.addSource('radar', {
      'type': 'image',
      'url': imgbd,
      'coordinates': [
        [105.840820, 21.00848], 
        [105.848260, 21.00848],
        [105.848260, 21.00164],
        [105.840820, 21.00164]

        // [105.841220, 21.008158], 
        // [105.848090, 21.008158],
        // [ 105.848090,21.003014],
        // [ 105.841220,21.003014]
      ]
    });
    map.addLayer({
        id: 'radar-layer',
        'type': 'raster',
        'source': 'radar',
        'paint': {
          'raster-fade-duration': 0,
          'raster-opacity':1
        }
    });

    map.addSource("street", {
        type: "geojson",
        data: roads,
    });
  
    map.addLayer({
        id: "street-id",
        type: "line",
        source: "street",
        paint: {
        "line-color": "#0066CC",
        "line-opacity": 0,
        "line-width": 2,
        },
    });

    map.addSource("border", {
      type: "geojson",
      data: border,
    });
    
    map.addLayer({
      id: "border-id",
      type: "fill-extrusion",
      source: "border",
      paint: {
        "fill-extrusion-color": "#61677A",
        "fill-extrusion-opacity": 0.7,
        "fill-extrusion-height": 2, // Chiều cao của các đoạn đường (có thể thay đổi theo ý muốn)
        "fill-extrusion-base": 0, // Độ cao của mặt đất (có thể thay đổi theo ý muốn)
        
      },
    });
    

    map.addSource('vin-src',{
      type:'geojson',
      data:data
    })
    // map.addSource('building',{
    //   type:'geojson',
    //   data:building
    // })

    // map.addLayer({
    //   id: '3d-building',
    //   type: 'fill-extrusion',
    //   source: 'building',
    //   paint: {
    //     'fill-extrusion-color': '#E9B384', // Màu sắc tòa nhà
    //     'fill-extrusion-height': ['get', 'height'], // Chiều cao tòa nhà
    //     'fill-extrusion-base': 0, // Độ cao cơ sở của tòa nhà
    //     'fill-extrusion-opacity':0.8
    //     }
    // });

    nha.features.forEach((feature: any) => {
      const buildingId = feature.properties.osm_id;
      const opacity = feature.properties.opacity || 1;

      map.addSource(`building-${buildingId}`, {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [feature],
        },
      });

      map.addLayer({
        id: `3d-building-${buildingId}`,
        type: 'fill-extrusion',
        source: `building-${buildingId}`,
        paint: {
          'fill-extrusion-color': '#FFFFFF', // Màu sắc fill-extrusion mặc định
          'fill-extrusion-height': ['get', 'height'],
          'fill-extrusion-base': 0,
          'fill-extrusion-opacity': opacity,
        },
      });
    });


    // const customLayer= object3dcar(map);
    // map.addLayer(customLayer);

    


    map.addLayer({
      id: 'vin-name',
      type: 'symbol',
      source: 'vin-src',
      layout: {
        'text-field': ['format', ['get', 'name'], { 'font-scale': 1 }],
        'text-size': [
          'interpolate',
          ['linear'],
          ['zoom'],
          15, 0, 15.5, 4, 16, 6, 16.5, 8, 17, 10, 17.5, 12, 18, 14, 18.5, 16, 19, 18
        ],
        // 'text-anchor': 'bottom', // Đặt text-anchor là 'bottom' để đẩy văn bản lên đỉnh các tòa nhà
        'text-offset': ['interpolate', ['linear'], ['zoom'],
          15, ['literal', [0, 0]],
          16, ['literal', [0, -2]],
          17, ['literal', [0, -2.5]],
          18, ['literal', [0, -3.5]] 
        ],
        // 'text-offset': ['literal', [0, -3]],
        'text-font': ['DIN Offc Pro Bold', 'Arial Unicode MS Bold'] // Đặt kiểu chữ đậm
      },
      paint: {
        'text-color': 'white',
        'text-halo-color': 'black',
        'text-halo-width': 1,
      }
    });

    // let layerCount = 1;
    // for (const feature of data.features) { 
    //   const coordinate: any = feature.geometry.coordinates;
    //   const name = feature.properties.name;
    //   const height = feature.properties.height;
    //   const layerName = `custom${layerCount++}`;
    //   // Remove any previously added layer with the same name
    //   if (map.getLayer(layerName)) {
    //     map.removeLayer(layerName);
    //   }
    //   const customLayer = object3d(map, coordinate,name, layerName, height);
    //   map.addLayer(customLayer);
    // }



  });
}


export default overMap;