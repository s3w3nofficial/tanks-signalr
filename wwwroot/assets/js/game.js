var blobs = []
var bullets = []

class Vector2D {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    mult(f) {
        return new Vector2D(this.x * f, this.y * f)
    }

    sub(vec) {
        return new Vector2D(this.x - vec.x, this.y - vec.y)
    }

    add(vec) {
        return new Vector2D(this.x + vec.x, this.y + vec.y)
    }

    Normalize() {
		let l = this.Length();
		
		let f = 1 / l;
		
		this.x *= f;
        this.y *= f;
        
        return new Vector2D(this.x, this.y)
	}
	
	Length() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
}

class Blob {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

class Bullet {
    constructor(x, y, dir, time) {
        this.x = x
        this.y = y
        this.from = new Vector2D(x, y)
        this.dir = dir
        this.time = time
    }
}

var mousePos = new Vector2D(0, 0)

function ellipse(context, cx, cy, rx, ry){
    context.save(); // save state
    context.beginPath();

    context.translate(cx-rx, cy-ry);
    context.scale(rx, ry);
    context.arc(1, 1, 1, 0, 2 * Math.PI, false);

    context.restore(); // restore to original state
    context.stroke();
}

function Curve(from, dir, gravity, time) {
    let a = Math.atan2(dir.y, dir.x) 
    let vx = Math.cos(a)
    let vy = Math.sin(a)

    let vec = new Vector2D(vx, vy + gravity * time).mult(time)
    return from.add(vec);
}

function getMousePos(event) {
    let canvas = document.getElementById('canvas');
    mousePos = new Vector2D(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop)
}

function IsInside(w, h, x, y) {
    return x > 0 && x < w && y > 0 && y < h;
}

function addBullet(event) {
    bullets.push(new Bullet(blobs[playerID].x, blobs[playerID].y, mousePos, 1))
}