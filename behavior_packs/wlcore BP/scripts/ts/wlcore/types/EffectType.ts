import { _EffectType } from "./Exports.js"
export class EffectType {
    _effectType: _EffectType
    getName(): string {
        return this._effectType.getName()
    }
}