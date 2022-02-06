import {_Player,_Block,_Entity,_IEntityComponent} from "../constants/exports.js"
import { Vector } from "./Vector.js"
import { BlockRaycastOptions } from "./BlockRaycastOptions.js"
import { EntityRaycastOptions } from "./EntityRaycastOptions.js"
import { Location } from "./Location.js"
import { EffectType } from "./EffectType.js"
import { Effect } from "./Effect.js"
import { Dimension } from "./Dimension.js"
export class Player {
    _player: _Player
    constructor(player: _Player) {
        this._player = player
    }
    get bodyRotation(): number {
        return this._player.bodyRotation
    }
    get dimension(): Dimension {
        return new Dimension(this._player.dimension)
    }
    get headLocation(): Location {
        return new Location(this._player.headLocation)
    }
    get id(): string {
        return this._player.id
    }
    get isSneaking(): boolean {
        return this._player.isSneaking
    }
    set isSneaking(isSneaking: boolean) {
        this._player.isSneaking = isSneaking
    }
    get location(): Location {
        return new Location(this._player.location)
    }
    get name(): string {
        return this._player.name
    }
    get nameTag() {
        return this._player.nameTag
    }
    set nameTag(nameTag: string) {
        this._player.nameTag = nameTag
    }
    get selectedSlot(): number {
        return this._player.selectedSlot
    }
    set selectedSlot(selectedSlot: number) {
        this._player.selectedSlot = selectedSlot
    }
    get target(): _Entity {
        return this._player.target
    }
    set target(entity: _Entity) {
        this._player.target = entity
    }
    get velocity(): Vector {
        return new Vector(this._player.velocity)
    }
    get viewVector(): Vector {
        return new Vector(this._player.viewVector)
    }
    setVelocity(velocity: Vector): void {
        this._player.setVelocity(velocity)
    }
    getBlockFromViewVector(options?: BlockRaycastOptions): _Block {
        return this._player.getBlockFromViewVector(options._blockRaycastOptions)
    }
    getComponent(componentId: string): _IEntityComponent {
        return this._player.getComponent(componentId)
    }
    getComponents(): _IEntityComponent[] {
        return this._player.getComponents()
    }
    getEffect(effectType: EffectType): Effect {
        return new Effect(this._player.getEffect(effectType))
    }
    getEntitiesFromViewVector(options?: EntityRaycastOptions): _Entity[] {
        return this._player.getEntitiesFromViewVector(options._entityRaycastOptions)
    }
    getItemCooldown(itemCategory: string): number {
        return this._player.getItemCooldown(itemCategory)
    }
    getTags(): string[] {
        return this._player.getTags()
    }
    addEffect(effectType: EffectType, duration: number, amplifier: number): void {
        this._player.addEffect(effectType, duration, amplifier)
    }
    addTag(tag: string): boolean {
        return this._player.addTag(tag)
    }
    hasComponent(componentId: string): boolean {
        return this._player.hasComponent(componentId)
    }
    hasTag(tag: string): boolean {
        return this._player.hasTag(tag)
    }
    kill(): void {
        this._player.kill()
    }
    removeTag(tag: string): boolean {
        return this._player.removeTag(tag)
    }
    runCommand(commandString: string): any {
        return this._player.runCommand(commandString)
    }
    startItemCooldown(itemCategory: string, tickDuration: number): void {
        return this._player.startItemCooldown(itemCategory, tickDuration)
    }
    teleport(location: Location, dimension: Dimension, xRotation: number, yRotation: number): void {
        return this._player.teleport(location._location, dimension._dimension, xRotation, yRotation)
    }
    teleportFacing(location: Location, dimension: Dimension, facingLocation: Location): void {
        return this.teleportFacing(location, dimension, facingLocation)
    }
    triggerEvent(eventName: string): void {
        return this._player.triggerEvent(eventName)
    }
}