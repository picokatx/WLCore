import { BlockPermutation } from "./BlockPermutation.js";
import { BlockLocation } from "./BlockLocation.js";
import { Dimension } from "./Dimension.js";
export class Block {
    constructor(_block) {
        this._block = _block;
    }
    get dimension() {
        return new Dimension(this._block.dimension);
    }
    get id() {
        return this._block.id;
    }
    get isEmpty() {
        return this._block.isEmpty;
    }
    get isWaterlogged() {
        return this._block.isWaterlogged;
    }
    set isWaterlogged(isWaterlogged) {
        this._block.isWaterlogged = isWaterlogged;
    }
    get location() {
        return new BlockLocation(this._block.location);
    }
    get permutation() {
        return new BlockPermutation(this._block.permutation);
    }
    get type() {
        return this.type;
    }
    get x() {
        return this.x;
    }
    get y() {
        return this.y;
    }
    get z() {
        return this.z;
    }
    get inventory() {
        return this._block.getComponent("minecraft:inventory");
    }
    get lavaContainer() {
        return this._block.getComponent("minecraft:lava_container");
    }
    get piston() {
        return this._block.getComponent("minecraft:piston");
    }
    get potionContainer() {
        return this._block.getComponent("minecraft:potion_container");
    }
    get recordPlayer() {
        return this._block.getComponent("minecraft:record_player");
    }
    get snowContainer() {
        return this._block.getComponent("minecraft:snow_container");
    }
    get waterContainer() {
        return this._block.getComponent("minecraft:water_container");
    }
    getComponent(componentName) {
        return this._block.getComponent(componentName);
    }
    getTags() {
        return this._block.getTags();
    }
    hasTag(tag) {
        return this._block.hasTag(tag);
    }
    setPermutation(permutation) {
        return this._block.setPermutation(permutation);
    }
    setType(blockType) {
        return this._block.setType(blockType);
    }
}
