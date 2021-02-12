import {BoxGeometry, MeshStandardMaterial, MeshPhongMaterial, Mesh } from 'three'

const WIDTH = 2
const BODY_COLOR = 0x02fa0f
const HOUSE_COLOR = 0xc0c0c0

class CPU extends Mesh {

    constructor(location) {
        super()
        this.location = location
        var body = new Mesh()
        this.makeBody(body)
        this.add(body)
        var housing = new Mesh()
        this.makeHousing(housing, body)
        this.add(housing)
    }

    makeBody(body) {
        body.geometry = new BoxGeometry(WIDTH, WIDTH / 15, WIDTH)
        body.material = new MeshStandardMaterial({ color: BODY_COLOR })
        body.mesh = new Mesh(body.geometry, body.material)
        body.position.y = WIDTH / 15 / 2 - 0.5
    }

    makeHousing(housing, body) {
        housing.geometry = new BoxGeometry(WIDTH - 0.25, WIDTH / 15, WIDTH - 0.25)
        housing.material = new MeshPhongMaterial({color: HOUSE_COLOR})
        housing.mesh = new Mesh(housing.geometry, housing.material)
        housing.position.y = body.position.y + WIDTH / 15
    }
    
}

export default CPU
