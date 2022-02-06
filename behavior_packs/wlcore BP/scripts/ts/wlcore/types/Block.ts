import { _Block, _BlockType} from "../constants/exports"
import { BlockPermutation } from "./BlockPermutation.js"
import { BlockLocation } from "./BlockLocation"
import { Dimension } from "./Dimension"
export class Block {
    _block: _Block
    constructor(_block:_Block) {
        this._block = _block
    }
    get dimension():Dimension {
        return new Dimension(this._block.dimension)
    }
    get id(): string {
        return this._block.id
    }
    get isEmpty(): boolean {
        return this._block.isEmpty
    }
    get isWaterlogged(): boolean {
        return this._block.isWaterlogged
    }
    set isWaterlogged(isWaterlogged: boolean) {
        this._block.isWaterlogged = isWaterlogged
    }
    get location(): BlockLocation {
        return new BlockLocation(this._block.location)
    }
    get permutation(): BlockPermutation {
        return new BlockPermutation(this._block.permutation)
    }
    get type(): _BlockType {
        return this.type
    }
    get x(): number {
        return this.x
    }
    get y(): number {
        return this.y
    }
    get z(): number {
        return this.z
    }
    getComponent(componentName: string): any {
        return this._block.getComponent(componentName)
    }
    getTags(): string[] {
        return this._block.getTags()
    }
    hasTag(tag: string): boolean {
        return this._block.hasTag(tag)
    }
    setPermutation(permutation: BlockPermutation): void {
        return this._block.setPermutation(permutation)
    }
    setType(blockType: _BlockType): void {
        return this._block.setType(blockType)
    }  
}
