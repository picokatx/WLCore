import { World } from "../../wlcore/types/World.js"
import { world } from "../../wlcore/types/World"

export class WLEvent {
    listeners: (() => void)[]
    cancelable: boolean
    defaultPrevented: boolean
    target: World
    timeStamp: number
    type: string
    constructor(type?: string, callback?: (() => void)) {
        if (callback != undefined) {
            this.listeners.push(callback)
        }
        if (type == undefined) {
            this.type = "wlcore:event.empty"
        } else {
            this.type = type
        }
        this.cancelable = false
        this.defaultPrevented = false
        this.target = world
        this.timeStamp = new Date().getTime()
    }
    preventDefault() {
        if (this.cancelable) {
            this.defaultPrevented = true
        }
    }
    stopImmediatePropagation() {

    }
}