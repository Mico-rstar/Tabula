
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
    constructor() {
        this.map = new Map();
    }

    /*
    data:{
        blockId: "button-1",
        blockType: "button",
        eventType: "click",
        flowId: "flow-1",
        params: "params" //flow setting data
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

    //只绑定事件，不更改map，recover时使用
    bindOnly(data, controller, editor, bindId) {
        switch (data.blockType) {
            case "button":
                this.bindButtonEvent(data.eventType, controller, editor, data.blockId, bindId);
                break;
            case "input":
                this.bindInputEvent(data.eventType, controller, editor, data.blockId, bindId);
                break;
            case "image":
                this.bindImgEvent(data.eventType, controller, editor, data.blockId, bindId);
            default:
                break;
        }
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
        const data = window.myRunner.getDataFromMap(event.bindId);
        let params = await window.myRunner.translateParams(data.params);
        console.log(params);
        window.parent.ws.sendMsg({ type: "callWorkflow", params: params, id: data.flowId, insertBlockId:data.insertBlockId }).then((res) => {
            console.log(res);
        })
    }

    async translateParams(params) {
        //将params中的参数替换为对应的值
        // 提取所有 URL
        const urlPattern = /\{([^}]+)\}/g;
        let match;
        const urls = [];
        while ((match = urlPattern.exec(params)) !== null) {
            urls.push(match[1]);
        }
        console.log(params, urls);

        // 转换每个 URL
        for (const url of urls) {

            let urllist = url.split('.');
            let content = await window.editor.blocks.getById(urllist[0]).save();
            for (let i = 1; i < urllist.length; i++) {
                content = content[urllist[i]];
            }

            if (content) {
                params = params.replace(`{${url}}`, content);
            }
        }
        return params;
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

        return Object.fromEntries(this.map);
    }

    recover(map, controller, editor) {
        this.map = new Map(Object.entries(map));
        //遍历map
        for (let [blockId, events] of this.map) {
            let index = 0;
            for (let event of events) {
                console.log("recover", blockId, event);
                this.bindOnly(event, controller, editor, blockId + "." + index);
                index++;
            }
        }

    }
}