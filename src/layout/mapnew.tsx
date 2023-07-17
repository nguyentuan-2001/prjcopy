import React, { useContext, useEffect, useState } from "react";
import maplibregl, { LngLatLike, Map, Marker } from "maplibre-gl";
import '../components/component.css'
import 'maplibre-gl/dist/maplibre-gl.css';
import { createMap } from "../map/mapnew";
import overMap from "../map/topographic";

import { searchAddress, updateSuggestions } from "../map/search";
import data from "../hust/data.json";
import { MapContext } from "../contexts/tabnamecontext";
import { navigateRight, showAddress, showLocationDetail } from "../map/showinformation";
// import { findway } from '../map/findway';
interface PropsMap {
    findway?: any,
    danhmuc?: any
}

  
const MapNew: React.FC<PropsMap> = ({
    findway,
    danhmuc,
}) => {
    const { isList, setIsList } = useContext(MapContext)!;
    const { isMap, setIsMap } = useContext(MapContext)!;
    const { isSearch, setIsSearch } = useContext(MapContext)!;
    const {isNavigation, setIsNavigation} = useContext(MapContext)!;
    const {isClickImage,setIiClickImage} = useContext(MapContext)!; 
    const {isClose, setIsClose} = useContext(MapContext)!; 

    function getBounds(coordinates: maplibregl.LngLatLike) {
        const bounds = new maplibregl.LngLatBounds();
        bounds.extend(coordinates);
        return bounds;
    }

    function showOptions(map: Map, marker: Marker, type: string, containerSelector: string) {
        const listElement = document.querySelector(containerSelector);
        const showNameElement = document.getElementById('show__name');
      
        if (listElement && showNameElement) {
          // Xóa nội dung hiện tại của listElement
          listElement.innerHTML = '';
      
          // Tạo và gán giá trị cho các phần tử <li>
          data.features.forEach((feature, index) => {
            const featureType = feature.properties.type;
            const name = feature.properties.name;
            const coordinates: maplibregl.LngLatLike = feature.geometry.coordinates as maplibregl.LngLatLike;
      
            if (featureType !== type) {
              return; // Không hiển thị phần tử không thuộc type
            }
      
            const listItem = document.createElement('li');
            listItem.className = 'li-tabname';
            listItem.innerHTML = `
              <span>${index + 1}</span>
              <img src="../images/union.png" alt="" />
              <p>${name}</p>
            `;
      
            listItem.addEventListener('click', () => {
                console.log(coordinates);
                
              marker.setLngLat(coordinates);
              map.setCenter(coordinates);
              map.setZoom(18);
              map.fitBounds(getBounds(coordinates), {
                padding: 100
              });
              setIsList(true);
              setIsMap(true);
            });
      
            listElement.appendChild(listItem);
          });
        }
      }
      
      
    function showKhoa(map: Map, marker: Marker) {
        showOptions(map, marker, 'classroom', '.ul__union_khoa');
    }
    function showVien(map: Map, marker: Marker) {
        showOptions(map, marker, 'hall', '.ul__union_vien');
    }
      
    function danhmuc1(map: Map, marker: Marker){
        showKhoa(map, marker);
        showVien(map, marker);
    }

    function markerImage(map: maplibregl.Map) {
        const markerImageList: { marker: maplibregl.Marker; feature: any }[] = [];
        let currentMarker: maplibregl.Marker | null = null;
      
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
      
            currentMarker = clickedMarker.marker;
            setIsClose(false);
            setIiClickImage(clickedMarker.feature.properties.name)
            showLocationDetail(clickedMarker.feature);
            const lngLat = clickedMarker.feature.geometry.coordinates;
            marker.setLngLat(lngLat);
            map.setCenter(lngLat);
            map.setZoom(18);
          }
        }
      
      
        return marker;
    }

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

            
        var nav = new maplibregl.NavigationControl({
        showCompass: false, // hide the compass button
        showZoom: true // show the zoom buttons
        });
        map.addControl(nav, 'bottom-right');

        if(findway){
            findway(map);
        }
        if(danhmuc){
            danhmuc(map,marker);
        }
        //danhmuc1(map,marker);

        
    return () => map.remove();
    }, []);
    
    return (
        <div></div>
    )
}

export default MapNew



  