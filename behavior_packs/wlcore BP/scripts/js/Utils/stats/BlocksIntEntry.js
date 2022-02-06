export const ITEM_ANY = "minecraft:any";
export class BlocksIntEntry {
    constructor(stat, count) {
        this.stat = stat;
        if (count != null) {
            this.count = count;
        }
        else {
            this.count = 0;
        }
    }
    toJSON() {
        return Object.assign({}, this);
    }
    static fromJSON(json) {
        if (typeof json === 'string') {
            return JSON.parse(json, BlocksIntEntry.reviver);
        }
        else {
            let user = Object.create(BlocksIntEntry.prototype);
            return Object.assign(user, json);
        }
    }
    static reviver(key, value) {
        return key === "" ? BlocksIntEntry.fromJSON(value) : value;
    }
}
