import maplibregl, { Map, Marker } from "maplibre-gl";
import data from "../hust/data.json";
import { useContext } from "react";
import { MapContext } from "../contexts/tabnamecontext";


export function showLocationDetail(location: any) {
    const name = location.properties.name;
    const name_top = document.getElementById("name_address_top") as HTMLDivElement;
    if (name_top) {
      name_top.innerHTML = name;
    }

    const listul = document.getElementById("name__address") as HTMLDivElement;
    if (listul) {
      listul.innerHTML = name;
    }
  
    const img = location.properties.image_url_2;
    const imgAddress = document.getElementById("img-address") as HTMLImageElement;
    if (imgAddress) {
      imgAddress.src = img;
    }

    const desc = location.properties.desc;
    const description = document.getElementById("description") as HTMLImageElement;
    if (description) {
      description.innerHTML = desc;
    }
  }

export function openRightPanel() {
    const elm = document.getElementById("detail") as HTMLDivElement;
    if ( elm) {
      elm.style.transform = "translateX(0%)";
    }
  }

export function navigateRight(location: any){
  document.getElementById("navigate")?.addEventListener("click", function () {
    const startStreetSelect = document.getElementById("start-street") as HTMLSelectElement;
    startStreetSelect.value = location.properties.name;  

    const elm = document.getElementById('navigation');
    if (elm) {
      elm.style.transform = "translateX(0%)";
    }
    const elme = document.getElementById('detail');
    if (elme) {
      elme.style.transform = "translateX(-200%)";
    }
  });
}

// hiệu ứng zoom 
function getBounds(coordinates: maplibregl.LngLatLike) {
  const bounds = new maplibregl.LngLatBounds();
  bounds.extend(coordinates);
  return bounds;
}

// export function danhmuc(map: Map, marker: Marker){
//   showKhoa(map, marker);
//   showVien(map, marker);
// }


function showOptions(map: Map, marker: Marker, type: string, containerSelector: string) {
  const classroomFeatures = data.features.filter(feature => feature.properties.type === type);
  const options = classroomFeatures.map(feature => feature.properties.name);
  const listElement = document.querySelector(containerSelector);
  const showNameElement = document.getElementById('show__name');

  if (listElement && showNameElement) {
    // Xóa nội dung hiện tại của listElement
    listElement.innerHTML = '';

    // Tạo và gán giá trị cho các phần tử <li>
    options.forEach((name, index) => {
      const listItem = document.createElement('li');
      listItem.className = 'li-tabname'
      listItem.innerHTML = `
        <span>${index + 1}</span>
        <img src="../images/union.png" alt="" />
        <p>${name}</p>
      `;

      listItem.addEventListener('click', (event) => {
        const target = event.currentTarget as HTMLLIElement;
        const datas = data.features[index];
        const coordinates: maplibregl.LngLatLike = datas.geometry.coordinates as maplibregl.LngLatLike;

        marker.setLngLat(coordinates);
        map.setCenter(coordinates);
        map.setZoom(18);
        map.fitBounds(getBounds(coordinates), {
          padding: 100
        });
      });

      listElement.appendChild(listItem);
    });
    listElement.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.matches('.li-tabname')) {
        showNameElement.style.transform = "translateX(-200%)";
      }
    });
  }
}

function showKhoa(map: Map, marker: Marker) {
  showOptions(map, marker, 'classroom', '.ul__union_khoa');
}
function showVien(map: Map, marker: Marker) {
  showOptions(map, marker, 'hall', '.ul__union_vien');
}



export function showAddress(map: Map, marker: Marker) {
  const options = data.features.map(feature => feature.properties.name);
  const myElement = document.getElementById("ul__union_vien") as HTMLUListElement;
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
   
    listItems.forEach((item, index) => {
      const datas = data.features[index];
      if (datas.properties.type === "classroom") {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }
}