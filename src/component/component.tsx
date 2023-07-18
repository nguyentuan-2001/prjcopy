import React, { useState } from 'react';
import { Fade as Hamburger } from 'hamburger-react'
import './component.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Tabname from './tabname';
import Detail from './detail';
import Search from './search';
import Navigation from './navigation';

const Navbar: React.FC = () => {
    const [isMap, setIsMap] = useState(true); 
    const [isList, setIsList] = useState(true); 
    const [isSearch, setIsSearch] = useState(true); 
    const [isNavigation, setIsNavigation] = useState(true); 

    const openList = () => {
        setIsList(false);
        setIsNavigation(true);
        setIsSearch(true);
        setIsMap(false);
    };
    const closeTabName = () => {
        setIsList(true);
        setIsMap(true);
    };
    
    const closeNavigation = () => {
        setIsNavigation(true);
        setIsMap(true);
    };
    const openNavigation = () => {
        setIsNavigation(false);
        setIsList(true);
        setIsSearch(true);
        setIsMap(false);
    };
    
    const closeSearch = () => {
        setIsSearch(true);
        setIsMap(true);
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
    return(
        <div className="all__map">
            <div className="left__panel">
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
            <div className="main__map">
                <div id="map" />
            </div>
            
            <div id='show__name' style={{transform: isList ? 'translateX(-200%)' : 'none'}}>
                <div id='close__detail' onClick={closeTabName} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                    </svg>
                    <span>CLOSE</span>
                </div>
                <Tabname/>
            </div>
            
            <Detail/>
            <div id='search' style={{transform: isSearch ? 'translateX(-200%)' : 'none'}}>
                <div id='close__detail' onClick={closeSearch} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                    </svg>
                    <span>CLOSE</span>
                </div>
                <Search/>
            </div>
            <div id='navigation' style={{transform: isNavigation ? 'translateX(-200%)' : 'none'}}>
                <div id='close__detail' onClick={closeNavigation} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                    </svg>
                    <span>CLOSE</span>
                </div>
                <Navigation/>
            </div>
        </div>
    )
}

export default Navbar