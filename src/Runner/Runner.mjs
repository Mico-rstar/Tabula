export class Runner {
    constructor() {
        this.map = new Map();
    }

    /*
    data:{
        blockId: "button-1",
        blockType: "button",
        eventType: "click",
        flowId: "flow-1",
        data:{} //flow setting data
    }
    */
    bind(data, controller, editor) {
        let id = this.addRelationToMap(data);
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
        return id;
    }
    removeBind(controller, editor, bindId) {
        console.log(bindId)
        //顺序不能变
        const data = this.getDataFromMap(bindId);
        this.removeRelationFromMap(bindId);

        if (data == null) {
            return;
        }
        switch (data.blockType) {
            case "button":
                this.removeButtonEvent(data.eventType, controller, editor, data.blockId);
                break;
            case "input":
                this.removeInputEvent(data.eventType, controller, editor, data.blockId);
                break;
            case "image":
                this.removeImgEvent(data.eventType, controller, editor, data.blockId);
        }
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
    removeButtonEvent(eventType, controller, editor, blockId) {
        switch (eventType) {
            case "click":
                controller.buttonAPI.removeClickListener(editor, blockId);
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
                console.log("input");
                controller.inputAPI.setInputListener(editor, blockId);
                break;
            default:
                break;
        }
    }
    removeInputEvent(eventType, controller, editor, blockId) {
        switch (eventType) {
            case "change":
                controller.inputAPI.removeChangeListener(editor, blockId);
                break;
            case "blur":
                controller.inputAPI.removeBlurListener(editor, blockId);
                break;
            case "focus":
                controller.inputAPI.removeFocusListener(editor, blockId);
                break;
            case "input":
                controller.inputAPI.removeInputListener(editor, blockId);
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

    removeImgEvent(eventType, controller, editor, blockId) {
        switch (eventType) {
            case "click":
                controller.imgAPI.removeClickListener(editor, blockId);
                break;
            case "load":
                controller.imgAPI.removeLoadListener(editor, blockId);
                break;
            default:
                break;
        }

    }


    addRelationToMap(data) {
        var id = data.blockId + ".";
        if (this.map.has(data.blockId)) {
            this.map.get(data.blockId).push(data);
            id += this.map.get(data.blockId).length - 1;
        } else {
            this.map.set(data.blockId, [data]);
            id += 0;
        }
        return id;

    }

    removeRelationFromMap(bindId) {
        console.log("removeRelationFromMap", bindId);
        const blockId = bindId.split(".")[0];
        const index = bindId.split(".")[1];
        if (this.map.has(blockId)) {
            if (index < this.map.get(blockId).length) {
                this.map.get(blockId).splice(index, 1);
            }
        }
    }

    getDataFromMap(bindId) {
        const blockId = bindId.split(".")[0];
        const index = parseInt(bindId.split(".")[1]);
        console.log(blockId, index);
        if (this.map.has(blockId)) {
            if (index < this.map.get(blockId).length) {
                return this.map.get(blockId)[index];
            }
        }
        return null;
    }

    callback(event) {
        console.log("Runner", event);
    }
}