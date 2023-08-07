import maplibregl, { Map, Marker } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import data from '../hust/data.json';
import { showLocationDetail } from './showinformation';



export function updateSuggestions(suggestions: any[], map: any) {
  const searchInput = document.getElementById('search__address') as HTMLInputElement;
  const suggestionsList = document.getElementById('ul_list_address') as HTMLUListElement;

  const searchText = searchInput.value.trim();
  suggestionsList.innerHTML = '';

  if (searchText === '') {
      suggestionsList.style.display = 'none';
      return;
  }

  function getBounds(features: any[]) {
      const bounds = new maplibregl.LngLatBounds();
      features.forEach((feature) => {
          bounds.extend(feature.geometry.coordinates);
      });
      return bounds;
  }

  suggestions.forEach(function (suggestion) {
      const li = document.createElement('li');
      const img = document.createElement('img');
      img.src = suggestion.properties.image_url_2;
      const div = document.createElement('div');
      const p = document.createElement('p');
      p.textContent = suggestion.properties.name;
      const span = document.createElement('span');
      span.textContent = suggestion.properties.height;

      div.appendChild(p);
      div.appendChild(span);

      li.appendChild(img);
      li.appendChild(div);

      li.addEventListener('click', function () {
          const lngLat = suggestion.geometry.coordinates;
          map.setCenter(lngLat);
          map.setZoom(18);
          map.fitBounds(getBounds(suggestions), {
              padding: 50
          });
          showLocationDetail(suggestion);
      });

      suggestionsList.appendChild(li);
  });

  suggestionsList.style.display = 'block';
}


export function searchAddress(map: Map){
  const searchInput = document.getElementById('search__address') as HTMLInputElement;
  searchInput.addEventListener('change', () => {
    const searchText = searchInput.value;
    const allAddress = data.features.filter((feature: any) => {
      return feature.properties.name.toLowerCase().includes(searchText.toLowerCase());
    });

    function getBounds(features: any[]) {
      const bounds = new maplibregl.LngLatBounds();
      features.forEach((feature: any) => {
        bounds.extend(feature.geometry.coordinates);
      });
      return bounds;
    }

    if (allAddress.length > 0) {
      const firstAddress = allAddress[0];
      const lngLat: [number, number] = firstAddress.geometry.coordinates as [number, number];
      map.setCenter(lngLat);
      map.setZoom(18);
      map.fitBounds(getBounds(allAddress), {
        padding: 50
      });
      
      showLocationDetail(firstAddress);
    }
  });
}