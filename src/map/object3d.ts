import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';
import data from "../hust/data.json";
import { useRef } from 'react';
import maplibregl, { Map, MercatorCoordinate, CustomLayerInterface, NavigationControl, LngLatLike } from 'maplibre-gl';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { Mesh, MeshBasicMaterial } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { mat4 } from 'gl-matrix';
const truck =  require('../3d/truck.glb');


export function object3d(map: Map){
    const modelOrigin: [number, number] = [105.84398097970306, 21.00442542256344 ];
    const modelAltitude = 0;
    const modelRotate = [Math.PI / 2, 0, 0];
  
    const modelAsMercatorCoordinate = maplibregl.MercatorCoordinate.fromLngLat(
      modelOrigin,
      modelAltitude
    );
  
    const modelTransform = {
      translateX: modelAsMercatorCoordinate.x,
      translateY: modelAsMercatorCoordinate.y,
      translateZ: modelAsMercatorCoordinate.z,
      rotateX: modelRotate[0],
      rotateY: modelRotate[1],
      rotateZ: modelRotate[2],
      scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
    };
    
  
    const customLayer: any = {
      id: '3d-model',
      type: 'custom',
      renderingMode: '3d',
      onAdd: function (map: Map, gl:WebGLRenderingContext) {
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 0, 1); // Cập nhật vị trí camera của bạn tại đây
        this.scene = new THREE.Scene();
  
        const ambientLight = new THREE.AmbientLight(0xffffff);
        this.scene.add(ambientLight);

        const fontLoader = new FontLoader();
        fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
            const textGeometry = new TextGeometry('Thu vien ta quang buu', {
            font: font,
            size: 1,
            height: 0.1,
            curveSegments: 5,
            });

            const textMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);
            textMesh.position.set(0, 5, 5);
            textMesh.rotation.set(0, Math.PI / 2, 0);
            this.scene.add(textMesh);
        });
  
        this.map = map;
  
        this.renderer = new THREE.WebGLRenderer({
          canvas: map.getCanvas(),
          context: gl,
          antialias: true
        });
  
        this.renderer.autoClear = false;
      },
      render: function (gl: WebGLRenderingContext, matrix: number[]) {
        if (!this.camera) {
          this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
          this.camera.position.set(0, 0, 1);
        }
      
        const rotationX = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(1, 0, 0),
          modelTransform.rotateX
        );
        const rotationY = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(0, 1, 0),
          modelTransform.rotateY
        );
        const rotationZ = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(0, 0, 1),
          modelTransform.rotateZ
        );
      
        const m = new THREE.Matrix4().fromArray(matrix);
        const l = new THREE.Matrix4()
          .makeTranslation(
            modelTransform.translateX,
            modelTransform.translateY,
            modelTransform.translateZ
          )
          .scale(
            new THREE.Vector3(
              modelTransform.scale*5,
              -modelTransform.scale*5,
              modelTransform.scale*10
            )
          )
          .multiply(rotationX)
          .multiply(rotationY)
          .multiply(rotationZ);
      
        this.camera.projectionMatrix = m.multiply(l);
        this.renderer.resetState();
        this.renderer.render(this.scene, this.camera);
        this.map.triggerRepaint();
      }
    };
  
    return customLayer;
}

export function object3d1(map: Map) {
    const modelAltitude = 0;
    const modelRotate = [Math.PI / 2, 0, 0];
  
    const customLayer: any = {
      id: '3d-model1',
      type: 'custom',
      renderingMode: '3d',
      onAdd: function (map: Map, gl: WebGLRenderingContext) {
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 0, 1);
        this.scene = new THREE.Scene();
  
        const ambientLight = new THREE.AmbientLight(0xffffff);
        this.scene.add(ambientLight);
  
        const fontLoader = new FontLoader();
        fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
            for (const feature of data.features){            
            const  coordinate: any= feature.geometry.coordinates
            const  name  = feature.properties.name;
  console.log(coordinate);
  
            const modelAsMercatorCoordinate = maplibregl.MercatorCoordinate.fromLngLat(
              coordinate,
              modelAltitude
            );
  
            const modelTransform = {
              translateX: modelAsMercatorCoordinate.x,
              translateY: modelAsMercatorCoordinate.y,
              translateZ: modelAsMercatorCoordinate.z,
              rotateX: modelRotate[0],
              rotateY: modelRotate[1],
              rotateZ: modelRotate[2],
              scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits(),
            };
  
            const textGeometry = new TextGeometry(name, {
              font: font,
              size: 1,
              height: 0.1,
              curveSegments: 0.1,
            });
  
            const textMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);
            textMesh.position.set(modelTransform.translateX, modelTransform.translateY, modelTransform.translateZ);
            textMesh.rotation.set(modelTransform.rotateX, modelTransform.rotateY, modelTransform.rotateZ);
            textMesh.userData.modelTransform = modelTransform; 
            this.scene?.add(textMesh);
            
          }
        });
  
        this.map = map;
  
        this.renderer = new THREE.WebGLRenderer({
          canvas: map.getCanvas(),
          context: gl,
          antialias: true,
        });
  
        this.renderer.autoClear = false;
      },
      render: function (gl: WebGLRenderingContext, matrix: number[]) {
        if (!this.camera) {
          this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
          this.camera.position.set(0, 0, 1);
        }
  
        const rotationX = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(1, 0, 0),
          modelRotate[0]
        );
        const rotationY = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(0, 1, 0),
          modelRotate[1]
        );
        const rotationZ = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(0, 0, 1),
          modelRotate[2]
        );
  
        const m = new THREE.Matrix4().fromArray(matrix);
  
        if (this.scene && this.renderer) {
          this.scene.traverse((object: any) => {
            if (object instanceof THREE.Mesh) {
              const { translateX, translateY, translateZ, scale } = object.userData.modelTransform;
  
              const l = new THREE.Matrix4()
                .makeTranslation(translateX, translateY, translateZ)
                .scale(new THREE.Vector3(scale, -scale, scale))
                .multiply(rotationX)
                .multiply(rotationY)
                .multiply(rotationZ);
  
              object.matrix = m.multiply(l);
              object.matrixWorldNeedsUpdate = true;
            }
          });
  
          this.renderer.resetState();
          this.renderer.render(this.scene, this.camera);
          this.map?.triggerRepaint();
        }
      }
    };
  
    return customLayer;
}
  
  