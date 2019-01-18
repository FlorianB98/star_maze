import * as THREE from 'three'



export default class Particules
{
    constructor(_options)
    {
        this.textureLoader = _options.textureLoader

        this.container = new THREE.Object3D()

        this.setBelt()
    }

    

    setBelt()
    {
        this.belt = {}
        this.belt.geometry = new THREE.Geometry()

        for(let i = 0; i < 2000; i++)
        {
            const vertice = new THREE.Vector3()

            const distance = 200
            var theta = THREE.Math.randFloatSpread(360); 
            var phi = THREE.Math.randFloatSpread(360); 

            vertice.x = distance * Math.sin(theta) * Math.cos(phi);
            vertice.y = distance * Math.sin(theta) * Math.sin(phi);
            vertice.z = distance * Math.cos(theta);

            // const angle = Math.random() * Math.PI * 2
            // const distance = Math.floor(Math.random() * (200 - 100 + 1)) + 100

            // vertice.x = distance/(Math.sqrt((distance*distance)*3))
            // vertice.y = distance/(Math.sqrt((distance*distance)*3))
            // vertice.z = distance/(Math.sqrt((distance*distance)*3))

            // vertice.x = Math.sin(angle) * distance
            // vertice.y =- Math.tan(-angle) * distance
            // vertice.z = Math.cos(angle) * distance

            this.belt.geometry.vertices.push(vertice)

        }

        this.belt.material = new THREE.PointsMaterial({
            size: 1,
            sizeAttenuation: true,
            transparent: true
        })
        this.belt.points = new THREE.Points(this.belt.geometry, this.belt.material)
        this.container.add(this.belt.points)
    }

}