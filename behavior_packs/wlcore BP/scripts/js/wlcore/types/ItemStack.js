import { _ItemStack } from "./Exports.js";
import { PrintStream } from "../log/PrintStream.js";
import { ItemComponents } from "./ItemComponents.js";
export class ItemStack {
    constructor(_itemStack, amount, data) {
        if (_itemStack instanceof _ItemStack) {
            this._itemStack = _itemStack;
        }
        else {
            _itemStack = new _ItemStack(_itemStack, amount, data);
        }
    }
    get amount() {
        return this._itemStack.amount;
    }
    set amount(amount) {
        this._itemStack.amount = amount;
    }
    get data() {
        return this._itemStack.data;
    }
    set data(data) {
        this._itemStack.data = data;
    }
    get id() {
        return this._itemStack.id;
    }
    get enchants() {
        return this._itemStack.getComponent(ItemComponents.enchants);
    }
    get food() {
        return this._itemStack.getComponent(ItemComponents.food);
    }
    get cooldown() {
        return this._itemStack.getComponent(ItemComponents.cooldown);
    }
    get durability() {
        return this._itemStack.getComponent(ItemComponents.durability);
    }
    getComponent(componentId) {
        return this._itemStack.getComponent(componentId);
    }
    getComponents() {
        return this._itemStack.getComponents();
    }
    hasComponent(componentId) {
        return this.hasComponent(componentId);
    }
    triggerEvent(eventName) {
        this._itemStack.triggerEvent(eventName);
    }
    setLore(loreList) {
        let loreWemotes = [];
        for (let i of loreList) {
            loreWemotes.push(PrintStream.replaceWithEmotes(i));
        }
        this._itemStack.setLore(loreWemotes);
    }
    setLoreRaw(loreList) {
        this._itemStack.setLore(loreList);
    }
    getLore() {
        return this._itemStack.getLore();
    }
}
