import { _EntityIterator, _Events, _World, _EntityQueryOptions } from "../constants/exports";
import { _world } from "../constants/exports";
import { Dimension } from "./Dimension";
export enum DimensionTypes {
    overworld = 'overworld',
    nether = 'nether',
    end = "the end"
}
export class World {
    _world: _World
    constructor(_world: _World) {
        this._world = _world
    }
    get events(): _Events {
        return this._world.events
    }
    getDimension(dimensionName: DimensionTypes): Dimension {
        return new Dimension(this._world.getDimension(dimensionName))
    }
    getPlayers(options?: _EntityQueryOptions): _EntityIterator {
        return this._world.getPlayers(options)
    }
}
export const world = new World(_world)