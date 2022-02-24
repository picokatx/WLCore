import { _Location } from "./Exports.js";
import { BlockLocation } from "./BlockLocation.js";
export class Location {
    constructor(x, y, z) {
        if (typeof x == 'number') {
            this._location = new _Location(x, y, z);
        }
        else {
            this._location = x;
        }
    }
    get x() {
        return this._location.x;
    }
    get y() {
        return this._location.y;
    }
    get z() {
        return this._location.z;
    }
    set x(coordinate) {
        this._location.x = coordinate;
    }
    set y(coordinate) {
        this._location.y = coordinate;
    }
    set z(coordinate) {
        this._location.z = coordinate;
    }
    toBLockLocation() {
        return new BlockLocation(this.x, this.y, this.z);
    }
    equals(other) {
        return this._location.equals(other._location);
    }
    isNear(other, epsilon) {
        return this._location.isNear(other._location, epsilon);
    }
}
