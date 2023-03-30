import * as THREE from 'three';
import { FloatType } from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

// <---- Scene ---->
const scene = new THREE.Scene();
    // <---- Texture generator ---->
const textureLoader = new THREE.TextureLoader();


    // <---- Sphere ---->
const saturnGeom = new THREE.SphereGeometry(1);
const saturnMat = new THREE.MeshBasicMaterial({color:'orange'});
saturnMat.map = textureLoader.load('../public/lava-006/Lava_006_basecolor.jpg');
const saturn = new THREE.Mesh(saturnGeom, saturnMat);

scene.add(saturn);
    // <---- Moon ---->
const moonGeom = new THREE.SphereGeometry(0.2);
const moonMat = new THREE.MeshBasicMaterial({color:'lightpink'});
moonMat.map = textureLoader.load('../public/lava-006/Lava_006_ambientOcclusion.jpg');

const moon = new THREE.Mesh(moonGeom, moonMat);

moon.position.x = 2
scene.add(moon);
    // <---- Ring ---->
const ringGeom = new THREE.BufferGeometry();
const particleNbr = 2000;
const ringPositions = new Float32Array(particleNbr * 5);
const ringColors = new Float32Array(particleNbr * 5);

for(let i = 0; i < particleNbr; i++){
    
    const i3 = i*3;
    const radius = 2 + Math.random();
    const randAngle = Math.random() * (Math.PI * 2);

    ringPositions[i3] = Math.cos(randAngle) * radius;
    ringPositions[i3 + 1] = (Math.random() - 0.5) * 0.1;
    ringPositions[i3 + 2] = Math.sin(randAngle) * radius;

    ringColors[i3 ] = Math.random();
    ringColors[i3 + 1] = Math.random();
    ringColors[i3 + 2] = Math.random();
}
ringGeom.setAttribute('position',new THREE.BufferAttribute(ringPositions, 3));
ringGeom.setAttribute('color',new THREE.BufferAttribute(ringColors, 3));
const ringMat = new THREE.PointsMaterial({sizeAttenuation:true, depthWrite:false, blending:THREE.AdditiveBlending, vertexColors:true, size:0.05});

const ring = new THREE.Points(ringGeom, ringMat);
scene.add(ring);
    // <---- Cube ---->
// const geometry = new THREE.BoxGeometry(1,1,1);
// const material = new THREE.MeshBasicMaterial({color: 'red', wireframe:true});

// const mesh = new THREE.Mesh(geometry, material); 

// scene.add(mesh); 

// <---- Camera ---->
const sizes = {
    width : window.innerWidth,
    height:window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    
    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    
    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // renderer.render(scene, camera)
});

const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height);
camera.position.set(3, 3, 3);
const center = new THREE.Vector3(0);
camera.lookAt(center);
// camera.aspect = sizes.width / sizes.height;
scene.add(camera);



// <---- Rendeerer ---->
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas:canvas});
renderer.setSize(sizes.width, sizes.height);

renderer.render(scene,camera);



// <---- Obirt Control ---->

const controls = new OrbitControls(camera, canvas);

controls.enableDamping = true; 

// <---- Clock/ Rotation ---->
const clock = new THREE.Clock();

const tick = () =>{
    
    const elapsedTime = clock.getElapsedTime();
    // console.log(elapsedTime); //will show second

    // mesh.rotation.y = elapsedTime * Math.PI * 2;
    // mesh.rotation.y = Math.sin(elapsedTime * 2);
    // mesh.rotation.x = Math.cos(elapsedTime * 2);

    controls.update();
    // <---- Moon Rotation ---->
    moon.position.x = Math.cos(elapsedTime)*3;
    moon.position.z = Math.sin(elapsedTime)*3

    // mesh.rotation.x = elapsedTime * Math.PI;

    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);

}
tick();

