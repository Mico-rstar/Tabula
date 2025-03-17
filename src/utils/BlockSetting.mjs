class BlockSetting {


    constructor(api) {
        this.api = api;
        this.blockName = document.getElementById("blockName");
        this.propertyBtn = document.getElementById("property");
        this.eventBtn = document.getElementById("event");
        this.addFlowBtn = document.getElementById("add-workflow");
        this.eventTypeSelect = document.getElementById("eventType");
        this.actionSelect = document.getElementById("action");
        this.argsInput = document.getElementById("args-input");
        this.primaryBtn = document.querySelector('.primary');
        this.cancelBtn = document.querySelector('.cancel');

        this.blockType;



        this.eventTypes = [{ "name": "加载时", "type": "common-load" }];
        this.buttonEventTypes = [{ "name": "加载时", "type": "common-load" }, { "name": "点击", "type": "click" }];
        this.inputEventTypes = [{ "name": "加载时", "type": "common-load" }, { "name": "输入", "type": "input" }, { "name": "改变", "type": "change" }, { "name": "失去焦点", "type": "blur" }, { "name": "获得焦点", "type": "focus" }];
        this.imgEventTypes = [{ "name": "加载时", "type": "common-load" }, { "name": "点击", "type": "click" }];


        this.index = this.getIndex();
        this.id = this.getId();

        this.init();

    }


    replaceElement(element) {
        var newElement = element.cloneNode(true);
        element.parentNode.replaceChild(newElement, element);
        return newElement;
    }

    getIndex() {
        return this.api.blocks.getCurrentBlockIndex();
    }

    getId() {
        return this.api.blocks.getBlockByIndex(this.getIndex()).id;
    }



    async getType() {
        try {
            const outputData = await this.api.saver.save();
            console.log('Saved data:', outputData);
            return outputData.blocks[this.getIndex()].type;
        } catch (error) {
            console.error('Error saving data:', error);
            return undefined; // 确保有返回值，即使发生错误
        }
    }

    showProperty() {
        const propertyContent = document.getElementById('property-content');
        const eventContent = document.getElementById('event-content');
        propertyContent.style.display = 'block';
        eventContent.style.display = 'none';
    }
    showEvent() {
        const propertyContent = document.getElementById('property-content');
        const eventContent = document.getElementById('event-content');
        propertyContent.style.display = 'none';
        eventContent.style.display = 'block';
    }

    switchOption() {
        //替换元素，删除之前绑定的事件
        this.propertyBtn = this.replaceElement(this.propertyBtn);
        this.eventBtn = this.replaceElement(this.eventBtn);
        this.propertyBtn.addEventListener('click', () => {
            console.log('property')
            this.propertyBtn.style.backgroundColor = '#575757';
            this.eventBtn.style.backgroundColor = '#6c6c6c';
            this.showProperty();
        })
        this.eventBtn.addEventListener('click', () => {
            console.log('event')
            this.propertyBtn.style.backgroundColor = '#6c6c6c';
            this.eventBtn.style.backgroundColor = '#575757';
            this.showEvent();
        })
    }

    addFlowListener() {
        //解除先前事件绑定
        this.addFlowBtn = this.replaceElement(this.addFlowBtn);

        this.addFlowBtn.addEventListener('click', () => {
            const workflowList = document.getElementById('workflow-list');
            workflowList.style.display = 'block';
            this.primaryBtn = this.replaceElement(this.primaryBtn);
            this.cancelBtn = this.replaceElement(this.cancelBtn);
            this.primaryBtn.addEventListener('click', () => {
                const eventType = document.getElementById('eventType').value;
                const action = document.getElementById('action').value;

                console.log(window);

                let bindId = window.myRunner.bind({
                    "eventType": eventType,
                    "flowId": action,
                    "blockId": this.id,
                    "blockType": this.blockType
                }, window.controller, window.editor)
                //添加工作流
                this.loadFlowContent(eventType, action, bindId);


                //todo
                workflowList.style.display = 'none';
            });

            this.cancelBtn.addEventListener('click', () => {
                document.getElementById('eventType').selectedIndex = 0;
                document.getElementById('action').selectedIndex = 0;
                workflowList.style.display = 'none';
            });
        })
    }



    setBlockName() {
        this.blockName.innerText = 'Block' + this.getIndex();
    }

    fillEventType(EventType) {
        this.eventTypeSelect.innerHTML = '';
        for (const event of EventType) {
            const option = document.createElement('option');
            option.value = event.type;
            option.text = event.name;
            this.eventTypeSelect.appendChild(option);
        }
    }

    setEventType() {
        switch (this.blockType) {
            case 'button':
                this.fillEventType(this.buttonEventTypes);
                break;
            case 'input':
                this.fillEventType(this.inputEventTypes);
                break;
            case 'image':
                this.fillEventType(this.imgEventTypes);
                break;
            default:
                this.fillEventType(this.eventTypes);
        }
    }

    //清理其他块绑定的工作流
    clearFlowContent() {
        const flowContainer = document.getElementById('workflow-content');
        flowContainer.innerHTML = '';
        flowContainer.style.display = 'none';

    }


    loadFlowContent(event_name, flow_name, bindId) {
        const flowContainer = document.getElementById('workflow-content');
        flowContainer.style.display = 'block';
        const flowItem = document.createElement('div');
        flowItem.classList.add('workflow-item');
        flowItem.innerHTML = `<div class="workflow-item-content">
    <span class="workflow-item-content-event">${event_name}</span>
    <span class="workflow-item-content-flowname">调用工作流：${flow_name}</span>`;
        const delBtn = document.createElement('span');
        delBtn.innerHTML = `<svg class="workflow-item-content-del" t="1741677336061" class="icon" viewBox="0 0 1024 1024"
        version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6463" width="20" height="20">
        <path
            d="M202.666667 256h-42.666667a32 32 0 0 1 0-64h704a32 32 0 0 1 0 64H266.666667v565.333333a53.333333 53.333333 0 0 0 53.333333 53.333334h384a53.333333 53.333333 0 0 0 53.333333-53.333334V352a32 32 0 0 1 64 0v469.333333c0 64.8-52.533333 117.333333-117.333333 117.333334H320c-64.8 0-117.333333-52.533333-117.333333-117.333334V256z m224-106.666667a32 32 0 0 1 0-64h170.666666a32 32 0 0 1 0 64H426.666667z m-32 288a32 32 0 0 1 64 0v256a32 32 0 0 1-64 0V437.333333z m170.666666 0a32 32 0 0 1 64 0v256a32 32 0 0 1-64 0V437.333333z"
            fill="#000000" p-id="6464"></path>
    </svg>`
        delBtn.style.cursor = 'pointer';
        delBtn.setAttribute('bindId', bindId);
        delBtn.addEventListener('click', () => {
            //删除工作流
            const bindId = delBtn.getAttribute('bindId');
            console.log('删除工作流', bindId);
            window.myRunner.removeBind(window.controller, window.editor, bindId);
            flowItem.remove();
        });
        flowContainer.appendChild(flowItem);
        flowItem.appendChild(delBtn);
    }

    initFlowContent() {
        console.log(window.myRunner);
        if (window.myRunner.map.has(this.id)) {
            window.myRunner.map.get(this.id).forEach((value, index) => {
                this.loadFlowContent(value.eventType, value.flowId, this.id + "." + index);
            });
        }
    }

    async init() {
        this.clearFlowContent();
        this.initFlowContent();
        this.switchOption();
        this.setBlockName();
        this.addFlowListener();
        this.blockType = await this.getType();
        this.setEventType();
        this.eventBtn.click();

    }


}

export {
    BlockSetting as default
}