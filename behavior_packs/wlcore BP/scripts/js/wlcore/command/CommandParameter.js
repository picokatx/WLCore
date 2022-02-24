export const ARG_TYPE = {
    DEFAULT: RegExp(/.+/),
    NUMBER: RegExp(/((?:-|)\d+)/),
    FLOAT: RegExp(/((?:-|)\d+\.\d+)/),
    STRING: RegExp(/("(?:[\w:@ ]+)"|(?:[\w:@]+))/),
    WORLD_POS: RegExp(/(?:(~|)((?:-|)\d+(?:\.\d+|)|(?:~))) (?:(~|)((?:-|)\d+(?:\.\d+|)|(?:~))) (?:(~|)((?:-|)\d+(?:\.\d+|)|(?:~)))/),
    RADIO: function (choices) { return RegExp('(' + choices.join("|") + ")"); },
    LIST: RegExp(/(\[(?:.+)(?:,(?:.+))*\])/),
    JSON: RegExp(/(\{(?:.+)(?:,(?:.+))*\})/),
    EXPRESSION: RegExp(/(\<(?:.+)(?:,(?:.+))*\>)/)
};
export class Parameter {
    constructor(name, optional) {
        this.name = name;
        this.optional = optional;
        this.regex = ARG_TYPE.DEFAULT;
    }
    test(s) {
        return this.regex.test(s);
    }
    parse(s) {
        return s;
    }
}
export class NumberParameter extends Parameter {
    constructor(name, optional) {
        super(name, optional);
        this.regex = ARG_TYPE.NUMBER;
    }
    test(s) {
        return this.regex.test(s);
    }
    parse(s) {
        return parseInt(s);
    }
}
export class FloatParameter extends Parameter {
    constructor(name, optional) {
        super(name, optional);
        this.regex = ARG_TYPE.FLOAT;
    }
    test(s) {
        return this.regex.test(s);
    }
    parse(s) {
        return parseFloat(s);
    }
}
export class StringParameter extends Parameter {
    constructor(name, optional) {
        super(name, optional);
        this.regex = ARG_TYPE.STRING;
    }
    test(s) {
        return this.regex.test(s);
    }
    parse(s) {
        return s;
    }
}
export class RadioParameter extends Parameter {
    constructor(name, optional, choices) {
        super(name, optional);
        this.regex = ARG_TYPE.RADIO(choices);
    }
    test(s) {
        return this.regex.test(s);
    }
    parse(s) {
        return s;
    }
}
export class ListParameter extends Parameter {
    constructor(name, optional) {
        super(name, optional);
        this.regex = ARG_TYPE.LIST;
    }
    test(s) {
        return this.regex.test(s);
    }
    parse(s) {
        return JSON.parse(s);
    }
}
export class JSONParameter extends Parameter {
    constructor(name, optional) {
        super(name, optional);
        this.regex = ARG_TYPE.JSON;
    }
    test(s) {
        return this.regex.test(s);
    }
    parse(s) {
        return JSON.parse(s);
    }
}
export class LocationParameter extends Parameter {
    constructor(name, optional) {
        super(name, optional);
        this.regex = ARG_TYPE.WORLD_POS;
    }
    test(s) {
        return this.regex.test(s);
    }
    parse(s) {
        return this.regex.exec(s);
    }
}
export class CommandFormat {
    constructor(...para) {
        this.para = Array.from(para);
    }
    testRegex(cmd) {
        return RegExp(this.para.map(a => a.regex.source)
            .join("\\s")
            .slice(0, -2))
            .test(cmd);
    }
    parseRegex(cmd) {
        return RegExp(this.para.map(a => a.regex.source)
            .join("\\s")
            .slice(0, -2))
            .exec(cmd)
            .slice(1);
    }
}
