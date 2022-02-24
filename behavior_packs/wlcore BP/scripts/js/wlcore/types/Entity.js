import { PrintStream } from "../log/PrintStream.js";
import { Block } from "./Block.js";
import { BlockLocation } from "./BlockLocation.js";
import { Dimension } from "./Dimension.js";
import { Effect } from "./Effect.js";
import { EntityComponents } from "./EntityComponents.js";
import { Location } from "./Location.js";
import { Vector } from "./Vector.js";
export class Entity {
    constructor(entity) {
        this._entity = entity;
        this.printStream = new PrintStream(this);
    }
    get bodyRotation() {
        return this._entity.bodyRotation;
    }
    get dimension() {
        return new Dimension(this._entity.dimension);
    }
    get headLocation() {
        return new Location(this._entity.headLocation);
    }
    get id() {
        return this._entity.id;
    }
    get isSneaking() {
        return this._entity.isSneaking;
    }
    set isSneaking(isSneaking) {
        this._entity.isSneaking = isSneaking;
    }
    get location() {
        return new Location(this._entity.location);
    }
    get nameTag() {
        return this._entity.nameTag;
    }
    set nameTag(nameTag) {
        this._entity.nameTag = nameTag;
    }
    get target() {
        return this._entity.target;
    }
    set target(entity) {
        this._entity.target = entity;
    }
    get velocity() {
        return new Vector(this._entity.velocity);
    }
    get viewVector() {
        return new Vector(this._entity.viewVector);
    }
    get addrider() { return this.getComponent(EntityComponents.addrider); }
    get ageable() { return this.getComponent(EntityComponents.ageable); }
    get breathable() { return this.getComponent(EntityComponents.breathable); }
    get color() { return this.getComponent(EntityComponents.color); }
    get flying_speed() { return this.getComponent(EntityComponents.flying_speed); }
    get healable() { return this.getComponent(EntityComponents.healable); }
    get health() { return this.getComponent(EntityComponents.health); }
    get inventory() { return this.getComponent(EntityComponents.inventory); }
    get lava_movement() { return this.getComponent(EntityComponents.lava_movement); }
    get leashable() { return this.getComponent(EntityComponents.leashable); }
    get tamemount() { return this.getComponent(EntityComponents.tamemount); }
    get movement() { return this.getComponent(EntityComponents.movement_generic); }
    get movement_amphibious() { return this.getComponent(EntityComponents.movement_amphibious); }
    get movement_basic() { return this.getComponent(EntityComponents.movement_basic); }
    get movement_fly() { return this.getComponent(EntityComponents.movement_fly); }
    get movement_generic() { return this.getComponent(EntityComponents.movement_generic); }
    get movement_glide() { return this.getComponent(EntityComponents.movement_glide); }
    get movement_hover() { return this.getComponent(EntityComponents.movement_hover); }
    get movement_jump() { return this.getComponent(EntityComponents.movement_jump); }
    get movement_skip() { return this.getComponent(EntityComponents.movement_skip); }
    get movement_sway() { return this.getComponent(EntityComponents.movement_sway); }
    get navigation_climb() { return this.getComponent(EntityComponents.navigation_climb); }
    get navigation_float() { return this.getComponent(EntityComponents.navigation_float); }
    get navigation_fly() { return this.getComponent(EntityComponents.navigation_fly); }
    get navigation_generic() { return this.getComponent(EntityComponents.navigation_generic); }
    get navigation_hover() { return this.getComponent(EntityComponents.navigation_hover); }
    get navigation_walk() { return this.getComponent(EntityComponents.navigation_walk); }
    get rideable() { return this.getComponent(EntityComponents.rideable); }
    get strength() { return this.getComponent(EntityComponents.strength); }
    get tameable() { return this.getComponent(EntityComponents.tameable); }
    get water_movement() { return this.getComponent(EntityComponents.water_movement); }
    addEffect(effectType, duration, amplifier) {
        this._entity.addEffect(effectType, duration, amplifier);
    }
    clearEffects() {
        this.printStream.run(`effect @s clear`);
    }
    addTag(tag) {
        return this._entity.addTag(tag);
    }
    getBlockFromViewVector(options) {
        return new Block(this._entity.getBlockFromViewVector(options._blockRaycastOptions));
    }
    getComponent(componentId) {
        return this._entity.getComponent(componentId);
    }
    getComponents() {
        return this._entity.getComponents();
    }
    getEffect(effectType) {
        return new Effect(this._entity.getEffect(effectType));
    }
    getEntitiesFromViewVector(options) {
        return this._entity.getEntitiesFromViewVector(options._entityRaycastOptions);
    }
    getTags() {
        return this._entity.getTags();
    }
    hasComponent(componentId) {
        return this._entity.hasComponent(componentId);
    }
    hasTag(tag) {
        return this._entity.hasTag(tag);
    }
    kill() {
        this._entity.kill();
    }
    removeTag(tag) {
        return this._entity.removeTag(tag);
    }
    runCommand(commandString) {
        return this._entity.runCommand(commandString);
    }
    setVelocity(velocity) {
        this._entity.setVelocity(velocity);
    }
    teleport(location, dimension, xRotation, yRotation) {
        return this._entity.teleport(location._location, dimension._dimension, xRotation, yRotation);
    }
    teleportFacing(location, dimension, facingLocation) {
        return this.teleportFacing(location, dimension, facingLocation);
    }
    triggerEvent(eventName) {
        return this._entity.triggerEvent(eventName);
    }
    ground(permutation) {
        this.dimension.getBlock(this.location.toBLockLocation().below()).setPermutation(permutation);
    }
    damage(amount, cause) {
        this.printStream.run(`damage @s ${amount} ${cause}`);
    }
    box(permutation) {
        let loc = this.location.toBLockLocation();
        this.dimension.getBlock(loc.below()).setPermutation(permutation);
        this.dimension.getBlock(loc.above()).setPermutation(permutation);
        this.dimension.getBlock(new BlockLocation(loc.x - 1, loc.y + 1, loc.z + 1)).setPermutation(permutation);
        this.dimension.getBlock(new BlockLocation(loc.x - 1, loc.y + 1, loc.z - 1)).setPermutation(permutation);
        this.dimension.getBlock(new BlockLocation(loc.x + 1, loc.y + 1, loc.z - 1)).setPermutation(permutation);
        this.dimension.getBlock(new BlockLocation(loc.x + 1, loc.y + 1, loc.z + 1)).setPermutation(permutation);
        this.dimension.getBlock(new BlockLocation(loc.x - 1, loc.y + 2, loc.z + 1)).setPermutation(permutation);
        this.dimension.getBlock(new BlockLocation(loc.x - 1, loc.y + 2, loc.z - 1)).setPermutation(permutation);
        this.dimension.getBlock(new BlockLocation(loc.x + 1, loc.y + 2, loc.z - 1)).setPermutation(permutation);
        this.dimension.getBlock(new BlockLocation(loc.x + 1, loc.y + 2, loc.z + 1)).setPermutation(permutation);
    }
}
