import { ColorCodes } from "../constants/ColorCodes.js";
import { CustomCharID } from "../constants/CustomCharID.js";
import { WLStream } from "./WLStream.js";
import { getAttributes, getMethods } from "./StringifyObject.js";
import { Entity } from "../types/Entity.js";
import { _Dimension, _EntityIterator } from "../constants/Exports.js";
import { Player } from "../types/Player.js";
export const filter: RegExp = RegExp(/[^\w\d\s]/);
export const notifPrefix: string = `${ColorCodes.grey}[${ColorCodes.darkgreen}${ColorCodes.bold}MCWL${ColorCodes.reset}${ColorCodes.grey}]`
export class PrintStream {
    private hasError: boolean = false;
    private debugEnabled: boolean = true;
    private printable: _Dimension | Entity;
    private outputStream: string = "";
    private queued: string[] = [];
    constructor(printable: _Dimension | Entity) {
        this.printable = printable;
    }
    broadcast() {
        if (this.queued.length > 0) {
            try {
                this.printable.runCommand(this.queued[0]);
                this.queued.shift();
            } catch {

            }
        }
    }
    broadcastAll() {
        if (this.queued.length > 0) {
            try {
                for (let i of this.queued) {
                    this.printable.runCommand(i);
                    this.queued.shift();
                }
            } catch {

            }
        }
    }
    setError() {
        this.hasError = true;
    }
    clearError() {
        this.hasError = false;
    }
    checkError(): boolean {
        return this.hasError;
    }
    setDebugEnabled(b: boolean) {
        this.debugEnabled = b;
    }
    flush(): void {
        if (this.outputStream != "") {
            this.queued.push(WLStream.tellraw(this.outputStream));
            this.outputStream = "";
        }
    }
    print(s: any): void {
        switch (typeof s) {
            case 'string':
                this.outputStream += PrintStream.cleanText(s);
                break;
            case 'number':
                this.outputStream += s + "";
                break;
            case 'boolean':
                this.outputStream += s + "";
                break;
            case 'object':
                this.outputStream += `${ColorCodes.grey}Object${ColorCodes.bold} ${(s as Object).constructor.name}${ColorCodes.reset}\\n`;
                this.outputStream += `  ${ColorCodes.grey}Functions:${ColorCodes.reset}\\n`;
                getMethods(s).forEach((key) => {
                    this.outputStream += `    ${key}()\\n`;
                });
                this.outputStream += `  ${ColorCodes.grey}Attributes:${ColorCodes.reset}\\n`;
                getAttributes(s).forEach((key) => {
                    this.outputStream += `    ${key}\\n`;
                });
                break;
            default:
                this.hasError = true;
                this.outputStream += "Invalid Char";
        }
    }
    success(s: string, args?: any[]) {
        this.flush();
        if (args == null) {
            this.queued.push(WLStream.targettedTellraw(`${notifPrefix} ${ColorCodes.blue}${s}${ColorCodes.reset}`,'@s'));
        } else {
            this.queued.push(WLStream.targettedTellraw(`${notifPrefix} ${ColorCodes.blue}${this.format(s, args)}${ColorCodes.reset}`,'@s'));
        }
    }
    info(s: string, args?: any[]) {
        this.flush();
        if (args == null) {
            this.queued.push(WLStream.targettedTellraw(`${notifPrefix} ${ColorCodes.grey}${s}${ColorCodes.reset}`,'@s'));
        } else {
            this.queued.push(WLStream.targettedTellraw(`${notifPrefix} ${ColorCodes.grey}${this.format(s, args)}${ColorCodes.reset}`,'@s'));
        }
    }
    failure(s: string, args?: any[]) {
        this.flush();
        if (args == null) {
            this.queued.push(WLStream.targettedTellraw(`${notifPrefix} ${ColorCodes.darkred}${s}${ColorCodes.reset}`,'@s'));
        } else {
            this.queued.push(WLStream.targettedTellraw(`${notifPrefix} ${ColorCodes.darkred}${this.format(s, args)}${ColorCodes.reset}`,'@s'));
        }
    }
    run(s: string) {
        if (this.printable instanceof Player) {
            this.queued.push(WLStream.run(s, this.printable));
        } else {
            this.queued.push(WLStream.runGlobal(s));
        }
    }
    format(s: string, args: any[]) {
        let a = Array.from(args);
        try {
            let ret = s;
            for (let i of a) {
                if (typeof i == 'string') {
                    ret = ret.replace(new RegExp(/%s/), i as string)
                } else if (typeof i == 'number') {
                    ret = ret.replace(new RegExp(/%d/), "" + (i as number))
                } else if (typeof i == 'boolean') {
                    ret = ret.replace(new RegExp(/%b/), "" + (i as boolean))
                }
            }
            return ret;
        } catch {
            this.failure(`Arguments of length ${a.length} does not satisfy requirement`);
        }
    }
    println(s: any, ...args: any): void {
        this.print(this.format(s, args));
        this.queued.push(WLStream.tellraw(this.outputStream));
        this.outputStream = "";
    }
    chat(s: string, targets: _EntityIterator) {
        this.flush();
        if (this.printable instanceof Player) {
            for (let i of targets) {
                this.queued.push(WLStream.chat(PrintStream.replaceWithEmotes(s), this.printable, i.nameTag));
            }
        } else {
            this.queued.push(WLStream.consoleChat(PrintStream.replaceWithEmotes(s)));
        }
    }
    sudoChat(s: string, name: string, target: string) {
        this.flush();
        this.queued.push(WLStream.sudoChat(PrintStream.replaceWithEmotes(s), name, target));
    }
    static cleanText(s: string): string {
        return s.replace(RegExp(/(?<!\\)\"/g), "\\\"")
    }
    debug(s: string) {
        this.flush();
        if (this.debugEnabled) {
            this.queued.push(WLStream.tellraw(`[${ColorCodes.blue}DEBUG${ColorCodes.reset}] ${PrintStream.cleanText(s)}`));
        }
    }
    static replaceWithEmotes(s: string) {
        let ret = s;
        for (let i of Object.entries(CustomCharID)) {
            ret = ret.replace(new RegExp(`:${i[0]}:`, 'g'), i[1].toString());
        }
        return ret;
    }
}

