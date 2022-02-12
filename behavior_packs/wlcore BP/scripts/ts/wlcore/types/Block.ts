import { _Block, _BlockInventoryComponent, _BlockLavaContainerComponent, _BlockPistonComponent, _BlockPotionContainerComponent, _BlockRecordPlayerComponent, _BlockSnowContainerComponent, _BlockType, _BlockWaterContainerComponent} from "../constants/Exports"
import { BlockPermutation } from "./BlockPermutation.js"
import { BlockLocation } from "./BlockLocation"
import { Dimension } from "./Dimension"
export enum BlockComponents {
    inventory = "minecraft:inventory",
    lavaContainer = "minecraft:lava_container",
    piston = "minecraft:piston",
    potionContainer = "minecraft:potion_container",
    recordPlayer = "minecraft:record_player",
    snowContainer = "minecraft:snow_container",
    waterContainer = "minecraft:water_container"
}
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
    get inventory(): _BlockInventoryComponent {
        return this._block.getComponent("minecraft:inventory")
    }
    get lavaContainer(): _BlockLavaContainerComponent {
        return this._block.getComponent("minecraft:lava_container")
    }
    get piston(): _BlockPistonComponent {
        return this._block.getComponent("minecraft:piston")
    }
    get potionContainer(): _BlockPotionContainerComponent {
        return this._block.getComponent("minecraft:potion_container")
    }
    get recordPlayer(): _BlockRecordPlayerComponent {
        return this._block.getComponent("minecraft:record_player")
    }
    get snowContainer(): _BlockSnowContainerComponent {
        return this._block.getComponent("minecraft:snow_container")
    }
    get waterContainer(): _BlockWaterContainerComponent {
        return this._block.getComponent("minecraft:water_container")
    }
    getComponent(componentName: BlockComponents): any {
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
