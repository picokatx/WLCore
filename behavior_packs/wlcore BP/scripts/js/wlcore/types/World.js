import { _world } from "./Exports.js";
import { Dimension } from "./Dimension.js";
export var DimensionTypes;
(function (DimensionTypes) {
    DimensionTypes["overworld"] = "overworld";
    DimensionTypes["nether"] = "nether";
    DimensionTypes["end"] = "the end";
})(DimensionTypes || (DimensionTypes = {}));
export class World {
    constructor(_world) {
        this._world = _world;
    }
    get events() {
        return this._world.events;
    }
    getDimension(dimensionName) {
        return new Dimension(this._world.getDimension(dimensionName));
    }
    getPlayers(options) {
        return this._world.getPlayers(options);
    }
    playSound(soundName, soundOptions) {
        return this._world.playSound(soundName, soundOptions);
    }
}
export const world = new World(_world);
