import { _ActionFormData, _ActionFormResponse } from "./Exports.js";
import { Player } from "./Player.js";
class ActionFormData {
    _actionFormData: _ActionFormData
    constructor(_actionFormData: _ActionFormData) {
        this._actionFormData = _actionFormData
    }
    body(bodyText: string): ActionFormData {
        return new ActionFormData(this._actionFormData.body(bodyText))
    }
    button(text: string, iconPath?: string): ActionFormData {
        return new ActionFormData(this._actionFormData.button(text, iconPath))
    }
    show(player: Player): Promise<_ActionFormResponse> {
        return this._actionFormData.show(player._player)
    }
    title(titleText: string): ActionFormData {
        return new ActionFormData(this._actionFormData.title(titleText))
    }
}