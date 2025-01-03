import { _Dimension, _ExplosionOptions, _EntityIterator, _EntityQueryOptions } from "./Exports.js";
import { Block } from "./Block.js";
import { BlockLocation } from "./BlockLocation.js";
import { BlockRaycastOptions } from "./BlockRaycastOptions.js";
import { Vector } from "./Vector.js";
import { Location } from "./Location.js";
import { Entity } from "./Entity.js";
import { EntityRaycastOptions } from "./EntityRaycastOptions.js";

export class Dimension {
    _dimension: _Dimension
    constructor(_dimension: _Dimension) {
        this._dimension = _dimension
    }
    createExplosion(location: Location, radius: number, explosionOptions: _ExplosionOptions): void {
        this._dimension.createExplosion(location, radius, explosionOptions)
    }
    getBlock(location: BlockLocation): Block {
        return new Block(this._dimension.getBlock(location))
    }
    getBlockFromRay(location: Location, direction: Vector, options?: BlockRaycastOptions): Block {
        return new Block(this._dimension.getBlockFromRay(location, direction, options))
    }
    getEntities(getEntities?: _EntityQueryOptions): _EntityIterator {
        return this._dimension.getEntities(getEntities)
    }
    getEntitiesAtBlockLocation(location: BlockLocation): Entity[] {
        let ret: Entity[] = []
        this._dimension.getEntitiesAtBlockLocation(location).forEach(e => {
            ret.push(new Entity(e))
        })
        return ret
    }
    getEntitiesFromRay(location: Location, direction: Vector, options?: EntityRaycastOptions): Entity[] {
        let ret: Entity[] = []
        this._dimension.getEntitiesFromRay(location, direction, options._entityRaycastOptions).forEach(e => {
            ret.push(new Entity(e))
        })
        return ret
    }
    getPlayers(getPlayers?: _EntityQueryOptions): _EntityIterator {
        return this._dimension.getPlayers(getPlayers)
    }
    isEmpty(location: BlockLocation): boolean {
        return this._dimension.isEmpty(location)
    }
    runCommand(commandString: string): any {
        return this._dimension.runCommand(commandString)
    }
    spawnEntity(identifier: string, location: BlockLocation | Location): Entity {
        return new Entity(this._dimension.spawnEntity(identifier, location))
    }

}