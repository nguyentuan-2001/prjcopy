import React, { useContext, useEffect, useState } from "react";
import maplibregl, { LngLatLike, Map, Marker } from "maplibre-gl";
import '../components/component.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'maplibre-gl/dist/maplibre-gl.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MapContext } from "../contexts/tabnamecontext";
import MapNew from "./mapnew";
import data from "../hust/data.json";
library.add(fas);


const TabName = () => {
    const { isList, setIsList } = useContext(MapContext)!;
    const { isMap, setIsMap } = useContext(MapContext)!;

    const closeTabName = () => {
        setIsList(true);
        setIsMap(true);
    };

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
  
    
  return (
    <div id='show__name' style={{transform: isList ? 'translateX(-200%)' : 'none'}}>
        
        <div id='close__detail' onClick={closeTabName} >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
            </svg>
            <span>CLOSE</span>
        </div>
        
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
            </nav><MapNew danhmuc={danhmuc}/>
            <div className="" id="nav-tabContent">
                <div className="tab-pane fade active show" id="nav-khoa" role="tabpanel" aria-labelledby="nav-khoa-tab">
                    <ul className='ul__union'>
                        <ul className='ul__union_khoa' id="ul__union_khoa">
                        
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
    </div>

  )
}

export default TabName