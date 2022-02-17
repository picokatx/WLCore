import { _ItemCooldownComponent, _ItemDurabilityComponent, _ItemEnchantsComponent, _ItemFoodComponent, _ItemStack, _ItemType } from "./Exports.js";
import { PrintStream } from "../log/PrintStream.js";
import { ItemComponents } from "./ItemComponents.js";

export class ItemStack {
    _itemStack: _ItemStack
    constructor(_itemStack: _ItemStack | _ItemType, amount?: number, data?: number) {
        if (_itemStack instanceof _ItemStack) {
            this._itemStack = _itemStack
        } else {
            _itemStack = new _ItemStack(_itemStack, amount, data)
        }
    }
    get amount(): number {
        return this._itemStack.amount
    }
    set amount(amount: number) {
        this._itemStack.amount = amount;
    }
    get data(): number {
        return this._itemStack.data
    }
    set data(data: number) {
        this._itemStack.data = data;
    }
    get id(): string {
        return this._itemStack.id
    }
    get enchants(): _ItemEnchantsComponent {
        return this._itemStack.getComponent(ItemComponents.enchants)
    }
    get food(): _ItemFoodComponent {
        return this._itemStack.getComponent(ItemComponents.food)
    }
    get cooldown(): _ItemCooldownComponent {
        return this._itemStack.getComponent(ItemComponents.cooldown)
    }
    get durability(): _ItemDurabilityComponent {
        return this._itemStack.getComponent(ItemComponents.durability)
    }
    getComponent(componentId: ItemComponents): any {
        return this._itemStack.getComponent(componentId)
    }
    getComponents(): any[] {
        return this._itemStack.getComponents()
    }
    hasComponent(componentId: string): boolean {
        return this.hasComponent(componentId)
    }
    triggerEvent(eventName: string): void {
        this._itemStack.triggerEvent(eventName)
    }
    setLore(loreList: string[]): void {
        let loreWemotes: string[] = []
        for (let i of loreList) {
            loreWemotes.push(PrintStream.replaceWithEmotes(i))
        }
        this._itemStack.setLore(loreWemotes)
    }
    setLoreRaw(loreList: string[]): void {
        this._itemStack.setLore(loreList)
    }
    getLore(): string[] {
        return this._itemStack.getLore()
    }

}