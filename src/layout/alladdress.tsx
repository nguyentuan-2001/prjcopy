import React, { useContext, useEffect, useRef, useState } from "react";
import '../css/component.css'
import 'maplibre-gl/dist/maplibre-gl.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import data from "../hust/data.json";
import { MapContext } from "../contexts/tabnamecontext";
import MapNew from "./mapnew";
library.add(fas);

const Alladdress = () => {
    const { isMap, setIsMap } = useContext(MapContext)!;
    const { isSearch, setIsSearch } = useContext(MapContext)!;
    const {isHover, setIsHover} = useContext(MapContext)!;
    const {isCoordinate, setIsCoordinate} = useContext(MapContext)!;  
    const { isList, setIsList } = useContext(MapContext)!;
    
    const closeSearch = () => {
        setIsList(true);
        isCoordinate.setPaintProperty(`3d-building-${isHover}`, 'fill-extrusion-color', '#FFFFFF');
    };
    const menuRef = useRef<HTMLUListElement>(null);

    const [isScrollBlock, setIsScrollBlock] = useState(false); 

    const handleScrollLeft = () => {
        if (menuRef.current) {
            menuRef.current.scrollLeft -= 150; 
            setIsScrollBlock(false);
        }
    };

    const handleScrollRight = () => {
        if (menuRef.current) {
            menuRef.current.scrollLeft += 150; 
            setIsScrollBlock(true);
        }
    };

    const [isKhoa, setIsKhoa] = useState(false); 
    const [isThuVien, setIsThuVien] = useState(false); 
    const [isHoiTruong, setIsHoiTruong] = useState(true); 
    const [isPhongTS, setIsPhongTS] = useState(false); 
    const [isTatCa, setIsTatCa] = useState(false); 

    const khoa = () => {
        setIsKhoa(true);
        setIsHoiTruong(false);
        setIsPhongTS(false);
        setIsThuVien(false);
        setIsTatCa(false);
    };
    const hoitruong = () => {
        setIsKhoa(false);
        setIsHoiTruong(true);
        setIsPhongTS(false);
        setIsThuVien(false);
        setIsTatCa(false);
    };
    const phongts = () => {
        setIsKhoa(false);
        setIsHoiTruong(false);
        setIsPhongTS(true);
        setIsThuVien(false);
        setIsTatCa(false);
    };
    const tatca = () => {
        setIsKhoa(false);
        setIsHoiTruong(false);
        setIsPhongTS(false);
        setIsThuVien(false);
        setIsTatCa(true);
    };
    const thuvien = () => {
        setIsKhoa(false);
        setIsHoiTruong(false);
        setIsPhongTS(false);
        setIsThuVien(true);
        setIsTatCa(false);
    };

    const array = ["training department", "research center", "central department", "library", 'shop'];
    const ulRef = useRef(null);
    useEffect(() => {
        const ulElement = ulRef.current as any;
        const liElements = ulElement.querySelectorAll('.li_name');
        const liArray = Array.from(liElements);

        const handleButtonClick = (type: string) => {
            liArray.forEach((item: any) => {
              const datas = data.features.find(feature => feature.properties.name === item.textContent);
              if (datas?.properties.type === type) {
                item.style.display = "flex";
              } else {
                item.style.display = "none";
              }
            });
          };
        handleButtonClick(array[0]);
        document.getElementById("tab_hoitruong")?.addEventListener("click", () => {
        handleButtonClick(array[0]);
        });
    
        document.getElementById("tab_khoa")?.addEventListener("click", () => {
        handleButtonClick(array[1]);
        });
    
        document.getElementById("tab_thuvien")?.addEventListener("click", () => {
            handleButtonClick(array[2]);
        });
        document.getElementById("tab_tuyensinh")?.addEventListener("click", () => {
            handleButtonClick(array[3]);
        });
    
        document.getElementById("tab_tatca")?.addEventListener("click", () => {
            handleButtonClick(array[4]);
        });
    }, []);


    const clickli = () => {
        
    };
    
  return (
    <div id='show__name' style={{transform: isList ? 'translateX(-300%)' : 'none'}}>
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
        </div>

        <div className="menu-scroll">
            <div className="paddles-scroll">
                <button style={{display: isScrollBlock ? 'block': 'none'}} className="left-paddle paddle-scroll" onClick={handleScrollLeft}><FontAwesomeIcon icon="chevron-left" /></button>
                <ul className="ul_menu_scroll" ref={menuRef}>
                    <li id="tab_hoitruong" className="item" style={{ color: isHoiTruong ? '#B89A5F' : '#4F4F4F', borderBottom: isHoiTruong ? '25px solid #eac870' : 'none'  }} onClick={hoitruong}> 
                        <div className="ul_sidebar_image">
                            <img src="../images/hoitruong.svg" alt="" />
                        </div>
                        <div>
                            <span>Hội trường</span><br />
                            <div className="ul_sidebar_icon">
                                <FontAwesomeIcon icon="caret-down" />
                            </div>
                        </div>
                    </li>
                    <li id="tab_khoa" className="item" style={{ color: isKhoa ? '#B89A5F' : '#4F4F4F', borderBottom: isKhoa ? '25px solid #eac870' : 'none'  }} onClick={khoa}> 
                        <div className="ul_sidebar_image">
                            <img src="../images/chuyenkhoa.svg" alt="" />
                        </div>
                        <div>
                            <span>Chuyên khoa</span><br />
                            <div className="ul_sidebar_icon">
                                <FontAwesomeIcon icon="caret-down" />
                            </div>
                        </div>
                    </li>
                    <li id="tab_thuvien" className="item" style={{ color: isThuVien ? '#B89A5F' : '#4F4F4F', borderBottom: isThuVien ? '25px solid #eac870' : 'none'  }} onClick={thuvien}> 
                        <div className="ul_sidebar_image">
                            <img src="../images/thuvien.svg" alt="" />
                        </div>
                        <div>
                            <span>Thư viện</span><br />
                        </div>
                    </li>
                    <li id="tab_tuyensinh" className="item" style={{ color: isPhongTS ? '#B89A5F' : '#4F4F4F', borderBottom: isPhongTS ? '25px solid #eac870' : 'none'  }} onClick={phongts}> 
                        <div className="ul_sidebar_image">
                            <img src="../images/tuyensinh.svg" alt="" />
                        </div>
                        <div>
                            <span>Phòng tuyển sinh</span><br />
                        </div>
                    </li>
                    <li id="tab_tatca" className="item" style={{ color: isTatCa ? '#B89A5F' : '#4F4F4F', borderBottom: isTatCa ? '25px solid #eac870' : 'none'  }} onClick={tatca}> 
                        <div className="ul_sidebar_image">
                            <img src="../images/tatca.svg" alt="" />
                        </div>
                        <div>
                            <span>Tất cả</span><br />
                        </div>
                    </li>
                </ul>
                <button style={{display: isScrollBlock ? 'none': 'block'}} className="right-paddle paddle-scroll" onClick={handleScrollRight}><FontAwesomeIcon icon="chevron-right" /></button>
            </div>
        </div>
        <div className="" id="nav-tabContent">
            <ul id="ul_list_address" ref={ulRef}>
                {data.features.map((suggestion, index) => (
                    <li key={index} className="li_name">
                        <img src={suggestion.properties.image_url_2} alt="" />
                        <div>
                            <p>{suggestion.properties.name}</p>
                            <span>{suggestion.properties.height}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>

    </div>

  )
}

export default Alladdress