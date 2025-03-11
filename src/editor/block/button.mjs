


class Button {
    constructor({ data: t, config: e, api: a, readOnly: r }) {
        this.data = t, this.config = e, this.api = a, this.readOnly = r;
        this.btn;
        this.id;
        //事件处理函数的闭包
        this.handle;


    }
    render() {
        const wrapper = document.createElement('div');

        var btnWrapper = document.createElement('div');
        btnWrapper.style.display = 'flex';
        btnWrapper.style.flexDirection = 'row';
        //btnWrapper.style.backgroundColor = '#1b1b1b';
        btnWrapper.style.padding = '20px';
        btnWrapper.style.borderRadius = '8px';
        btnWrapper.style.width = '400px';

        // 新按钮
        var newButton = document.createElement('div');
        newButton.style.display = 'flex';
        // newButton.style.alignItems = 'center';
        newButton.style.backgroundColor = '#007aff';
        newButton.style.padding = '10px';
        newButton.style.borderRadius = '4px';
        newButton.style.textAlign = 'center';
        newButton.style.color = '#ffffff';
        newButton.style.cursor = 'pointer';
        newButton.style.width = 'auto';
        newButton.innerText = this.data.btnText ? this.data.btnText : '新按钮';
        this.btn = newButton;

        var settingButton = document.createElement('button');
        settingButton.style.display = 'block';
        settingButton.style.textAlign = 'center';
        settingButton.style.color = 'white';
        settingButton.style.verticalAlign = 'center'
        settingButton.backgroundColor = "#ffffff"
        settingButton.innerText = '⚙️';

        btnWrapper.appendChild(newButton);
        btnWrapper.appendChild(settingButton);

        // 容器
        var container = document.createElement('div');
        container.style.display = 'none';
        container.style.flexDirection = 'column';
        container.style.backgroundColor = '#1b1b1b';
        container.style.padding = '20px';
        container.style.borderRadius = '8px';
        container.style.width = '400px';

        // 顶部栏
        var topBar = document.createElement('div');
        topBar.style.display = 'flex';
        topBar.style.alignItems = 'center';
        topBar.style.marginBottom = '20px';


        //topBar.appendChild(newButton);
        container.appendChild(topBar);

        // 按钮名称
        var timeSection = document.createElement('div');
        timeSection.style.marginBottom = '20px';
        // var timeLabel = document.createElement('div');
        // timeLabel.style.color = '#888888';
        // timeLabel.innerText = '时间';
        var btnName = document.createElement('input');
        btnName.style.display = 'flex';
        btnName.style.alignItems = 'center';
        btnName.style.backgroundColor = '#252525';
        btnName.style.padding = '10px';
        btnName.style.borderRadius = '4px';
        btnName.style.color = '#ffffff';
        btnName.style.cursor = 'pointer';
        btnName.placeholder = '请输入按钮名称';
        btnName.addEventListener('input', () => {
            newButton.innerHTML = btnName.value ? btnName.value : 'click';
        });

        //timeSection.appendChild(timeLabel);
        timeSection.appendChild(btnName);
        container.appendChild(timeSection);



        // 完成按钮
        var completedButton = document.createElement('div');
        completedButton.style.backgroundColor = '#007aff';
        completedButton.style.color = '#ffffff';
        completedButton.style.padding = '10px';
        completedButton.style.borderRadius = '4px';
        completedButton.style.marginTop = '20px';
        completedButton.style.textAlign = 'center';
        completedButton.style.cursor = 'pointer';
        completedButton.innerText = '完成';

        completedButton.addEventListener('click', () => {
            container.style.display = 'none';
            settingButton.style.display = 'block';
        });
        settingButton.addEventListener('click', () => {
            container.style.display = 'block';
            settingButton.style.display = 'none';
        });


        container.appendChild(completedButton);

        wrapper.appendChild(btnWrapper);
        wrapper.appendChild(container);

        return wrapper;

    }

    save(blockContent) {
        const btn = blockContent.querySelector('div').querySelector('div');

        return {
            btnText: btn.innerText
        };
    }

    static get toolbox() {
        return {
            title: 'Button',
            icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
        };
    }

    handleClickMsg(controller) {
        return function (event) {
            controller.callback({ "type": "Button", "event": "click", "id": this.id });
        }
    }

    //点击事件
    setClickListener(controller) {
        this.id = controller.id;
        console.log(controller);
        this.handle = this.handleClickMsg(controller);
        console.log(this.handle);
        this.btn.addEventListener("click", this.handle);
    }

    //删除点击事件
    removeClickListener(controller) {
        this.id = controller.id;
        console.log("remove click");
        this.btn.removeEventListener("click", this.handle);
    }


}

export {
    Button as default
};