import { _MessageFormData, _MessageFormResponse } from "./Exports.js"
import { Player } from "./Player.js"

export class MessageFormData {
    _messageFormData: _MessageFormData
    constructor(_messageFormData: _MessageFormData) {
        this._messageFormData = _messageFormData
    }
    body(bodyText: string): MessageFormData {
        return new MessageFormData(this._messageFormData.body(bodyText))
    }
    button1(text: string): MessageFormData {
        return new MessageFormData(this._messageFormData.button1(text))
    }
    button2(text: string): MessageFormData {
        return new MessageFormData(this._messageFormData.button2(text))
    }
    show(player: Player): Promise<_MessageFormResponse> {
        return this._messageFormData.show(player._player)
    }
    title(titleText: string): MessageFormData {
        return new MessageFormData(this._messageFormData.title(titleText))
    }
}