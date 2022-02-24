import { world } from "mojang-minecraft";
import { ModalFormData } from "./wlcore/types/ModalFormData.js";
import * as GameTest from "mojang-gametest";
import { PrintStream } from "./wlcore/log/PrintStream.js";
import { MCWLNamespaces } from "./Utils/constants/MCWLNamespaces.js";
import { locale } from "./Utils/constants/LocalisationStrings.js";
export let printStream = new PrintStream(world.getDimension("overworld"));
export let playerPrevLocDB = new Map();
export let playerPrevHealthDB = new Map();
export let commands = [];
export const cmdPrefix = ",";
export let simPlayer;
export function setSimPlayer(p) {
    simPlayer = p;
}
export let gameTestProto;
GameTest.register("mcwl", "proto", (test) => {
    gameTestProto = test;
}).structureName("ComponentTests:platform").maxTicks(9999999);
world.events.beforeItemDefinitionEvent.subscribe((eventData) => {
    printStream.println(eventData.eventName);
    if (eventData.source.id == "minecraft:player" && eventData.source.nameTag.charAt(0) != '_') {
        if (eventData.eventName == MCWLNamespaces.menuWand_open) {
            let a = new ModalFormData();
            a.title("MCWL GUI");
            a.textField("Please Review our addon", "Review");
            a.show(eventData.source).then(a => {
                for (let i of a.formValues) {
                    printStream.println(i);
                }
            });
        }
    }
});
function getNamespaceToken(s, start, end) {
    return s.split(":").slice(start, end + 1).join(":");
}
var NamespaceTypes;
(function (NamespaceTypes) {
    NamespaceTypes["bool"] = "bool";
    NamespaceTypes["int"] = "int";
    NamespaceTypes["void"] = "void";
})(NamespaceTypes || (NamespaceTypes = {}));
world.events.beforeDataDrivenEntityTriggerEvent.subscribe((eventData) => {
});
world.events.playerLeave.subscribe((eventData) => {
    printStream.println(`Hello! I hope you saved your player statistics, because if you didn't they're gone now.`);
});
world.events.playerJoin.subscribe((eventData) => {
});
world.events.beforeItemUseOn.subscribe((eventData) => {
});
function boolArrayToInt(b) {
    let ret = 0;
    for (let i = 0; i < b.length; i++) {
        ret += (b[i] ? 1 : 0) * Math.pow(2, i);
    }
    return ret;
}
world.events.tick.subscribe((eventData) => {
});
world.events.blockBreak.subscribe((eventData) => {
});
world.events.blockPlace.subscribe((eventData) => {
});
world.events.beforeChat.subscribe((eventData) => {
});
function cmdHandler(chatEvent) {
    const cmdBase = chatEvent.message.split(" ")[0];
    const cmdArgs = chatEvent.message.split(" ").slice(1).join(" ");
    const player = chatEvent.sender;
    let cmdIdx = commands.map(a => a.name).indexOf(cmdBase);
    if (cmdIdx == -1) {
        printStream.failure(locale.get("cmd_not_found"));
        return;
    }
    let subCmdIdx = commands[cmdIdx].cmdParameters.map(a => a.testRegex(cmdArgs)).indexOf(true);
    if (subCmdIdx != -1) {
        let args = commands[cmdIdx].cmdParameters[subCmdIdx].parseRegex(cmdArgs);
        let parsedArgs = new Map();
        commands[cmdIdx].cmdParameters[subCmdIdx].para.map((para, i) => { parsedArgs.set(para.name, para.type.parse(args[i])); });
        const ret = commands[cmdIdx].execute(player, parsedArgs, subCmdIdx);
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
    }
    else {
        printStream.failure(locale.get("cmd_return_default"));
    }
}
