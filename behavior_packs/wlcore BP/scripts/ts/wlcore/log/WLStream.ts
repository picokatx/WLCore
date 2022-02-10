import { Player } from "mojang-minecraft";
import { notifPrefix } from "./PrintStream";

export class WLStream {
    static runGlobal(s: string) {
        return `${s}`;
    }
    static run(s: string, player: Player) {
        return `execute @a[name=${player.name}] ~ ~ ~ ${s}`;
    }
    static chat(s: string, player: Player, target: string) {
        return `tellraw "${target}" {"rawtext":[{"text":"<${player.name}> ${s}"}]}`;
    }
    static sudoChat(s: string, name: string, target: string) {
        return `tellraw ${target} {"rawtext":[{"text":"<${name}> ${s}"}]}`;
    }
    static globalChat(s: string, player: Player) {
        return `tellraw @a {"rawtext":[{"text":"<${player.name}> ${s}"}]}`;
    }
    static consoleChat(s: string) {
        return `tellraw @a {"rawtext":[{"text":"<${notifPrefix}> ${s}"}]}`;
    }
    static tellraw(s: string): string {
        return `tellraw @a {"rawtext":[{"text":"${s}"}]}`;
    }
    static targettedTellraw(s: string, target: string): string {
        return `tellraw ${target} {"rawtext":[{"text":"${s}"}]}`;
    }
    static say(s: string): string {
        return `say ${s}`;
    }
    static sayPlayer(s: string, player: Player) {
        return `execute @a [name="${player.name}"] ~~~ say ${s}`;
    }
}