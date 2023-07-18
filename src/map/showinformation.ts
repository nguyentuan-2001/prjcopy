import maplibregl, { Map, Marker } from "maplibre-gl";
import data from "../hust/data.json";

export function showLocationDetail(location: any) {
    const name = location.properties.name;
    const listul = document.getElementById("listul") as HTMLDivElement;
    if (listul) {
      listul.innerHTML = name;
    }
  
    const img = location.properties.image_url_2;
    const imgAddress = document.getElementById("img-address") as HTMLImageElement;
    if (imgAddress) {
      imgAddress.src = img;
    }
  
    const desc = location.properties.desc;
    const accordionex = document.getElementById("accordionex") as HTMLDivElement;
    if (accordionex) {
      accordionex.innerHTML = desc;
    }
    
    navigateRight(location);
    openRightPanel();
  }

  let isListOpen = false;
export function openRightPanel() {
    const elm = document.querySelector<HTMLElement>(".wrapper .right-panel");
    if (!isListOpen && elm) {
      elm.style.transform = "translateX(0%)";
    }
    const close = document.querySelector<HTMLElement>(".wrapper .left-panel");
    if (close) {
      close.style.transform = "translateY(200%)";
      close.style.transition = "0.5s ease";
    }
    const closeSearch = document.querySelector<HTMLElement>(".wrapper .div__search");
    if (closeSearch) {
      closeSearch.style.opacity = "0";
    }
  }

export  function closeRightPanel() {
  document.getElementById('closeRight')?.addEventListener('click', function() {
    const elm = document.querySelector<HTMLElement>(".wrapper .right-panel");
    if (elm) {
      elm.style.transform = "translateX(-100%)";
    }
    const close = document.querySelector<HTMLElement>(".wrapper .left-panel");
    if (close) {
      close.style.transform = "translateY(0%)";
      close.style.transition = "0.8s ease";
    }
    const closeSearch = document.querySelector<HTMLElement>(".wrapper .div__search");
    if (closeSearch) {
      closeSearch.style.opacity = "1";
    }
  });
}

export function showList(){
  openList();
  closeList();
}
function openList(){
  document.getElementById("list")?.addEventListener("click", function () {
    const elm = document.querySelector<HTMLElement>(".wrapper .list-left");
    if (elm) {
      setTimeout(function () {
        elm.style.transform = "translateX(0%)";
      }, 250);
    }
    const close = document.querySelector<HTMLElement>(".wrapper .left-panel");
    if (close) {
      close.style.transform = "translateY(200%)";
      close.style.transition = "0.5s ease";
    }
    const closeSearch = document.querySelector<HTMLElement>(".wrapper .div__search");
    if (closeSearch) {
      closeSearch.style.opacity = "0";
    }
    isListOpen = true;
  });
}
function closeList(){
  document.getElementById("closeLeft")?.addEventListener("click", function () {
    const elm = document.querySelector<HTMLElement>(".wrapper .list-left");
    if (elm) {
      elm.style.transform = "translateX(-100%)";
    }
    const close = document.querySelector<HTMLElement>(".wrapper .left-panel");
    if (close) {
      close.style.transform = "translateY(0%)";
      close.style.transition = "0.8s ease";
    }
    const closeSearch = document.querySelector<HTMLElement>(".wrapper .div__search");
    if (closeSearch) {
      closeSearch.style.opacity = "1";
    }

    const showIfLength = document.getElementById('if-length') as HTMLElement;
    showIfLength.style.display = "none";

    isListOpen = false;
  });
}

// hiệu ứng zoom 
function getBounds(coordinates: maplibregl.LngLatLike) {
  const bounds = new maplibregl.LngLatBounds();
  bounds.extend(coordinates);
  return bounds;
}

export function showAddress(map: Map, marker: Marker) {
  const options = data.features.map(feature => feature.properties.name);
  const myElement = document.getElementById("listAddress") as HTMLUListElement;
  if (myElement) {
    // Xóa các phần tử <li> cũ
    while (myElement.firstChild) {
      myElement.firstChild.remove();
    }
    
    // Tạo danh sách các phần tử <li>
    const listItems = options.map(name => {
      const listItem = document.createElement("li");
      listItem.textContent = name;
      return listItem;
    });
    
    // Add li in list
    listItems.forEach(item => myElement.appendChild(item));

    listItems.forEach((item, index) => {
      const datas = data.features[index];
      const coordinates:maplibregl.LngLatLike = datas.geometry.coordinates as maplibregl.LngLatLike;
       
      item.addEventListener("click", () => {
        marker.setLngLat(coordinates);
          map.setCenter(coordinates);
          map.setZoom(18);
          map.fitBounds(getBounds(coordinates), {
            padding: 100
          });
      });
    });
    
    document.getElementById("library_item")?.addEventListener("change", function () {
      listItems.forEach((item, index) => {
        const datas = data.features[index];
        if (datas.properties.type === "library") {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
    document.getElementById("classroom_item")?.addEventListener("change", function () {
      listItems.forEach((item, index) => {
        const datas = data.features[index];
        if (datas.properties.type === "classroom") {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
    document.getElementById("hall_item")?.addEventListener("change", function () {
      listItems.forEach((item, index) => {
        const datas = data.features[index];
        if (datas.properties.type === "hall") {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
    document.getElementById("all_item")?.addEventListener("change", function () {
      listItems.forEach((item) => {
        item.style.display = "block";
      });
    });
  }
}

function navigateRight(location: any){
  document.getElementById("navigate_image")?.addEventListener("click", function () {
    const startStreetSelect = document.getElementById("start-street") as HTMLSelectElement;
    startStreetSelect.value = location.properties.name;  

    const elm = document.querySelector<HTMLElement>(".wrapper .right-panel");
    if (elm) {
      elm.style.transform = "translateX(-100%)";
    }
    const elme = document.querySelector<HTMLElement>(".wrapper .list-left");
    if (elme) {
      setTimeout(function () {
        elme.style.transform = "translateX(0%)";
      }, 250);
    }
    const close = document.querySelector<HTMLElement>(".wrapper .left-panel");
    if (close) {
      close.style.transform = "translateY(200%)";
      close.style.transition = "0.5s ease";
    }
    const closeSearch = document.querySelector<HTMLElement>(".wrapper .div__search");
    if (closeSearch) {
      closeSearch.style.opacity = "0";
    }
    isListOpen = true;
  });
}