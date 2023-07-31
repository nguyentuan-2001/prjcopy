import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import maplibregl, { Map, MercatorCoordinate, CustomLayerInterface, NavigationControl, LngLatLike } from 'maplibre-gl';
import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
const truck =  require('../3d/car.glb');
export function object3d(map: Map, coordinate: LngLatLike, name: string,layerName: string, height: number){
    const modelAltitude = 0;
    const modelRotate = [Math.PI / 2, 0, 0];
  
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
      scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
    };
    
  
    const customLayer: any = {
      id: layerName,
      type: 'custom',
      renderingMode: '3d',
      onAdd: function (map: Map, gl:WebGLRenderingContext) {
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 0, 1); // Cập nhật vị trí camera của bạn tại đây
        this.scene = new THREE.Scene();
  
        const ambientLight = new THREE.AmbientLight(0xffffff);
        this.scene.add(ambientLight);
  
        const fontLoader = new FontLoader();
        fontLoader.load('https://threejs.org/examples/fonts/gentilis_bold.typeface.json', (font) => {
            const textGeometry = new TextGeometry(name, {
            font: font,
            size: 1,
            height: 1,
            curveSegments: 5,
            });
  
            // const backgroundMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
            // const backgroundGeometry = new THREE.BoxGeometry(textLength, 1, 0.1);
            // const backgroundMesh = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
            // backgroundMesh.position.set(0, 51, -textLength);
            // backgroundMesh.rotation.set(0, Math.PI / 2, 0);
            // backgroundMesh.scale.set(textLength/5,7,1);
  
            const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);
            textMesh.position.set(0, height, 0);
            textMesh.scale.set(2.5, 2.5, 0.5);
            textMesh.rotation.set(-Math.PI / 2,0, 0);
  
            this.scene.add(textMesh);
            //this.scene.add(backgroundMesh);
  
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
              modelTransform.scale,
              -modelTransform.scale,
              modelTransform.scale
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

export function object3dcar(map: Map){
  const modelOrigin: [number, number] = [105.84145126927344, 21.00462842065562 ];
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

      const loader = new GLTFLoader();
      loader.load(
        truck,
        (gltf) => {
          this.scene.add(gltf.scene);
        }
      );

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
            modelTransform.scale*50,
            -modelTransform.scale*50,
            modelTransform.scale*50
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


function setupCamera() {
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 1); // Set your camera position here
  return camera;
}

function setupScene() {
  const scene = new THREE.Scene();
  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);
  return scene;
}
const scene = setupScene();
const camera = setupCamera();
let renderer: THREE.WebGLRenderer;

export function object3dcube(map: Map) {
  const modelOrigin: [number, number] = [105.84183747712848, 21.005014986140835];
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
    scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits(),
  };

  const customLayer: any = {
    id: '3d-model10',
    type: 'custom',
    renderingMode: '3d',
    onAdd: function (map: Map, gl: WebGLRenderingContext) {
        renderer = new THREE.WebGLRenderer({
        canvas: map.getCanvas(),
        context: gl,
        antialias: true,
      });

      renderer.autoClear = false;

      const loader = new GLTFLoader();
      loader.load(
        truck,
        (gltf) => {
          const carModel = gltf.scene;
          //scene.add(carModel);
          const renderer = new THREE.WebGLRenderer();

          const backgroundMaterial = new THREE.MeshBasicMaterial({ color: 0x3300FF });
          const backgroundGeometry = new THREE.BoxGeometry(1, 1, 0.1);
          const backgroundMesh = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
          backgroundMesh.scale.set(1,3,1);
          scene.add(backgroundMesh);

          function animate() {
            requestAnimationFrame(animate);
            if (backgroundMesh) {
              backgroundMesh.rotation.y += 0.1;
              // carModel.position.setX(1);
              // carModel.position.setZ(1);
            }
            renderer.render(scene, camera);
          }
          animate();
          }
      );
    },
    render: function (gl: WebGLRenderingContext, matrix: number[]) {
      const rotationX = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1, 0, 0), modelTransform.rotateX);
      const rotationY = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 1, 0), modelTransform.rotateY);
      const rotationZ = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 0, 1), modelTransform.rotateZ);

      const m = new THREE.Matrix4().fromArray(matrix);
      const l = new THREE.Matrix4()
        .makeTranslation(modelTransform.translateX, modelTransform.translateY, modelTransform.translateZ)
        .scale(new THREE.Vector3(modelTransform.scale * 20, -modelTransform.scale * 20, modelTransform.scale * 20))
        .multiply(rotationX)
        .multiply(rotationY)
        .multiply(rotationZ);

      camera.projectionMatrix = m.multiply(l);
      renderer.resetState();
      renderer.render(scene, camera);
      map.triggerRepaint();
    },
  };
  return customLayer;
}