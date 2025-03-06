export class Runner {
    constructor() {
        this.map = new Map();
    }

    bindButtonEvent(eventType, controller, editor, blockId) {
        switch (eventType) {
            case "click":
                controller.buttonAPI.setClickListener(editor, blockId);
                break;
            default:
                break;
        }
    }

    bindInputEvent(eventType, controller, editor, blockId) {
        switch (eventType) {
            case "change":
                controller.inputAPI.setChangeListener(editor, blockId);
                break;
            case "blur":
                controller.inputAPI.setBlurListener(editor, blockId);
                break;
            case "focus":
                controller.inputAPI.setFocusListener(editor, blockId);
                break;
            case "input":
                controller.inputAPI.setInputListener(editor, blockId);
                break;
            default:
                break;
        }
    }

    bindImgEvent(eventType, controller, editor, blockId) {
        switch (eventType) {
            case "click":
                controller.imgAPI.setClickListener(editor, blockId);
                break;
            case "load":
                controller.imgAPI.setLoadListener(editor, blockId);
                break;
            default:
                break;
        }
    }

    bind(data, controller, editor) {
        this.map.set(data.blockId, { "flowId": data.flowId, "eventType": data.eventType });
        switch (data.blockType) {
            case "button":
                this.bindButtonEvent(data.eventType, controller, editor, data.blockId);
                break;
            case "input":
                this.bindInputEvent(data.eventType, controller, editor, data.blockId);
                break;
            case "image":
                this.bindImgEvent(data.eventType, controller, editor, data.blockId);
            default:
                break;
        }
    }

    callback(event) {
        console.log("Runner", event);
    }
}