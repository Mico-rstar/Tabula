import EditorJS from './editor/editorjs.mjs';
import Header from './editor/header.mjs';
import Embed from './editor/embed.mjs';
import Checklist from './editor/checklist.mjs'
import SimpleImage from './editor/simple-image.mjs';
import { messageHandlers } from './socket/msgHandler.mjs';
import { sendMessageWithRetry } from './socket/sender.mjs';
import Button from './editor/button.mjs';




const editor = new EditorJS({

    holder: 'editorjs',
    tools: {
        header: Header,
        embed: Embed,
        checklist: {
            class: Checklist,
            inlineToolbar: true,
        },
        image: SimpleImage,
        button: Button

    }


})


console.log('editor', editor)
window.DRAPI.saveFile((value) => {
    console.log('saveFile')
    editor.save().then((outputData) => {
        console.log
            ('文章数据：', outputData)
    }).catch((error) => {
        console.log('保存失败：', error)
    });
}
)

// 封装获取指定索引块ID的函数
function getBlockIdByIndex(index) {
    const block = editor.blocks.getBlockByIndex(index);
    return block ? block.id : null;
}

// 封装在指定索引位置插入块的函数
function insertBlockAtIndex(type, data, index) {
    editor.blocks.insert(type, data, {}, index, true);
}

// 封装获取指定ID对应块位置的函数
function getBlockIndexById(id) {
    const blocks = editor.blocks.getBlocksCount();
    for (let i = 0; i < blocks; i++) {
        const block = editor.blocks.getBlockByIndex(i);
        if (block && block.id === id) {
            return i;
        }
    }
    return -1; // 如果未找到返回-1
}

// 封装更新指定ID块的函数
function updateBlockById(id, newData) {
    const index = getBlockIndexById(id);
    if (index !== -1) {
        editor.blocks.update(index, newData);
    } else {
        console.log(`未找到ID为${id}的块`);
    }
}

document.addEventListener('DOMContentLoaded', async () => {

    const clearButton = document.getElementById('clear');
    clearButton.addEventListener('click', async () => {
        console.log('clear data')
        editor.blocks.clear()


    });

    const insertButton = document.getElementById('insert');
    insertButton.addEventListener('click', async () => {
        console.log('insert data')
        insertBlockAtIndex("header", { text: "hello world" }, 0);
    });

    const getIDButton = document.getElementById('getID');
    getIDButton.addEventListener('click', async () => {
        console.log('getID')
        const currentIndex = editor.blocks.getCurrentBlockIndex();
        const id = getBlockIdByIndex(currentIndex);
        console.log('id', id);
    });

    // 获取某个ID对应的块的位置
    const getIndexButton = document.getElementById('getIndex');
    getIndexButton.addEventListener('click', async () => {
        const id = 'your-block-id'; // 替换为实际的块ID
        const index = getBlockIndexById(id);
        console.log('index', index);
    });

    // 更新某个ID的块
    const updateButton = document.getElementById('update');
    updateButton.addEventListener('click', async () => {
        const id = 'your-block-id'; // 替换为实际的块ID
        const newData = { text: "updated text" }; // 替换为实际的新数据
        updateBlockById(id, newData);
    });
});




//WebSocket通信
const ws = new WebSocket("ws://127.0.0.1:5200/");
ws.onopen = function (event) {
    console.log('websocket已连接', ws);
    sendMessageWithRetry(ws, { type: 'test-from-client', data: {} });

};
ws.onmessage = function (event) {
    try {
        const data = JSON.parse(event.data);
        console.log('收到服务端的消息：', data);
        messageHandlers[data.type](data, ws, editor);

    } catch (e) { console.log("parse-serverinfo-err", e) }

};
ws.onclose = function (event) {
    alert("连接已关闭...");
};

