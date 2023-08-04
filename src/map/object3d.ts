import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import maplibregl, {
  Map,
  MercatorCoordinate,
  CustomLayerInterface,
  NavigationControl,
  LngLatLike,
} from "maplibre-gl";
import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { GUI } from "dat.gui";
import features from '../hust/features.json';
const truck = require("../3d/car.glb");
const cay1 = require("../3d/cay1.glb");
const samba = require("../3d/vanguard@samba.glb");
const goofyrunning = require("../3d/vanguard@goofyrunning.glb");
const vanguard = require("../3d/vanguard.glb");

export function object3d(
  map: Map,
  coordinate: LngLatLike,
  name: string,
  layerName: string,
  height: number
) {
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
    scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits(),
  };

  const customLayer: any = {
    id: layerName,
    type: "custom",
    renderingMode: "3d",
    onAdd: function (map: Map, gl: WebGLRenderingContext) {
      this.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      this.camera.position.set(0, 0, 1); // Cập nhật vị trí camera của bạn tại đây
      this.scene = new THREE.Scene();

      const ambientLight = new THREE.AmbientLight(0xffffff);
      this.scene.add(ambientLight);

      const fontLoader = new FontLoader();
      fontLoader.load(
        "https://threejs.org/examples/fonts/gentilis_bold.typeface.json",
        (font) => {
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
          textMesh.rotation.set(-Math.PI / 2, 0, 0);

          this.scene.add(textMesh);
          //this.scene.add(backgroundMesh);
        }
      );

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
        this.camera = new THREE.PerspectiveCamera(
          45,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
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
    },
  };

  return customLayer;
}

export function object3dcar(map: Map) {
  const modelOrigin: [number, number] = [105.84145126927344, 21.00462842065562];
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
    id: "3d-model",
    type: "custom",
    renderingMode: "3d",
    onAdd: function (map: Map, gl: WebGLRenderingContext) {
      this.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      this.camera.position.set(0, 0, 1); // Cập nhật vị trí camera của bạn tại đây
      this.scene = new THREE.Scene();

      const ambientLight = new THREE.AmbientLight(0xffffff);
      this.scene.add(ambientLight);

      const loader = new GLTFLoader();
      loader.load(truck, (gltf) => {

        this.scene.add(gltf.scene);
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
        this.camera = new THREE.PerspectiveCamera(
          45,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
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
            modelTransform.scale * 50,
            -modelTransform.scale * 50,
            modelTransform.scale * 50
          )
        )
        .multiply(rotationX)
        .multiply(rotationY)
        .multiply(rotationZ);

      this.camera.projectionMatrix = m.multiply(l);
      this.renderer.resetState();
      this.renderer.render(this.scene, this.camera);
      this.map.triggerRepaint();
    },
  };

  return customLayer;
}

function setupCamera() {
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
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
  const modelOrigin: [number, number] = [
    105.84183747712848, 21.005014986140835,
  ];
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
    id: "3d-model10",
    type: "custom",
    renderingMode: "3d",
    onAdd: function (map: Map, gl: WebGLRenderingContext) {
      renderer = new THREE.WebGLRenderer({
        canvas: map.getCanvas(),
        context: gl,
        antialias: true,
      });

      renderer.autoClear = false;

      const loader = new GLTFLoader();
      loader.load(cay1, (gltf) => {
        const carModel = gltf.scene;
        //scene.add(carModel);
        const renderer = new THREE.WebGLRenderer();

        const backgroundMaterial = new THREE.MeshBasicMaterial({
          color: 0x3300ff,
        });
        const backgroundGeometry = new THREE.BoxGeometry(1, 1, 0.1);
        const backgroundMesh = new THREE.Mesh(
          backgroundGeometry,
          backgroundMaterial
        );
        backgroundMesh.scale.set(1, 3, 1);
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
      });
    },
    render: function (gl: WebGLRenderingContext, matrix: number[]) {
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
            modelTransform.scale * 20,
            -modelTransform.scale * 20,
            modelTransform.scale * 20
          )
        )
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

export function object3dpeople(map: Map, isArrayPath: any) {
  let modelOrigin: [number, number] = [105.84156996244047, 21.00692175742283];
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

  let mixer: THREE.AnimationMixer;
  let modelReady = false;
  let modelMesh: THREE.Object3D;
  const animationActions: THREE.AnimationAction[] = [];
  let activeAction: THREE.AnimationAction;
  let lastAction: THREE.AnimationAction;
  const targetQuaternion = new THREE.Quaternion();
  const pathPoints: [number, number][] = isArrayPath;

  const customLayer: any = {
    id: "3d-model100",
    type: "custom",
    renderingMode: "3d",
    onAdd: function (map: Map, gl: WebGLRenderingContext) {
      renderer = new THREE.WebGLRenderer({
        canvas: map.getCanvas(),
        context: gl,
        antialias: true,
      });

      renderer.autoClear = false;

      const gltfLoader = new GLTFLoader();
      gltfLoader.load(
        vanguard,
        (gltf) => {
          gltf.scene.traverse(function (child) {
            if ((child as THREE.Mesh).isMesh) {
              const m = child as THREE.Mesh;
              m.castShadow = true;
              m.frustumCulled = false;
            }
          });

          mixer = new THREE.AnimationMixer(gltf.scene);

          const animationAction = mixer.clipAction((gltf as any).animations[0]);
          animationActions.push(animationAction);
          animationsFolder.add(animations, "default");
          activeAction = animationActions[0];

          const carModel = gltf.scene;
          carModel.scale.set(30, 30, 30);
          carModel.rotation.y = 0;
          scene.add(gltf.scene);
          modelMesh = gltf.scene;

          //add an animation from another file
          gltfLoader.load(
            samba,
            (gltf) => {
              console.log("loaded samba");
              const animationAction = mixer.clipAction(
                (gltf as any).animations[0]
              );
              animationActions.push(animationAction);
              animationsFolder.add(animations, "samba");

              gltfLoader.load(
                goofyrunning,
                (gltf) => {
                  console.log("loaded goofyrunning");
                  (gltf as any).animations[0].tracks.shift(); //delete the specific track that moves the object forward while running
                  const animationAction = mixer.clipAction(
                    (gltf as any).animations[0]
                  );
                  animationActions.push(animationAction);
                  animationsFolder.add(animations, "goofyrunning");

                  modelReady = true;
                },
                (xhr) => {
                  console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
                },
                (error) => {
                  console.log(error);
                }
              );
            },
            (xhr) => {
              console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
            },
            (error) => {
              console.log(error);
            }
          );
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        (error) => {
          console.log(error);
        }
      );
      const animations = {
        default: function () {
          setAction(animationActions[0]);
        },
        samba: function () {
          setAction(animationActions[1]);
        },
        goofyrunning: function () {
          setAction(animationActions[2]);
        },
      };

      const setAction = (toAction: THREE.AnimationAction) => {
        if (toAction != activeAction) {
          lastAction = activeAction;
          activeAction = toAction;
          lastAction.stop();
          lastAction.fadeOut(0.2);
          activeAction.reset();
          activeAction.fadeIn(0.2);
          activeAction.play();
        }
      };

      const gui = new GUI();
      const animationsFolder = gui.addFolder("Animations");
      animationsFolder.open();

      const clock = new THREE.Clock();
      let delta = 0;
      function animate() {
        requestAnimationFrame(animate);
        if (modelReady) {
          delta = clock.getDelta();
          mixer.update(delta);
          if (!modelMesh.quaternion.equals(targetQuaternion)) {
            modelMesh.quaternion.rotateTowards(targetQuaternion, delta * 10);
          }
        }
        TWEEN.update();
      }
      animate();

      function updateModelOriginFromPathPoints(pathPoints: any) {
        if (!pathPoints || pathPoints.length === 0) {
          console.warn("pathPoints array is empty or not provided.");
          return;
        }
      
        const animationDuration = 9000; // Total animation duration for the whole path (adjust as needed)

        let currentIndex = 0;
      
        function animateToPoint(index: number) {
          if (index >= pathPoints.length) {
            // Animation completed
            return;
          }
      
          const startOrigin = index === 0 ? modelOrigin.slice() : pathPoints[index - 1];
          const endOrigin = pathPoints[index];
      
          new TWEEN.Tween({ x: startOrigin[0], y: startOrigin[1] })
            .to({ x: endOrigin[0], y: endOrigin[1] }, animationDuration / pathPoints.length)
            .onUpdate(({ x, y }) => {
              modelOrigin = [x, y];
              const modelAsMercatorCoordinate = maplibregl.MercatorCoordinate.fromLngLat(
                modelOrigin,
                modelAltitude
              );
              modelTransform.translateX = modelAsMercatorCoordinate.x;
              modelTransform.translateY = modelAsMercatorCoordinate.y;
              modelTransform.translateZ = modelAsMercatorCoordinate.z;
              modelTransform.scale =
              modelAsMercatorCoordinate.meterInMercatorCoordinateUnits();
            })
            .onComplete(() => {
              animateToPoint(index + 1); // Move to the next point
            })
            .start();
        }
      
        animateToPoint(currentIndex);
      }
  
      updateModelOriginFromPathPoints(pathPoints);


    },
    render: function (gl: WebGLRenderingContext, matrix: number[]) {
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

      camera.projectionMatrix = m.multiply(l);
      renderer.resetState();
      renderer.render(scene, camera);
      map.triggerRepaint();
    },
  };
  return customLayer;
}

export function object3dcar1(map: Map, isArrayPath: any, startPoint: any, animationDuration: number) {
  let modelOrigin: [number, number] = startPoint;
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

  let mixer: THREE.AnimationMixer;
  let modelReady = false;
  let carModel: THREE.Object3D;
  const animationActions: THREE.AnimationAction[] = [];
  let activeAction: THREE.AnimationAction;
  let lastAction: THREE.AnimationAction;
  const targetQuaternion = new THREE.Quaternion();
  const pathPoints: [number, number][] = isArrayPath;

  const customLayer: any = {
    id: "3d-model15",
    type: "custom",
    renderingMode: "3d",
    onAdd: function (map: Map, gl: WebGLRenderingContext) {
      renderer = new THREE.WebGLRenderer({
        canvas: map.getCanvas(),
        context: gl,
        antialias: true,
      });

      renderer.autoClear = false;

      const gltfLoader = new GLTFLoader();
      gltfLoader.load(truck, (gltf) => {
        carModel = gltf.scene;
        carModel.scale.set(30, 30, 30);
        
        scene.add(carModel);
      
        function animate() {
          requestAnimationFrame(animate);
          if (carModel) {
            //carModel.rotation.y += 0.1;
            // carModel.position.setX(1);
            // carModel.position.setZ(1);
            // carModel.rotation.x = modelTransform.rotateX;
            // carModel.rotation.y = modelTransform.rotateY;
            // carModel.rotation.z = modelTransform.rotateZ;
          }
          TWEEN.update();
          renderer.render(scene, camera);
        }
        animate();
      });

      function updateModelOriginFromPathPoints(pathPoints: any) {
        if (!pathPoints || pathPoints.length === 0) {
          console.warn("pathPoints array is empty or not provided.");
          return;
        }

        let currentIndex = 0;
      
        function animateToPoint(index: number) {
          if (index >= pathPoints.length) {
            // Animation completed
            return;
          }
      
          const startOrigin = index === 0 ? modelOrigin.slice() : pathPoints[index - 1];
          const endOrigin = pathPoints[index];
          if (index < pathPoints.length - 1) {
            const targetPoint = pathPoints[index+1];
            const dx = endOrigin[0] - startOrigin[0];
            const dy = endOrigin[1] - startOrigin[1];
            // Tính góc xoay từ vector chỉ phương
            const angleY = Math.atan2(dy, dx);   
            modelTransform.rotateY = angleY ;
          }

          new TWEEN.Tween({ x: startOrigin[0], y: startOrigin[1] })
            .to({ x: endOrigin[0], y: endOrigin[1] }, animationDuration / pathPoints.length)
            .onUpdate(({ x, y }) => {
              modelOrigin = [x, y];
              const modelAsMercatorCoordinate = maplibregl.MercatorCoordinate.fromLngLat(
                modelOrigin,
                modelAltitude
              );
              modelTransform.translateX = modelAsMercatorCoordinate.x;
              modelTransform.translateY = modelAsMercatorCoordinate.y;
              modelTransform.translateZ = modelAsMercatorCoordinate.z;
              modelTransform.scale =
              modelAsMercatorCoordinate.meterInMercatorCoordinateUnits();

              // if (index < pathPoints.length - 1) {
              //   const targetPoint = pathPoints[index + 1];
              //   const dx = targetPoint[0] - modelOrigin[0];
              //   const dy = targetPoint[1] - modelOrigin[1];

              //   const angleY = Math.atan2(dy, dx) ;
              //   modelTransform.rotateY = angleY ;

              //   // // Cập nhật góc xoay theo trục z (mặt phẳng xy)
              //   // const dz = modelAsMercatorCoordinate.z; // Điều này giả định xe di chuyển trên mặt phẳng z = 0
              //   // const angleZ = Math.atan2(dz, Math.sqrt(dx*dx + dy*dy));
              //   // modelTransform.rotateZ = -Math.PI / 2;

              //   // Cập nhật góc xoay cho carModel
              //   //carModel.rotation.x = modelTransform.rotateX;
              //   //carModel.rotation.y = modelTransform.rotateY;
              //   //carModel.rotation.z = modelTransform.rotateZ;
                
              // }
        
      
            })
            .onComplete(() => {
              animateToPoint(index + 1); // Move to the next point
            })
            .start();
        }
      
        animateToPoint(currentIndex);
      }
  
      updateModelOriginFromPathPoints(pathPoints);


    },
    render: function (gl: WebGLRenderingContext, matrix: number[]) {
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

      camera.projectionMatrix = m.multiply(l);
      renderer.resetState();
      renderer.render(scene, camera);
      map.triggerRepaint();
    },
  };
  return customLayer;
}








