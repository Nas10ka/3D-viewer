import { useEffect, useRef } from 'react'; 
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const FOV = 75;// вертикальний кут огляду в градусах
const NEAR = 0.1; // найближча видима відстань 
const FAR = 1000; // найдальша видима відстань
const ThreeScene = () => {

    const containerRef = useRef<HTMLDivElement>(null);
 
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const ASPECT = container.clientWidth / container.clientHeight; // ширина_vieport:висота
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR);
        const renderer = new THREE.WebGLRenderer({antialias: true});
        camera.position.z = 2;

        const controlers = new OrbitControls(camera, renderer.domElement);
        controlers.enableDamping = true;
        controlers.dampingFactor = 0.03;

        const geo = new THREE.IcosahedronGeometry(1, 10);
        const mat = new THREE.MeshStandardMaterial({ 
            color: 0xffffff,
            flatShading: true,
        });
        const mesh = new THREE.Mesh(geo, mat);
        scene.add(mesh);

        const wireMat = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
        });
        const wireMesh = new THREE.Mesh(geo, wireMat);
        wireMesh.scale.multiplyScalar(1.0001);
        scene.add(wireMesh);

        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000, 1.0);
        scene.add(hemiLight);

        renderer.setSize(container.clientWidth, container.clientHeight);
        if (!container?.hasChildNodes()) {
            container.appendChild(renderer.domElement);
        }
        const animate = (t = 0) => {
            requestAnimationFrame(animate);
            // mesh.rotation.y = t * 0.0001;
            renderer.render(scene, camera);
            controlers.update();
        }
        animate();
        renderer.render(scene, camera);


    }, [])

    
    return (<div style={{ 
        margin: 'auto',
        width: '100vh', 
        height: '100vh' }} ref={containerRef}>

    </div>)
}

export default ThreeScene;