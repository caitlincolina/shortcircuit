import {CylinderGeometry, MeshPhongMaterial, Mesh} from 'three'

/*
param rotation is the number of times you want to rotate the wire 90 degrees
Straight Wire: 2-way path
    rotation can be [0, 1]
Corner Wire: 2-way path
    rotation can be [0, 1, 2, 3]
Dead End Wire: 1-way path
    rotation can be [0, 1, 2, 3]
Three Way Wire: 3-way path
    rotation can be [0, 1, 2, 3]
Four Way Wire: 4-way path
    no rotation needed
*/

const RADIUS = 0.1
const HEIGHT = 2
const COLOR = 0xffffff
const POSITION_Y = -0.5
const ROTATE_NINETY = Math.PI/2

class Wire extends Mesh{
    
    constructor(rotation, location) {
        super()
        this.location = location
        var wire = new Mesh()
        this.makeWire(wire, rotation)
        this.add(wire)
    }

}
  
class Straight extends Wire {

    makeWire(wire, rotation) {
        wire.geometry = new CylinderGeometry(RADIUS, RADIUS, HEIGHT)
        wire.material = new MeshPhongMaterial({color: COLOR})
        wire.mesh = new Mesh(wire.geometry, wire.material)
        wire.position.set(0, POSITION_Y, 0)
        switch (rotation) {
            case 0: //left-right
                wire.rotation.set(0, 0, ROTATE_NINETY)
                break
            case 1: //up-down
                wire.rotation.set(0, ROTATE_NINETY, ROTATE_NINETY)
        }
    }
    
}

class DeadEnd extends Wire {

    makeWire(wire, rotation) {
        wire.geometry = new CylinderGeometry(RADIUS, RADIUS, HEIGHT/2)
        wire.material = new MeshPhongMaterial({color: COLOR})
        wire.mesh = new Mesh(wire.geometry, wire.material)
        switch (rotation) {
            case 0: //left
                wire.position.set(-HEIGHT/4, POSITION_Y, 0)
                wire.rotation.set(0, 0, ROTATE_NINETY)
                break
            case 1: //down
                wire.position.set(0, POSITION_Y, HEIGHT/4)
                wire.rotation.set(0, ROTATE_NINETY, ROTATE_NINETY)
                break
            case 2: //right
                wire.position.set(HEIGHT/4, POSITION_Y, 0)
                wire.rotation.set(0, ROTATE_NINETY*2, ROTATE_NINETY)
                break
            case 3: //up
                wire.position.set(0, POSITION_Y, -HEIGHT/4)
                wire.rotation.set(0, ROTATE_NINETY*3, ROTATE_NINETY)
        }
    }

}

class Corner extends Wire {

    makeWire(wire, rotation) {
        var wire1 = new Mesh()
        wire1.geometry = new CylinderGeometry(RADIUS, RADIUS, HEIGHT/2)
        wire1.material = new MeshPhongMaterial({color: COLOR})
        wire1.mesh = new Mesh(wire1.geometry, wire1.material)
        wire1.position.y = HEIGHT/4
        wire.add(wire1)
        var wire2 = new Mesh()
        wire2.geometry = new CylinderGeometry(RADIUS, RADIUS, HEIGHT/2)
        wire2.material = new MeshPhongMaterial({color: COLOR})
        wire2.mesh = new Mesh(wire2.geometry, wire2.material)
        wire2.position.z = HEIGHT/4
        wire2.rotation.set(0, ROTATE_NINETY, ROTATE_NINETY)
        wire.add(wire2)
        wire.position.y = POSITION_Y

        switch (rotation) {
            case 0: //left-down
                wire.rotation.set(0, 0, ROTATE_NINETY)
                break
            case 1: //down-right
                wire.rotation.set(0, ROTATE_NINETY, ROTATE_NINETY)
                break
            case 2: //right-up
                wire.rotation.set(0, ROTATE_NINETY*2, ROTATE_NINETY)

                break
            case 3: //up-left
                wire.rotation.set(0, ROTATE_NINETY*3, ROTATE_NINETY)
        }
    }
}

class ThreeWay extends Wire {

    makeWire(wire, rotation) {
        var wire1 = new Mesh()
        wire1.geometry = new CylinderGeometry(RADIUS, RADIUS, HEIGHT)
        wire1.material = new MeshPhongMaterial({color: COLOR})
        wire1.mesh = new Mesh(wire1.geometry, wire1.material)
        wire.add(wire1)
        var wire2 = new Mesh()
        wire2.geometry = new CylinderGeometry(RADIUS, RADIUS, HEIGHT/2)
        wire2.material = new MeshPhongMaterial({color: COLOR})
        wire2.mesh = new Mesh(wire2.geometry, wire2.material)
        wire2.position.z = HEIGHT/4
        wire2.rotation.set(0, ROTATE_NINETY, ROTATE_NINETY)
        wire.add(wire2)
        wire.position.y = POSITION_Y

        switch (rotation) {
            case 0: //left-down-right
                wire.rotation.set(0, 0, ROTATE_NINETY)
                break
            case 1: //down-right-up
                wire.rotation.set(0, ROTATE_NINETY, ROTATE_NINETY)
                break
            case 2: //right-up-left
                wire.rotation.set(0, ROTATE_NINETY*2, ROTATE_NINETY)
                break
            case 3: //up-left-down
                wire.rotation.set(0, ROTATE_NINETY*3, ROTATE_NINETY)
        }
    }

}

class FourWay extends Wire {

    makeWire(wire) {      
        var wire1 = new Straight(0)
        wire.add(wire1)
        var wire2 = new Straight(1)
        wire.add(wire2)
    }
    
}

export {Wire, Straight, Corner, DeadEnd, ThreeWay, FourWay};
