import React, { useEffect } from 'react';
import Navbar from './component/component';
import { createMap } from './map/mapnew';
import overMap from './map/topographic';
import { markerImage } from './map/markerimage';
import { searchAddress, updateSuggestions } from './map/search';
import data from './hust/data.json';
import { findway } from './map/findway';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { object3d } from './map/object3d';

const App: React.FC = () => {
  useEffect(() => {
    const map = createMap();
    overMap(map);
    const marker = markerImage(map);
    
    map.on('load', () => {
      searchAddress(map, marker);
      const searchInput = document.getElementById('search__address') as HTMLInputElement;
      if(searchInput){
        searchInput.addEventListener('input', ()=> {
          const searchText = searchInput.value;
          const suggestions = data.features.filter(function(feature) {
              return feature.properties.name.toLowerCase().includes(searchText.toLowerCase());
          });
          updateSuggestions(suggestions, map, marker);
        });
      }
    });

    findway(map);
    object3d(map);

    var nav = new maplibregl.NavigationControl({
      showCompass: false, // hide the compass button
      showZoom: true // show the zoom buttons
    });
    map.addControl(nav, 'bottom-right');

  return () => map.remove();
  }, []);

  return (
    <div className="map-wrap" >
      <Navbar/>
    </div>
  );
};

export default App;
