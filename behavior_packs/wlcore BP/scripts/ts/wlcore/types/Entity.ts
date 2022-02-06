import { _EffectType, _Entity, _IEntityComponent } from "../constants/exports";
import { Block } from "./Block";
import { BlockRaycastOptions } from "./BlockRaycastOptions";
import { Dimension } from "./Dimension";
import { Effect } from "./Effect";
import { EffectType } from "./EffectType";
import { EntityRaycastOptions } from "./EntityRaycastOptions";
import { Location } from "./Location";
import { Vector } from "./Vector";

export class Entity {
    _entity: _Entity
    constructor(entity: _Entity) {
        this._entity = entity
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
    setVelocity(velocity: Vector): void {
        this._entity.setVelocity(velocity)
    }
    getBlockFromViewVector(options?: BlockRaycastOptions): Block {
        return new Block(this._entity.getBlockFromViewVector(options._blockRaycastOptions))
    }
    getComponent(componentId: string): _IEntityComponent {
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
    teleport(location: Location, dimension: Dimension, xRotation: number, yRotation: number): void {
        return this._entity.teleport(location._location, dimension._dimension, xRotation, yRotation)
    }
    teleportFacing(location: Location, dimension: Dimension, facingLocation: Location): void {
        return this.teleportFacing(location, dimension, facingLocation)
    }
    triggerEvent(eventName: string): void {
        return this._entity.triggerEvent(eventName)
    }
    addTag(tag: string): boolean {
        return this._entity.addTag(tag)
    }
    addEffect(effectType: EffectType, duration: number, amplifier: number): void {
        this._entity.addEffect(effectType, duration, amplifier)
    }

}