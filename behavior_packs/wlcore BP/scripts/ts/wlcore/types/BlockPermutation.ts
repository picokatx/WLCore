import { _BlockPermutation, _IBlockProperty } from "./Exports.js";

export class BlockPermutation {
    _blockPermutation: _BlockPermutation
    constructor(_blockPermutation: _BlockPermutation) {
        this._blockPermutation = _blockPermutation
    }
    get type() {
        return this._blockPermutation.type
    }
    clone(): BlockPermutation {
        return new BlockPermutation(this._blockPermutation.clone())
    }
    getAllProperties(): _IBlockProperty[] {
        return this._blockPermutation.getAllProperties()
    }
    getProperty(propertyName: string): _IBlockProperty {
        return this._blockPermutation.getProperty(propertyName)
    }
    getTags(): string[] {
        return this._blockPermutation.getTags()
    }
    hasTag(tag: string): boolean {
        return this._blockPermutation.hasTag(tag)
    }
}