import React, { useContext, useEffect, useState } from "react";
import '../css/component.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'maplibre-gl/dist/maplibre-gl.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MapContext } from "../contexts/tabnamecontext";
library.add(fas);


const TabName = () => {
    const { isList, setIsList } = useContext(MapContext)!;
    const { isMap, setIsMap } = useContext(MapContext)!;

    const closeTabName = () => {
        setIsList(true);
        setIsMap(true);
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
            <ul id="ul__union"></ul>
        </div>

    </div>

  )
}

export default TabName