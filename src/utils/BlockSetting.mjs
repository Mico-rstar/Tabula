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

                window.myRunner.bind({
                    "eventType": eventType,
                    "flowId": action,
                    "blockId": this.getId(),
                    "blockType": this.blockType
                }, window.controller, window.editor)
                //添加工作流
                const flowContainer = document.getElementById('workflow-content');
                flowContainer.style.display = 'block';
                const flowItem = document.createElement('div');
                flowItem.innerText = document.getElementById('action').name;
                flowContainer.appendChild(flowItem);

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

    async init() {
        this.switchOption();
        this.setBlockName();
        this.addFlowListener();
        this.blockType = await this.getType();
        this.setEventType();

    }


}

export {
    BlockSetting as default
}