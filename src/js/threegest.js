import * as THREE from 'three'

let n = 16
let touch = false
let planetTab= []
import Planet from './planet/planetClass'

import grassTextureSource from '../images/textures/house/grass.jpg'
/**
 * Textures
 */
// const textureLoader = new THREE.TextureLoader()

// const grassTexture = textureLoader.load(grassTextureSource)
// grassTexture.wrapS = THREE.RepeatWrapping
// grassTexture.wrapT = THREE.RepeatWrapping
// grassTexture.repeat.x = 4
// grassTexture.repeat.y = 4

/**
 * Sizes
 */
const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight

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
})

/**
 * Cursor
 */
const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (_event) =>
{
    cursor.x = _event.clientX / sizes.width - 0.75
    cursor.y = _event.clientY / sizes.height - 0.75
})

/**
 * Scene
 */
const scene = new THREE.Scene()

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 400
scene.add(camera)

/**
 * House
 */
const space = new THREE.Object3D()
scene.add(space)



for(let i = 0; i < n; i++)
{
    const radius = Math.floor(Math.random() * (15 - 15 + 1)) + 15;

    let material

    if(i===0){
        material = new THREE.MeshBasicMaterial({color: 0x008000 })
    }
    else if (i === n-1)
    {
        material = new THREE.MeshBasicMaterial({color: 0xf00000 })
    }
    else{
        material = new THREE.MeshBasicMaterial({color: 0xffffff })
    }

    const star = new THREE.Mesh(
        new THREE.SphereGeometry(radius,26,26),material
    )
    star.position.x = ((Math.random() - 0.5) * 300)
    star.position.z = (Math.random() - 0.5) * 300
    star.position.y = (Math.random() - 0.5) * 300

    let planet = new Planet
    planet.x = star.position.x
    planet.z = star.position.z
    planet.y = star.position.y
    planet.r = radius


    planetTab.push(planet)

    let test = false
    if (planetTab.length>1)
    {
        while (!test){
            for(let j = 0; j < planetTab.length-1; j++)
            {
                if( 
                    Math.sqrt( 
                        ((planet.y - planetTab[j].y)*(planet.y - planetTab[j].y) + 
                        (planet.x - planetTab[j].x)*(planet.x - planetTab[j].x) + 
                        (planet.z - planetTab[j].z)*(planet.z - planetTab[j].z)) ) 
                        <= radius*5){
                  
                        planet.x = star.position.x = ((Math.random() - 0.5) * 250)
                        planet.z = star.position.z = ((Math.random() - 0.5) * 250)
                        planet.y = star.position.y = ((Math.random() - 0.5) * 250)
                        j=0
                }
            }
            test = true
        }
    }

    planetTab[planetTab.length-1] = planet

    
    space.add(star)
}



/**
 * Lights
 */


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)

/** 
 * camera gestion 
 */
window.addEventListener('mousedown', function (event) {

    touch = true

    event.preventDefault(); 
    let mouseX= event.clientX
    let mouseY = event.clientY
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    function onMouseMove(_event) {

        space.rotation.x += (-(mouseY - _event.clientY) *0.01)
        space.rotation.y += ( (mouseX - _event.clientX) * 0.01 )
        camera.lookAt(new THREE.Vector3())

        mouseX = _event.clientX
        mouseY = _event.clientY
        console.log(mouseX)
    }

    function onMouseUp() {

        window.removeEventListener('mouseup', onMouseUp);
        window.removeEventListener('mousemove', onMouseMove);
    }

    });

/**
 * Loop
 */
const loop = () =>
{
    window.requestAnimationFrame(loop)

    // Update house
    if (!touch){
        space.rotation.y += 0.003
    }

    // Update camera
    
    
    // Renderer
    renderer.render(scene, camera)
}
loop()

// // Hot
// if(module.hot)
// {
//     module.hot.accept()

//     module.hot.dispose(() =>
//     {
//         console.log('dispose')
//     })
// }