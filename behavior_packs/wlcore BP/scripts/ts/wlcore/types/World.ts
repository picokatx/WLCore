import { _EntityIterator, _Events, _World, _EntityQueryOptions, _SoundOptions } from "../constants/Exports";
import { _world } from "../constants/Exports";
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
    playSound(soundName: String, soundOptions?: _SoundOptions): void {
        return this._world.playSound(soundName,soundOptions)
    }
}
export const world = new World(_world)