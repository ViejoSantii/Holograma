            import * as THREE from 'three';
            import { PeppersGhostEffect } from 'three/addons/effects/PeppersGhostEffect.js';
            import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
 
            //Se instancian las variables
                let container;
                let MyObj;
                let camera, scene, renderer, effect;
 
            //Se crea un contenedor
                container = document.createElement( 'div' );
 
                document.body.appendChild( container );
 
            //render
 
                renderer = new THREE.WebGLRenderer();
                renderer.setPixelRatio( window.devicePixelRatio );
                renderer.setAnimationLoop( animate );
                container.appendChild( renderer.domElement );
 
            //Se crea el efecto PeppersGhost
                effect = new PeppersGhostEffect( renderer );
                effect.setSize( window.innerWidth, window.innerHeight );
                effect.cameraDistance = 100;
 
                window.addEventListener( 'resize', onWindowResize );
            //Camara
                camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 100000 );
            
            //Escena
                scene = new THREE.Scene();

                //Ajuste a pantalla
 
            function onWindowResize() {
 
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
 
                effect.setSize( window.innerWidth, window.innerHeight );
 
            }

            const ligth = new THREE.AmbientLight(0xffffff,1)
            scene.add(ligth);
            ligth.intensity = 20;
             
            const spotLight = new THREE.SpotLight(0xffffff, 1);
            spotLight.position.set(10,30,10);
            spotLight.angle = Math.PI / 0;
            spotLight.penumbra = 1;
            spotLight.decay = 50;
            spotLight.distance = 0;
            spotLight.intensity = 20;
             
            spotLight.castShadow = true;
            spotLight.shadow.mapSize.width = 2000;
            spotLight.shadow.mapSize.height = 2000;
            spotLight.shadow.camera.near = 1;
            spotLight.shadow.camera.far = 1000;
            spotLight.shadow.focus = 1;
            spotLight.shadow.bias = - .003;
            scene.add(spotLight, ligth);
             
            const lightHelper = new THREE.SpotLightHelper(spotLight);
            scene.add(lightHelper);
            const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
            directionalLight.position.set(5, 10, 5);
            scene.add(directionalLight);     



//            const geometry = new THREE.BoxGeometry( 1, 1, 1 );
//            const material = new THREE.MeshBasicMaterial( { color: 0x7700ff } );
//            const cube = new THREE.Mesh( geometry, material );
//            scene.add( cube );
            
//            cube.position.y += 0;
//            cube.position.x += 0;


const fbxloader = new FBXLoader ()
fbxloader.load(
    'CPD.fbx',
    
    (object) => {
        MyObj = object;
    MyObj.scale.set(0.3,0.3,0.3);
    MyObj.position.set(0, -40, 0);
        // Ajustar materiales si están vacíos o transparentes
        MyObj.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                if (!child.material) {
                    child.material = new THREE.MeshStandardMaterial({ color: 0xffffff });
                }
            }
        });

    
    scene.add(MyObj);
    },


    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error);
    }
)

 
            // Animaciones
            function animate() {
                if (MyObj){
                 MyObj.rotation.y +=0.01;
                 //MyObj.rotation.x +=0.02;
                }
                 //cube.rotation.y += 0.1;
                 effect.render( scene, camera );
  
             }