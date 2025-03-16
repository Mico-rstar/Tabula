export class Runner {

    /*
    map={
        blockId:[{
            blockId: "button-1",
            blockType: "button",
            eventType: "click",
            flowId: "flow-1",
            data:{} //flow setting data
        },
        {
            blockId: "button-1",
            blockType: "button",
            eventType: "click",
            flowId: "flow-1",
            data:{} //flow setting
        }
        ]
    }
    */
    constructor(mapData) {
        if (!mapData) {
            this.map = new Map();
        } else {
            this.map = new Map(JSON.parse(mapData));
        }
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
                this.bindButtonEvent(data.eventType, controller, editor, data.blockId, id);
                break;
            case "input":
                this.bindInputEvent(data.eventType, controller, editor, data.blockId, id);
                break;
            case "image":
                this.bindImgEvent(data.eventType, controller, editor, data.blockId, id);
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

    bindButtonEvent(eventType, controller, editor, blockId, bindId) {
        switch (eventType) {
            case "click":
                controller.buttonAPI.setClickListener(editor, blockId, bindId);
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

    bindInputEvent(eventType, controller, editor, blockId, bindId) {
        switch (eventType) {
            case "change":
                controller.inputAPI.setChangeListener(editor, blockId, bindId);
                break;
            case "blur":
                controller.inputAPI.setBlurListener(editor, blockId, bindId);
                break;
            case "focus":
                controller.inputAPI.setFocusListener(editor, blockId, bindId);
                break;
            case "input":
                controller.inputAPI.setInputListener(editor, blockId, bindId);
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

    bindImgEvent(eventType, controller, editor, blockId, bindId) {
        switch (eventType) {
            case "click":
                controller.imgAPI.setClickListener(editor, blockId, bindId);
                break;
            case "load":
                controller.imgAPI.setLoadListener(editor, blockId, bindId);
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

    //通过后端接口调用被绑定的工作流，并处理返回值
    async callback(event) {
        console.log("Runner", event);
    }

    //调用在加载时应被调用的工作流
    async initFlow(map) {
        console.log("initFlow", map);
        for (let [blockId, events] of map) {
            for (let event of events) {
                console.log("initFlow", blockId, event);
                await this.callback(event);
            }
        }
    }

    save() {
        //讲map序列化为json
        return JSON.stringify([...this.map]);
    }
}