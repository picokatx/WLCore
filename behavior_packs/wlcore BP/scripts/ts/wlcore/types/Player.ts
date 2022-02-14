import { _Player, _Block, _Entity, _IEntityComponent, _EntityInventoryComponent } from "../constants/Exports.js"
import { Entity } from "./Entity.js"
import { WLStream } from "../log/WLStream.js";
import { v4 as uuidv4 } from "uuid"
import { EntityComponents } from "../constants/EntityComponents.js";
import { EntityInventoryComponent, Items, ItemStack, world } from "mojang-minecraft";
import { molangQueries } from "../constants/MolangNamespaces.js";
import { BlockLocation } from "./BlockLocation.js";
import { Permissions } from "../command/Command.js";
import { FogTypes } from "./FogTypes.js";
import { GamemodeTypes } from "./GamemodeTypes.js";

export class Player extends Entity {
    _player: _Player
    uuid: string
    molangQueries: Map<string, boolean>
    permissions: Permissions[]
    constructor(player: _Player) {
        super(player)
        this._player = player
        this.uuid = uuidv4()
        this.molangQueries = molangQueries
        world.events.beforeDataDrivenEntityTriggerEvent.subscribe((eventData) => {
            this.printStream.println(eventData.id)
            if (eventData.entity.id == "minecraft:player" && getNamespaceToken(eventData.id, 0, 1) == "mcwl:molangquery" && eventData.entity.nameTag.charAt(0) != '_') {
                let namespace: string = getNamespaceToken(eventData.id, 0, 2)
                let type: string = getNamespaceToken(eventData.id, 3, 3)
                switch (type) {
                    case NamespaceTypes["bool"]:
                        let boolValue: boolean = getNamespaceToken(eventData.id, 4, 4) == 'true'
                        if (boolValue != null) {
                            this.molangQueries.set(namespace, boolValue)
                        }
                        /*if (namespace == MolangNamespaces.is_alive && boolValue == false) {
                            timeSinceDeath = 0
                            deaths++;
                        }
                        else if (namespace == MolangNamespaces.is_jumping && boolValue == true) {
                            jump++;
                        } else if (namespace == MolangNamespaces.raid_triggered) {
                            raidsTriggered++;
                        } else if (namespace == MolangNamespaces.is_sleeping) {
                            sleepInBed++
                            timeSinceRest = 0;
                        }*/
                        break
                    case NamespaceTypes["int"]:
                        let idx: number = parseInt(getNamespaceToken(eventData.id, 4, 4))
                        let value: boolean = getNamespaceToken(eventData.id, 5, 5) == 'true'
                        //health[idx] = value
                        break
                    case NamespaceTypes["void"]:
                    /*for (let i of Object.values(DamageEntityTypes)) {
                        if (namespace==i) {
                            entitiesKilled.getEntryById(i).count++
                        }
                    }
                    for (let i of Object.values(DamagePlayerTypes)) {
                        if (namespace==i) {
                            
                        }
                    }*/
                }

            }
        })
    }
    get name(): string {
        return this._player.name
    }
    getuuid(): string {
        return this.uuid
    }
    get selectedSlot(): number {
        return this._player.selectedSlot
    }
    set selectedSlot(selectedSlot: number) {
        this._player.selectedSlot = selectedSlot
    }
    get xp(): number {
        return
    }
    set xp(pts: number) {

    }
    kick(reason?: string): void {
        this.dimension.runCommand(`kick ${this.name} ${reason != null ? reason : ""}`)
    }
    pushFog(fogID: FogTypes, userID: string): void {
        this.printStream.run(`fog @s push ${fogID} ${userID}`)
    }
    getItemCooldown(itemCategory: string): number {
        return this._player.getItemCooldown(itemCategory)
    }
    startItemCooldown(itemCategory: string, tickDuration: number): void {
        return this._player.startItemCooldown(itemCategory, tickDuration)
    }
    pushCameraShake(intensity?: number, seconds?: number, shakeType?: ('positional' | 'rotational')): void {
        this.printStream.run(`camerashake add @s ${intensity != null ? intensity : 1} ${seconds != null ? seconds : 1} ${shakeType != null ? shakeType : 1}`)
    }
    clearInventory(): void {
        let inv = (this.getComponent(EntityComponents.inventory) as EntityInventoryComponent).container
        for (let i = 0; i < inv.size; i++) {
            inv.setItem(0, new ItemStack(Items.get("minecraft:air")))
        }

    }
    clearSpawn(): void {
        this.printStream.run(`clearspawnpoint`)
    }
    setSpawn(location?:BlockLocation) {
        if (location!=null) {
            this.printStream.run(`spawnpoint @s ${location.x} ${location.y} ${location.z}`)
        } else {
            this.printStream.run(`spawnpoint`)
        }
    }
    gamemode(gamemodeType: GamemodeTypes): void {
        this.printStream.run(`gamemode ${gamemodeType}`)
    }
    say(msg: string): void {
        this.printStream.run(WLStream.globalChat(msg, this._player))
    }
    tellRaw(msg: string): void {
        this.printStream.run(WLStream.targettedTellraw(msg, this.nameTag))
    }
    title(msg: string) {
        this.printStream.run(`title @s title ${msg}`)
    }
    subtitle(msg: string) {
        this.printStream.run(`title @s subtitle ${msg}`)
    }
    actionBar(msg: string) {
        this.printStream.run(`title @s actionbar ${msg}`)
    }
    setTitleTransition(fadeIn: number, stay: number, fadeOut: number) {
        this.printStream.run(`title @s times ${fadeIn} ${stay} ${fadeOut}`)
    }
    clearTitle() {
        this.printStream.run(`title @s clear`)
    }
}
function getNamespaceToken(s: String, start: number, end: number): string {
    return s.split(":").slice(start, end + 1).join(":")
}
enum NamespaceTypes {
    bool = "bool",
    int = "int",
    void = "void"
}

