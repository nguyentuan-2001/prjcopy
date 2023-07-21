import React, { useContext, useEffect, useState } from "react";
import maplibregl, { LngLatLike, Map, Marker } from "maplibre-gl";
import "../css/component.css";
import "maplibre-gl/dist/maplibre-gl.css";
import { createMap } from "../map/mapnew";
import overMap from "../map/topographic";
import { searchAddress, updateSuggestions } from "../map/search";
import data from "../hust/data.json";
import { MapContext } from "../contexts/tabnamecontext";
import { showLocationDetail } from "../map/showinformation";
// import { findway } from '../map/findway';
interface PropsMap {
  findway?: any;

}

const MapNew: React.FC<PropsMap> = ({
  findway,

}) => {

  const { isList, setIsList } = useContext(MapContext)!;
  const { isMap, setIsMap } = useContext(MapContext)!;
  const { isClickImage, setIsClickImage } = useContext(MapContext)!;
  const { isClose, setIsClose } = useContext(MapContext)!;
  const {isNavigation, setIsNavigation} = useContext(MapContext)!; 
  const { isSearch, setIsSearch } = useContext(MapContext)!;
  const {isCoordinate, setIsCoordinate} = useContext(MapContext)!; 
  const {isMarker, setIsMarker} = useContext(MapContext)!; 

  function showPopup(map: Map, marker: Marker){
    for (const feature of data.features) {
      const popup = new maplibregl.Popup({
        closeButton: false,
        closeOnClick: false,
      });
  
      const container = document.createElement("div");
      const name = feature.properties.name as any;
      const coordinate = feature.geometry.coordinates as any;
      const nameElement = document.createElement("p");
      nameElement.className = "name_popup";
      nameElement.textContent = name;
  
      container.appendChild(nameElement);
  
      popup
        .setLngLat(feature.geometry.coordinates as maplibregl.LngLatLike)
        .setDOMContent(container)
        .addTo(map);
  
        container.addEventListener('click', () => {
  
        setIsMap(true);
        setIsClose(false);
        setIsNavigation(true);
        setIsClickImage(name);
        showLocationDetail(feature);
  
        const lngLat = feature.geometry.coordinates as LngLatLike;
        marker.setLngLat(lngLat);
        map.setCenter(lngLat);
        map.setZoom(18);
      })
    }
  }


  useEffect(() => {
    const map = createMap();
    setIsCoordinate(map);

    overMap(map);

    const marker = new maplibregl.Marker({
      color: "blue",
      draggable: true,
      anchor: "top",
    })
    .setLngLat([105.84312136793108, 21.00652348079494])
    .addTo(map);

    setIsMarker(marker);

    map.on("load", () => {
      searchAddress(map, marker);
      const searchInput = document.getElementById("search__address") as HTMLInputElement;
      if (searchInput) {
        searchInput.addEventListener("input", () => {
          const searchText = searchInput.value;
          const suggestions = data.features.filter(function (feature) {
            return feature.properties.name
              .toLowerCase()
              .includes(searchText.toLowerCase());
          });
          updateSuggestions(suggestions, map, marker);
        });
      }
    });

    var nav = new maplibregl.NavigationControl({
      showCompass: false, // hide the compass button
      showZoom: true, // show the zoom buttons
    });
    map.addControl(nav, "bottom-right");

    if (findway) {
      findway(map);
    }

    showPopup(map,marker);


    return () => map.remove();
  }, []);

  return <div></div>;
};

export default MapNew;
