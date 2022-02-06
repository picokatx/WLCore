import { _Vector } from "../constants/exports";
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
}
