import { _Vector } from "./Exports.js";
export class Vector {
    constructor(x, y, z) {
        if (typeof x == 'number') {
            this._vector = new _Vector(x, y, z);
        }
        else {
            this._vector = x;
        }
    }
    get x() {
        return this._vector.x;
    }
    get y() {
        return this._vector.y;
    }
    get z() {
        return this._vector.z;
    }
    set x(coordinate) {
        this._vector.x = coordinate;
    }
    set y(coordinate) {
        this._vector.y = coordinate;
    }
    set z(coordinate) {
        this._vector.z = coordinate;
    }
    equals(other) {
        return this._vector.equals(other);
    }
    isNear(other, epsilon) {
        return this._vector.isNear(other, epsilon);
    }
    static add(v, v1) {
        return new Vector(_Vector.add(v, v1));
    }
    static cross(v, v1) {
        return new Vector(_Vector.cross(v, v1));
    }
    static distance(v, v1) {
        return _Vector.distance(v, v1);
    }
    static lerp(v, v1, t) {
        return new Vector(_Vector.lerp(v, v1, t));
    }
    static slerp(v, v1, s) {
        return new Vector(_Vector.slerp(v, v1, s));
    }
    static divide(v, scale) {
        if (scale instanceof Vector) {
            return new Vector(_Vector.divide(v, scale));
        }
        else {
            return new Vector(_Vector.divide(v, scale));
        }
    }
    length() {
        return this._vector.length();
    }
    static max(v, v1) {
        return new Vector(_Vector.max(v, v1));
    }
    static min(v, v1) {
        return new Vector(_Vector.min(v, v1));
    }
    static multiply(v, scale) {
        if (scale instanceof Vector) {
            return new Vector(_Vector.multiply(v, scale));
        }
        else {
            return new Vector(_Vector.multiply(v, scale));
        }
    }
    normalized() {
        return this._vector.normalized();
    }
    static subtract(v, v1) {
        return new Vector(_Vector.subtract(v, v1));
    }
    set(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }
    update(other) {
        this.x = other.x;
        this.y = other.y;
        this.z = other.z;
        return this;
    }
    floored() {
        return new Vector(Math.floor(this.x), Math.floor(this.y), Math.floor(this.z));
    }
    floor() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.z = Math.floor(this.z);
        return this;
    }
    offset(dx, dy, dz) {
        return new Vector(this.x + dx, this.y + dy, this.z + dz);
    }
    translate(dx, dy, dz) {
        this.x += dx;
        this.y += dy;
        this.z += dz;
        return this;
    }
    plus(other) {
        return this.offset(other.x, other.y, other.z);
    }
    minus(other) {
        return this.offset(-other.x, -other.y, -other.z);
    }
    scaled(scalar) {
        return new Vector(this.x * scalar, this.y * scalar, this.z * scalar);
    }
    abs() {
        return new Vector(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z));
    }
    volume() {
        return this.x * this.y * this.z;
    }
    modulus(other) {
        return new Vector(euclideanMod(this.x, other.x), euclideanMod(this.y, other.y), euclideanMod(this.z, other.z));
    }
    distanceTo(other) {
        var dx = other.x - this.x;
        var dy = other.y - this.y;
        var dz = other.z - this.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }
    distanceSquared(other) {
        var dx = other.x - this.x;
        var dy = other.y - this.y;
        var dz = other.z - this.z;
        return dx * dx + dy * dy + dz * dz;
    }
    toString() {
        return '(' + this.x + ', ' + this.y + ', ' + this.z + ')';
    }
    clone() {
        return this.offset(0, 0, 0);
    }
    norm() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    unit() {
        const norm = this.norm();
        if (norm === 0) {
            return this.clone();
        }
        else {
            return this.scaled(1 / norm);
        }
    }
    scale(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        return this;
    }
    xyDistanceTo(other) {
        var dx = other.x - this.x;
        var dy = other.y - this.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    xzDistanceTo(other) {
        var dx = other.x - this.x;
        var dz = other.z - this.z;
        return Math.sqrt(dx * dx + dz * dz);
    }
    yzDistanceTo(other) {
        var dy = other.y - this.y;
        var dz = other.z - this.z;
        return Math.sqrt(dy * dy + dz * dz);
    }
    innerProduct(other) {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }
    manhattanDistanceTo(other) {
        return Math.abs(other.x - this.x) + Math.abs(other.y - this.y) + Math.abs(other.z - this.z);
    }
    toArray() {
        return [this.x, this.y, this.z];
    }
}
function euclideanMod(numerator, denominator) {
    var result = numerator % denominator;
    return result < 0 ? result + denominator : result;
}
