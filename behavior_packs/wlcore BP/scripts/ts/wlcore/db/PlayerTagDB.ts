import { WLData, WLDataEntry } from "../data/WLData";
import { _Player } from "../constants/Exports";
import { TagData } from "../data/TagData";
import { v4 } from "uuid";
import { Player } from "../types/Player";
export class PlayerTagDB {
    db: Map<string, WLData> = new Map<string, WLData>()
    player: Player
    constructor(player: Player, isNew: boolean) {
        this.player = player
        if (isNew) {
            /*Initialize db here*/
        } else {
            this.loadDB()
        }
    }
    initEntry() {
        this.db.set(v4(), null)
    }
    addEntry(data: WLData) {
        this.db.set(v4(), data)
    }
    findEntryByTagID(uuid: string): any {
        return this.db.get(uuid)
    }
    loadDB() {
        let tags: string[] = this.player.getTags()
        tags.forEach((entry) => {
            let raw: WLDataEntry = WLDataEntry.fromJSON(JSON.parse(entry))
            let id: string = raw.id
            let wlData: WLData = raw.wlData
            this.db.set(id, wlData)
        })
    }
    saveDB() {
        TagData.clearTags(this.player);
        for (let i of this.stringifyDB()) {
            this.player.addTag(i);
        }
    }
    stringifyDB(): string[] {
        let ret: string[] = []
        for (let i of this.db) {
            ret.push(PlayerTagDB.stringifyEntry(i[1], i[0]))
        }
        return ret
    }
    static stringifyEntry(entry: WLData, id: string): string {
        let data: WLDataEntry = new WLDataEntry(id, entry);
        return JSON.stringify(data)
    }
}