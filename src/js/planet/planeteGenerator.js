import Planet from './planetClass'

function funcPlanetGene(n){
    let Systemes = []
    for (let i=0; i<n; i++){
        let Systeme = []
        for (let j=0; j<n; j++){
            let planet = new Planet()
            //à completer
            planet.x = Math.floor(Math.random() * (1.5 - 1 + 1)) + 1;
            planet.y = Math.floor(Math.random() * (1.5 - 1 + 1)) + 1;
            planet.r = Math.floor(Math.random() * (0.2 - 0.1 + 1)) + 0.1;
            //planet.skin = 
            planet.click = false
            Systeme[j]=planet
        }
        Systemes[i]=Systeme
    }
    return Systemes
}