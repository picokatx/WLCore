import { _Effect } from "../constants/Exports.js";
export class Effect {
    _effect: _Effect
    constructor(_effect: _Effect) {
        this._effect = _effect
    }
    get amplifier(): number {
        return this._effect.amplifier
    }
    get displayName(): string {
        return this._effect.displayName
    }
    get duration(): number {
        return this._effect.duration
    }

}