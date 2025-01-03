import { Player } from "../types/Player.js";
import { BaseTagEntry } from "./BaseTagEntry.js";

export interface BaseTagDB {
    db: BaseTagEntry[];
    initialize(playerMap: Map<Player, any>, player: Player, defaultValue: any): void
    saveToTag(player: Player): void
}
export interface ValueTagDB {
    add(stat: string, dataType?: string): void
    set(stat: string, val: number, dataType?: string): void
    getEntryById(stat: string): BaseTagEntry
}