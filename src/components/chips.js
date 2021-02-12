
import {CylinderGeometry, BoxGeometry, MeshStandardMaterial, Mesh } from 'three'
/*
To access the mesh:
    place.add(chip)
where place is the scene or object that is chip is being added to. 
*/

const WIDTH = 2
const HEIGHT = 2
const DEPTH = 0.5
const POSITION_Y = -0.25
const ROTATE_NINETY = Math.PI/2
const BODY_COLOR = 0x323232
const WIRE_COLOR = 0xC0C0C0

class Chips extends Mesh{
    constructor(sides, location){
        super()
        this.location = location
        var body = new Mesh()
        this.makeChip(sides, body)
        body.rotation.set(ROTATE_NINETY, 0, 0)
        this.add(body)
        this.position.y = POSITION_Y
    }

    makeChip(sides, body){
        body.geometry = new BoxGeometry(WIDTH, HEIGHT, DEPTH)
        body.material = new MeshStandardMaterial({color: BODY_COLOR})
        body.mesh = new Mesh(body.geometry, body.material)

        var i, j, wire
        if(sides === 2 || sides === 4) {
            for(j = -1; j<=1; j+=2) {
                for(i=-9; i<10; i++) {
                    wire = new Mesh()
                    this.makeWire(wire)
                    wire.position.set(0.05*i*WIDTH, 0.5*HEIGHT*j, 0)
                    if(j===-1) {
                        wire.rotateZ(3.14)
                    }
                    body.add(wire)
                }
            }
        }
        if(sides === 4) {
            for(j = -1; j<=1; j+=2) {
                for(i=-9; i<10; i++) {
                    wire = new Mesh()
                    this.makeWire(wire)
                    wire.position.set(0.5*WIDTH*j, 0.05*i*HEIGHT, 0)
                    wire.rotateZ(1.57)
                    if(j===1) {
                        wire.rotateZ(3.14)
                    }
                    body.add(wire)
                }
            }
        }
    }

    makeWire(wire) {
        var wire1 = new Mesh()
        wire1.geometry = new CylinderGeometry(0.01, 0.01, 0.6*DEPTH)
        wire1.material = new MeshStandardMaterial({color: WIRE_COLOR})
        wire1.mesh = new Mesh(wire.geometry, wire.material)
        wire.add(wire1)
        var wire2 = new Mesh()
        wire2.geometry = new CylinderGeometry(0.01, 0.01, 0.6*DEPTH)
        wire2.material = new MeshStandardMaterial({color: WIRE_COLOR})
        wire2.mesh = new Mesh(wire.geometry, wire.material)
        wire2.rotateX(1.57)
        wire2.position.set(0,0.3*DEPTH,0.3*DEPTH)
        wire.add(wire2)
    }

}

export default Chips
