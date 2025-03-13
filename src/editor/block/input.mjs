class Input {

    constructor({ data, config, api, readOnly }) {
        this.api = api;
        this.readOnly = readOnly;
        this.data = data;
        this.config = config;
        this.input;

        //处理事件闭包
        this.InputHandle;
        this.BlurHandle;
        this.FocusHandle;
        this.ChangeHandle;
    }
    static get toolbox() {
        return {
            title: 'Input',
            icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
        };
    }

    render() {
        const wrapper = document.createElement('div');
        wrapper.classList.add('input-block-div');

        this.input = document.createElement('input');
        this.input.classList.add('input-block');
        this.input.value = this.data.content ? this.data.content : '';
        this.input.placeholder = this.data.placeholder ? this.data.placeholder : '请输入内容';

        const setBtn = document.createElement('span');
        setBtn.innerHTML = `<svg t="1741665169519" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5095" width="25" height="25"><path d="M461.141333 119.552L202.624 251.52a117.333333 117.333333 0 0 0-63.957333 104.533333v312.576a117.333333 117.333333 0 0 0 63.36 104.149334l258.474666 133.973333a117.333333 117.333333 0 0 0 108.970667-0.554667l251.392-133.376a117.333333 117.333333 0 0 0 62.293333-103.637333V355.456a117.333333 117.333333 0 0 0-62.933333-103.978667l-251.392-131.413333a117.333333 117.333333 0 0 0-107.690667-0.512z m78.08 57.216l251.306667 131.413333c17.621333 9.216 28.672 27.434667 28.672 47.274667v313.728c0 19.754667-10.922667 37.845333-28.330667 47.104l-251.392 133.376a53.333333 53.333333 0 0 1-49.536 0.256l-258.474666-133.973333a53.333333 53.333333 0 0 1-28.8-47.36V356.053333c0-20.053333 11.221333-38.4 29.098666-47.488l258.474667-131.968a53.333333 53.333333 0 0 1 48.938667 0.213334z" fill="#333333" p-id="5096"></path><path d="M510.293333 368.725333a145.792 145.792 0 1 0 0 291.584 145.792 145.792 0 0 0 0-291.584z m0 64a81.792 81.792 0 1 1 0 163.584 81.792 81.792 0 0 1 0-163.584z" fill="#333333" p-id="5097"></path></svg>`
        setBtn.style.cursor = 'pointer';
        setBtn.style.marginLeft = '10px';

        let status = 0;//0代表未点击，1代表点击
        setBtn.addEventListener('click', () => {
            if (status == 0) {
                this.input.placeholder = '请输入提示'
                status = 1;
            } else {
                this.data.placeholder = this.input.value;
                this.input.placeholder = this.data.placeholder;
                this.input.value = '';
                status = 0;
            }
        })


        wrapper.appendChild(this.input)
        wrapper.appendChild(setBtn)

        return wrapper;
    }


    save(blockContent) {

        return {
            content: this.input.value,
            placeholder: this.data.placeholder
        }
    }

    handleBlurMsg(controller, id, bindId, data) {
        return function (event) {
            controller.callback({ "type": "Input", "event": "blur", "id": id, "data": data, "bindId": bindId });

        }
    }

    handleFocusMsg(controller, id, bindId, data) {
        return function (event) {
            controller.callback({ "type": "Input", "event": "focus", "id": id, "data": data, "bindId": bindId });
        }
    }

    handleChangeMsg(controller, id, bindId, data) {
        return function (event) {
            controller.callback({ "type": "Input", "event": "change", "id": id, "data": data, "bindId": bindId });
        }

    }

    handleInputMsg(controller, id, bindId, data) {
        return function (event) {
            controller.callback({ "type": "Input", "event": "input", "id": id, "data": data, "bindId": bindId });
        }

    }

    //失去焦点事件
    setBlurListener(controller) {
        this.BlurHandle = this.handleBlurMsg(controller, controller.id, controller.bindId, this.data);
        this.input.addEventListener("blur", this.BlurHandle);
    }

    //聚焦事件
    setFocusListener(controller) {
        this.id = controller.id;
        this.FocusHandle = this.handleFocusMsg(controller, controller.id, controller.bindId, this.data);
        this.input.addEventListener("focus", this.FocusHandle);
    }

    //change事件
    setChangeListener(controller) {
        this.ChangeHandle = this.handleChangeMsg(controller, controller.id, controller.bindId, this.data);
        this.input.addEventListener("change", this.ChangeHandle);
    }

    //input事件
    setInputListener(controller) {
        this.InputHandle = this.handleInputMsg(controller, controller.id, controller.bindId, this.data);
        this.input.addEventListener("input", this.InputHandle);
    }

    removeBlurListener() {
        this.input.removeEventListener("blur", this.BlurHandle);
    }

    removeInputListener() {
        this.input.removeEventListener("input", this.InputHandle);
    }

    removeChangeListener() {
        this.input.removeEventListener("change", this.ChangeHandle);
    }

    removeFocusListener() {
        this.input.removeEventListener("focus", this.FocusHandle);
    }



}
export {
    Input as default
};