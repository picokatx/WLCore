import { Entity } from "../types/Entity.js";
import { WLData } from "./WLData.js";
const namespace: string = "dpm";
export class TagData {
    pData: WLData
    constructor(data: WLData) {
        this.pData = data
    }
    writeNew(entity: Entity) {
        entity.addTag(JSON.stringify(this.pData));
    }
    write(entity: Entity) {
        for (let i of entity.getTags()) {
            let j: WLData = WLData.fromJSON(JSON.parse(i));
            if (j.name == this.pData.name) {
                entity.removeTag(i)
                entity.addTag(JSON.stringify(this.pData));
                
                return
            };
        }
        entity.addTag(JSON.stringify(this.pData));
    }
    static clearTags(entity: Entity) {
        for (let i of entity.getTags()) {
            entity.removeTag(i);
        }
    }
    static hasTag(entity: Entity, tagName: string): boolean {
        for (let i of entity.getTags()) {
            if (WLData.fromJSON(JSON.parse(i)).name == tagName) {
                return true;
            };
        }
        return false;
    }
    static read(entity: Entity, tagName: string): WLData {
        for (let i of entity.getTags()) {
            let j: WLData = WLData.fromJSON(JSON.parse(i));
            if (j.name == tagName) {
                return j;
            };
        }
        return null;
    }
    static attrToString(attr: any, tagName: string): string {
        let data: WLData = new WLData(attr, typeof attr, tagName);
        return JSON.stringify(data)
    }
}