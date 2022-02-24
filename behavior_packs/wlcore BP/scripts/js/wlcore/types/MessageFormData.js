export class MessageFormData {
    constructor(_messageFormData) {
        this._messageFormData = _messageFormData;
    }
    body(bodyText) {
        return new MessageFormData(this._messageFormData.body(bodyText));
    }
    button1(text) {
        return new MessageFormData(this._messageFormData.button1(text));
    }
    button2(text) {
        return new MessageFormData(this._messageFormData.button2(text));
    }
    show(player) {
        return this._messageFormData.show(player._player);
    }
    title(titleText) {
        return new MessageFormData(this._messageFormData.title(titleText));
    }
}
