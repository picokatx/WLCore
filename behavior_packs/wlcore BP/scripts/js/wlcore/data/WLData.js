export class WLDataEntry {
    constructor(id, wlData) {
        this.wlData = wlData;
        this.id = id;
    }
    toJSON() {
        return Object.assign({}, this, {
            wlData: JSON.stringify(this.wlData)
        });
    }
    static fromJSON(json) {
        if (typeof json === 'string') {
            return JSON.parse(json, WLDataEntry.reviver);
        }
        else {
            return new WLDataEntry(json.id, WLData.fromJSON(json.wlData));
        }
    }
    static reviver(key, value) {
        return key === "" ? WLDataEntry.fromJSON(value) : value;
    }
}
export const WLDataTypes = new Map([]);
export class WLData {
    constructor(data, type, name) {
        this.type = type;
        this.name = name;
        this.format = "v1.0";
        this.data = data;
    }
    toJSON() {
        if (!(this.type == 'string' || this.type == 'number' || this.type == 'boolean')) {
            return Object.assign({}, this, {
                data: JSON.stringify(this.data)
            });
        }
        else {
            return Object.assign({}, this, {
                data: this.data.toString()
            });
        }
    }
    static fromJSON(json) {
        if (typeof json === 'string') {
            return JSON.parse(json, WLData.reviver);
        }
        else {
            let user = Object.create(WLData.prototype);
            if (!(json.type == 'string' || json.type == 'number' || json.type == 'boolean')) {
                return Object.assign(user, json, {
                    data: JSON.parse(json.data)
                });
            }
            else {
                return Object.assign(user, json, {
                    data: json.type == 'string' ? json.data : (json.type == 'number' ? parseFloat(json.data) : json.type.toString() === 'true')
                });
            }
        }
    }
    static reviver(key, value) {
        return key === "" ? WLData.fromJSON(value) : value;
    }
}
