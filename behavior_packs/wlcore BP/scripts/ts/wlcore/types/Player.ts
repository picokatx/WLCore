import {_Player,_Block,_Entity,_IEntityComponent, _EntityInventoryComponent} from "../constants/exports.js"
import { Entity } from "./Entity.js"
import { WLStream } from "../log/WLStream.js";
import { v4 as uuidv4 } from "uuid"
export enum GamemodeType {
    creative = "c",
    survival = "s",
    adventure = "a"
}
export class Player extends Entity {
    _player: _Player
    uuid: string
    constructor(player: _Player) {
        super(player)
        this._player = player
        this.uuid = uuidv4()
    }
    get name(): string {
        return this._player.name
    }
    getuuid(): string {
        return this.uuid
    }
    get selectedSlot(): number {
        return this._player.selectedSlot
    }
    set selectedSlot(selectedSlot: number) {
        this._player.selectedSlot = selectedSlot
    }
    getItemCooldown(itemCategory: string): number {
        return this._player.getItemCooldown(itemCategory)
    }
    startItemCooldown(itemCategory: string, tickDuration: number): void {
        return this._player.startItemCooldown(itemCategory, tickDuration)
    }
    gamemode(gamemodeType: GamemodeType): void {
        this.runCommand(`gamemode ${gamemodeType}`)
    }
    tell(msg: string): void {
        this.runCommand(WLStream.targettedTellraw(msg, this.nameTag))
    }
    
}