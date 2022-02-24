import { Entity } from "./Entity.js";
import { WLStream } from "../log/WLStream.js";
import { v4 as uuidv4 } from "uuid";
import { EntityComponents } from "./EntityComponents.js";
import { Items, ItemStack, world } from "mojang-minecraft";
import { molangQueries } from "./MolangNamespaces.js";
export class Player extends Entity {
    constructor(player) {
        super(player);
        this._player = player;
        this.uuid = uuidv4();
        this.molangQueries = molangQueries;
        world.events.beforeDataDrivenEntityTriggerEvent.subscribe((eventData) => {
            this.printStream.println(eventData.id);
            if (eventData.entity.id == "minecraft:player" && getNamespaceToken(eventData.id, 0, 1) == "mcwl:molangquery" && eventData.entity.nameTag.charAt(0) != '_') {
                let namespace = getNamespaceToken(eventData.id, 0, 2);
                let type = getNamespaceToken(eventData.id, 3, 3);
                switch (type) {
                    case NamespaceTypes["bool"]:
                        let boolValue = getNamespaceToken(eventData.id, 4, 4) == 'true';
                        if (boolValue != null) {
                            this.molangQueries.set(namespace, boolValue);
                        }
                        break;
                    case NamespaceTypes["int"]:
                        let idx = parseInt(getNamespaceToken(eventData.id, 4, 4));
                        let value = getNamespaceToken(eventData.id, 5, 5) == 'true';
                        break;
                    case NamespaceTypes["void"]:
                }
            }
        });
    }
    get name() {
        return this._player.name;
    }
    getuuid() {
        return this.uuid;
    }
    get selectedSlot() {
        return this._player.selectedSlot;
    }
    set selectedSlot(selectedSlot) {
        this._player.selectedSlot = selectedSlot;
    }
    get xp() {
        return;
    }
    set xp(pts) {
    }
    kick(reason) {
        this.dimension.runCommand(`kick ${this.name} ${reason != null ? reason : ""}`);
    }
    pushFog(fogID, userID) {
        this.printStream.run(`fog @s push ${fogID} ${userID}`);
    }
    getItemCooldown(itemCategory) {
        return this._player.getItemCooldown(itemCategory);
    }
    startItemCooldown(itemCategory, tickDuration) {
        return this._player.startItemCooldown(itemCategory, tickDuration);
    }
    pushCameraShake(intensity, seconds, shakeType) {
        this.printStream.run(`camerashake add @s ${intensity != null ? intensity : 1} ${seconds != null ? seconds : 1} ${shakeType != null ? shakeType : 1}`);
    }
    clearInventory() {
        let inv = this.getComponent(EntityComponents.inventory).container;
        for (let i = 0; i < inv.size; i++) {
            inv.setItem(0, new ItemStack(Items.get("minecraft:air")));
        }
    }
    clearSpawn() {
        this.printStream.run(`clearspawnpoint`);
    }
    setSpawn(location) {
        if (location != null) {
            this.printStream.run(`spawnpoint @s ${location.x} ${location.y} ${location.z}`);
        }
        else {
            this.printStream.run(`spawnpoint`);
        }
    }
    gamemode(gamemodeType) {
        this.printStream.run(`gamemode ${gamemodeType}`);
    }
    say(msg) {
        this.printStream.run(WLStream.globalChat(msg, this));
    }
    tellRaw(msg) {
        this.printStream.run(WLStream.targettedTellraw(msg, this.nameTag));
    }
    title(msg) {
        this.printStream.run(`title @s title ${msg}`);
    }
    subtitle(msg) {
        this.printStream.run(`title @s subtitle ${msg}`);
    }
    actionBar(msg) {
        this.printStream.run(`title @s actionbar ${msg}`);
    }
    setTitleTransition(fadeIn, stay, fadeOut) {
        this.printStream.run(`title @s times ${fadeIn} ${stay} ${fadeOut}`);
    }
    clearTitle() {
        this.printStream.run(`title @s clear`);
    }
}
function getNamespaceToken(s, start, end) {
    return s.split(":").slice(start, end + 1).join(":");
}
var NamespaceTypes;
(function (NamespaceTypes) {
    NamespaceTypes["bool"] = "bool";
    NamespaceTypes["int"] = "int";
    NamespaceTypes["void"] = "void";
})(NamespaceTypes || (NamespaceTypes = {}));
