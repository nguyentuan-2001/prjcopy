import maplibregl, { Map, Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import data from "../hust/data.json";
import { showLocationDetail } from "./showinformation";

export function markerImage(map: maplibregl.Map) {
  const markerImageList: { marker: maplibregl.Marker; feature: any }[] = [];
  let currentMarker: maplibregl.Marker | null = null;

  for (const feature of data.features) {
    const el = document.createElement("div");
    el.className = "marker";

    const img = document.createElement("img");
    img.src = feature.properties.image_url_2;
    img.className = "marker-image";
    img.style.cursor = "pointer";
    img.style.width = feature.properties.iconSize[0] + "px";
    img.style.height = feature.properties.iconSize[1] + "px";

    el.appendChild(img);

    const marker = new maplibregl.Marker(el)
      .setLngLat(feature.geometry.coordinates as maplibregl.LngLatLike)
      .addTo(map);

      const popup = new maplibregl.Popup({
        closeButton: false,
        closeOnClick: false
        });
    //Show popup name
    img.addEventListener("mouseenter", () => {
      map.getCanvas().style.cursor = "pointer";    
      // Tạo phần tử container
      const container = document.createElement("div");
      container.style.borderRadius = "10px";
      container.style.width = "200px";

      // Tạo phần tử hình ảnh
      const image = document.createElement("img");
      image.src = feature.properties.image_url_2;
      image.alt = "Image";
      image.className= "image_popup"
      container.appendChild(image);
      
      // Tạo phần tử mô tả và thiết lập nội dung
      const name = feature.properties.name;
      const nameElement = document.createElement("p");
      nameElement.className= "name_popup"
      nameElement.textContent = name;
      container.appendChild(nameElement);

      popup.setLngLat(feature.geometry.coordinates as maplibregl.LngLatLike)
        .setDOMContent(container)
        .addTo(map);
    });
    
    img.addEventListener("mouseleave", () => {
      map.getCanvas().style.cursor = "";
      popup.remove();
    });
    

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

  let isFirstClick = true;

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

      showLocationDetail(clickedMarker.feature);
      const lngLat = clickedMarker.feature.geometry.coordinates;
      marker.setLngLat(lngLat);
      map.setCenter(lngLat);
      map.setZoom(18);

    }
  }

  return marker;
}
