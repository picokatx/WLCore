import { CommandFormat, CommandParameter, ARG_STRING } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { playerDB, printStream } from "../../Main.js";
import { world } from "mojang-minecraft";
import { MCWLCommandReturn } from "../MCWLCmdReturn.js";
import { locale } from "../../Utils/constants/LocalisationStrings.js";
function raidstriggered(player, args, subCmd) {
    switch (subCmd) {
        case 0:
            let players = world.getPlayers();
            for (let i of players) {
                if (i.name == args.get(locale.get("cmd_args_target"))) {
                    let raidstriggered = playerDB.get(i.name).raidsTriggered;
                    return new MCWLCommandReturn(0, locale.get("cmd_return_raidstriggered_0_info"), args.get(locale.get("cmd_args_target")), raidstriggered);
                }
            }
        default:
            return new MCWLCommandReturn(1, locale.get("cmd_return_default"), raidstriggeredCmd.name);
    }
}
function raidstriggeredSucceed(s, args) {
    printStream.success(s, args);
}
function raidstriggeredFail(s, args) {
    printStream.failure(s, args);
}
function raidstriggeredInfo(s, args) {
    printStream.info(s, args);
}
const raidstriggeredCmd = new Command(locale.get("cmd_name_raidstriggered"), locale.get("cmd_description_raidstriggered"), [
    new CommandFormat([
        new CommandParameter(locale.get("cmd_args_target"), ARG_STRING, false)
    ])
], raidstriggered, raidstriggeredSucceed, raidstriggeredFail, raidstriggeredInfo, 3);
export { raidstriggeredCmd };
