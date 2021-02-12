import { CylinderGeometry, TorusGeometry, BoxGeometry, MeshStandardMaterial, Mesh } from 'three'

const RADIUS = 0.2
const HEIGHT = 0.5
const DEPTH = 2
const WIDTH = 0.1
const POSITION_Y = -0.25
const ROTATE_NINETY = Math.PI/2
const COLOR = 0x323232

class Fan extends Mesh {

    constructor(location) {
        super()
        this.location = location
        var center = new Mesh()
        this.center = center
        this.makeCenter(center)
        var container = new Mesh()
        this.makeContainer(container)
        container.add(center)
        this.add(container)
        this.position.y = POSITION_Y
    }

    makeCenter(center) {
        center.geometry = new CylinderGeometry(RADIUS, RADIUS, HEIGHT)
        center.material = new MeshStandardMaterial({color: COLOR})
        center.mesh = new Mesh(center.geometry, center.material)

        var blade1 = new Mesh()
        this.makeBlade(blade1)
        blade1.position.set(-0.3, 0, -0.3)
        blade1.rotation.set(0, ROTATE_NINETY/2, ROTATE_NINETY/2)
        center.add(blade1)

        var blade2 = new Mesh()
        this.makeBlade(blade2)
        blade2.position.set(0.3, 0, 0.3)
        blade2.rotation.set(0, ROTATE_NINETY/2, -ROTATE_NINETY/2)
        center.add(blade2)

        var blade3 = new Mesh()
        this.makeBlade(blade3)
        blade3.position.set(0.3, 0, -0.3)
        blade3.rotation.set(0, -ROTATE_NINETY/2, ROTATE_NINETY/2)
        center.add(blade3)

        var blade4 = new Mesh()
        this.makeBlade(blade4)
        blade4.position.set(-0.3, 0, 0.3)
        blade4.rotation.set(0, -ROTATE_NINETY/2, -ROTATE_NINETY/2)
        center.add(blade4)
    }

    makeBlade(blade) {
        blade.geometry = new BoxGeometry(WIDTH, HEIGHT/2, DEPTH/2)
        blade.material = new MeshStandardMaterial({color: COLOR})
        blade.mesh = new Mesh(blade.geometry, blade.material)
    }

    makeContainer(container) {
        var wall1 = new Mesh()
        this.makeWall(wall1)
        wall1.position.z = 1
        wall1.rotation.y = ROTATE_NINETY
        container.add(wall1)
        
        var wall2 = new Mesh()
        this.makeWall(wall2)
        wall2.position.z = -1
        wall2.rotation.y = ROTATE_NINETY
        container.add(wall2)

        var wall3 = new Mesh()
        this.makeWall(wall3)
        wall3.position.x = 1
        container.add(wall3)

        var wall4 = new Mesh()
        this.makeWall(wall4)
        wall4.position.x = -1
        container.add(wall4)

        var circle = new Mesh()
        circle.geometry = new TorusGeometry(RADIUS*5, RADIUS/2, 10, 20)
        circle.material = new MeshStandardMaterial({color: COLOR})
        circle.mesh = new Mesh(circle.geometry, circle.material)
        circle.rotation.x = ROTATE_NINETY
        container.add(circle)
    }

    makeWall(wall) {
        wall.geometry = new BoxGeometry(WIDTH*2, HEIGHT, DEPTH)
        wall.material = new MeshStandardMaterial({color: COLOR})
        wall.mesh = new Mesh(wall.geometry, wall.material)
    }

}

export default Fan