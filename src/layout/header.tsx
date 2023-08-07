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
    const { isSearch, setIsSearch } = useContext(MapContext)!;
    const { isNavigation, setIsNavigation } = useContext(MapContext)!;

    const openSearch = () => {
        setIsSearch(false);
    };
    const openNavigation = () => {
        setIsNavigation(false);
    };

  return (
    <div className="header_all">
        <div className="icon_search" onClick={openSearch}>
            <FontAwesomeIcon icon="search" />
        </div>
        <div className="search_way" onClick={openNavigation}>
            <img src="../images/chiduong.svg" alt="" />
            <span>Chỉ đường</span>
        </div>
    </div>
   
  )
}

export default Header