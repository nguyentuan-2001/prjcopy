import { Map } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import PathFinder from "geojson-path-finder";
import { point } from "@turf/helpers";
import * as geolib from 'geolib';
import data from '../hust/data.json';
import distance from '@turf/distance';
const roads = require('../hust/bd.geojson');


// update option list
function updateOptions(options: string[], selectElement: HTMLSelectElement) {
    // delete list
    while (selectElement.firstChild) {
    selectElement.removeChild(selectElement.firstChild);
    }
    //add list address
    options.forEach(function(option) {
        var optionElement = document.createElement('option');
        optionElement.textContent = option;
        selectElement.appendChild(optionElement);
    });
}

export function findway(map: Map){
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
        map.setZoom(16.5);
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

            const calculatedDistance = distance(startp, finish,{ units: 'kilometers' });
            const calculatedDistanceInMeters = calculatedDistance * 1000;
            
            const showIfLength = document.getElementById('navigation__child') as HTMLElement;
            showIfLength.style.display= 'block';
    
            const element = document.getElementById("length_street") as HTMLElement;
            const datasearch = `${calculatedDistanceInMeters.toFixed(2)} m`;
            if (element) {
                element.innerText = datasearch;
            }

            const averageSpeed = 5; // Tốc độ di chuyển trung bình (kilomet/giờ)
            const travelTimeInHours = calculatedDistance / averageSpeed; // Thời gian di chuyển (giờ)
            // Chuyển đổi thời gian di chuyển sang phút và giây
            const travelTimeInMinutes = travelTimeInHours * 60;

            const elements = document.getElementById("time_street") as HTMLElement;
            const datasearchs = `${travelTimeInMinutes.toFixed(2)} phút`;

            if (elements) {
                elements.innerText = datasearchs;
            }

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
                        'line-color': '#6527BE',
                        'line-opacity': 1,
                        'line-width': 4,
                        },
                    });
                    map.addLayer({
                        id: 'path-layer1',
                        type: 'line',
                        source: 'path',
                        paint: {
                        'line-color': '#9681EB',
                        'line-opacity': 0.5,
                        'line-width': 12,
                        },
                    });
                }
                // map.moveLayer('path-layer', 'home-layer');
                // map.moveLayer('path-layer1', 'home-layer');
                // map.moveLayer('path-layer', '3d-building');
                // map.moveLayer('path-layer1', '3d-building');
                
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
