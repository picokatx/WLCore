import { _Player, _Block, _Entity, _IEntityComponent, _EntityInventoryComponent } from "../constants/Exports.js"
import { Entity } from "./Entity.js"
import { WLStream } from "../log/WLStream.js";
import { v4 as uuidv4 } from "uuid"
import { EntityComponents } from "../constants/EntityComponents.js";
import { EntityInventoryComponent, Items, ItemStack, world } from "mojang-minecraft";
import { molangQueries } from "../constants/MolangNamespaces.js";
import { BlockLocation } from "./BlockLocation.js";
import { Permissions } from "../command/Command.js";
export enum GamemodeTypes {
    creative = "c",
    survival = "s",
    adventure = "a"
}
export enum FogTypes {
    fog_bamboo_jungle = "minecraft:fog_bamboo_jungle",
    fog_bamboo_jungle_hills = "minecraft:fog_bamboo_jungle_hills",
    fog_basalt_deltas = "minecraft:fog_basalt_deltas",
    fog_beach = "minecraft:fog_beach",
    fog_birch_forest = "minecraft:fog_birch_forest",
    fog_birch_forest_hills = "minecraft:fog_birch_forest_hills",
    fog_cold_beach = "minecraft:fog_cold_beach",
    fog_cold_ocean = "minecraft:fog_cold_ocean",
    fog_cold_taiga = "minecraft:fog_cold_taiga",
    fog_cold_taiga_hills = "minecraft:fog_cold_taiga_hills",
    fog_cold_taiga_mutated = "minecraft:fog_cold_taiga_mutated",
    fog_crimson_forest = "minecraft:fog_crimson_forest",
    fog_deep_cold_ocean = "minecraft:fog_deep_cold_ocean",
    fog_deep_frozen_ocean = "minecraft:fog_deep_frozen_ocean",
    fog_deep_lukewarm_ocean = "minecraft:fog_deep_lukewarm_ocean",
    fog_deep_ocean = "minecraft:fog_deep_ocean",
    fog_deep_warm_ocean = "minecraft:fog_deep_warm_ocean",
    fog_default = "minecraft:fog_default",
    fog_desert = "minecraft:fog_desert",
    fog_desert_hills = "minecraft:fog_desert_hills",
    fog_extreme_hills = "minecraft:fog_extreme_hills",
    fog_extreme_hills_edge = "minecraft:fog_extreme_hills_edge",
    fog_extreme_hills_mutated = "minecraft:fog_extreme_hills_mutated",
    fog_extreme_hills_plus_trees = "minecraft:fog_extreme_hills_plus_trees",
    fog_extreme_hills_plus_trees_mutat = "minecraft:fog_extreme_hills_plus_trees_mutated",
    fog_flower_forest = "minecraft:fog_flower_forest",
    fog_forest = "minecraft:fog_forest",
    fog_forest_hills = "minecraft:fog_forest_hills",
    fog_frozen_ocean = "minecraft:fog_frozen_ocean",
    fog_frozen_river = "minecraft:fog_frozen_river",
    fog_hell = "minecraft:fog_hell",
    fog_ice_mountains = "minecraft:fog_ice_mountains",
    fog_ice_plains = "minecraft:fog_ice_plains",
    fog_ice_plains_spikes = "minecraft:fog_ice_plains_spikes",
    fog_jungle = "minecraft:fog_jungle",
    fog_jungle_edge = "minecraft:fog_jungle_edge",
    fog_jungle_hills = "minecraft:fog_jungle_hills",
    fog_jungle_mutated = "minecraft:fog_jungle_mutated",
    fog_lukewarm_ocean = "minecraft:fog_lukewarm_ocean",
    fog_mega_spruce_taiga = "minecraft:fog_mega_spruce_taiga",
    fog_mega_spruce_taiga_mutated = "minecraft:fog_mega_spruce_taiga_mutated",
    fog_mega_taiga = "minecraft:fog_mega_taiga",
    fog_mega_taiga_hills = "minecraft:fog_mega_taiga_hills",
    fog_mega_taiga_mutated = "minecraft:fog_mega_taiga_mutated",
    fog_mesa = "minecraft:fog_mesa",
    fog_mesa_bryce = "minecraft:fog_mesa_bryce",
    fog_mesa_mutated = "minecraft:fog_mesa_mutated",
    fog_mesa_plateau = "minecraft:fog_mesa_plateau",
    fog_mesa_plateau_stone = "minecraft:fog_mesa_plateau_stone",
    fog_mushroom_island = "minecraft:fog_mushroom_island",
    fog_mushroom_island_shore = "minecraft:fog_mushroom_island_shore",
    fog_ocean = "minecraft:fog_ocean",
    fog_plains = "minecraft:fog_plains",
    fog_river = "minecraft:fog_river",
    fog_roofed_forest = "minecraft:fog_roofed_forest",
    fog_savanna = "minecraft:fog_savanna",
    fog_savanna_mutated = "minecraft:fog_savanna_mutated",
    fog_savanna_plateau = "minecraft:fog_savanna_plateau",
    fog_soulsand_valley = "minecraft:fog_soulsand_valley",
    fog_stone_beach = "minecraft:fog_stone_beach",
    fog_sunflower_plains = "minecraft:fog_sunflower_plains",
    fog_swampland = "minecraft:fog_swampland",
    fog_swampland_mutated = "minecraft:fog_swampland_mutated",
    fog_taiga = "minecraft:fog_taiga",
    fog_taiga_hills = "minecraft:fog_taiga_hills",
    fog_taiga_mutated = "minecraft:fog_taiga_mutated",
    fog_the_end = "minecraft:fog_the_end",
    fog_warm_ocean = "minecraft:fog_warm_ocean",
    fog_warped_forest = "minecraft:fog_warped_forest"
}

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

