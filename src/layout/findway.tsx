import React, { useContext, useEffect, useState } from "react";
import maplibregl, { LngLatLike, Map } from "maplibre-gl";
import '../css/component.css'
import 'maplibre-gl/dist/maplibre-gl.css';
import PathFinder from "geojson-path-finder";
import * as geolib from 'geolib';
import data from '../hust/data.json';
import distance from '@turf/distance';
import { point } from "@turf/helpers";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MapNew from "./mapnew";
import { MapContext } from "../contexts/tabnamecontext";
const roads = require('../hust/bd.geojson');
library.add(fas);



const FindWay = () => {
    const { isMap, setIsMap } = useContext(MapContext)!;
    const {isNavigation, setIsNavigation} = useContext(MapContext)!; 
    const {isBlockNavigation, setIsBlockNavigation} = useContext(MapContext)!; 
    
    const [isDiBoLength, setIsDiBoLength] = useState<string | undefined>();
    const [isDiBoTime, setIsDiBoTime] = useState<string | undefined>();
    const [isXeDapLength, setIsXeDapLength] = useState<string | undefined>();
    const [isXeDapTime, setIsXeDapTime] = useState<string | undefined>();
    const [isXeMayLength, setIsXeMayLength] = useState<string | undefined>();
    const [isXeMayTime, setIsXeMayTime] = useState<string | undefined>();
    const [isOToLength, setIsOToLength] = useState<string | undefined>();
    const [isOToTime, setIsOToTime] = useState<string | undefined>();


    function resetSelectToDefault(selectElement: any) {
        selectElement.selectedIndex = 0; // Đặt lại thành phần được chọn đầu tiên
    }
    function closeNavigation(){
        setIsNavigation(true);
        setIsMap(true);
        setIsBlockNavigation(false);
        
        var startSelect = document.getElementById('start-street') as HTMLSelectElement;
        var endSelect = document.getElementById('end-street') as HTMLSelectElement;
        startSelect.selectedIndex = 0; //update option selected index = 0
        endSelect.selectedIndex = 0;
    };
    // function removeLayer(map: Map){
    //     map.getLayer('path-layer');
    //     map.removeLayer('path-layer');
    //     map.getLayer('path-layer1');
    //     map.removeLayer('path-layer1');
    //     map.getSource('path');
    //     map.removeSource('path');
    // }

    function updateOptions(options: string[], selectElement: HTMLSelectElement) {
        // Delete existing options
        while (selectElement.firstChild) {
            selectElement.removeChild(selectElement.firstChild);
        }
        // Add blank option as the first element
        var blankOption = document.createElement('option');
        blankOption.textContent = '';
        selectElement.appendChild(blankOption);
    
        // Add list of addresses as options
        options.forEach(function (option) {
            var optionElement = document.createElement('option');
            optionElement.textContent = option;
            selectElement.appendChild(optionElement);
        });
    }
    
    function findway(map: Map){
        // get the addresses
        const startStreetSelect = document.getElementById('start-street') as HTMLSelectElement;
        const endStreetSelect = document.getElementById('end-street') as HTMLSelectElement;
    
        const options = data.features.map(feature => feature.properties.name);
        updateOptions(options, startStreetSelect);
        updateOptions(options, endStreetSelect);
    
        function searchPoint(){
            const startSelect = document.getElementById('start-street') as HTMLSelectElement;
            const endSelect = document.getElementById('end-street') as HTMLSelectElement;
    
            const startAddress = startSelect.value;
            const endAddress = endSelect.value;
    
            const startResults = data.features.filter(function(feature) {
                return feature.properties.name.toLowerCase().includes(startAddress.toLowerCase());
            });
    
            const endResults = data.features.filter(function(feature) {
                return feature.properties.name.toLowerCase().includes(endAddress.toLowerCase());
            });
    
            var startPoint= startResults[0].geometry.coordinates;
            console.log('Điểm băt đầu:', startPoint);
            var endPoint = endResults[0].geometry.coordinates;
            console.log('Điểm kết thúc:', endPoint);
    
            const center= startPoint as maplibregl.LngLatLike ;
            map.setCenter(center);
            map.setZoom(17.5);
            findPath(startPoint,endPoint,map);
    
        }
        document.getElementById('icon__search1')?.addEventListener('click', function() {
            searchPoint();
        });
        document.getElementById('icon__search2')?.addEventListener('click', function() {
            searchPoint();
        });
    }
    
    function findPath(startPoint: number[], endPoint: number[], map: Map) {
        fetch(roads)
            .then((response) => response.json())
            .then((geojson) => {
    
            const start =  {
                latitude: startPoint[1],
                longitude: startPoint[0],
            };
            let minDistance = Infinity;
            let nearestPoint = null;
            
            const end =  {
                latitude: endPoint[1],
                longitude: endPoint[0],
            };
            let minDistance1 = Infinity;
            let nearestPoint1 = null;
            
            geojson.features.forEach((feature: any) => {
                const geometry = feature.geometry;
                if (geometry.type === 'LineString') {
                const lineString = geometry.coordinates;
                const closestPoint = geolib.findNearest(start, lineString) ;
                
                const distance = geolib.getDistance(start, closestPoint);
                if (distance < minDistance) {
                    minDistance = distance;
                    nearestPoint = closestPoint;
                }
                }
                const geometry1 = feature.geometry;
                if (geometry1.type === 'LineString') {
                const lineString1 = geometry1.coordinates;
                const closestPoint1 = geolib.findNearest(end, lineString1);
                const distance1 = geolib.getDistance(end, closestPoint1);
                if (distance1 < minDistance1) {
                    minDistance1 = distance1;
                    nearestPoint1 = closestPoint1;
                }
                }
            });
    
            if (nearestPoint && nearestPoint1){
                const pathFinder = new PathFinder(geojson);
                const startp = point(nearestPoint);
                const finish = point(nearestPoint1);
                const path = pathFinder.findPath(startp, finish);
    
                const calculatedDistance = distance(startp, finish, { units: 'kilometers' });
                const calculatedDistanceInMeters = calculatedDistance * 1000;
                 
                setIsBlockNavigation(true);

                setIsDiBoLength(`${calculatedDistanceInMeters.toFixed(2)} m`);
                const travelTimeInHours = calculatedDistance / 5; 
                const travelTimeInMinutes = travelTimeInHours * 60;
                setIsDiBoTime(`${travelTimeInMinutes.toFixed(2)} phút`);

                setIsXeDapLength(`${calculatedDistanceInMeters.toFixed(2)} m`);
                const bicycleTimeInHours = calculatedDistance / 20;
                const bicycleTimeInMinutes = bicycleTimeInHours * 60;
                setIsXeDapTime(`${bicycleTimeInMinutes.toFixed(2)} phút`);

                setIsXeMayLength(`${calculatedDistanceInMeters.toFixed(2)} m`);
                const motorbikeTimeInHours = calculatedDistance / 40;
                const motorbikeTimeInMinutes = motorbikeTimeInHours * 60;
                setIsXeMayTime(`${motorbikeTimeInMinutes.toFixed(2)} phút`);

                setIsOToLength(`${calculatedDistanceInMeters.toFixed(2)} m`);
                const carTimeInHours = calculatedDistance / 60;
                const carTimeInMinutes = carTimeInHours * 60;
                setIsOToTime(`${carTimeInMinutes.toFixed(2)} phút`);

                if (path) {
                    const pathSource = map.getSource('path') as any;
                    const coordinates = path.path;
                    
                    if (pathSource) {
                        pathSource.setData({
                            type: 'Feature',
                            geometry: {
                            type: 'LineString',
                            coordinates: coordinates,
                            },
                        });
                    } else {
                        map.addSource('path', {
                            type: 'geojson',
                            data: {
                            type: 'Feature',
                            geometry: {
                                type: 'LineString',
                                coordinates: coordinates,
                            },
                            },
                        });
                        map.addLayer({
                            id: 'path-layer',
                            type: 'line',
                            source: 'path',
                            paint: {
                            'line-color': '#1D5D9B',
                            'line-opacity': 1,
                            'line-width': 4,
                            },
                        });
                        map.addLayer({
                            id: 'path-layer1',
                            type: 'line',
                            source: 'path',
                            paint: {
                            'line-color': '#6528F7',
                            'line-opacity': 0.5,
                            'line-width': 12,
                            },
                        });
                    }
                    // map.moveLayer('path-layer', 'home-layer');
                    // map.moveLayer('path-layer1', 'home-layer');
                    map.moveLayer('path-layer', '3d-building');
                    map.moveLayer('path-layer1', '3d-building');
                    
                    const coordinateStart = [startPoint,nearestPoint];  
                    const checkStart = map.getSource('dasharray1') as any;
                    if(checkStart){
                        checkStart.setData({
                            type: 'Feature',
                            geometry: {
                            type: 'LineString',
                            coordinates: coordinateStart,
                            },
                        });
                    }else{
                        // đường nét đứt
                        map.addSource('dasharray1', {
                            type: 'geojson',
                            data: {
                                type: 'Feature',
                                geometry: {
                                type: 'LineString',
                                coordinates: coordinateStart,
                                },
                            },
                        });
                        map.addLayer({
                            id: 'dasharray1-id',
                            type: 'line',
                            source: 'dasharray1',
                            paint: {
                            'line-color': 'black',
                            'line-opacity': 1,
                            'line-width': 2,
                            'line-dasharray': [2, 1], // Thiết lập đường nét đứt
                            },
                        });
                    }
                    const coordinateEnd = [endPoint,nearestPoint1];  
                    const checkEnd = map.getSource('dasharray2') as any;
                    if(checkEnd){
                        checkEnd.setData({
                            type: 'Feature',
                            geometry: {
                            type: 'LineString',
                            coordinates: coordinateEnd,
                            },
                        });
                    }else{
                        // đường nét đứt
                        map.addSource('dasharray2', {
                            type: 'geojson',
                            data: {
                                type: 'Feature',
                                geometry: {
                                type: 'LineString',
                                coordinates: coordinateEnd,
                                },
                            },
                        });
                        map.addLayer({
                            id: 'dasharray2-id',
                            type: 'line',
                            source: 'dasharray2',
                            paint: {
                            'line-color': 'black',
                            'line-opacity': 1,
                            'line-width': 2,
                            'line-dasharray': [2, 1], // Thiết lập đường nét đứt
                            },
                        });
                    }
                } else {
                    console.error('Không tìm thấy đường đi.');
                }
            }
        })
        .catch((error) => {
            console.error('Lỗi khi tìm đường:', error);
        });
    }
  
  return (
        <div id='navigation' style={{transform: isNavigation ? 'translateX(-200%)' : 'none'}}>
            
            <div id='close__detail' onClick={closeNavigation} >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                </svg>
                <span>CLOSE</span>
            </div>
            <MapNew findway={findway}/>
            <div id='all__select'>
                <div id='select__address'>
                    <div className='icon__select1'>
                        <span><FontAwesomeIcon icon="crosshairs" /></span>           
                        <select className="form-control form-control" id="start-street"  >
                            <option value="" disabled>
                                Chọn điểm bắt đầu
                            </option>
                        </select>
                    </div>
                    <div className='icon__select2'>
                        <span><FontAwesomeIcon icon="map-marker-alt" /></span>  
                        <select className="form-control input-solid" id="end-street" >
                            <option value="" disabled>
                                Chọn điểm cần đến
                            </option>
                        </select>
                    </div>
                    <div id='dots'>
                        <p></p>
                        <p></p>
                        <p></p>
                    </div>
                    <div>
                        <FontAwesomeIcon icon="search" id='icon__search1' />
                        <FontAwesomeIcon icon="search" id='icon__search2'/>
                    </div>
                    <div id='repeart'>
                        <img src="../images/repeart.png" alt="" />
                    </div>
                </div>
            </div>

            <div id='navigation__child' style={{display: isBlockNavigation ? 'block' : 'none'}}>
                <ul className="nav nav-pills" id="ul_navigation" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="pills-dibo" data-bs-toggle="pill" data-bs-target="#dibo" type="button" role="tab" aria-controls="dibo" aria-selected="true">
                            <img src="../images/dibo.png" alt="" />
                        </button>
                        <p>{isDiBoTime}</p>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="pills-xedap" data-bs-toggle="pill" data-bs-target="#xedap" type="button" role="tab" aria-controls="xedap" aria-selected="false">
                            <img src="../images/xedap.png" alt="" />
                        </button>
                        <p>{isXeDapTime}</p>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="pills-xemay" data-bs-toggle="pill" data-bs-target="#xemay" type="button" role="tab" aria-controls="xemay" aria-selected="false">
                            <img src="../images/xemay.png" alt="" />
                        </button>
                        <p>{isXeMayTime}</p>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="pills-oto" data-bs-toggle="pill" data-bs-target="#oto" type="button" role="tab" aria-controls="oto" aria-selected="false">
                            <img src="../images/oto.png" alt="" />
                        </button>
                        <p>{isOToTime}</p>
                    </li>
                </ul>
                    <hr />
                    
                <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="dibo" role="tabpanel" aria-labelledby="pills-dibo">
                        <div className='if-length'>
                            <div className="row">
                                <div className="col-2">
                                    <div id='img_dibo'><img src="../images/dibo.png" alt="" /></div>
                                </div>
                                <div className="col-5">
                                    <span>Đi thẳng</span>
                                </div>
                                <div className="col-5">
                                    <div id='length'>
                                        <b id='length_dibo'>{isDiBoLength}</b>
                                        <p id='time_dibo'>{isDiBoTime}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="xedap" role="tabpanel" aria-labelledby="pills-xedap">
                        <div className='if-length'>
                            <div className="row">
                                <div className="col-2">
                                    <div id='img_dibo'><img src="../images/xedap.png" alt="" /></div>
                                </div>
                                <div className="col-5">
                                    <span>Đi thẳng</span>
                                </div>
                                <div className="col-5">
                                    <div id='length'>
                                        <b id='length_xedap'>{isXeDapLength}</b>
                                        <p id='time_xedap'>{isXeDapTime}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="xemay" role="tabpanel" aria-labelledby="pills-xemay">
                        <div className='if-length'>
                            <div className="row">
                                <div className="col-2">
                                    <div id='img_dibo'><img src="../images/xemay.png" alt="" /></div>
                                </div>
                                <div className="col-5">
                                    <span>Đi thẳng</span>
                                </div>
                                <div className="col-5">
                                    <div id='length'>
                                        <b id='length_xedap'>{isXeMayLength}</b>
                                        <p id='time_xedap'>{isXeMayTime}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="oto" role="tabpanel" aria-labelledby="pills-oto">
                        <div className='if-length'>
                            <div className="row">
                                <div className="col-2">
                                    <div id='img_dibo'><img src="../images/oto.png" alt="" /></div>
                                </div>
                                <div className="col-5">
                                    <span>Đi thẳng</span>
                                </div>
                                <div className="col-5">
                                    <div id='length'>
                                        <b id='length_xedap'>{isOToLength}</b>
                                        <p id='time_xedap'>{isOToTime}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

  )
}

export default FindWay