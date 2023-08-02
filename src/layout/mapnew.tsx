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

}

const MapNew: React.FC<PropsMap> = ({
  
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

  function markerImage(map: maplibregl.Map) {
    const markerImageList: { marker: maplibregl.Marker; feature: any }[] = [];
    let currentMarker: maplibregl.Marker | null = null;
    let currentPopup: maplibregl.Popup | null = null; 

    for (const feature of data.features) {
      const el = document.createElement("div");
      el.className = "marker";
  
      const img = document.createElement("img");
      img.src = feature.properties.image_url_1;
      img.className = "marker-image";
      img.style.cursor = "pointer";
      img.style.width = feature.properties.iconSize[0] + "px";
      img.style.height = feature.properties.iconSize[1] + "px";
  
      el.appendChild(img);
  
      const marker = new maplibregl.Marker(el)
        .setLngLat(feature.geometry.coordinates as maplibregl.LngLatLike)
        .addTo(map);
  
      markerImageList.push({ marker, feature });
      img.addEventListener("click", createMarkerClickHandler);
  
    }
    const marker = new maplibregl.Marker({
      color: "blue",
      draggable: true,
      anchor: "top",
    })
    .setLngLat([105.84312136793108, 21.00652348079494])
    .addTo(map);
  
    function createMarkerClickHandler(event: Event) {
      const imgElement = event.target as HTMLImageElement;
      const clickedMarker = markerImageList.find(item => item.marker.getElement().contains(imgElement));
  
      if (clickedMarker) {
        if (currentMarker) {
          const currentImgElement = currentMarker.getElement().querySelector("img");
          if (currentImgElement) {
            currentImgElement.style.display = "block";
          }
        }
  
        const clickedImgElement = clickedMarker.marker.getElement().querySelector("img");
        if (clickedImgElement) {
          clickedImgElement.style.display = "none";
        }

        if (currentPopup) {
          currentPopup.remove();
        } 
        currentMarker = clickedMarker.marker;

        setIsMap(true);
        setIsClose(false);
        setIsNavigation(true);
        setIsClickImage(clickedMarker.feature.properties.name);
        showLocationDetail(clickedMarker.feature);

        const lngLat = clickedMarker.feature.geometry.coordinates;
        marker.setLngLat(lngLat);
        map.setCenter(lngLat);
        map.setZoom(18);

        const popup = new maplibregl.Popup({
          closeButton: false,
          closeOnClick: false,
        });
    
        const container = document.createElement("div");
        const name = clickedMarker.feature.properties.name as any;
        const coordinate = clickedMarker.feature.geometry.coordinates as any;
        const nameElement = document.createElement("p");
        nameElement.className = "name_popup";
        nameElement.textContent = name;
    
        container.appendChild(nameElement);
    
        popup
          .setLngLat(clickedMarker.feature.geometry.coordinates as maplibregl.LngLatLike)
          .setDOMContent(container)
          .addTo(map);
    
          container.addEventListener('click', () => {
    
          setIsMap(true);
          setIsClose(false);
          setIsNavigation(true);
          setIsClickImage(name);
          showLocationDetail(clickedMarker.feature);
    
          const lngLat = clickedMarker.feature.geometry.coordinates as LngLatLike;
          marker.setLngLat(lngLat);
          map.setCenter(lngLat);
          map.setZoom(18);
        })

        currentPopup = popup;
      }
    }
  
    return marker;
  }
  
  useEffect(() => {
    const map = createMap();
    setIsCoordinate(map);

    overMap(map);

    const marker = markerImage(map);
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
    map.addControl(nav, "top-right");

    //showPopup(map,marker);

    //rotate map
    function rotateMapContinuously(map: Map, angle: any, rotationSpeed: number) {
      map.rotateTo(angle, {});
      let stopRotation = false;
    
      function rotateCallback() {
        if (stopRotation) return;
        angle += rotationSpeed;
        map.rotateTo(angle, {});
        requestAnimationFrame(rotateCallback);
      }
    
      map.once('click', () => {
        stopRotation = true; // Dừng việc xoay khi click vào bản đồ
      });
    
      requestAnimationFrame(rotateCallback);
    }
    
    map.once('load', function () {
      const rotationSpeed = 0.05;
      rotateMapContinuously(map, 0, rotationSpeed);
    });
    

    return () => map.remove();
  }, []);

  return <div></div>;
};

export default MapNew;
