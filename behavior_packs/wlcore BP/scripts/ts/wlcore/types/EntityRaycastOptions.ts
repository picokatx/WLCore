import { _EntityRaycastOptions } from "../constants/exports"

export class EntityRaycastOptions {
    _entityRaycastOptions: _EntityRaycastOptions
    constructor(maxDistance: number) {
        this._entityRaycastOptions.maxDistance = maxDistance
    }
}
