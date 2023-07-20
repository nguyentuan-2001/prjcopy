import React, { useContext, useEffect, useState } from "react";
import maplibregl, { LngLatLike, Map, Marker } from "maplibre-gl";
import '../components/component.css'
import 'maplibre-gl/dist/maplibre-gl.css';
import { createMap } from "../map/mapnew";
import overMap from "../map/topographic";

import { searchAddress, updateSuggestions } from "../map/search";
import data from "../hust/data.json";
import { MapContext } from "../contexts/tabnamecontext";
import { navigateRight, showLocationDetail } from "../map/showinformation";
// import { findway } from '../map/findway';
interface PropsMap {
    findway?: any,
    //showAddress?: any
}

  
const MapNew: React.FC<PropsMap> = ({
    findway,
    //showAddress,
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

    
    function showAddress(map: Map, marker: Marker ,array = []) {
      const options = data.features.map(feature => feature.properties.name);
      const myElement = document.getElementById("ul__union") as HTMLUListElement;
      if (myElement) {
        // Xóa các phần tử <li> cũ
        while (myElement.firstChild) {
          myElement.firstChild.remove();
        }
        // Tạo danh sách các phần tử <li>
        const listItems = options.map((name, index) => {
          const listItem = document.createElement("li");
          listItem.textContent = name;
          listItem.style.display = "none";
          listItem.innerHTML = 
          ` 
            <img src="../images/union.png" alt="" />
            <p>${name}</p>
          `;
          // <span>${index + 1}</span>
          return listItem;
        });
    
        // Add li in list
        listItems.forEach(item => {
          myElement.appendChild(item);
        });
    
        const handleButtonClick = (type: string) => {
          listItems.forEach((item, index) => {
            const datas = data.features[index];
            if (datas.properties.type === type) {
              item.style.display = "flex"; // Hiển thị phần tử tương ứng với loại được nhấp vào
            } else {
              item.style.display = "none"; // Ẩn các phần tử không phù hợp
            }
          });
        };
        handleButtonClick("hall");
        document.getElementById("nav-khoa-tab")?.addEventListener("click", () => {
          handleButtonClick(array[0]);
        });
    
        document.getElementById("nav-vien-tab")?.addEventListener("click", () => {
          handleButtonClick(array[1]);
        });
    
        document.getElementById("nav-phong-tab")?.addEventListener("click", () => {
          handleButtonClick(array[2]);
        });
        document.getElementById("nav-thuvien-tab")?.addEventListener("click", () => {
          handleButtonClick(array[3]);
        });
    
        document.getElementById("nav-cuahang-tab")?.addEventListener("click", () => {
          handleButtonClick(array[4]);
        });
    
      //   // Xử lý sự kiện click cho từng phần tử
        listItems.forEach((item, index) => {
          const datas = data.features[index];
          const coordinates: maplibregl.LngLatLike = datas.geometry.coordinates as maplibregl.LngLatLike;
    
          item.addEventListener("click", () => {
            setIsList(true);
            setIsMap(true);
            marker.setLngLat(coordinates);
            map.setCenter(coordinates);
            map.setZoom(18);
            map.fitBounds(getBounds(coordinates), {
              padding: 100
            });
          });
        });
      }
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

            map.on('zoom', function() {
            const currentZoom = map.getZoom();
            const elms = document.querySelectorAll(".maplibregl-popup-content") as NodeListOf<HTMLElement>;
            const popups = document.querySelectorAll(".maplibregl-popup-anchor-bottom") as NodeListOf<HTMLElement>;
            
            popups.forEach((popup) => {
              if (currentZoom <15.8) {
                popup.style.opacity = '0';
              } else{
                popup.style.opacity = '1';
              }
            });
            elms.forEach((elm) => {
              if (currentZoom < 16) {
                elm.style.fontSize = '3px';
              }else if (currentZoom > 16 && currentZoom < 17) {
                elm.style.fontSize = '6px';
              }else if (currentZoom > 17 && currentZoom<18) {
                elm.style.fontSize = '12px';
              }else if (currentZoom > 18) {
                elm.style.fontSize = '15px';
              }
            });
          });
        });

            
        var nav = new maplibregl.NavigationControl({
        showCompass: false, // hide the compass button
        showZoom: true // show the zoom buttons
        });
        map.addControl(nav, 'bottom-right');

        if(findway){
            findway(map);
        }
        const array = [ 'hall', 'classroom', 'quan', 'library' ] as any;
        // if(showAddress){
        //   showAddress(map,marker,array);
        // }


        showAddress(map,marker,array); 

        for (const feature of data.features){
          const popup = new maplibregl.Popup({
            closeButton: false,
            closeOnClick: false
            });
    
          const container = document.createElement("div");
;
          const name = feature.properties.name;
          const nameElement = document.createElement("p");
          nameElement.className= "name_popup"
          nameElement.textContent = name;

          container.appendChild(nameElement);
          
          popup.setLngLat(feature.geometry.coordinates as maplibregl.LngLatLike)
            .setDOMContent(container)
            .addTo(map);
        }

        
    return () => map.remove();
    }, []);
    
    return (
        <div></div>
    )
}

export default MapNew



  