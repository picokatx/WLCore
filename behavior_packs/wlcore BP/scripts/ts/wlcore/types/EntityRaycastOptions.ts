import { _EntityRaycastOptions } from "../constants/Exports"

export class EntityRaycastOptions {
    _entityRaycastOptions: _EntityRaycastOptions
    constructor(maxDistance: number) {
        this._entityRaycastOptions.maxDistance = maxDistance
    }
}
