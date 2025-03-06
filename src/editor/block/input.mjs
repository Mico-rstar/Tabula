class Input {

    constructor({ data, config, api, readOnly }) {
        this.api = api;
        this.readOnly = readOnly;
        this.data = data;
        this.config = config;
        this.input;
        this.id;
    }
    static get toolbox() {
        return {
            title: 'Input',
            icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
        };
    }

    render() {
        const wrapper = document.createElement('div');

        this.input = document.createElement('input');
        this.input.value = this.data.content ? this.data.content : '';

        wrapper.appendChild(this.input)

        return wrapper;
    }


    save(blockContent) {

        return {
            content: this.input.value
        }
    }

    //失去焦点事件
    setBlurListener(controller) {
        this.id = controller.id;
        this.input.addEventListener("blur", () => {
            controller.callback({ "type": "Input", "event": "blur", "id": this.id });
        }
        );
    }

    //聚焦事件
    setFocusListener(controller) {
        this.id = controller.id;
        this.input.addEventListener("focus", () => {
            controller.callback({ "type": "Input", "event": "blur", "id": this.id });
        }
        );
    }

    //change事件
    setChangeListener(controller) {
        this.id = controller.id;
        this.input.addEventListener("change", () => {
            controller.callback({ "type": "Input", "event": "blur", "id": this.id });
        }
        );
    }

    //input事件
    setInputListener(controller) {
        this.id = controller.id;
        this.input.addEventListener("input", () => {
            controller.callback({ "type": "Input", "event": "blur", "id": this.id });
        }
        );
    }
}
export {
    Input as default
};