import { LocaleNamespaces } from "../constants/LocaleNamespaces";
import { locale } from "../constants/LocalisationStrings";
import { Player } from "../types/Player";
import { Command, Permissions } from "./Command";
import { CommandFormat, StringParameter } from "./CommandParameter";
import { MCWLCommandReturn } from "./MCWLCmdReturn";

export class DebugCommand implements Command {
    name: string;
    aliases: string[];
    description: string;
    format: Map<CommandFormat, (player: Player, args: Map<string, any>) => MCWLCommandReturn>;
    permissions: Permissions[];
    constructor() {
        this.name = locale.get(LocaleNamespaces.cmd_name_debug)
        this.aliases.push(LocaleNamespaces.cmd_alias_debug)
        this.description = locale.get(LocaleNamespaces.cmd_description_debug)
        this.format.set(new CommandFormat(
            new StringParameter(locale.get(LocaleNamespaces.cmd_args_name), false)
        ), this.debug)
        this.permissions.push(Permissions.member)
    }
    debug(player: Player, args: Map<string, any>): MCWLCommandReturn {
        return
    }
    success(s: string, ...args: any): void {

    }
    failure(s: string, ...args: any): void {

    }
    info(s: string, ...args: any): void {

    }
}