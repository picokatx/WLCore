import { _Location } from "../constants/exports";
import { BlockLocation } from "./BlockLocation";

export class Location {
    _location: _Location
    constructor(x: number | _Location, y?: number, z?: number) {
        if (typeof x == 'number') {
            this._location = new _Location(x, y, z)
        } else {
            this._location = x
        }
    }
    get x() {
        return this._location.x
    }
    get y() {
        return this._location.y
    }
    get z() {
        return this._location.z
    }
    set x(coordinate: number) {
        this._location.x = coordinate
    }
    set y(coordinate: number) {
        this._location.y = coordinate
    }
    set z(coordinate: number) {
        this._location.z = coordinate
    }
    toBLockLocation(): BlockLocation {
        return new BlockLocation(this.x,this.y,this.z)
    }
    equals(other: Location): boolean {
        return this._location.equals(other._location)
    }
    isNear(other: Location, epsilon: number): boolean {
        return this._location.isNear(other._location, epsilon)
    }
}