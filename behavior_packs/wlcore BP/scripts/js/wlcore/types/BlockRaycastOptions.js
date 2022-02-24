export class BlockRaycastOptions {
    constructor(includeLiquidBlocks, includePassableBlocks, maxDistance) {
        this._blockRaycastOptions.includeLiquidBlocks = includeLiquidBlocks;
        this._blockRaycastOptions.includePassableBlocks = includePassableBlocks;
        this._blockRaycastOptions.maxDistance = maxDistance;
    }
    get includeLiquidBlocks() {
        return this._blockRaycastOptions.includeLiquidBlocks;
    }
    get includePassableBlocks() {
        return this._blockRaycastOptions.includePassableBlocks;
    }
    get maxDistance() {
        return this._blockRaycastOptions.maxDistance;
    }
    set includeLiquidBlocks(b) {
        this._blockRaycastOptions.includeLiquidBlocks = b;
    }
    set includePassableBlocks(b) {
        this._blockRaycastOptions.includePassableBlocks = b;
    }
    set maxDistance(distance) {
        this._blockRaycastOptions.maxDistance = distance;
    }
}
