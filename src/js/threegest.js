import * as THREE from 'three'
import Planet from './planet/planetClass.js'
import Particules from './planet/ParticulesClass.js'

const textureLoader = new THREE.TextureLoader()
/**
 * maze creation
 */
const n = 16
const n2 = Math.sqrt(n)
let maze

function mazegene(n2){
    let generator = require('generate-maze')
    maze = generator(n2)
}
mazegene(n2)


let expention
let position

if (n === 9){
    expention = 70
    position = 80
}
if (n === 16 ){
    expention = 80
    position = 90
}
if (n === 25 ){
    expention = 120
    position = 130
}
if (n === 36 ){
    expention = 150
    position = 170
}
if (n === 42 ){
    expention = 180
    position = 200
}
let touch = false
let planetTab= []

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

// window.addEventListener('mousemove', (_event) =>
// {
//     cursor.x = _event.clientX / sizes.width - 0.75
//     cursor.y = _event.clientY / sizes.height - 0.75
// })

/**
 * Scene
 */
const scene = new THREE.Scene()

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = position
scene.add(camera)

const space = new THREE.Object3D()
scene.add(space)

/**
 * creation of planets
 */

for(let i = 0; i < n; i++)
{
    const radius = Math.floor(Math.random() * (2.5 - 2.5 + 1)) + 2.5;

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
    star.position.x = ((Math.random() - 0.5) * expention)
    star.position.z = (Math.random() - 0.5) * expention
    star.position.y = (Math.random() - 0.5) * expention

    let planet = new Planet
    planet.x = star.position.x
    planet.z = star.position.z
    planet.y = star.position.y
    planet.r = radius
    if (i === 0){
        planet.click = true
    }


    planetTab.push(planet)

    /**
    *repartition
    **/

    let test = false
    if (planetTab.length>1)
    {
        while (!test){
            for(let j = 0; j < planetTab.length-1; j++){

                /**
                 * espacement
                 */

                if( 
                    Math.sqrt( 
                        ((planet.y - planetTab[j].y)*(planet.y - planetTab[j].y) + 
                        (planet.x - planetTab[j].x)*(planet.x - planetTab[j].x) + 
                        (planet.z - planetTab[j].z)*(planet.z - planetTab[j].z)) ) 
                        <= radius*5){
                  
                        planet.x = star.position.x = ((Math.random() - 0.5) * expention)
                        planet.z = star.position.z = ((Math.random() - 0.5) * expention)
                        planet.y = star.position.y = ((Math.random() - 0.5) * expention)
                        j=0
                }

                /**
                 * alignement
                 */

                let sideOne = Math.sqrt(  ((planet.y - planetTab[j].y)*(planet.y - planetTab[j].y) + (planet.x - planetTab[j].x)*(planet.x - planetTab[j].x) + (planet.z - planetTab[j].z)*(planet.z - planetTab[j].z)) )

                for (let k = 0; k < planetTab.length-1; k++){
                    if(k!=j){
                        let sideTwo = Math.sqrt(  ((planet.y - planetTab[k].y)*(planet.y - planetTab[k].y) + (planet.x - planetTab[k].x)*(planet.x - planetTab[k].x) + (planet.z - planetTab[k].z)*(planet.z - planetTab[k].z)) )
                        let sideThree= Math.sqrt(  ((planetTab[k].y - planetTab[j].y)*(planetTab[k].y - planetTab[j].y) + (planetTab[k].x - planetTab[j].x)*(planetTab[k].x - planetTab[j].x) + (planetTab[k].z - planetTab[j].z)*(planetTab[k].z - planetTab[j].z)) )
                        let p = (1/2)*(sideOne + sideTwo + sideThree)
                        let H = (2 * Math.sqrt(p*(p-sideOne)*(p-sideTwo)*(p-sideThree)))/sideOne
                        if (H < (radius*2,5)){
                            planet.x = star.position.x = ((Math.random() - 0.5) * expention)
                            planet.z = star.position.z = ((Math.random() - 0.5) * expention)
                            planet.y = star.position.y = ((Math.random() - 0.5) * expention)
                            j=0
                            k=0
                        }
                    }
            }

                                
            }
            test = true
        }
    }

    planetTab[planetTab.length-1] = planet

    
    space.add(star)
}

/**
 * line gestion
 */

/**
 * all line print
 */

for (let i = 0; i<n ; i++){

    let colonneTab = i - (Math.floor(i/n2)*n2)
    let lineTab = Math.floor(i/n2)

    if (maze[lineTab][colonneTab].top === false){

        var material = new THREE.LineBasicMaterial({
            color: 0xA9A9A9
        })
        
        var geometry = new THREE.Geometry();
        geometry.vertices.push(
            new THREE.Vector3(  planetTab[i].x, planetTab[i].y, planetTab[i].z ),
            new THREE.Vector3(  planetTab[i-n2].x, planetTab[i-n2].y, planetTab[i-n2].z ),
        );
        
        var line = new THREE.Line( geometry, material );
        space.add( line );
        

    }
    if (maze[lineTab][colonneTab].bottom === false){

        var material = new THREE.LineBasicMaterial({
            color: 0xA9A9A9
        })
        
        var geometry = new THREE.Geometry();
        geometry.vertices.push(
            new THREE.Vector3(  planetTab[i].x, planetTab[i].y, planetTab[i].z ),
            new THREE.Vector3(  planetTab[i+n2].x, planetTab[i+n2].y, planetTab[i+n2].z ),
        );
        
        var line = new THREE.Line( geometry, material );
        space.add( line );

    }
    if (maze[lineTab][colonneTab].right === false){

        var material = new THREE.LineBasicMaterial({
            color: 0xA9A9A9
        })
        
        var geometry = new THREE.Geometry();
        geometry.vertices.push(
            new THREE.Vector3(  planetTab[i].x, planetTab[i].y, planetTab[i].z ),
            new THREE.Vector3(  planetTab[i+1].x, planetTab[i+1].y, planetTab[i+1].z ),
        );
        
        var line = new THREE.Line( geometry, material );
        space.add( line );

    }
    if (maze[lineTab][colonneTab].left === false){

        var material = new THREE.LineBasicMaterial({
            color: 0xA9A9A9
        })
        
        var geometry = new THREE.Geometry();
        geometry.vertices.push(
            new THREE.Vector3(  planetTab[i].x, planetTab[i].y, planetTab[i].z ),
            new THREE.Vector3(  planetTab[i-1].x, planetTab[i-1].y, planetTab[i-1].z ),
        );
        
        var line = new THREE.Line( geometry, material );
        space.add( line );

    }
}

/**
 * blue line print
 */

for (let i = 0; i<n ; i++){

    let colonneTab = i - (Math.floor(i/n2)*n2)
    let lineTab = Math.floor(i/n2)

    if (planetTab[i].click === true){
        
    if (maze[lineTab][colonneTab].top === false){

        var material = new THREE.LineBasicMaterial({
            color: 0x0000ff
        })
        
        var geometry = new THREE.Geometry();
        geometry.vertices.push(
            new THREE.Vector3(  planetTab[i].x, planetTab[i].y, planetTab[i].z ),
            new THREE.Vector3(  planetTab[i-n2].x, planetTab[i-n2].y, planetTab[i-n2].z ),
        );
        
        var line = new THREE.Line( geometry, material );
        space.add( line );
        

    }
    if (maze[lineTab][colonneTab].bottom === false){

        var material = new THREE.LineBasicMaterial({
            color: 0x0000ff
        })
        
        var geometry = new THREE.Geometry();
        geometry.vertices.push(
            new THREE.Vector3(  planetTab[i].x, planetTab[i].y, planetTab[i].z ),
            new THREE.Vector3(  planetTab[i+n2].x, planetTab[i+n2].y, planetTab[i+n2].z ),
        );
        
        var line = new THREE.Line( geometry, material );
        space.add( line );

    }
    if (maze[lineTab][colonneTab].right === false){

        var material = new THREE.LineBasicMaterial({
            color: 0x0000ff
        })
        
        var geometry = new THREE.Geometry();
        geometry.vertices.push(
            new THREE.Vector3(  planetTab[i].x, planetTab[i].y, planetTab[i].z ),
            new THREE.Vector3(  planetTab[i+1].x, planetTab[i+1].y, planetTab[i+1].z ),
        );
        
        var line = new THREE.Line( geometry, material );
        space.add( line );

    }
    if (maze[lineTab][colonneTab].left === false){

        var material = new THREE.LineBasicMaterial({
            color: 0x0000ff
        })
        
        var geometry = new THREE.Geometry();
        geometry.vertices.push(
            new THREE.Vector3(  planetTab[i].x, planetTab[i].y, planetTab[i].z ),
            new THREE.Vector3(  planetTab[i-1].x, planetTab[i-1].y, planetTab[i-1].z ),
        );
        
        var line = new THREE.Line( geometry, material );
        space.add( line );

    }
    }

}


/**
 * particules gestion
 */

const planet = new Particules({
    textureLoader: textureLoader
})
space.add(planet.container)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    antialias : true
})
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
        space.rotation.y += -( (mouseX - _event.clientX) * 0.01 )
        camera.lookAt(new THREE.Vector3())

        mouseX = _event.clientX
        mouseY = _event.clientY
    }

    function onMouseUp() {

        window.removeEventListener('mouseup', onMouseUp);
        window.removeEventListener('mousemove', onMouseMove);
    }

    });

    window.addEventListener('wheel',function(zoom){
        camera.position.z -= zoom.deltaY/2
        if (camera.position.z>=200){
            camera.position.z = 199
        }
        if (camera.position.z<=0){
            camera.position.z = 1
        }
    })

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