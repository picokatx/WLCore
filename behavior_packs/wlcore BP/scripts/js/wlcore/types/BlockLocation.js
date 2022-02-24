import { _BlockLocation } from "./Exports.js";
import { Location } from "./Location.js";
export class BlockLocation {
    constructor(x, y, z) {
        if (typeof x == 'number') {
            this._blockLocation = new _BlockLocation(x, y, z);
        }
        else {
            this._blockLocation = x;
        }
    }
    get x() {
        return this._blockLocation.x;
    }
    get y() {
        return this._blockLocation.y;
    }
    get z() {
        return this._blockLocation.z;
    }
    set x(coordinate) {
        this._blockLocation.x = coordinate;
    }
    set y(coordinate) {
        this._blockLocation.y = coordinate;
    }
    set z(coordinate) {
        this._blockLocation.z = coordinate;
    }
    toLocation() {
        return new Location(this.x, this.y, this.z);
    }
    equals(other) {
        return this._blockLocation.equals(other._blockLocation);
    }
    above() {
        return new BlockLocation(this._blockLocation.above());
    }
    below() {
        return new BlockLocation(this.x, this.y - 1, this.z);
    }
    blocksBetween(other) {
        let ret = [];
        this._blockLocation.blocksBetween(other._blockLocation).forEach(loc => {
            ret.push(new BlockLocation(loc));
        });
        return ret;
    }
    offset(x, y, z) {
        return new BlockLocation(this._blockLocation.offset(x, y, z));
    }
}
