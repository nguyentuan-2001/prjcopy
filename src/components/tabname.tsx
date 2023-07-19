import React, { useContext, useEffect, useState } from 'react';
import './component.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import maplibregl, { Map, Marker } from "maplibre-gl";
import data from "../hust/data.json";
import { MapContext } from '../contexts/tabnamecontext';
import { createMap } from '../map/mapnew';
import { markerImage } from '../map/markerimage';
import overMap from '../map/topographic';
import { searchAddress, updateSuggestions } from '../map/search';
import { findway } from '../map/findway';

const Tabname: React.FC = () => {
    const { isList, setIsList } = useContext(MapContext)!;
    
    function getBounds(coordinates: maplibregl.LngLatLike) {
        const bounds = new maplibregl.LngLatBounds();
        bounds.extend(coordinates);
        return bounds;
    }

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
              setIsList(true);
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
      
    function danhmuc(map: Map, marker: Marker){
        showKhoa(map, marker);
        showVien(map, marker);
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

        findway(map);
        danhmuc(map, marker)

        var nav = new maplibregl.NavigationControl({
        showCompass: false, // hide the compass button
        showZoom: true // show the zoom buttons
        });
        map.addControl(nav, 'bottom-right');

    return () => map.remove();
    }, []);

    return(
        <div className='class__tabname'>
            <nav id='nav__name'>
                <div className="nav nav-tabs mb-3" id="nav-tab-name" role="tablist">
                    <div className="table-responsive">
                        <table className="table">
                        <tbody>
                        <tr>
                            <td>
                                <button className="nav-link active" id="nav-khoa-tab" data-bs-toggle="tab" data-bs-target="#nav-khoa" type="button" role="tab" aria-controls="nav-khoa" aria-selected="true">Khoa - Viện đào tạo</button>
                            </td>
                            <td>
                                <button className="nav-link" id="nav-vien-tab" data-bs-toggle="tab" data-bs-target="#nav-vien" type="button" role="tab" aria-controls="nav-vien" aria-selected="false">Viện - Trung tâm nghiên cứu</button>
                            </td>
                            <td>
                                <button className="nav-link" id="nav-phong-tab" data-bs-toggle="tab" data-bs-target="#nav-phong" type="button" role="tab" aria-controls="nav-phong" aria-selected="false">Phòng - Ban -  Trung tâm</button>
                            </td>
                            <td>
                                <button className="nav-link" id="nav-thuvien-tab" data-bs-toggle="tab" data-bs-target="#nav-thuvien" type="button" role="tab" aria-controls="nav-thuvien" aria-selected="false">Thư viện - Phòng học</button>
                            </td>
                            <td>
                                <button className="nav-link" id="nav-cuahang-tab" data-bs-toggle="tab" data-bs-target="#nav-cuahang" type="button" role="tab" aria-controls="nav-cuahang" aria-selected="false">Cửa hàng - Quán xá</button>
                            </td>
                        </tr>
                        </tbody>
                        </table>
                    </div>
                </div>
            </nav>
            <div className="" id="nav-tabContent">
                <div className="tab-pane fade active show" id="nav-khoa" role="tabpanel" aria-labelledby="nav-khoa-tab">
                    <ul className='ul__union'>
                        <ul className='ul__union_khoa'>
                        
                        </ul>
                    </ul>
                </div>
                <div className="tab-pane fade" id="nav-vien" role="tabpanel" aria-labelledby="nav-vien-tab">
                    <ul className='ul__union'>
                        <ul className='ul__union_vien'>
                       
                       </ul>
                    </ul>
                </div>
                <div className="tab-pane fade" id="nav-phong" role="tabpanel" aria-labelledby="nav-phong-tab">
                    <ul className='ul__union_phong'>
                        
                    </ul>
                </div>
                <div className="tab-pane fade" id="nav-thuvien" role="tabpanel" aria-labelledby="nav-thuvien-tab">
                    <ul className='ul__union_thuvien'>
                        
                    </ul>
                </div>
                <div className="tab-pane fade" id="nav-cuahang" role="tabpanel" aria-labelledby="nav-cuahang-tab">
                    <ul className='ul__union_cuahang'>
                        
                    </ul>
                </div>
            </div>
        </div>
        
    )
}

export default Tabname