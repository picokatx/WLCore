import { LocaleNamespaces } from "../constants/LocaleNamespaces.js";
import { locale } from "../constants/LocalisationStrings.js";
import { Permissions } from "./Command.js";
import { CommandFormat, StringParameter } from "./CommandParameter.js";
export class DebugCommand {
    constructor() {
        this.name = locale.get(LocaleNamespaces.cmd_name_debug);
        this.aliases.push(LocaleNamespaces.cmd_alias_debug);
        this.description = locale.get(LocaleNamespaces.cmd_description_debug);
        this.format.set(new CommandFormat(new StringParameter(locale.get(LocaleNamespaces.cmd_args_name), false)), this.debug);
        this.permissions.push(Permissions.member);
    }
    debug(player, args) {
        return;
    }
    success(s, ...args) {
    }
    failure(s, ...args) {
    }
    info(s, ...args) {
    }
}
