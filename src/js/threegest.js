import * as THREE from 'three'

let n = 9
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
camera.position.z = 100
scene.add(camera)

/**
 * House
 */
const space = new THREE.Object3D()
scene.add(space)



for(let i = 0; i < n; i++)
{
    const radius = Math.floor(Math.random() * (10 - 10 + 1)) + 10;

    const star = new THREE.Mesh(
        new THREE.SphereGeometry(radius),
        new THREE.MeshBasicMaterial({color: 0xffffff })
    )
    star.position.x = ((Math.random() - 0.5) * 100)
    star.position.z = (Math.random() - 0.5) * 100
    star.position.y = (Math.random() - 0.5) * 100

    let planet = new Planet
    planet.x = star.position.x
    planet.z = star.position.z
    planet.y = star.position.y
    planet.r = radius

    planetTab.push(planet)

    let test = false

    
    // while (!test){
    //     for(let j = 0; j < planetTab.length-1; i++)
    //     {
    //         if()
    //     }
    // }

    space.add(star)
}
console.log(planetTab)



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
 * Loop
 */
const loop = () =>
{
    window.requestAnimationFrame(loop)

    // Update house
    space.rotation.y += 0.003

    // Update camera
    camera.position.x = cursor.x * 3
    camera.position.y = - cursor.y * 3
    camera.lookAt(new THREE.Vector3())

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