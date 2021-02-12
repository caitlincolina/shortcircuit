import {SphereGeometry, MeshBasicMaterial, PointLight, Mesh} from 'three'

const COLOR = 0xf5da42
const SEGMENTS = 40

class Player extends Mesh {

    constructor(radius, startingLocation) {
        super();
        this.location = startingLocation
        this.body = new Mesh()
        this.body.geometry = new SphereGeometry(radius, SEGMENTS, SEGMENTS)
        this.body.material = new MeshBasicMaterial({color: COLOR })
        this.body.mesh = new Mesh(this.body.geometry, this.body.material)
        this.originalIntensity = 5
        this.light = new PointLight(COLOR, this.originalIntensity, 10, 5)
        this.add(this.light)
        this.add(this.body)
    }

    move(input) {
        // Input taken in as a Keycode 
        // Left:   37
        // Up:     38
        // Right:  39
        // Down:   40
        switch(input) {
            case 37: this.location[0] -= 1; break
            case 38: this.location[1] -= 1; break
            case 39: this.location[0] += 1; break
            case 40: this.location[1] += 1; break
        }
    }

    glow() {
        var brightness = this.light.intensity
        if (brightness < 1) {
            this.light.intensity = this.originalIntensity * Math.random() 
        } else if (brightness >= 1 && brightness < 2) {
            this.light.intensity -= 0.01
        } else if (brightness >= 2 && brightness < 3) {
            this.light.intensity -= 0.05
        } else if (brightness >= 3 && brightness < 4) {
            if (this.light.intensity == 1.5) { this.light.intensity = 5}
            this.light.intensity -= 0.08
        } else {
            this.light.intensity -= 0.15
        }
    }
}

export default Player
