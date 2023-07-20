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
  findway
}) => {

  const { isList, setIsList } = useContext(MapContext)!;
  const { isMap, setIsMap } = useContext(MapContext)!;
  const { isClickImage, setIiClickImage } = useContext(MapContext)!;
  const { isClose, setIsClose } = useContext(MapContext)!;

  function getBounds(coordinates: maplibregl.LngLatLike) {
    const bounds = new maplibregl.LngLatBounds();
    bounds.extend(coordinates);
    return bounds;
  }

  function showAddress(map: Map, marker: Marker, array = []) {
    const options = data.features.map((feature) => feature.properties.name);
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
        listItem.innerHTML = ` 
            <img src="../images/union.png" alt="" />
            <p>${name}</p>
          `;
        // <span>${index + 1}</span>
        return listItem;
      });

      // Add li in list
      listItems.forEach((item) => {
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

      document
        .getElementById("nav-phong-tab")
        ?.addEventListener("click", () => {
          handleButtonClick(array[2]);
        });
      document
        .getElementById("nav-thuvien-tab")
        ?.addEventListener("click", () => {
          handleButtonClick(array[3]);
        });

      document
        .getElementById("nav-cuahang-tab")
        ?.addEventListener("click", () => {
          handleButtonClick(array[4]);
        });

      // Xử lý sự kiện click cho từng phần tử
      listItems.forEach((item, index) => {
        const datas = data.features[index];
        const coordinates: maplibregl.LngLatLike = datas.geometry.coordinates as maplibregl.LngLatLike;
        item.addEventListener("click", () => {
          setIsList(true);
          setIsMap(true);
          setIsClose(false);
          showLocationDetail(datas);
        
          marker.setLngLat(coordinates);
          map.setCenter(coordinates);
          map.setZoom(18);
          map.fitBounds(getBounds(coordinates), {
            padding: 100,
          });
        });
      });
    }
  }

  function showPopup(map: Map, marker: Marker){
    for (const feature of data.features) {
      const popup = new maplibregl.Popup({
        closeButton: false,
        closeOnClick: false,
      });
  
      const container = document.createElement("div");
      const name = feature.properties.name as any;
      const nameElement = document.createElement("p");
      nameElement.className = "name_popup";
      nameElement.textContent = name;
  
      container.appendChild(nameElement);
  
      popup
        .setLngLat(feature.geometry.coordinates as maplibregl.LngLatLike)
        .setDOMContent(container)
        .addTo(map);
  
        container.addEventListener('click', () => {
  
        setIsClose(false);
        setIiClickImage(name);
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
    overMap(map);
    const marker = new maplibregl.Marker({
      color: "blue",
      draggable: true,
      anchor: "top",
    })
    .setLngLat([105.84312136793108, 21.00652348079494])
    .addTo(map);

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
    const array = ["hall", "classroom", "quan", "library"] as any;
    // if(showAddress){
    //   showAddress(map,marker,array);
    // }

    showAddress(map, marker, array);
    showPopup(map,marker);
    

    return () => map.remove();
  }, []);

  return <div></div>;
};

export default MapNew;
