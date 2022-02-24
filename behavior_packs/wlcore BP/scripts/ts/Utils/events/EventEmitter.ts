import { WLEvent } from "./Event.js"

export class WLEventEmitter {
    events: WLEvent[]
    constructor() {
    }
    addListener(eventName: string, listener: () => void): void {
        this.events.push(new WLEvent(eventName, listener))
    }
    emit(eventName: string, ...args: any): boolean {
        return
    }
    eventNames(): string[] {
        return
    }
    getMaxListeners(): number {
        return
    }
    listenerCount(eventName: string): number {
        return
    }
    listeners(eventName: string) {
        return
    }
    off(eventName: string, listener: () => void) {

    }
    on(eventName: string, listener: () => void) {

    }
    once(eventName: string, listener: () => void) {

    }
    prependListener(eventName: string, listener: () => void) {

    }
    prependOnceListener(eventName: string, listener: () => void) {

    }
    removeAllListeners(eventName: string): WLEventEmitter {
        return this
    }
    removeListener(eventName: string, listener: () => void) {

    }
    setMaxListeners(n: number) {

    }
    rawListeners(eventName: string) {

    }
}