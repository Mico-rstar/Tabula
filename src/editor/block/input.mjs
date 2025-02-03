class Input {
    static get toolbox() {
        return {
            title: 'Input',
            icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
        };
    }

    render() {
        const wrapper = document.createElement('div');

        const inputWrapper = document.createElement('div');
        inputWrapper.style.flexDirection = 'row';
        inputWrapper.style.display = 'flex';
        inputWrapper.style.padding = '20px';
        inputWrapper.style.borderRadius = '8px';
        inputWrapper.style.width = '400px';

        const input = document.createElement('input');

        const settingButton = document.createElement('button');
        settingButton.style.display = 'none';
        settingButton.innerHTML = '⚙️';

        inputWrapper.appendChild(input);
        inputWrapper.appendChild(settingButton);
        wrapper.appendChild(inputWrapper);

        // 容器
        var container = document.createElement('div');
        container.style.display = 'flex';
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

        // 工作流下拉列表
        var executeSection = document.createElement('div');
        var executeButton = document.createElement('select');
        executeButton.style.display = 'flex';
        executeButton.style.alignItems = 'center';
        executeButton.style.backgroundColor = '#252525';
        executeButton.style.padding = '10px';
        executeButton.style.borderRadius = '4px';
        executeButton.style.color = '#ffffff';
        executeButton.style.cursor = 'pointer';
        executeButton.innerText = '新操作';

        var options = [
            { value: '', text: 'default' },
            { value: 'workflow1-id', text: 'workflow1' },
            { value: 'workflow2-id', text: 'workflow2' }
            // 添加更多选项
        ];

        options.forEach(function (option) {
            var optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.text;
            executeButton.appendChild(optionElement);
        });


        //executeSection.appendChild(selectElement);
        executeSection.appendChild(executeButton);
        container.appendChild(executeSection);

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
            container.style.display = 'flex';
            settingButton.style.display = 'none';
        });
        executeButton.addEventListener('change', () => {
            let value = executeButton.value ? executeButton.value : 'default';
        });

        container.appendChild(completedButton);
        wrapper.appendChild(container);
        return wrapper;
    }

    save(blockContent) {
        return {
            content: blockContent.value
        }
    }
}
export {
    Input as default
};