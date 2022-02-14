import { _Vector } from "../constants/Exports.js";
export class Vector {
    _vector: _Vector
    constructor(x: number | _Vector, y?: number, z?: number) {
        if (typeof x == 'number') {
            this._vector = new _Vector(x, y, z)
        } else {
            this._vector = x
        }
    }
    get x(): number {
        return this._vector.x
    }
    get y(): number {
        return this._vector.y
    }
    get z(): number {
        return this._vector.z
    }
    set x(coordinate: number) {
        this._vector.x = coordinate
    }
    set y(coordinate: number) {
        this._vector.y = coordinate
    }
    set z(coordinate: number) {
        this._vector.z = coordinate
    }
    equals(other: _Vector): boolean {
        return this._vector.equals(other)
    }
    isNear(other: _Vector, epsilon: number): boolean {
        return this._vector.isNear(other, epsilon)
    }
    static add(v: Vector, v1: Vector): Vector {
        return new Vector(_Vector.add(v, v1))
    }
    static cross(v: Vector, v1: Vector): Vector {
        return new Vector(_Vector.cross(v, v1))
    }
    static distance(v: _Vector, v1: _Vector): number {
        return _Vector.distance(v, v1)
    }
    static lerp(v: Vector, v1: Vector, t: number): Vector {
        return new Vector(_Vector.lerp(v, v1, t))
    }
    static slerp(v: Vector, v1: Vector, s: number): Vector {
        return new Vector(_Vector.slerp(v, v1, s))
    }
    static divide(v: Vector, scale: number | Vector): Vector {
        if (scale instanceof Vector) {
            return new Vector(_Vector.divide(v, scale))
        } else {
            return new Vector(_Vector.divide(v, scale))
        }
    }
    length(): number {
        return this._vector.length()
    }
    static max(v: Vector, v1: Vector): Vector {
        return new Vector(_Vector.max(v, v1))
    }
    static min(v: Vector, v1: Vector): Vector {
        return new Vector(_Vector.min(v, v1))
    }
    static multiply(v: Vector, scale: number | Vector): Vector {
        if (scale instanceof Vector) {
            return new Vector(_Vector.multiply(v, scale))
        } else {
            return new Vector(_Vector.multiply(v, scale))
        }
    }
    normalized(): _Vector {
        return this._vector.normalized()
    }
    static subtract(v: Vector, v1: Vector): Vector {
        return new Vector(_Vector.subtract(v, v1))
    }
    /*Vec3 npm module */
    set(x: number, y: number, z: number): Vector {
        this.x = x
        this.y = y
        this.z = z
        return this
    }

    update(other: Vector): Vector {
        this.x = other.x
        this.y = other.y
        this.z = other.z
        return this
    }

    floored(): Vector {
        return new Vector(Math.floor(this.x), Math.floor(this.y), Math.floor(this.z))
    }

    floor(): Vector {
        this.x = Math.floor(this.x)
        this.y = Math.floor(this.y)
        this.z = Math.floor(this.z)
        return this
    }

    offset(dx: number, dy: number, dz: number): Vector {
        return new Vector(this.x + dx, this.y + dy, this.z + dz)
    }

    translate(dx: number, dy: number, dz: number): Vector {
        this.x += dx
        this.y += dy
        this.z += dz
        return this
    }
    plus(other: Vector): Vector {
        return this.offset(other.x, other.y, other.z)
    }

    minus(other: Vector): Vector {
        return this.offset(-other.x, -other.y, -other.z)
    }

    scaled(scalar: number): Vector {
        return new Vector(this.x * scalar, this.y * scalar, this.z * scalar)
    }

    abs(): Vector {
        return new Vector(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z))
    }

    volume(): number {
        return this.x * this.y * this.z
    }

    modulus(other: Vector): Vector {
        return new Vector(
            euclideanMod(this.x, other.x),
            euclideanMod(this.y, other.y),
            euclideanMod(this.z, other.z))
    }

    distanceTo(other: Vector): number {
        var dx = other.x - this.x
        var dy = other.y - this.y
        var dz = other.z - this.z
        return Math.sqrt(dx * dx + dy * dy + dz * dz)
    }

    distanceSquared(other: Vector): number {
        var dx = other.x - this.x
        var dy = other.y - this.y
        var dz = other.z - this.z
        return dx * dx + dy * dy + dz * dz
    }
    toString(): string {
        return '(' + this.x + ', ' + this.y + ', ' + this.z + ')'
    }

    clone(): Vector {
        return this.offset(0, 0, 0)
    }
    norm(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
    }
    unit(): Vector {
        const norm = this.norm()
        if (norm === 0) {
            return this.clone()
        } else {
            return this.scaled(1 / norm)
        }
    }

    scale(scalar: number): Vector {
        this.x *= scalar
        this.y *= scalar
        this.z *= scalar
        return this
    }

    xyDistanceTo(other: Vector): number {
        var dx = other.x - this.x
        var dy = other.y - this.y
        return Math.sqrt(dx * dx + dy * dy)
    }

    xzDistanceTo(other: Vector): number {
        var dx = other.x - this.x
        var dz = other.z - this.z
        return Math.sqrt(dx * dx + dz * dz)
    }

    yzDistanceTo(other: Vector): number {
        var dy = other.y - this.y
        var dz = other.z - this.z
        return Math.sqrt(dy * dy + dz * dz)
    }

    innerProduct(other: Vector): number {
        return this.x * other.x + this.y * other.y + this.z * other.z
    }

    manhattanDistanceTo(other: Vector): number {
        return Math.abs(other.x - this.x) + Math.abs(other.y - this.y) + Math.abs(other.z - this.z)
    }

    toArray(): number[] {
        return [this.x, this.y, this.z]
    }
}
function euclideanMod(numerator: number, denominator: number) {
    var result = numerator % denominator
    return result < 0 ? result + denominator : result
}
