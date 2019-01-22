import './css/style.styl'
import enterSpace from './js/threegest.js'

import * as THREE from 'three'
import Planet from './js/planet/planetClass.js'
import Particules from './js/planet/ParticulesClass.js'


const body = document.body
const playBoutton = document.querySelector('.playBoutton')
const lvlBoutton_1 = document.querySelector('.lvlBoutton_1')
const lvlBoutton_2 = document.querySelector('.lvlBoutton_2')
const lvlBoutton_3 = document.querySelector('.lvlBoutton_3')
const lvlBoutton_4 = document.querySelector('.lvlBoutton_4')

let first = true
let n = 9

lvlBoutton_1.addEventListener('click', ()=>{
    n=9
    lvlBoutton_1.style.border = '5px solid white'
    lvlBoutton_2.style.border = 'none'
    lvlBoutton_3.style.border = 'none'
    lvlBoutton_4.style.border ='none'
})
lvlBoutton_2.addEventListener('click', ()=>{
    n=16
    lvlBoutton_2.style.border = '5px solid white'
    lvlBoutton_1.style.border = 'none'
    lvlBoutton_3.style.border = 'none'
    lvlBoutton_4.style.border = 'none'
})
lvlBoutton_3.addEventListener('click', ()=>{
    n=25
    lvlBoutton_3.style.border = '5px solid white'
    lvlBoutton_1.style.border = 'none'
    lvlBoutton_2.style.border = 'none'
    lvlBoutton_4.style.border = 'none'
})
lvlBoutton_4.addEventListener('click', ()=>{
    n=36
    lvlBoutton_4.style.border = '5px solid white'
    lvlBoutton_1.style.border = 'none'
    lvlBoutton_3.style.border = 'none'
    lvlBoutton_2.style.border = 'none'
})


playBoutton.addEventListener('click', ()=>{
    if (!first){
        let canvas = document.querySelector('canvas')
        body.removeChild(canvas)
    }
    first = false
    enterSpace(n)
})
