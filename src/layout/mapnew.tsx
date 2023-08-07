import React, { useContext, useEffect, useState } from "react";
import maplibregl, { LngLatLike, Map, Marker } from "maplibre-gl";
import "../css/component.css";
import "maplibre-gl/dist/maplibre-gl.css";
import overMap from "../map/topographic";
import { searchAddress, updateSuggestions } from "../map/search";
import data from "../hust/data.json";
import { MapContext } from "../contexts/tabnamecontext";
import { showLocationDetail } from "../map/showinformation";
import nha from '../hust/nha.json';

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
  const {isSwitchOn, setIsSwitchOn} = useContext(MapContext)!;
  const {isHover, setIsHover} = useContext(MapContext)!;

  const maptiler = 'https://api.maptiler.com/maps/fefc1891-4e0d-4102-a51f-09768f839b85/style.json?key=S1qTEATai9KydkenOF6W';
  const green: any = {
    version: 8,
    name: 'Empty',
    metadata: {
      'mapbox:autocomposite': true,
    },
    glyphs: 'https://api.maptiler.com/fonts/{fontstack}/{range}.pbf?key=S1qTEATai9KydkenOF6W',
    sources: {},
    layers: [
      {
        id: 'background',
        type: 'background',
        paint: {
          'background-color': '#c4daab',
        },
      },
    ],
  }
  const [currentStyle, setCurrentStyle] = useState<any>(green);
  
  useEffect(() => {
    const map = new maplibregl.Map({
      container: 'map', 
      style: currentStyle, 
      center: [105.843484, 21.005532],
      zoom: 17,
      maxZoom: 18.5,
      minZoom: 15.5,
      hash: 'map',
      pitch: 60,
      maxPitch: 70,
      antialias: true
    });
     
    setIsCoordinate(map);

    overMap(map);

    map.on("load", () => {
      
      if(isSwitchOn === true){
        setCurrentStyle(maptiler)
      }else{
        setCurrentStyle(green)
      }

      searchAddress(map);
      const searchInput = document.getElementById("search__address") as HTMLInputElement;
      if (searchInput) {
        searchInput.addEventListener("input", () => {
          const searchText = searchInput.value;
          const suggestions = data.features.filter(function (feature) {
            return feature.properties.name
              .toLowerCase()
              .includes(searchText.toLowerCase());
          });
          updateSuggestions(suggestions, map);
        });
      }
    });

    var nav = new maplibregl.NavigationControl({
      showCompass: false, // hide the compass button
      showZoom: true, // show the zoom buttons
    });
    map.addControl(nav, "bottom-right");

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
    
    // map.once('load', function () {
    //   const rotationSpeed = 0.05;
    //   rotateMapContinuously(map, 0, rotationSpeed);
    // });


    let clickedBuildingId: any = null;

    nha.features.forEach((feature: any) => {
      const buildingId = feature.properties.osm_id;

      map.on('mousemove', `3d-building-${buildingId}`, (e) => {
        // Kiểm tra xem tòa nhà đã được click hay chưa trước khi cập nhật màu khi hover
        if (buildingId !== clickedBuildingId) {
          map.setPaintProperty(`3d-building-${buildingId}`, 'fill-extrusion-color', '#749BC2');
        }
      });
      map.on('mouseleave', `3d-building-${buildingId}`, (e) => {
        // Kiểm tra xem tòa nhà đã được click hay chưa trước khi đặt lại màu khi hover-out
        if (buildingId !== clickedBuildingId) {
          map.setPaintProperty(`3d-building-${buildingId}`, 'fill-extrusion-color', '#FFFFFF');
        }
      });
    });

    const checkIds = (clickedFeature: any, data: any) => {
      const clickedId = clickedFeature.properties.osm_id;
      setIsHover(clickedId)

      const matchingFeature = data.features.find((feature: any) => feature.properties.id === clickedId);

      if (matchingFeature) {
        // Nếu clickedBuildingId đã được đặt, đặt lại màu sắc của tòa nhà cũ về màu trắng
        if (clickedBuildingId) {
          map.setPaintProperty(`3d-building-${clickedBuildingId}`, 'fill-extrusion-color', '#FFFFFF');
        }

        const coordinates = matchingFeature.geometry.coordinates;
        const name = matchingFeature.properties.name;
        setIsMap(true);
        setIsClose(false);
        setIsNavigation(true);
        setIsClickImage(name);
        showLocationDetail(matchingFeature);
        map.setCenter(coordinates);
        map.setZoom(18);

        // Cập nhật biến clickedBuildingId với ID của tòa nhà được click
        clickedBuildingId = clickedId;
        map.setPaintProperty(`3d-building-${clickedBuildingId}`, 'fill-extrusion-color', '#749BC2');
      }
    };

    map.on('click', (e) => {
      const features = map.queryRenderedFeatures(e.point, { layers: nha.features.map((feature: any) => `3d-building-${feature.properties.osm_id}`) });
      features.forEach((feature) => {
        checkIds(feature, data);
      });
    });

    return () => map.remove();
  }, [isSwitchOn]);


  return <div></div>;
};

export default MapNew;
