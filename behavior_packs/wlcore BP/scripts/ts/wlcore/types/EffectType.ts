import { _EffectType } from "../constants/Exports"
export class EffectType {
    _effectType: _EffectType
    getName(): string {
        return this._effectType.getName()
    }
}