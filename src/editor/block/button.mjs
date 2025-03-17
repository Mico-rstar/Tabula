


class Button {
    constructor({ data: t, config: e, api: a, readOnly: r }) {
        this.data = t, this.config = e, this.api = a, this.readOnly = r;
        this.btn;

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

        var settingButton = document.createElement('div');
        settingButton.style.display = 'flex';
        settingButton.style.alignItems = 'center';
        settingButton.style.justifyItems = 'center';
        settingButton.innerHTML = `<svg t="1742211944489" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1489" width="26" height="26"><path d="M509.387755 666.122449c-83.591837 0-151.510204-67.918367-151.510204-151.510204s67.918367-151.510204 151.510204-151.510204 151.510204 67.918367 151.510204 151.510204-67.918367 151.510204-151.510204 151.510204z m0-261.22449c-60.604082 0-109.714286 49.110204-109.714286 109.714286s49.110204 109.714286 109.714286 109.714286 109.714286-49.110204 109.714286-109.714286-49.110204-109.714286-109.714286-109.714286z" fill="#333333" p-id="1490"></path><path d="M556.408163 929.959184h-83.591836c-47.542857 0-86.204082-38.661224-86.204082-86.204082v-22.987755c0-1.044898-0.522449-2.089796-1.567347-2.612245h-0.522449c-1.044898-0.522449-2.089796 0-3.134694 0.522449l-14.628571 15.15102c-16.195918 16.195918-37.093878 25.077551-59.559184 25.077551-22.465306 0-43.363265-8.881633-59.036735-24.555102l-59.036734-59.036734c-32.391837-32.391837-32.391837-85.159184 0-118.07347l15.673469-15.15102c1.044898-1.044898 1.044898-2.089796 0.522449-3.134694v-0.522449c-0.522449-1.044898-1.567347-1.567347-2.612245-1.567347h-22.987755c-47.542857 0-86.204082-38.661224-86.204082-86.204082v-78.367346c0.522449-47.020408 39.183673-85.681633 86.726531-85.681633h21.420408c1.044898 0 2.089796-0.522449 2.612245-2.089796 0.522449-1.044898 1.044898-2.612245 1.567347-3.657143 0.522449-1.044898 0-2.089796-0.522449-3.134694l-16.195918-16.718367C156.734694 329.142857 156.734694 275.853061 189.126531 243.461224l59.036734-59.036734c15.673469-15.673469 36.571429-24.555102 59.036735-24.555102 22.465306 0 43.363265 8.881633 59.036735 24.555102l15.15102 15.673469c0.522449 1.044898 2.089796 1.044898 3.134694 0.522449h0.522449c1.044898-0.522449 1.567347-1.567347 1.567347-2.612245v-17.763265C386.612245 132.702041 425.273469 94.040816 472.816327 94.040816h83.591836c44.408163 0 80.979592 36.571429 80.979592 80.979592v21.420408c0 1.044898 0.522449 2.089796 2.089796 2.612245 1.567347 0.522449 2.612245 1.044898 3.657143 1.567347 1.044898 0.522449 2.089796 0 3.134694-0.522449l16.718367-16.195918c32.391837-32.391837 85.159184-32.391837 118.073469 0.522449l59.036735 59.036734c15.673469 15.673469 24.555102 36.571429 24.555102 59.036735 0 22.465306-8.881633 43.363265-24.555102 59.036735l-15.673469 16.195918c-0.522449 0.522449-1.044898 2.089796-0.522449 2.612245 0.522449 1.044898 1.044898 2.612245 1.567347 3.657143 0.522449 1.044898 1.567347 2.089796 2.612245 2.089796h21.420408c44.408163 0 80.979592 36.571429 80.979592 80.979592v88.816326c0 44.408163-36.571429 80.979592-80.979592 80.979592h-22.987755c-1.044898 0-2.089796 0.522449-2.612245 1.567347-0.522449 1.567347-0.522449 2.612245 0.522449 3.657143l15.15102 14.628571c16.195918 16.195918 25.077551 37.093878 24.555102 59.559184 0 22.465306-8.881633 43.363265-24.555102 59.036735l-59.036734 59.036734c-15.673469 15.673469-36.571429 24.555102-59.036735 24.555102s-43.363265-8.881633-59.036735-24.555102l-16.195918-15.673469c-0.522449-0.522449-2.089796-1.044898-2.612245-0.522449-1.044898 0.522449-2.612245 1.044898-3.657143 1.567347-1.044898 0.522449-2.089796 1.567347-2.089796 2.612245v26.644898C637.387755 893.387755 600.816327 929.959184 556.408163 929.959184zM402.285714 780.538776c16.195918 7.314286 26.122449 22.987755 26.122449 40.75102v22.987755c0 24.555102 19.853061 44.408163 44.408164 44.408163h83.591836c21.420408 0 39.183673-17.763265 39.183674-39.183673v-26.644898c0-18.285714 10.971429-34.481633 28.212245-41.27347 1.044898-0.522449 1.567347-0.522449 2.612245-1.044897 16.718367-7.314286 35.526531-3.657143 48.587755 8.881632l16.195918 15.67347c16.718367 16.718367 43.363265 16.718367 59.559184 0l59.036734-59.036735c7.836735-7.836735 12.016327-18.285714 12.016327-29.779592 0-10.971429-4.179592-21.420408-12.016327-29.779592l-14.628571-14.106122c-13.583673-13.061224-17.763265-32.914286-9.926531-50.155102v-0.522449c6.791837-15.673469 22.987755-26.122449 40.751021-26.122449h22.987755c21.420408 0 39.183673-17.763265 39.183673-39.183674v-88.816326c0-21.420408-17.763265-39.183673-39.183673-39.183674h-21.420408c-18.285714 0-34.481633-10.971429-41.27347-28.212245-0.522449-1.044898-0.522449-1.567347-1.044898-2.612245-7.314286-16.718367-3.657143-35.526531 8.881633-48.587755l15.673469-16.195918c7.836735-7.836735 12.538776-18.808163 12.538776-29.779592 0-11.493878-4.179592-21.942857-12.016327-29.779592L751.281633 214.204082c-16.195918-16.195918-42.840816-16.195918-59.036735 0l-17.240816 16.195918c-13.061224 12.538776-32.391837 15.673469-48.587755 8.881633-0.522449-0.522449-1.567347-0.522449-2.612245-1.044898-17.240816-6.791837-28.212245-22.987755-28.212245-41.27347v-21.420408c0-21.420408-17.763265-39.183673-39.183674-39.183673h-83.591836c-24.555102 0-44.408163 19.853061-44.408164 44.408163V198.530612c0 17.763265-10.44898 33.436735-26.644898 40.751021-17.240816 7.836735-37.093878 3.657143-50.155102-9.404082l-15.15102-15.673469c-7.836735-7.836735-18.285714-12.016327-29.257143-12.016327-10.971429 0-21.420408 4.179592-29.257143 12.016327L218.906122 272.718367c-16.195918 16.195918-16.195918 42.840816 0 59.036735l16.195919 17.240816c12.538776 13.061224 16.195918 32.391837 8.881632 48.587755-0.522449 0.522449-0.522449 1.567347-1.044897 2.612245-6.791837 17.240816-22.987755 28.212245-41.27347 28.212245h-21.420408c-24.555102 0-44.408163 19.853061-44.408163 44.408164v78.367346c0 24.555102 19.853061 44.408163 44.408163 44.408164h22.987755c17.763265 0 33.436735 10.44898 40.75102 26.644898v0.522449c7.314286 16.718367 3.657143 37.093878-9.404081 49.632653l-15.67347 15.15102c-16.195918 16.195918-16.195918 42.318367 0 58.514286l59.036735 59.036735c7.836735 7.836735 18.285714 12.016327 29.257143 12.016326 10.971429 0 21.420408-4.179592 29.779592-12.538775l14.106122-14.628572c13.061224-13.583673 32.914286-17.763265 50.155102-9.92653l1.044898 0.522449z" fill="#333333" p-id="1491"></path></svg>`;



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
            settingButton.style.display = 'flex';
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

    handleClickMsg(controller, id, bindId) {
        return function (event) {
            controller.callback({ "type": "Button", "event": "click", "id": id, "bindId": bindId });
        }
    }

    //点击事件
    setClickListener(controller) {
        this.handle = this.handleClickMsg(controller, controller.id, controller.bindId);
        this.btn.addEventListener("click", this.handle);
    }

    //删除点击事件
    removeClickListener(controller) {
        this.btn.removeEventListener("click", this.handle);
    }


}

export {
    Button as default
};