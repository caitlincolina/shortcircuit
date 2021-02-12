import { BoxGeometry, MeshStandardMaterial, Mesh } from 'three'
/*
param width is the number of tiles
board tiles are 2 x 0.5 x 2
*/
const HEIGHT = 0.5
const COLOR = 0x028A0F

class Board extends Mesh{
    
    constructor(width, location) {
        super()
        this.location = location;
        this.geometry = new BoxGeometry(width, HEIGHT, width)
        this.material = new MeshStandardMaterial({color: COLOR})
        this.mesh = new Mesh(this.geometry, this.material)
        this.position.set(width / 2 - 1, -0.75, width / 2 - 1)
    }
    
}

export default Board