export const ARG_TYPE = {
    DEFAULT: RegExp(/.+/),
    NUMBER: RegExp(/((?:-|)\d+)/),
    FLOAT: RegExp(/((?:-|)\d+\.\d+)/),
    STRING: RegExp(/("(?:[\w:@ ]+)"|(?:[\w:@]+))/),
    WORLD_POS: RegExp(/(?:(~|)((?:-|)\d+(?:\.\d+|)|(?:~))) (?:(~|)((?:-|)\d+(?:\.\d+|)|(?:~))) (?:(~|)((?:-|)\d+(?:\.\d+|)|(?:~)))/),
    RADIO: function (choices: String[]): RegExp { return RegExp('(' + choices.join("|") + ")") },
    LIST: RegExp(/(\[(?:.+)(?:,(?:.+))*\])/),
    JSON: RegExp(/(\{(?:.+)(?:,(?:.+))*\})/),
    EXPRESSION: RegExp(/(\<(?:.+)(?:,(?:.+))*\>)/)
}
export class Parameter {
    name: string
    regex: RegExp
    optional: boolean
    constructor(name: string, optional: boolean) {
        this.name = name
        this.optional = optional
        this.regex = ARG_TYPE.DEFAULT
    }
    test(s: string): boolean {
        return this.regex.test(s)
    }
    parse(s: string): any {
        return s
    }
}
export class NumberParameter extends Parameter {
    constructor(name: string, optional: boolean) {
        super(name, optional)
        this.regex = ARG_TYPE.NUMBER
    }
    override test(s: string): boolean {
        return this.regex.test(s)
    }
    override parse(s: string): number {
        return parseInt(s)
    }
}
export class FloatParameter extends Parameter {
    constructor(name: string, optional: boolean) {
        super(name, optional)
        this.regex = ARG_TYPE.FLOAT
    }
    override test(s: string): boolean {
        return this.regex.test(s)
    }
    override parse(s: string): number {
        return parseFloat(s)
    }
}
export class StringParameter extends Parameter {
    constructor(name: string, optional: boolean) {
        super(name, optional)
        this.regex = ARG_TYPE.STRING
    }
    override test(s: string): boolean {
        return this.regex.test(s)
    }
    override parse(s: string): string {
        return s
    }
}
export class RadioParameter extends Parameter {
    constructor(name: string, optional: boolean, choices: string[]) {
        super(name, optional)
        this.regex = ARG_TYPE.RADIO(choices)
    }
    override test(s: string): boolean {
        return this.regex.test(s)
    }
    override parse(s: string): string {
        return s
    }
}
export class ListParameter extends Parameter {
    constructor(name: string, optional: boolean) {
        super(name, optional)
        this.regex = ARG_TYPE.LIST
    }
    override test(s: string): boolean {
        return this.regex.test(s)
    }
    override parse(s: string): string {
        return JSON.parse(s)
    }
}
export class JSONParameter extends Parameter {
    constructor(name: string, optional: boolean) {
        super(name, optional)
        this.regex = ARG_TYPE.JSON
    }
    override test(s: string): boolean {
        return this.regex.test(s)
    }
    override parse(s: string): string {
        return JSON.parse(s)
    }
}
export class LocationParameter extends Parameter {
    constructor(name: string, optional: boolean) {
        super(name, optional)
        this.regex = ARG_TYPE.WORLD_POS
    }
    override test(s: string): boolean {
        return this.regex.test(s)
    }
    override parse(s: string): string[] {
        return this.regex.exec(s)
    }
}

export class CommandFormat {
    para: Parameter[]
    constructor(...para: Parameter[]) {
        this.para = Array.from(para)
    }
    testRegex(cmd: string) { 
        return RegExp(this.para.map(a => a.regex.source)
            .join("\\s")
            .slice(0, -2))
            .test(cmd)
    }
    parseRegex(cmd: string) {
        return RegExp(this.para.map(a => a.regex.source)
            .join("\\s")
            .slice(0, -2))
            .exec(cmd)
            .slice(1)
    }
}