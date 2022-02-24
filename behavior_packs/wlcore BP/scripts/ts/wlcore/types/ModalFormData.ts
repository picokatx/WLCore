import { _MessageFormData, _MessageFormResponse, _ModalFormData, _ModalFormResponse } from "./Exports.js"
import { Player } from "./Player.js"

export class ModalFormData {
    _modalFormData: _ModalFormData
    constructor(_modalFormData?: _ModalFormData) {
        if (_modalFormData==null) {
            this._modalFormData = new _ModalFormData()
        } else {
            this._modalFormData = _modalFormData
        }
    }
    dropdown(label: string, options: string[], defaultValueIndex?: number): ModalFormData {
        return new ModalFormData(this._modalFormData.dropdown(label, options, defaultValueIndex))
    }
    icon(iconPath: string): ModalFormData {
        return new ModalFormData(this._modalFormData.icon(iconPath))
    }
    slider(label: string, minimumValue: number, maximumValue: number, valueStep: number, defaultValue?: number): ModalFormData {
        return new ModalFormData(this._modalFormData.slider(label, minimumValue, maximumValue, valueStep, defaultValue))
    }
    show(player: Player): Promise<_ModalFormResponse> {
        return this._modalFormData.show(player._player)
    }
    title(titleText: string): ModalFormData {
        return new ModalFormData(this._modalFormData.title(titleText))
    }
    textField(label: string, placeholderText: string, defaultValue?: string): ModalFormData {
        return new ModalFormData(this._modalFormData.textField(label, placeholderText, defaultValue))
    }
    toggle(label: string, defaultValue?: boolean): ModalFormData {
        return new ModalFormData(this._modalFormData.toggle(label, defaultValue))
    }

}