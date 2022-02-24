export class BlockPermutation {
    constructor(_blockPermutation) {
        this._blockPermutation = _blockPermutation;
    }
    get type() {
        return this._blockPermutation.type;
    }
    clone() {
        return new BlockPermutation(this._blockPermutation.clone());
    }
    getAllProperties() {
        return this._blockPermutation.getAllProperties();
    }
    getProperty(propertyName) {
        return this._blockPermutation.getProperty(propertyName);
    }
    getTags() {
        return this._blockPermutation.getTags();
    }
    hasTag(tag) {
        return this._blockPermutation.hasTag(tag);
    }
}
