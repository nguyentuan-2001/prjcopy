import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { MapContext } from '../contexts/tabnamecontext';
import MapNew from './mapnew';
import { LngLatLike, Map } from 'maplibre-gl';

const Detail = () => {
    const [isTransform, setIsTransform] = useState(false); 
    const click1 = () => {
        setIsTransform(false);
    };
    const click2 = () => {
        setIsTransform(true);
    };

    const {isNavigation, setIsNavigation} = useContext(MapContext)!; 
    const {isClose, setIsClose} = useContext(MapContext)!; 

    const closeDetail = () => {
        setIsClose(!isClose);
    };

    const { isMap, setIsMap } = useContext(MapContext)!;
    const {isClickImage,setIsClickImage} = useContext(MapContext)!; 

    const {isBlockNavigation, setIsBlockNavigation} = useContext(MapContext)!; 
    const {startValue, setStartValue} = useContext(MapContext)!;
    const {endValue, setEndValue} = useContext(MapContext)!;
    function chiduong(){
        setEndValue(isClickImage);
        setIsClose(true);
        setIsNavigation(false);
        setIsMap(false);

        setIsBlockNavigation(false)
        setStartValue('')
    };

    // function realcoordinates(map: Map) { 
    //     map.on("load", function () {
    //         navigatorPosition(function (coordinates: any) {

    //             const lnglon = [isClickImage, coordinates]
    //             console.log(lnglon);
                
    //             // map.setCenter(coordinate);
    //             const checkStart = map.getSource("path");

    //             if (checkStart) {
    //               (checkStart as maplibregl.GeoJSONSource).setData({
    //                 type: "Feature",
    //                 geometry: {
    //                   type: "LineString",
    //                   coordinates: lnglon,
    //                 },
    //                 properties: {},
    //               });
    //             } else {
    //               map.addSource("path", {
    //                 type: "geojson",
    //                 data: {
    //                   type: "Feature",
    //                   geometry: {
    //                     type: "LineString",
    //                     coordinates: lnglon,
    //                   },
    //                 },
    //               });
          
    //               map.addLayer({
    //                 id: "path-layer",
    //                 type: "line",
    //                 source: "path",
    //                 paint: {
    //                   "line-color": "#6527BE",
    //                   "line-opacity": 1,
    //                   "line-width": 4,
    //                 },
    //               });
    //             }
    //         });
    //     });
    //     function navigatorPosition(callback: (coordinates: number[]) => void): void {
    //       if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(function (position) {
    //           const lng: number = position.coords.longitude;
    //           const lat: number = position.coords.latitude;
        
    //           const coordinates: number[] = [lng, lat];
    //           callback(coordinates);
    //         });
    //       } else {
    //         console.log("Geolocation không được hỗ trợ trong trình duyệt này");
    //       }
    //     }
    // }

    return(
        <div id='detail' style={{transform: isClose ? 'translateX(-200%)' : 'none',}}>
        <div id='close__detail' onClick={closeDetail} >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
            </svg>
            <span>CLOSE</span>
        </div>

        <div id='img_detail'>
            <img id="img-address" src="" alt="" />
        </div>

        <p id='name__address'>Trường</p>

        <div id='button__save'>
            <button type="button" className="btn btn-warning" id='navigate' onClick={chiduong}>Chỉ đường tới đây</button>
            <button type="button" className="btn btn-light">Lưu</button>
        </div>
        <div id='all__information'>
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button onClick={click1} className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">TỔNG QUAN</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button onClick={click2} className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">ẢNH(30)</button>
                </li>
            </ul>
            <hr />
            <p id='line_if' style={{transform: isTransform ? 'translateX(110px)' : 'none'}}></p>
            <div className="tab-content1" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                    <div id='office'>
                        <img src="../images/point.png" alt="" />
                        <p>Văn phòng : Toà C10 - 309 <a href="#">ĐH Bách khoa</a></p>
                    </div>
                    <div id='phone'>
                        <img src="../images/phone.png" alt="" />
                        <p>0123 456 789</p>
                    </div>
                    <div id='sms'>
                        <img src="../images/sms.png" alt="" />
                        <p><a href="#">sme@hust.edu.vn</a></p>
                    </div>
                    <div id='web'>
                        <img src="../images/web.png" alt="" />
                        <p><a href="#">sme.hust.edu.vn</a></p>
                    </div>
                </div>
                <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                    <div id='all_img'>
                        <img src="https://static-images.vnncdn.net/files/publish/2022/9/3/bien-vo-cuc-thai-binh-346.jpeg" alt="" />
                    </div>
                </div>
            </div>

        </div>
    </div>
    )
}

export default Detail