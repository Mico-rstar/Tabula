class FlowSetting {
    constructor(editor, id, node, inputData) {
        this.flowName = document.getElementById('flowName');
        this.argsInputDiv = document.getElementById('args-input');

        this.node = node;
        this.inputData = inputData;
        this.editor = editor;
        this.id = id;

        this.init();
    }

    loadInput() {
        this.argsInputDiv.innerHTML = '';
        if (this.node.input_content) {
            this.argsInputDiv.appendChild(this.createInputDataBlock(this.node.input_content.title, this.node.input_content.data));
        }
        if (this.node.attempt_match) {
            this.argsInputDiv.appendChild(this.createInputDataBlock(this.node.attempt_match.title, this.node.attempt_match.data));
        }
    }


    createInputDataBlock(title, data) {
        const block = document.createElement('div');
        block.className = 'args-input-block';

        const titleElement = document.createElement('h2');
        titleElement.className = 'io-class';
        titleElement.textContent = title;
        block.appendChild(titleElement);
        block.appendChild(document.createElement('hr'));
        const inputContent = document.createElement('div');


        if (Array.isArray(data)) {
            inputContent.appendChild(this.createInputList(data));

        } else {
            for (const [key, value] of Object.entries(data)) {


                const inputItem = this.createInputItem(key, data);
                inputContent.appendChild(inputItem);
            }
        }

        block.appendChild(inputContent);
        return block;

    }


    createInputItem(key, data) {


        const item = document.createElement('span');
        item.className = 'args-input-item';
        const inputDiv = document.createElement('div');
        inputDiv.style.display = 'flex';
        //inputDiv纵向显示
        inputDiv.style.flexDirection = 'column';

        //键标签
        const inputKey = document.createElement('label');
        inputKey.className = 'args-input-key';
        inputKey.textContent = key;
        //值输入框
        const inputValue = document.createElement('input');
        inputValue.className = 'args-input';
        inputValue.name = 'input';
        inputValue.placeholder = '{value}表示变量';
        inputValue.type = 'text';
        //为inputValue生成唯一id:时间戳+随机数
        inputValue.id = Date.now() + Math.floor(Math.random() * 1000);


        //下拉菜单
        const menuContainer = document.createElement('div');

        inputValue.value = data[key];
        let oldValue = inputValue.value; // 初始化旧值
        inputValue.addEventListener('input', () => {
            data[key] = inputValue.value;
            console.log(data);
            window.parent.DRAPI.emit("update-data", {});


            //键入变量逻辑
            let newValue = inputValue.value; // 获取新值
            let increment = ''; // 用来保存增量

            // 用户增加了内容
            increment = newValue.substring(oldValue.length);
            if (newValue.length > oldValue.length) {
                if (increment === '{') {

                    console.log(data);
                    // 清空menu容器中的内容
                    menuContainer.innerHTML = '';
                    //console.log(this.inputData['2'])

                    menuContainer.appendChild(createMenu(transInputToMenuData(this.inputData), menuContainer, inputValue.id, data, key));


                }
            }
            else if (newValue.length < oldValue.length) {
                menuContainer.innerHTML = '';
            }

            oldValue = newValue;
        });

        item.appendChild(inputKey);
        inputDiv.appendChild(inputValue);
        inputDiv.appendChild(menuContainer);
        item.appendChild(inputDiv);
        return item;
    }





    createInputListItem(data, matchList, i) {
        console.log(matchList);

        const block = document.createElement('span');

        const input = document.createElement('input');
        input.className = 'args-input-list-item';
        input.placeholder = '{value}表示变量';
        input.style.width = '90%';
        input.style.height = '30px';
        if (data[i])
            input.value = data[i]
        block.appendChild(input);

        const removeBtn = document.createElement('span');
        removeBtn.innerHTML = `<svg t="1741500372827" class="icon-remove" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5923" width="200" height="200"><path d="M512 938.666667C276.362667 938.666667 85.333333 747.637333 85.333333 512S276.362667 85.333333 512 85.333333s426.666667 191.029333 426.666667 426.666667-191.029333 426.666667-426.666667 426.666667z m0-64c200.298667 0 362.666667-162.368 362.666667-362.666667S712.298667 149.333333 512 149.333333 149.333333 311.701333 149.333333 512s162.368 362.666667 362.666667 362.666667zM352 480h320a32 32 0 0 1 0 64H352a32 32 0 0 1 0-64z" fill="#000000" p-id="5924"></path></svg>`

        removeBtn.addEventListener('click', () => {
            let index = matchList.indexOf(block);
            data.splice(index, 1);
            matchList.splice(index, 1);
            block.remove();
            window.parent.DRAPI.emit("update-data", {});

        });

        input.addEventListener('input', () => {
            data.length = 0;
            for (let i = 0; i < matchList.length; i++) {
                data.push(matchList[i].querySelector('input').value);
            }
            window.parent.DRAPI.emit("update-data", {});
        });


        block.appendChild(removeBtn);
        return block;
    }
    createInputList(data) {
        const block = document.createElement('div');
        const addBtn = document.createElement('div');
        addBtn.className = 'args-input-list-add';
        addBtn.innerHTML = `
            <svg t="1741446592641" class="icon-add" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5044" width="200" height="200"><path d="M953.37931 512C953.37931 268.232939 755.767084 70.62069 512 70.62069 268.232934 70.62069 70.62069 268.232939 70.62069 512 70.62069 755.767061 268.232934 953.37931 512 953.37931 755.767084 953.37931 953.37931 755.767061 953.37931 512ZM547.310345 476.689655 547.310345 264.858364C547.310345 245.21731 531.501374 229.517241 512 229.517241 492.362681 229.517241 476.689655 245.340001 476.689655 264.858364L476.689655 476.689655 264.858359 476.689655C245.217315 476.689655 229.517241 492.498635 229.517241 512 229.517241 531.637326 245.340001 547.310345 264.858359 547.310345L476.689655 547.310345 476.689655 759.141636C476.689655 778.78269 492.498626 794.482759 512 794.482759 531.637319 794.482759 547.310345 778.659999 547.310345 759.141636L547.310345 547.310345 759.141694 547.310345C778.78272 547.310345 794.482759 531.501365 794.482759 512 794.482759 492.362674 778.660017 476.689655 759.141694 476.689655L547.310345 476.689655ZM0 512C0 229.230209 229.230204 0 512 0 794.769832 0 1024 229.230209 1024 512 1024 794.769791 794.769832 1024 512 1024 229.230204 1024 0 794.769791 0 512Z" fill="#389BFF" p-id="5045"></path></svg>
        `;
        block.appendChild(addBtn);

        const matchList = [];

        //加载data原有数据
        if (data && data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                const inputItem = this.createInputListItem(data, matchList, i);
                block.appendChild(inputItem);
                matchList.push(inputItem);
            }
        }

        addBtn.addEventListener('click', () => {

            const inputItem = this.createInputListItem(data, matchList);
            block.appendChild(inputItem);
            matchList.push(inputItem);
            data.push('');
            window.parent.DRAPI.emit("update-data", {});
            console.log(this.node);

        });


        return block;

    }



    //加载工作流输出
    createOutputDataItem(key, value) {
        const item = document.createElement('div');
        item.className = 'args-output-item';

        const keyElement = document.createElement('span');
        keyElement.className = 'args-output-key';
        keyElement.textContent = key;

        const valueElement = document.createElement('span');
        valueElement.className = 'args-output-type';
        valueElement.textContent = value;

        item.appendChild(keyElement);
        item.appendChild(valueElement);

        return item;
    }


    //递归地创建输出对象信息
    createObjectItem(key, obj) {
        const item = document.createElement('div');
        item.className = 'args-output-item';

        const details = document.createElement('div');
        details.className = 'args-output-item';
        details.style.display = 'none';
        for (const [key, value] of Object.entries(obj)) {
            if (typeof value === 'object' && value !== null) {
                details.appendChild(this.createObjectItem(key, value));
            } else {
                details.appendChild(this.createOutputDataItem(key, value));
            }
        }

        const arrow = document.createElement('span');
        arrow.className = 'args-output-arrow';
        arrow.textContent = '▶';
        arrow.addEventListener('click', () => {
            if (arrow.textContent === '▶') {
                arrow.textContent = '▼';
                details.style.display = 'block';
            } else {
                arrow.textContent = '▶';
                details.style.display = 'none';
            }
        });

        const keyElement = document.createElement('span');
        keyElement.className = 'args-output-key';
        keyElement.textContent = key;

        item.appendChild(arrow);
        item.appendChild(keyElement);
        item.appendChild(details);

        return item;
    }

    loadOutput() {
        //在侧边栏动态展示输出
        const title = document.getElementById('args-output-title');
        title.innerText = this.node.output_content.title;

        const container = document.getElementById('args-output-container');
        container.innerHTML = '';
        for (const [key, value] of Object.entries(this.node.output_content.data)) {
            if (typeof value === 'object' && value !== null) {
                container.appendChild(this.createObjectItem(key, value));
            } else {
                container.appendChild(this.createOutputDataItem(key, value));
            }
        }

    }

    //更新editor中指定node的data
    updateEditorData() {
        window.parent.DRAPI.addEventListener("update-data", () => {
            this.editor.updateNodeDataFromId(this.id, this.node);
        });

    }

    init() {
        //显示节点名称
        this.flowName.innerText = this.node.name;
        this.updateEditorData();
        this.loadInput();
        this.loadOutput();
    }
}