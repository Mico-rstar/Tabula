
import EditorJS from './editor/editorjs.mjs';
import Header from './editor/header.mjs';
import Embed from './editor/embed.mjs';
import SimpleImage from "./editor/simple-image.mjs";
import Checklist from './editor/checklist.mjs'
import { messageHandlers } from './socket/msgHandler.mjs';
import { sendMessageWithRetry } from './socket/sender.mjs';



// 初始化编辑器
export const editor = new EditorJS({
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

