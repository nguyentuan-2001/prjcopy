import React, { useContext, useEffect, useState } from "react";
import maplibregl, { LngLatLike, Map } from "maplibre-gl";
import '../components/component.css'
import 'maplibre-gl/dist/maplibre-gl.css';
import { Fade as Hamburger } from 'hamburger-react'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MapContext } from "../contexts/tabnamecontext";
library.add(fas);

const Header = () => {
    const { isList, setIsList } = useContext(MapContext)!;
    const { isMap, setIsMap } = useContext(MapContext)!;
    const { isSearch, setIsSearch } = useContext(MapContext)!;
    const {isNavigation, setIsNavigation} = useContext(MapContext)!; 

    const openList = () => {
        setIsList(false);
        setIsNavigation(true);
        setIsSearch(true);
        setIsMap(false);
    };

    const openNavigation = () => {
        setIsNavigation(false);
        setIsList(true);
        setIsSearch(true);
        setIsMap(false);
    };
    
    const openSearch = () => {
        setIsSearch(false);
        setIsNavigation(true);
        setIsList(true);
        setIsMap(false);
    };

    const openMap = () => {
        setIsSearch(true);
        setIsNavigation(true);
        setIsList(true);
        setIsMap(true);
    };
    const [isOpen, setOpen] = useState(true)
  return (
    <div className="header_all">
        <div id="icon__open">
            <Hamburger toggled={isOpen} toggle={setOpen}/>
        </div>
        
        <div className="left__panel" style={{display: isOpen ? 'block' : 'none'}}>
            <div id='logo__digiuni'>
                <img src="./images/digiuni.png" alt="" />
            </div>
            <div id='line_image'></div>

            <div id='list_a'>
                <a href='#' onClick={openMap} style={{ color: isMap ? 'black' : '#9e9c9c' }}>BẢN ĐỒ</a>
                <br /><br />
                <a href='#' onClick={openList} style={{ color: isList ? '#9e9c9c' : 'black' }}>DANH SÁCH</a>
                <br /><br />
                <a href='#' onClick={openSearch} style={{ color: isSearch ? '#9e9c9c' : 'black' }}>TÌM KIẾM</a>
                <br /><br />
                <a href='#' onClick={openNavigation}  style={{ color: isNavigation ? '#9e9c9c' : 'black' }}>CHỈ ĐƯỜNG</a>
            </div>

            <div id='logo'>
                <img src="./images/logo.png" alt="" />
            </div>
            
        </div>
    </div>
   
  )
}

export default Header