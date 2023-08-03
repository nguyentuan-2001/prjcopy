import React, { useContext, useEffect, useState } from "react";
import '../css/component.css'
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
    const {isClose, setIsClose} = useContext(MapContext)!; 
    const {isBlockNavigation, setIsBlockNavigation} = useContext(MapContext)!;
    const {startValue, setStartValue} = useContext(MapContext)!;
    const {endValue, setEndValue} = useContext(MapContext)!;
    const {isCoordinate, setIsCoordinate} = useContext(MapContext)!; 

    const openList = () => {
        setIsList(false);
        setIsNavigation(true);
        setIsSearch(true);
        setIsMap(false);
        setIsClose(true);
        setIsBlockNavigation(false);
        setStartValue('');
        setEndValue('');
    };

    const openNavigation = () => {
        setIsNavigation(false);
        setIsList(true);
        setIsSearch(true);
        setIsMap(false);
        setIsClose(true);
    };
    
    const openSearch = () => {
        setIsSearch(false);
        setIsNavigation(true);
        setIsList(true);
        setIsMap(false);
        setIsClose(true);
        setIsBlockNavigation(false);
        setStartValue('');
        setEndValue('');
    };

    const openMap = () => {
        setIsSearch(true);
        setIsNavigation(true);
        setIsList(true);
        setIsMap(true);
        setIsClose(true);
        setIsBlockNavigation(false);
        setStartValue('');
        setEndValue('');
    };
    const [isOpen, setIsOpen] = useState(true)
    
    const {isSwitchOn, setIsSwitchOn} = useContext(MapContext)!; 

    const handleStyleChange = () => {
        setIsSwitchOn(!isSwitchOn);
    };




  return (
    <div className="header_all">
        <div id="icon__open">
            <Hamburger toggled={isOpen} toggle={setIsOpen} />
        </div>
        
        <div className="left__panel" style={{transform: isOpen ? 'none' : 'translateX(-200%)'}}>
            <div id='logo__digiuni'>
                <img src="./images/digiuni.png" alt="" />
            </div>
            <div id='line_image'></div>

            <div id='list_p'>
                <p id="input_onoff">
                    <label className="switch">
                        <input type="checkbox" checked={isSwitchOn} onChange={handleStyleChange} />
                        <span className="slider"></span>
                    </label>
                </p>
                <p onClick={openMap} style={{ color: isMap ? 'black' : '#9e9c9c' }}>BẢN ĐỒ</p>
                <p onClick={openList} style={{ color: isList ? '#9e9c9c' : 'black' }}>KHU VỰC</p>
                <p onClick={openSearch} style={{ color: isSearch ? '#9e9c9c' : 'black' }}>TÌM KIẾM</p>
                <p onClick={openNavigation}  style={{ color: isNavigation ? '#9e9c9c' : 'black' }}>CHỈ ĐƯỜNG</p>
            </div>

            <div id='logo'>
                <img src="./images/logo.png" alt="" />
            </div>
            
        </div>
    </div>
   
  )
}

export default Header