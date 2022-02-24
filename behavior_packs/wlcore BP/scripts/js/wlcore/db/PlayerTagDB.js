import { WLDataEntry } from "../data/WLData.js";
import { TagData } from "../data/TagData.js";
import { v4 } from "uuid";
export class PlayerTagDB {
    constructor(player, isNew) {
        this.db = new Map();
        this.player = player;
        if (isNew) {
        }
        else {
            this.load();
        }
    }
    initEntry() {
        this.db.set(v4(), null);
    }
    addEntry(data) {
        this.db.set(v4(), data);
    }
    findEntryByTagID(uuid) {
        return this.db.get(uuid);
    }
    load() {
        let tags = this.player.getTags();
        tags.forEach((entry) => {
            let raw = WLDataEntry.fromJSON(JSON.parse(entry));
            let id = raw.id;
            let wlData = raw.wlData;
            this.db.set(id, wlData);
        });
    }
    save() {
        TagData.clearTags(this.player);
        for (let i of this.stringify()) {
            this.player.addTag(i);
        }
    }
    stringify() {
        let ret = [];
        for (let i of this.db) {
            ret.push(PlayerTagDB.stringifyEntry(i[1], i[0]));
        }
        return ret;
    }
    static stringifyEntry(entry, id) {
        let data = new WLDataEntry(id, entry);
        return JSON.stringify(data);
    }
}
