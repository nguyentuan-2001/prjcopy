import React, { useContext, useEffect, useRef, useState } from "react";
import '../css/component.css'
import data from "../hust/data.json";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'maplibre-gl/dist/maplibre-gl.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MapContext } from "../contexts/tabnamecontext";
import maplibregl,{ LngLatLike, Map } from "maplibre-gl";
import { showLocationDetail } from "../map/showinformation";
library.add(fas);


const TabName = () => {
    const { isList, setIsList } = useContext(MapContext)!;
    const { isMap, setIsMap } = useContext(MapContext)!;
    const {isHover, setIsHover} = useContext(MapContext)!;
    
    const closeTabName = () => {
        setIsList(true);
        setIsMap(true);
        isCoordinate.setPaintProperty(`3d-building-${isHover}`, 'fill-extrusion-color', '#FFFFFF');
    };

    const [isKhoa, setIsKhoa] = useState(true); 
    const [isVien, setIsVien] = useState(false); 
    const [isPhong, setIsPhong] = useState(false); 
    const [isThuVien, setIsThuVien] = useState(false); 
    const [isCuaHang, setIsCuaHang] = useState(false); 

    const khoa = () => {
        setIsKhoa(true);
        setIsVien(false);
        setIsPhong(false);
        setIsThuVien(false);
        setIsCuaHang(false);
    };
    const vien = () => {
        setIsVien(true);
        setIsKhoa(false);
        setIsPhong(false);
        setIsThuVien(false);
        setIsCuaHang(false);
    };
    const phong = () => {
        setIsKhoa(false);
        setIsVien(false);
        setIsPhong(true);
        setIsThuVien(false);
        setIsCuaHang(false);
    };
    const cuahang = () => {
        setIsVien(false);
        setIsKhoa(false);
        setIsPhong(false);
        setIsThuVien(false);
        setIsCuaHang(true);
    };
    const thuvien = () => {
        setIsVien(false);
        setIsKhoa(false);
        setIsPhong(false);
        setIsThuVien(true);
        setIsCuaHang(false);
    };

    function getBounds(coordinates: maplibregl.LngLatLike) {
        const bounds = new maplibregl.LngLatBounds();
        bounds.extend(coordinates);
        return bounds;
    }
 
    const {isCoordinate, setIsCoordinate} = useContext(MapContext)!; 
    const { isClose, setIsClose } = useContext(MapContext)!;
    const options = data.features.map((feature) => feature.properties.name);
    const [listItem, setListItem] = useState(options);
    const { isClickImage, setIsClickImage } = useContext(MapContext)!;

    const clickLi = (name: string, index: number) => {
        const datas = data.features[index];
        const coordinates: maplibregl.LngLatLike = datas.geometry.coordinates as maplibregl.LngLatLike;

        setIsList(true);
        setIsMap(true);
        setIsClose(false);
        showLocationDetail(datas);
        setIsClickImage(name as any);
    
        isCoordinate.setCenter(coordinates);
        isCoordinate.setZoom(18);
        isCoordinate.fitBounds(getBounds(coordinates), {
        padding: 100,
        });
    };

    const array = ["training department", "research center", "central department", "library", 'shop'];
    const ulRef = useRef(null);
    useEffect(() => {
        const ulElement = ulRef.current as any;
        const liElements = ulElement.getElementsByTagName('li');
        const liArray = Array.from(liElements); 

        const handleButtonClick = (type: string) => {
            liArray.forEach((item: any, index) => {
              const datas = data.features[index];
              if (datas.properties.type === type) {
                item.style.display = "flex"; 
              } else {
                item.style.display = "none";
              }
            });
          };
        handleButtonClick(array[0]);
        document.getElementById("nav-khoa-tab")?.addEventListener("click", () => {
        handleButtonClick(array[0]);
        });
    
        document.getElementById("nav-vien-tab")?.addEventListener("click", () => {
        handleButtonClick(array[1]);
        });
    
        document.getElementById("nav-phong-tab")?.addEventListener("click", () => {
            handleButtonClick(array[2]);
        });
        document.getElementById("nav-thuvien-tab")?.addEventListener("click", () => {
            handleButtonClick(array[3]);
        });
    
        document.getElementById("nav-cuahang-tab")?.addEventListener("click", () => {
            handleButtonClick(array[4]);
        });
    }, []);
    

  return (
    <div id='show__name' style={{transform: isList ? 'translateX(-200%)' : 'none'}}>
        
        <div id='close__detail' onClick={closeTabName} >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
            </svg>
            <span>CLOSE</span>
        </div>
        

        <div className="table-responsive" id="nav-tab">
            <table className="table">
            <tbody>
            <tr>
                <td>
                    <button style={{ color: isKhoa ? 'black' : '#9e9c9c', borderBottom: isKhoa ? '2px solid #eac870' : 'none'  }} onClick={khoa} className="nav-link" id="nav-khoa-tab" type="button" role="tab" >Khoa - Viện đào tạo</button>
                </td>
                <td>
                    <button style={{ color: isVien ? 'black' : '#9e9c9c', borderBottom: isVien ? '2px solid #eac870' : 'none'  }} onClick={vien} className="nav-link" id="nav-vien-tab" type="button" >Viện - Trung tâm nghiên cứu</button>
                </td>
                <td>
                    <button style={{ color: isPhong ? 'black' : '#9e9c9c', borderBottom: isPhong ? '2px solid #eac870' : 'none'  }} onClick={phong}  className="nav-link" id="nav-phong-tab"  type="button">Phòng - Ban -  Trung tâm</button>
                </td>
                <td>
                    <button style={{ color: isThuVien ? 'black' : '#9e9c9c', borderBottom: isThuVien ? '2px solid #eac870' : 'none'  }} onClick={thuvien}  className="nav-link" id="nav-thuvien-tab" type="button" >Thư viện - Phòng học</button>
                </td>
                <td>
                    <button style={{ color: isCuaHang ? 'black' : '#9e9c9c', borderBottom: isCuaHang ? '2px solid #eac870' : 'none'  }} onClick={cuahang}  className="nav-link" id="nav-cuahang-tab" type="button">Cửa hàng - Quán xá</button>
                </td>
            </tr>
            </tbody>
            </table>
        </div>

        <div className="" id="nav-tabContent">
            <ul id="ul__union" ref={ulRef}>
                {listItem.map((name, index) => (                    
                    <li key={index} onClick={() => clickLi(name,index)} >
                        <img src="../images/union.png" alt="" />
                        <p>{name}</p>
                    </li>
                ))}
            </ul>
        </div>

    </div>

  )
}

export default TabName