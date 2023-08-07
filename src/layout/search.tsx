import React, { useContext, useEffect, useState } from "react";
import '../css/component.css'
import 'maplibre-gl/dist/maplibre-gl.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MapContext } from "../contexts/tabnamecontext";
import MapNew from "./mapnew";
library.add(fas);

const Search = () => {
    const { isMap, setIsMap } = useContext(MapContext)!;
    const { isSearch, setIsSearch } = useContext(MapContext)!;
    const {isHover, setIsHover} = useContext(MapContext)!;
    const {isCoordinate, setIsCoordinate} = useContext(MapContext)!;  
    
    const closeSearch = () => {
        setIsSearch(true);
        setIsMap(true);
        isCoordinate.setPaintProperty(`3d-building-${isHover}`, 'fill-extrusion-color', '#FFFFFF');
    };
    
  return (
    <div id='search' style={{transform: isSearch ? 'translateX(-300%)' : 'none'}}>
        <div className="img_close_top">
            <div className="img_close">
                <img src="../images/digiuni.png" alt="" />
            </div>
            <div className="icon_close">
                <div id='close__detail' onClick={closeSearch} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                    </svg>
                    <span>Đóng</span>
                </div>
            </div>
        </div>
       

        <div className="main_input_search">
            <div id='input_search'>
                <input type="text" placeholder='Tìm kiếm tên khu vực' id='search__address' />
            </div>
            <div id='history__search'>
                <p>Tìm kiếm gần đây</p>
                <p>Cổng bắc</p>
            </div>
            <div id='list__address'>
                <p>Phổ biến</p>
                <ul id="ul_list_address"></ul>
            </div>
        </div>
    </div>

  )
}

export default Search