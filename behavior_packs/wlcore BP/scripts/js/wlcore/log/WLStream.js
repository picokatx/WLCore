import { notifPrefix } from "./PrintStream";
export class WLStream {
    static runGlobal(s) {
        return `${s}`;
    }
    static run(s, player) {
        return `execute @a[name=${player.name}] ~ ~ ~ ${s}`;
    }
    static chat(s, player, target) {
        return `tellraw "${target}" {"rawtext":[{"text":"<${player.name}> ${s}"}]}`;
    }
    static sudoChat(s, name, target) {
        return `tellraw ${target} {"rawtext":[{"text":"<${name}> ${s}"}]}`;
    }
    static globalChat(s, player) {
        return `tellraw @a {"rawtext":[{"text":"<${player.name}> ${s}"}]}`;
    }
    static consoleChat(s) {
        return `tellraw @a {"rawtext":[{"text":"<${notifPrefix}> ${s}"}]}`;
    }
    static tellraw(s) {
        return `tellraw @a {"rawtext":[{"text":"${s}"}]}`;
    }
    static targettedTellraw(s, target) {
        return `tellraw ${target} {"rawtext":[{"text":"${s}"}]}`;
    }
    static say(s) {
        return `say ${s}`;
    }
    static sayPlayer(s, player) {
        return `execute @a [name="${player.name}"] ~~~ say ${s}`;
    }
}
