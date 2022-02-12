import { _BlockRaycastOptions } from "../constants/Exports";
export class BlockRaycastOptions {
    _blockRaycastOptions: _BlockRaycastOptions
    constructor(
        includeLiquidBlocks: boolean,
        includePassableBlocks: boolean,
        maxDistance: number) {
        this._blockRaycastOptions.includeLiquidBlocks = includeLiquidBlocks
        this._blockRaycastOptions.includePassableBlocks = includePassableBlocks
        this._blockRaycastOptions.maxDistance = maxDistance
    }
    get includeLiquidBlocks(): boolean {
        return this._blockRaycastOptions.includeLiquidBlocks
    }
    get includePassableBlocks(): boolean {
        return this._blockRaycastOptions.includePassableBlocks
    }
    get maxDistance(): number {
        return this._blockRaycastOptions.maxDistance
    }
    set includeLiquidBlocks(b: boolean) {
        this._blockRaycastOptions.includeLiquidBlocks = b
    }
    set includePassableBlocks(b: boolean) {
        this._blockRaycastOptions.includePassableBlocks = b
    }
    set maxDistance(distance: number) {
        this._blockRaycastOptions.maxDistance = distance
    }
}