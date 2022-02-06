import { BlockType, IBlockProperty } from "mojang-minecraft";
import { _BlockPermutation } from "../constants/exports";

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
    getAllProperties(): IBlockProperty[] {
        return this._blockPermutation.getAllProperties()
    }
    getProperty(propertyName: string): IBlockProperty {
        return this._blockPermutation.getProperty(propertyName)
    }
    getTags(): string[] {
        return this._blockPermutation.getTags()
    }
    hasTag(tag: string): boolean {
        return this._blockPermutation.hasTag(tag)
    }
}