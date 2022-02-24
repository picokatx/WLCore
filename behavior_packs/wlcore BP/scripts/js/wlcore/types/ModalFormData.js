import { _ModalFormData } from "./Exports.js";
export class ModalFormData {
    constructor(_modalFormData) {
        if (_modalFormData == null) {
            this._modalFormData = new _ModalFormData();
        }
        else {
            this._modalFormData = _modalFormData;
        }
    }
    dropdown(label, options, defaultValueIndex) {
        return new ModalFormData(this._modalFormData.dropdown(label, options, defaultValueIndex));
    }
    icon(iconPath) {
        return new ModalFormData(this._modalFormData.icon(iconPath));
    }
    slider(label, minimumValue, maximumValue, valueStep, defaultValue) {
        return new ModalFormData(this._modalFormData.slider(label, minimumValue, maximumValue, valueStep, defaultValue));
    }
    show(player) {
        return this._modalFormData.show(player._player);
    }
    title(titleText) {
        return new ModalFormData(this._modalFormData.title(titleText));
    }
    textField(label, placeholderText, defaultValue) {
        return new ModalFormData(this._modalFormData.textField(label, placeholderText, defaultValue));
    }
    toggle(label, defaultValue) {
        return new ModalFormData(this._modalFormData.toggle(label, defaultValue));
    }
}
