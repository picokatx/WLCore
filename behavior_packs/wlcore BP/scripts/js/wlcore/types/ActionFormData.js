class ActionFormData {
    constructor(_actionFormData) {
        this._actionFormData = _actionFormData;
    }
    body(bodyText) {
        return new ActionFormData(this._actionFormData.body(bodyText));
    }
    button(text, iconPath) {
        return new ActionFormData(this._actionFormData.button(text, iconPath));
    }
    show(player) {
        return this._actionFormData.show(player._player);
    }
    title(titleText) {
        return new ActionFormData(this._actionFormData.title(titleText));
    }
}
export {};
