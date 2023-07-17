import React, { useContext, useEffect, useState } from "react";
import maplibregl, { LngLatLike, Map } from "maplibre-gl";
import '../components/component.css'
import 'maplibre-gl/dist/maplibre-gl.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MapContext } from "../contexts/tabnamecontext";
import MapNew from "./mapnew";
library.add(fas);

const Search = () => {
    const { isList, setIsList } = useContext(MapContext)!;
    const [isMap, setIsMap] = useState(true); 
    const { isSearch, setIsSearch } = useContext(MapContext)!;
    const {isNavigation, setIsNavigation} = useContext(MapContext)!; 
    const [isClose, setIsClose] = useState(true); 

    const closeSearch = () => {
        setIsSearch(true);
        setIsMap(true);
    };
    
  return (
    <div id='search' style={{transform: isSearch ? 'translateX(-200%)' : 'none'}}>
        <div id='close__detail' onClick={closeSearch} >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
            </svg>
            <span>CLOSE</span>
        </div>
        <MapNew/>
        <div>
            <div id='input_search'>
                <div id='border_input_search'></div>
                <input type="text" placeholder='Tìm kiếm tên khu vực' id='search__address' />
            </div>
            <div id='history__search'>
                <p>Tìm kiếm gần đây</p>
                <p>Cổng bắc</p>
            </div>
            <div id='list__address'>
                <p>Gợi ý</p>
                <ul id="suggestions-list"></ul>
            </div>
        </div>
    </div>

  )
}

export default Search