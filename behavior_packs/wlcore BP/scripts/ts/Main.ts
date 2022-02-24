import { world, BeforeChatEvent, PlayerJoinEvent, ChatEvent, BlockBreakEvent, TickEvent, Location, BeforeItemUseOnEvent, Items, Block, PlayerLeaveEvent, BlockPlaceEvent, EntityIterator, BeforeDataDrivenEntityTriggerEvent, BeforeItemDefinitionEventSignal, BeforeItemDefinitionTriggeredEvent, ItemStack, BlockLocation, BeforeItemUseEvent, EntityInventoryComponent } from "mojang-minecraft";
import {ModalFormData} from "./wlcore/types/ModalFormData.js"
import * as GameTest from "mojang-gametest"
import { Command } from "./Command/Command.js";
import { PrintStream } from "./wlcore/log/PrintStream.js";
import { MCWLNamespaces } from "./Utils/constants/MCWLNamespaces.js";
import { MCWLCommandReturn } from "./Command/MCWLCmdReturn.js";
import { locale } from "./Utils/constants/LocalisationStrings.js";
import { Player } from "./wlcore/types/Player.js";
export let printStream: PrintStream = new PrintStream(world.getDimension("overworld"));
export let playerPrevLocDB: Map<string, Location> = new Map<string, Location>();
export let playerPrevHealthDB: Map<string, number> = new Map<string, number>();

export let commands: Command[] = []
export const cmdPrefix = ",";
export let simPlayer: GameTest.SimulatedPlayer
export function setSimPlayer(p: GameTest.SimulatedPlayer) {
    simPlayer = p
}
export let gameTestProto: GameTest.Test;
GameTest.register("mcwl", "proto", (test) => {
    gameTestProto = test
}).structureName("ComponentTests:platform").maxTicks(9999999)
world.events.beforeItemDefinitionEvent.subscribe((eventData: BeforeItemDefinitionTriggeredEvent) => {
    printStream.println(eventData.eventName);
    if (eventData.source.id == "minecraft:player" && eventData.source.nameTag.charAt(0) != '_') {
        if (eventData.eventName == MCWLNamespaces.menuWand_open) {
            let a: ModalFormData = new ModalFormData();
            a.title("MCWL GUI")
            a.textField("Please Review our addon", "Review")
            a.show(eventData.source as unknown as Player).then(a => {
                for (let i of a.formValues) {
                    printStream.println(i)
                }
            })
        }
    }
})
function getNamespaceToken(s: String, start: number, end: number): string {
    return s.split(":").slice(start, end + 1).join(":")
}
enum NamespaceTypes {
    bool = "bool",
    int = "int",
    void = "void"
}
world.events.beforeDataDrivenEntityTriggerEvent.subscribe((eventData: BeforeDataDrivenEntityTriggerEvent) => {
})
world.events.playerLeave.subscribe((eventData: PlayerLeaveEvent) => {
    printStream.println(`Hello! I hope you saved your player statistics, because if you didn't they're gone now.`)
})
world.events.playerJoin.subscribe((eventData: PlayerJoinEvent) => {
})

world.events.beforeItemUseOn.subscribe((eventData: BeforeItemUseOnEvent) => {

})
function boolArrayToInt(b: boolean[]): number {
    let ret: number = 0;
    for (let i = 0; i < b.length; i++) {
        ret += (b[i] ? 1 : 0) * Math.pow(2, i)
    }
    return ret
}
world.events.tick.subscribe((eventData: TickEvent) => {
})

world.events.blockBreak.subscribe((eventData: BlockBreakEvent) => {
})
world.events.blockPlace.subscribe((eventData: BlockPlaceEvent) => {

})
world.events.beforeChat.subscribe((eventData: BeforeChatEvent) => {
    
});
function cmdHandler(chatEvent: ChatEvent) {
    const cmdBase = chatEvent.message.split(" ")[0];
    const cmdArgs = chatEvent.message.split(" ").slice(1).join(" ");
    const player = chatEvent.sender;
    let cmdIdx = commands.map(a => a.name).indexOf(cmdBase);
    if (cmdIdx == -1) {
        printStream.failure(locale.get("cmd_not_found") as any);
        return
    }
    let subCmdIdx = commands[cmdIdx].cmdParameters.map(a => a.testRegex(cmdArgs)).indexOf(true);
    if (subCmdIdx != -1) {
        let args = commands[cmdIdx].cmdParameters[subCmdIdx].parseRegex(cmdArgs);
        let parsedArgs: Map<string, any> = new Map()
        commands[cmdIdx].cmdParameters[subCmdIdx].para.map((para, i) => { parsedArgs.set(para.name, para.type.parse(args[i])) })
        const ret: MCWLCommandReturn = commands[cmdIdx].execute(player, parsedArgs, subCmdIdx);
        const retMsg = ret.returnMessage
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
    } else {
        printStream.failure(locale.get("cmd_return_default"));
    }
}
