import { LocaleNamespaces } from "../constants/LocaleNamespaces.js";
import { locale } from "../constants/LocalisationStrings.js";
import { Player } from "../types/Player.js";
import { DebugCommand } from "./DebugCommand.js";
const commands = [
    new DebugCommand()
];
export var Permissions;
(function (Permissions) {
    Permissions["member"] = "mcwl:permissions.member";
    Permissions["operator"] = "mcwl:permissions.operator";
})(Permissions || (Permissions = {}));
function cmdHandler(chatEvent) {
    const cmdBase = chatEvent.message.split(" ")[0];
    const cmdArgs = chatEvent.message.split(" ").slice(1).join(" ");
    const player = new Player(chatEvent.sender);
    let cmdIdx = -1;
    for (let i = 0; i < commands.length; i++) {
        if (commands[i].name == cmdBase || commands[i].aliases.map(a => a == cmdBase).indexOf(true) != -1) {
            cmdIdx = i;
        }
    }
    if (cmdIdx == -1) {
        player.printStream.failure(locale.get(LocaleNamespaces.cmd_not_found));
        return;
    }
    for (let i of commands[cmdIdx].format) {
        if (i[0].testRegex(cmdArgs)) {
            let args = i[0].parseRegex(cmdArgs);
            let parsedArgs = new Map();
            i[0].para.map((arg, i) => { parsedArgs.set(arg.name, arg.parse(args[i])); });
            for (let j of player.permissions) {
                for (let k of commands[cmdIdx].permissions) {
                    if (j == k) {
                        const ret = i[1](player, parsedArgs);
                        const retMsg = ret.returnMessage;
                        const errCode = ret.errorCode;
                        const retArgs = ret.messageArgs;
                        switch (errCode) {
                            case 0:
                                commands[cmdIdx].success(retMsg, retArgs);
                                break;
                            case 1:
                                commands[cmdIdx].failure(retMsg, retArgs);
                                break;
                            case 2:
                                commands[cmdIdx].info(retMsg, retArgs);
                                break;
                        }
                        return;
                    }
                }
                player.printStream.failure(locale.get(LocaleNamespaces.cmd_permissions));
            }
        }
        player.printStream.failure(locale.get(LocaleNamespaces.cmd_return_default));
    }
}
