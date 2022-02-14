export class WLDataEntry {
    id: string
    wlData: WLData
    constructor(id: string, wlData: WLData) {
        this.wlData = wlData
        this.id = id
    }
    toJSON(): WLEntryData {
        return Object.assign({}, this, {
            wlData: JSON.stringify(this.wlData)
        });
    }
    static fromJSON(json: WLEntryData | string): WLDataEntry {
        if (typeof json === 'string') {
            return JSON.parse(json, WLDataEntry.reviver);
        } else {
            return new WLDataEntry(json.id, WLData.fromJSON(json.wlData))
        }
    }
    static reviver(key: string, value: any): any {
        return key === "" ? WLDataEntry.fromJSON(value) : value;
    }
}
export const WLDataTypes: Map<string, object> = new Map<string, object>([

])
interface WLEntryData {
    id: string
    wlData: WLData
}
export class WLData {
    data: any
    type: string
    isPrimitive: boolean
    name: string
    format: string
    constructor(data: any, type: string, name: string) {
        this.type = type;
        this.name = name;
        this.format = "v1.0"
        this.isPrimitive = type == 'string' || type == 'number' || type == 'boolean'
        this.data = data
    }
    toJSON(): WLJSONData {
        if (!this.isPrimitive) {
            return Object.assign({}, this, {
                data: JSON.stringify(this.data)
            });
        } else {
            return Object.assign({}, this, {
                data: this.data.toString()
            });
        }
    }
    static fromJSON(json: WLJSONData | string): WLData {
        if (typeof json === 'string') {
            return JSON.parse(json, WLData.reviver);
        } else {
            let user = Object.create(WLData.prototype);
            if (!json.isPrimitive) {
                return Object.assign(user, json, {
                    data: JSON.parse(json.data)
                });
            } else {
                return Object.assign(user, json, {
                    data: json.type=='string' ? json.data : (json.type=='number' ? parseFloat(json.data) : json.type==='true')
                });
            }
        }
    }
    static reviver(key: string, value: any): any {
        return key === "" ? WLData.fromJSON(value) : value;
    }
}
interface WLJSONData {
    data: any;
    type: string;
    isPrimitive: boolean
    name: string
    format: string
}