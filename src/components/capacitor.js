
import {CylinderGeometry, MeshPhongMaterial, Mesh} from 'three'

const RADIUS = 0.1
const HEIGHT = 1.5
const POSITION_Y = 0.5
const BODY_COLOR = 0x323232
const WIRE_COLOR = 0xC0C0C0

class Capacitor extends Mesh{
    constructor(location){
        super()
        this.location = location
        var body = new Mesh()
        body.geometry = new CylinderGeometry(HEIGHT/3, HEIGHT/3, HEIGHT, 32)
        body.material = new MeshPhongMaterial({color: BODY_COLOR})
        body.mesh = new Mesh(body.geometry, body.material)
        this.add(body)
        var wire = new Mesh()
        this.makeWire(wire, RADIUS, HEIGHT)
        this.add(wire)
        this.position.y = POSITION_Y
    }

    makeWire(wire, RADIUS, HEIGHT){
        var wire1 = new Mesh()
        wire1.geometry = new CylinderGeometry(RADIUS, RADIUS, 0.25*HEIGHT)
        wire1.material = new MeshPhongMaterial({color: WIRE_COLOR})
        wire1.position.set(HEIGHT*0.2, HEIGHT/-1.75, 0)
        wire.add(wire1)

        var wire2 = new Mesh()
        wire2.geometry = new CylinderGeometry(RADIUS, RADIUS, 0.25*HEIGHT)
        wire2.material = new MeshPhongMaterial({color: WIRE_COLOR})
        wire2.position.set(HEIGHT*-0.2, HEIGHT/-1.75, 0)
        wire.add(wire2)
    }
}
export default Capacitor
