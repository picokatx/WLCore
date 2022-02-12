import { MinecraftBlockTypes } from "mojang-minecraft";
import { printStream } from "../../Main";
import { _EffectType, _Entity, _EntityAddRiderComponent, _EntityAgeableComponent, _EntityBreathableComponent, _EntityColorComponent, _EntityFlyingSpeedComponent, _EntityHealableComponent, _EntityHealthComponent, _EntityInventoryComponent, _EntityLavaMovementComponent, _EntityLeashableComponent, _EntityMountTamingComponent, _EntityMovementAmphibiousComponent, _EntityMovementBasicComponent, _EntityMovementComponent, _EntityMovementFlyComponent, _EntityMovementGenericComponent, _EntityMovementGlideComponent, _EntityMovementHoverComponent, _EntityMovementJumpComponent, _EntityMovementSkipComponent, _EntityMovementSwayComponent, _EntityNavigationClimbComponent, _EntityNavigationFloatComponent, _EntityNavigationFlyComponent, _EntityNavigationGenericComponent, _EntityNavigationHoverComponent, _EntityNavigationWalkComponent, _EntityRideableComponent, _EntityStrengthComponent, _EntityTameableComponent, _IEntityComponent } from "../constants/Exports";
import { PrintStream } from "../log/PrintStream";
import { Block } from "./Block";
import { BlockLocation } from "./BlockLocation";
import { BlockPermutation } from "./BlockPermutation";
import { BlockRaycastOptions } from "./BlockRaycastOptions";
import { Dimension } from "./Dimension";
import { Effect } from "./Effect";
import { EffectType } from "./EffectType";
import { EntityComponents } from "../constants/EntityComponents";
import { EntityRaycastOptions } from "./EntityRaycastOptions";
import { Location } from "./Location";
import { Vector } from "./Vector";
export enum DamageCause {
    all = "all",
    anvil = "anvil",
    block_explosion = "block_explosion",
    charging = "charging",
    contact = "contact",
    drowning = "drowning",
    entity_attack = "entity_attack",
    entity_explosion = "entity_explosion",
    fall = "fall",
    falling_block = "falling_block",
    fire = "fire",
    fire_tick = "fire_tick",
    fireworks = "fireworks",
    fly_into_wall = "fly_into_wall",
    freezing = "freezing",
    lava = "lava",
    lightning = "lightning",
    magic = "magic",
    magma = "magma",
    none = "none",
    override = "override",
    piston = "piston",
    projectile = "projectile",
    stalactite = "stalactite",
    stalagmite = "stalagmite",
    starve = "starve",
    suffocation = "suffocation",
    suicide = "suicide",
    temperature = "temperature",
    thorns = "thorns",
    void = "void",
    wither = "wither"
}
export class Entity {
    _entity: _Entity
    printStream: PrintStream
    constructor(entity: _Entity) {
        this._entity = entity
        this.printStream = new PrintStream(this)
    }
    get bodyRotation(): number {
        return this._entity.bodyRotation
    }
    get dimension(): Dimension {
        return new Dimension(this._entity.dimension)
    }
    get headLocation(): Location {
        return new Location(this._entity.headLocation)
    }
    get id(): string {
        return this._entity.id
    }
    get isSneaking(): boolean {
        return this._entity.isSneaking
    }
    set isSneaking(isSneaking: boolean) {
        this._entity.isSneaking = isSneaking
    }
    get location(): Location {
        return new Location(this._entity.location)
    }
    get nameTag() {
        return this._entity.nameTag
    }
    set nameTag(nameTag: string) {
        this._entity.nameTag = nameTag
    }
    get target(): _Entity {
        return this._entity.target
    }
    set target(entity: _Entity) {
        this._entity.target = entity
    }
    get velocity(): Vector {
        return new Vector(this._entity.velocity)
    }
    get viewVector(): Vector {
        return new Vector(this._entity.viewVector)
    }
    get addrider(): _EntityAddRiderComponent { return this.getComponent(EntityComponents.addrider) as _EntityAddRiderComponent }
    get ageable(): _EntityAgeableComponent { return this.getComponent(EntityComponents.ageable) as _EntityAgeableComponent }
    get breathable(): _EntityBreathableComponent { return this.getComponent(EntityComponents.breathable) as _EntityBreathableComponent }
    get color(): _EntityColorComponent { return this.getComponent(EntityComponents.color) as _EntityColorComponent }
    get flying_speed(): _EntityFlyingSpeedComponent { return this.getComponent(EntityComponents.flying_speed) as _EntityFlyingSpeedComponent }
    get healable(): _EntityHealableComponent { return this.getComponent(EntityComponents.healable) as _EntityHealableComponent }
    get health(): _EntityHealthComponent { return this.getComponent(EntityComponents.health) as _EntityHealthComponent }
    get inventory(): _EntityInventoryComponent { return this.getComponent(EntityComponents.inventory) as _EntityInventoryComponent }
    get lava_movement(): _EntityLavaMovementComponent { return this.getComponent(EntityComponents.lava_movement) as _EntityLavaMovementComponent }
    get leashable(): _EntityLeashableComponent { return this.getComponent(EntityComponents.leashable) as _EntityLeashableComponent }
    get tamemount(): _EntityMountTamingComponent { return this.getComponent(EntityComponents.tamemount) as _EntityMountTamingComponent }
    get movement(): _EntityMovementComponent { return this.getComponent(EntityComponents.movement_generic) as _EntityMovementComponent }
    get movement_amphibious(): _EntityMovementAmphibiousComponent { return this.getComponent(EntityComponents.movement_amphibious) as _EntityMovementAmphibiousComponent }
    get movement_basic(): _EntityMovementBasicComponent { return this.getComponent(EntityComponents.movement_basic) as _EntityMovementBasicComponent }
    get movement_fly(): _EntityMovementFlyComponent { return this.getComponent(EntityComponents.movement_fly) as _EntityMovementFlyComponent }
    get movement_generic(): _EntityMovementGenericComponent { return this.getComponent(EntityComponents.movement_generic) as _EntityMovementGenericComponent }
    get movement_glide(): _EntityMovementGlideComponent { return this.getComponent(EntityComponents.movement_glide) as _EntityMovementGlideComponent }
    get movement_hover(): _EntityMovementHoverComponent { return this.getComponent(EntityComponents.movement_hover) as _EntityMovementHoverComponent }
    get movement_jump(): _EntityMovementJumpComponent { return this.getComponent(EntityComponents.movement_jump) as _EntityMovementJumpComponent }
    get movement_skip(): _EntityMovementSkipComponent { return this.getComponent(EntityComponents.movement_skip) as _EntityMovementSkipComponent }
    get movement_sway(): _EntityMovementSwayComponent { return this.getComponent(EntityComponents.movement_sway) as _EntityMovementSwayComponent }
    get navigation_climb(): _EntityNavigationClimbComponent { return this.getComponent(EntityComponents.navigation_climb) as _EntityNavigationClimbComponent }
    get navigation_float(): _EntityNavigationFloatComponent { return this.getComponent(EntityComponents.navigation_float) as _EntityNavigationFloatComponent }
    get navigation_fly(): _EntityNavigationFlyComponent { return this.getComponent(EntityComponents.navigation_fly) as _EntityNavigationFlyComponent }
    get navigation_generic(): _EntityNavigationGenericComponent { return this.getComponent(EntityComponents.navigation_generic) as _EntityNavigationGenericComponent }
    get navigation_hover(): _EntityNavigationHoverComponent { return this.getComponent(EntityComponents.navigation_hover) as _EntityNavigationHoverComponent }
    get navigation_walk(): _EntityNavigationWalkComponent { return this.getComponent(EntityComponents.navigation_walk) as _EntityNavigationWalkComponent }
    get rideable(): _EntityRideableComponent { return this.getComponent(EntityComponents.rideable) as _EntityRideableComponent }
    get strength(): _EntityStrengthComponent { return this.getComponent(EntityComponents.strength) as _EntityStrengthComponent }
    get tameable(): _EntityTameableComponent { return this.getComponent(EntityComponents.tameable) as _EntityTameableComponent }
    get water_movement(): _EntityLavaMovementComponent { return this.getComponent(EntityComponents.water_movement) as _EntityLavaMovementComponent }

    addEffect(effectType: EffectType, duration: number, amplifier: number): void {
        this._entity.addEffect(effectType, duration, amplifier)
    }
    clearEffects(): void {
        this.printStream.run(`effect @s clear`)
    }
    addTag(tag: string): boolean {
        return this._entity.addTag(tag)
    }
    getBlockFromViewVector(options?: BlockRaycastOptions): Block {
        return new Block(this._entity.getBlockFromViewVector(options._blockRaycastOptions))
    }
    getComponent(componentId: EntityComponents): _IEntityComponent {
        return this._entity.getComponent(componentId)
    }
    getComponents(): _IEntityComponent[] {
        return this._entity.getComponents()
    }
    getEffect(effectType: _EffectType): Effect {
        return new Effect(this._entity.getEffect(effectType))
    }
    getEntitiesFromViewVector(options?: EntityRaycastOptions): _Entity[] {
        return this._entity.getEntitiesFromViewVector(options._entityRaycastOptions)
    }
    getTags(): string[] {
        return this._entity.getTags()
    }
    hasComponent(componentId: string): boolean {
        return this._entity.hasComponent(componentId)
    }
    hasTag(tag: string): boolean {
        return this._entity.hasTag(tag)
    }
    kill(): void {
        this._entity.kill()
    }
    removeTag(tag: string): boolean {
        return this._entity.removeTag(tag)
    }
    runCommand(commandString: string): any {
        return this._entity.runCommand(commandString)
    }
    setVelocity(velocity: Vector): void {
        this._entity.setVelocity(velocity)
    }
    teleport(location: Location, dimension: Dimension, xRotation: number, yRotation: number): void {
        return this._entity.teleport(location._location, dimension._dimension, xRotation, yRotation)
    }
    teleportFacing(location: Location, dimension: Dimension, facingLocation: Location): void {
        return this.teleportFacing(location, dimension, facingLocation)
    }
    triggerEvent(eventName: string): void {
        return this._entity.triggerEvent(eventName)
    }
    ground(permutation: BlockPermutation): void {
        this.dimension.getBlock(this.location.toBLockLocation().below()).setPermutation(permutation)
    }
    damage(amount: number, cause: DamageCause) {
        this.printStream.run(`damage @s ${amount} ${cause}`)
    }
    box(permutation: BlockPermutation): void {
        let loc: BlockLocation = this.location.toBLockLocation()
        this.dimension.getBlock(loc.below()).setPermutation(permutation)
        this.dimension.getBlock(loc.above()).setPermutation(permutation)
        this.dimension.getBlock(new BlockLocation(loc.x - 1, loc.y + 1, loc.z + 1)).setPermutation(permutation)
        this.dimension.getBlock(new BlockLocation(loc.x - 1, loc.y + 1, loc.z - 1)).setPermutation(permutation)
        this.dimension.getBlock(new BlockLocation(loc.x + 1, loc.y + 1, loc.z - 1)).setPermutation(permutation)
        this.dimension.getBlock(new BlockLocation(loc.x + 1, loc.y + 1, loc.z + 1)).setPermutation(permutation)
        this.dimension.getBlock(new BlockLocation(loc.x - 1, loc.y + 2, loc.z + 1)).setPermutation(permutation)
        this.dimension.getBlock(new BlockLocation(loc.x - 1, loc.y + 2, loc.z - 1)).setPermutation(permutation)
        this.dimension.getBlock(new BlockLocation(loc.x + 1, loc.y + 2, loc.z - 1)).setPermutation(permutation)
        this.dimension.getBlock(new BlockLocation(loc.x + 1, loc.y + 2, loc.z + 1)).setPermutation(permutation)
    }

}