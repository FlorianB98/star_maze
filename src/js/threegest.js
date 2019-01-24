import * as THREE from 'three'
import Planet from './planet/planetClass.js'
import Particules from './planet/ParticulesClass.js'
import Texture1 from '../images/skin_P1.jpg'
import Texture2 from '../images/skin_P2.jpg'
import Texture3 from '../images/skin_P3.jpg'
import Texture4 from '../images/skin_P4.jpg'
import Texture5 from '../images/skin_P5.jpg'
import Texture6 from '../images/skin_P6.jpg'

const enterSpace = (n) => {

    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    
    const textureLoader = new THREE.TextureLoader()
    /**
     * maze creation
     */
    const n2 = Math.sqrt(n)
    let maze
    let aChange = false
    
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
    let planetTab = []
    let starTab = []
    let meshLineTab = []
    
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
    let materialPos = new THREE.MeshBasicMaterial({color : 0x0000ff, opacity : 0.5, transparent : true})
    let currentPos =new THREE.Mesh(new THREE.SphereGeometry(5,26,26),materialPos)

    space.add(currentPos)
    

    let star = new THREE.Mesh()
    
    for(let i = 0; i < n; i++)
    {
        
        let material
        
        const radius = Math.floor(Math.random() * (3 - 3 + 1)) + 3;
    
        if(i===0){
            material = new THREE.MeshBasicMaterial({color: 0x008000 })
        }
        else if (i === n-1)
        {
            material = new THREE.MeshBasicMaterial({color: 0xf00000 })
        }
        else{
            let skin1
            const rTexture = Math.floor(Math.random() * (6 - 1 + 1)) + 1
            if (rTexture === 1){
                skin1 = textureLoader.load(Texture1)
            }
            if (rTexture === 2){
                skin1 = textureLoader.load(Texture2)
            }
            if (rTexture === 3){
                skin1 = textureLoader.load(Texture3)
            }
            if (rTexture === 4){
                skin1 = textureLoader.load(Texture4)
            }
            if (rTexture === 5){
                skin1 = textureLoader.load(Texture5)
            }
            if (rTexture === 6){
                skin1 = textureLoader.load(Texture6)
            }
            material = new THREE.MeshStandardMaterial({map : skin1})
            // material = new THREE.MeshBasicMaterial({color: 0xffffff })
        }
    
        star = new THREE.Mesh(
            new THREE.SphereBufferGeometry(radius,26,26),material
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
        if (i=== n-1){
            planet.winner = true
        }else{
            planet.winner = false
        }
    
    
        planetTab.push(planet)
        starTab.push(star)
    
        /**
        *repartition
        **/
    
        let test = false
        if (planetTab.length>1)
        {
            while (!test){
                let k = 0
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
                      
                            randSpace(planet, j, k)
                    }
    
                    /**
                     * alignement
                     */
    
                    let sideOne = Math.sqrt(  ((planet.y - planetTab[j].y)*(planet.y - planetTab[j].y) + (planet.x - planetTab[j].x)*(planet.x - planetTab[j].x) + (planet.z - planetTab[j].z)*(planet.z - planetTab[j].z)) )
    
                    for (k = 0; k < planetTab.length-1; k++){
                        if(k!=j){
                            let sideTwo = Math.sqrt(  ((planet.y - planetTab[k].y)*(planet.y - planetTab[k].y) + (planet.x - planetTab[k].x)*(planet.x - planetTab[k].x) + (planet.z - planetTab[k].z)*(planet.z - planetTab[k].z)) )
                            let sideThree= Math.sqrt(  ((planetTab[k].y - planetTab[j].y)*(planetTab[k].y - planetTab[j].y) + (planetTab[k].x - planetTab[j].x)*(planetTab[k].x - planetTab[j].x) + (planetTab[k].z - planetTab[j].z)*(planetTab[k].z - planetTab[j].z)) )
                            let p = (1/2)*(sideOne + sideTwo + sideThree)
                            let H = (2 * Math.sqrt(p*(p-sideOne)*(p-sideTwo)*(p-sideThree)))/sideOne
                            if (H < (radius*3)){
                                randSpace(planet, j, k)
                            }
                        }
                    }
                }
                test = true
            }
        }
    
        planetTab[planetTab.length-1] = planet
        starTab[starTab.length-1] = star
    
        
        space.add(star)
    }
    
    /**
     * line gestion
     */
    
    /**
     * grey line print
     */
    
    for (let i = 0; i<n ; i++){
    
        let colonneTab = i - (Math.floor(i/n2)*n2)
        let lineTab = Math.floor(i/n2)
    
        grayLine(maze, lineTab, colonneTab, space, i, n2,planetTab)
    }
    
    /**
     * blue line print
     */
    
    for (let i = 0; i<n ; i++){
    
        let colonneTab = i - (Math.floor(i/n2)*n2)
        let lineTab = Math.floor(i/n2)
    
        if (planetTab[i].click === true){
    
                
            blueLine(maze, lineTab,colonneTab, space, i, n2,planetTab)
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
     * light
     */
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5)
    scene.add(ambientLight)

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
     * Game gestion
     */
    
    
    window.addEventListener( 'click', onMouseClick, true );
    
    function onMouseClick( event ) {
        mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
        mouse.y = -( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
        raycaster.setFromCamera( mouse, camera );
    
        for (let i = 0; i<starTab.length;i++){
            let intersects = raycaster.intersectObject(starTab[i]);
            if ( intersects.length > 0 ) {
    
                let index1
                for(let j = 0;j <planetTab.length;j++){
                    if (planetTab[j].click){
                        index1 = j
                    }
                }
    
                //found maze case
                let colonneTab = index1 - (Math.floor(index1/n2)*n2)
                let lineTab = Math.floor(index1/n2)
    
                
                if (index1 - 1 === i){
                    if (!maze[lineTab][colonneTab].left){
                        for (let y = 0; y<planetTab.length;y++){
                            planetTab[y].click = false
                        }
                        planetTab[i].click = true
                        aChange = true
                        i = starTab.length
                    }
                }
    
                if (index1 + 1 === i){
                    if (!maze[lineTab][colonneTab].right){
                        for (let y = 0; y<planetTab.length;y++){
                            planetTab[y].click = false
                        }
                        planetTab[i].click = true
                        aChange = true
                        i = starTab.length
                    }
                }
    
                if (index1 + n2 === i){
                    if (!maze[lineTab][colonneTab].bottom){
                        for (let y = 0; y<planetTab.length;y++){
                            planetTab[y].click = false
                        }
                        planetTab[i].click = true
                        aChange = true
                        i = starTab.length
                    }
                }
    
                if (index1 - n2 === i){
                    if (!maze[lineTab][colonneTab].top){
                        for (let y = 0; y<planetTab.length;y++){
                            planetTab[y].click = false
                        }
                        planetTab[i].click = true
                        aChange = true
                        i = starTab.length
                    }
                }
    
    
                //old version
    
                // for (let j = 0 ; j < planetTab.length ; j++){
                //     planetTab[j].click = false
                // }
    
                // planetTab[i].click = true
    
                // aChange = true
    
                // i = starTab.length+1
            }
        }
    
        for (let z = 0; z<planetTab.length;z++){
            if( planetTab[z].click === true && planetTab[z].winner === true ){
                console.log('win')
            }
        }
    }
    
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
    
        //update placement
        if(aChange){
    
            for (let i = 0; i<meshLineTab.length;i++){
                space.remove(meshLineTab[i])
                meshLineTab.splice(i)
            }
    
            /**
             * grey line print
             */
    
            for (let i = 0; i<n ; i++){
    
                let colonneTab = i - (Math.floor(i/n2)*n2)
                let lineTab = Math.floor(i/n2)
    
                grayLine(maze, lineTab, colonneTab, space, i, n2,planetTab)
            }
    
            /**
             * blue line print
             */
    
            for (let i = 0; i<n ; i++){
    
                let colonneTab = i - (Math.floor(i/n2)*n2)
                let lineTab = Math.floor(i/n2)
    
                if (planetTab[i].click === true){
    
                        
                    blueLine(maze, lineTab,colonneTab, space, i, n2,planetTab)
                }
    
            }
            aChange = false
        }

        for(let i = 0; i<planetTab.length;i++){
            if(planetTab[i].click){
                currentPos.position.x = planetTab[i].x
                currentPos.position.y = planetTab[i].y
                currentPos.position.z = planetTab[i].z
            }
        }
        
        
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
    
    
    
    
    /**
     * 
     * 
     * FUNCTION
     * 
     * 
     */
    
    
    
    
    function randSpace(planet, j, k){
    
        planet.x = star.position.x = ((Math.random() - 0.5) * expention)
        planet.z = star.position.z = ((Math.random() - 0.5) * expention)
        planet.y = star.position.y = ((Math.random() - 0.5) * expention)
        j=0
        k=0
    }
    
    function grayLine (maze, lineTab, colonneTab, space, i, n2, planetTab){
    
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
        meshLineTab.push(line)
    }
    
    function blueLine (maze, lineTab, colonneTab, space, i, n2, planetTab){
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
        meshLineTab.push(line)
    }
}

export default enterSpace
