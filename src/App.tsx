import React, { useContext, useEffect, useState } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MapContext, MapProvider } from './contexts/tabnamecontext';
import MapComponent from './layout/mapcomponent';
// import { danhmuc } from './map/showinformation';


const App: React.FC = () => {
  return (
    <div className="map-wrap" >
      <MapProvider>
        <MapComponent/>
      </MapProvider>
    </div>
  );
};

export default App;
