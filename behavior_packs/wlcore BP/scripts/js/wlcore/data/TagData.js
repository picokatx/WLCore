import { WLData } from "./WLData.js";
const namespace = "dpm";
export class TagData {
    constructor(data) {
        this.pData = data;
    }
    writeNew(entity) {
        entity.addTag(JSON.stringify(this.pData));
    }
    write(entity) {
        for (let i of entity.getTags()) {
            let j = WLData.fromJSON(JSON.parse(i));
            if (j.name == this.pData.name) {
                entity.removeTag(i);
                entity.addTag(JSON.stringify(this.pData));
                return;
            }
            ;
        }
        entity.addTag(JSON.stringify(this.pData));
    }
    static clearTags(entity) {
        for (let i of entity.getTags()) {
            entity.removeTag(i);
        }
    }
    static hasTag(entity, tagName) {
        for (let i of entity.getTags()) {
            if (WLData.fromJSON(JSON.parse(i)).name == tagName) {
                return true;
            }
            ;
        }
        return false;
    }
    static read(entity, tagName) {
        for (let i of entity.getTags()) {
            let j = WLData.fromJSON(JSON.parse(i));
            if (j.name == tagName) {
                return j;
            }
            ;
        }
        return null;
    }
    static attrToString(attr, tagName) {
        let data = new WLData(attr, typeof attr, tagName);
        return JSON.stringify(data);
    }
}
