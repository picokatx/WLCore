export class Effect {
    constructor(_effect) {
        this._effect = _effect;
    }
    get amplifier() {
        return this._effect.amplifier;
    }
    get displayName() {
        return this._effect.displayName;
    }
    get duration() {
        return this._effect.duration;
    }
}
