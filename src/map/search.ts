import maplibregl, { Map, Marker } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import data from '../hust/data.json';
import { showLocationDetail } from './showinformation';


export function updateSuggestions(suggestions: any[], map: Map) {
    const searchInput = document.getElementById('search__address') as HTMLInputElement;
    const suggestionsList = document.getElementById('suggestions-list') as HTMLSelectElement;
    const searchText = searchInput.value.trim();
    suggestionsList.innerHTML = '';
    
    if (searchText === '') {
        suggestionsList.style.display = 'none';
        return;
    }           
    function getBounds(features: any[]) {
      const bounds = new maplibregl.LngLatBounds();
      features.forEach((feature: any) => {
        bounds.extend(feature.geometry.coordinates);
      });
      return bounds;
    } 
    suggestions.forEach(function(suggestion) {
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = '../images/mark.png';
        li.textContent = suggestion.properties.name;
        li.prepend(img); 
        li.addEventListener('click', function() {
            const lngLat= suggestion.geometry.coordinates;
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