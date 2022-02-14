import { _BlockLocation } from "../constants/Exports.js";
import { Location } from "./Location.js";

export class BlockLocation {
    _blockLocation: _BlockLocation
    get x() {
        return this._blockLocation.x
    }
    get y() {
        return this._blockLocation.y
    }
    get z() {
        return this._blockLocation.z
    }
    set x(coordinate: number) {
        this._blockLocation.x = coordinate
    }
    set y(coordinate: number) {
        this._blockLocation.y = coordinate
    }
    set z(coordinate: number) {
        this._blockLocation.z = coordinate
    }
    constructor(x: number | _BlockLocation, y?: number, z?: number) {
        if (typeof x == 'number') {
            this._blockLocation = new _BlockLocation(x, y, z)
        } else {
            this._blockLocation = x
        }
    }
    toLocation(): Location {
        return new Location(this.x, this.y, this.z)
    }
    equals(other: BlockLocation): boolean {
        return this._blockLocation.equals(other._blockLocation)
    }
    above(): BlockLocation {
        return new BlockLocation(this._blockLocation.above())
    }
    below(): BlockLocation {
        return new BlockLocation(this.x, this.y - 1, this.z)
    }
    blocksBetween(other: BlockLocation): BlockLocation[] {
        let ret: BlockLocation[] = []
        this._blockLocation.blocksBetween(other._blockLocation).forEach(loc => {
            ret.push(new BlockLocation(loc))
        })
        return ret
    }
    offset(x: number, y: number, z: number): BlockLocation {
        return new BlockLocation(this._blockLocation.offset(x, y, z))
    }

}