import { ARG_NUMBER, CommandParameter, CommandFormat } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { printStream } from "../../Main.js";
import { BlockLocation } from "mojang-minecraft";
function record(player, args, subCmd) {
    let levelCount = 0;
    let levelPaddingCount = 0;
    let playerLoc = new BlockLocation(Math.floor(player.location.x), Math.floor(player.location.y) + 2, Math.floor(player.location.z));
    let floor = player.location.y;
    switch (subCmd) {
        case 0:
            while (playerLoc.y <= 320) {
                if (player.dimension.getBlock(playerLoc).isEmpty) {
                    levelPaddingCount++;
                }
                else {
                    if (levelPaddingCount >= args.get("padding")) {
                        levelCount++;
                        if (levelCount >= args.get("levels")) {
                            break;
                        }
                    }
                    floor = playerLoc.y + 1;
                    levelPaddingCount = 0;
                }
                playerLoc = playerLoc.above();
            }
            if (floor == player.location.y) {
                return [`Unable to find teleport location`, 1];
            }
            else {
                printStream.run(`tp @s ${playerLoc.x} ${floor} ${playerLoc.z}`, player);
                return [`recorded ${args.get("levels")} levels`, 0];
            }
        case 1:
            while (playerLoc.y <= 320) {
                if (player.dimension.getBlock(playerLoc).isEmpty) {
                    levelPaddingCount++;
                }
                else {
                    if (levelPaddingCount >= 2) {
                        levelCount++;
                        if (levelCount >= args.get("levels")) {
                            break;
                        }
                    }
                    floor = playerLoc.y + 1;
                    levelPaddingCount = 0;
                }
                playerLoc = playerLoc.above();
            }
            if (floor == player.location.y) {
                return [`Unable to find teleport location`, 1];
            }
            else {
                printStream.run(`tp @s ${playerLoc.x} ${floor} ${playerLoc.z}`, player);
                return [`recorded ${args.get("levels")} levels`, 0];
            }
        case 2:
            while (levelPaddingCount < 2 && playerLoc.y <= 320) {
                if (player.dimension.getBlock(playerLoc).isEmpty) {
                    levelPaddingCount++;
                }
                else {
                    floor = playerLoc.y + 1;
                    levelPaddingCount = 0;
                }
                playerLoc = playerLoc.above();
            }
            if (floor == player.location.y) {
                return [`Unable to find teleport location`, 1];
            }
            else {
                printStream.run(`tp @s ${playerLoc.x} ${floor} ${playerLoc.z}`, player);
                return [`recorded 1 level`, 0];
            }
        default:
            return [`subCmd index ${subCmd} out of range. subCmd does not exist`, 1];
    }
}
function recordSucceed(suc) {
    printStream.success(suc);
}
function recordFail(err) {
    printStream.failure(err);
}
function recordInfo(inf) {
    printStream.info(inf);
}
const recordCmd = new Command("record", "Records variety of stuff going on in your world, can replay it", [
    new CommandFormat([
        new CommandParameter("levels", ARG_NUMBER, false),
        new CommandParameter("padding", ARG_NUMBER, false)
    ]),
    new CommandFormat([
        new CommandParameter("levels", ARG_NUMBER, false)
    ]),
    new CommandFormat([])
], record, recordSucceed, recordFail, recordInfo, 3);
export { recordCmd };
