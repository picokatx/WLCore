import { Block } from "./Block.js";
import { Entity } from "./Entity.js";
export class Dimension {
    constructor(_dimension) {
        this._dimension = _dimension;
    }
    createExplosion(location, radius, explosionOptions) {
        this._dimension.createExplosion(location, radius, explosionOptions);
    }
    getBlock(location) {
        return new Block(this._dimension.getBlock(location));
    }
    getBlockFromRay(location, direction, options) {
        return new Block(this._dimension.getBlockFromRay(location, direction, options));
    }
    getEntities(getEntities) {
        return this._dimension.getEntities(getEntities);
    }
    getEntitiesAtBlockLocation(location) {
        let ret = [];
        this._dimension.getEntitiesAtBlockLocation(location).forEach(e => {
            ret.push(new Entity(e));
        });
        return ret;
    }
    getEntitiesFromRay(location, direction, options) {
        let ret = [];
        this._dimension.getEntitiesFromRay(location, direction, options._entityRaycastOptions).forEach(e => {
            ret.push(new Entity(e));
        });
        return ret;
    }
    getPlayers(getPlayers) {
        return this._dimension.getPlayers(getPlayers);
    }
    isEmpty(location) {
        return this._dimension.isEmpty(location);
    }
    runCommand(commandString) {
        return this._dimension.runCommand(commandString);
    }
    spawnEntity(identifier, location) {
        return new Entity(this._dimension.spawnEntity(identifier, location));
    }
}
