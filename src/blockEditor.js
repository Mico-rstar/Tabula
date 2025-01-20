
import EditorJS from './editor/editorjs.mjs';
import Header from './editor/header.mjs';
import Embed from './editor/embed.mjs';
import SimpleImage from "./editor/simple-image.mjs";
import Checklist from './editor/checklist.mjs'

const editor = new EditorJS({
    holder: 'editorjs',
    tools: {
        header: Header,
        image: SimpleImage,
        embed: Embed,
        checklist: {
            class: Checklist,
            inlineToolbar: true,
        }

    }


})
//editor.blocks.insert("text", data?: BlockToolData, config?: ToolConfig, index?: number, needToFocus?: boolean)

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

document.addEventListener('DOMContentLoaded', async () => {
    const clearButton = document.getElementById('clear');
    clearButton.addEventListener('click', async () => {
        console.log('clear data')
        editor.blocks.clear()


    });

    const insertButton = document.getElementById('insert');
    insertButton.addEventListener('click', async () => {
        console.log('insert data')
        editor.blocks.insert("header", { text: "hello world" }, {}, 0, true)
    });

    const getIDButton = document.getElementById('getID');
    getIDButton.addEventListener('click', async () => {
        console.log('getID')
        const id = editor.blocks.getBlockByIndex(editor.blocks.getCurrentBlockIndex()).id
        console.log('id', id)
    });
});

const ws = new WebSocket("ws://127.0.0.1:8888/");

ws.onopen = function (event) {
    console.log('websocket已连接');
    sendMessage()
};

ws.onmessage = function (event) {
    console.log('收到服务端回复的消息：' + event.data);

};

ws.onclose = function (event) {
    alert("连接已关闭...");
};

function sendMessage() {
    ws.send("hello server, I am client");
}



