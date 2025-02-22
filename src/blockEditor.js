import EditorJS from './editor/editorjs.mjs';
import Header from './editor/block/header.mjs';
import Embed from './editor/block/embed.mjs';
import Checklist from './editor/block/checklist.mjs'
import SimpleImage from './editor/block/simple-image.mjs';
import { messageHandlers } from './socket/msgHandler.mjs';
import { sendMessageWithRetry } from './socket/sender.mjs';
import Button from './editor/block/button.mjs';
import MarkerTool from './editor/inlineTool/inlineTool.mjs';
import MyBlockTune from './editor/blockTune/blockTune.mjs';
import Input from './editor/block/input.mjs'
import InlineCode from './editor/inlineTool/inline-code.mjs';
import CodeTool from './editor/block/code.mjs';
import EditorjsList from './editor/block/editorjs-list.mjs';


const idIndexMap = {};



var editor = new EditorJS({

    holder: 'editorjs',
    tools: {
        header: { class: Header, inlineToolbar: true },

        embed: Embed,
        input: Input,
        checklist: {
            class: Checklist,
            inlineToolbar: true,
        },
        image: SimpleImage,
        button: {
            class: Button,
        },
        list: {
            class: EditorjsList,
            inlineToolbar: true,
            config: {
                defaultStyle: 'unordered'
            },
        },
        code: CodeTool,
        mark: {
            class: MarkerTool,
            shortcut: 'CMD+M',
        },
        inlineCode: {
            class: InlineCode,
            shortcut: 'CMD+SHIFT+M',
        },
        myTune: {
            class: MyBlockTune,
            data: { doc: document },

        },

    },
    tunes: ['myTune']

})


console.log('editor', editor)
window.DRAPI.saveFile((dataDir) => {
    console.log('saveFile')
    editor.clear()
    editor.save().then((outputData) => {
        console.log
            ('文章数据：', outputData);
        //writeFile(dataDir, JSON.stringify(outputData))
        console.log(dataDir);
        window.DRAPI.write(dataDir, JSON.stringify(outputData)).then(() => {
            console.log('File written successfully.');
        }).catch((error) => {
            console.log('写入文件失败：', error);
        });

    }).catch((error) => {
        console.log('保存失败：', error)
    });
}
)

window.DRAPI.recoverFile((dataDir) => {
    window.DRAPI.read(dataDir).then((outputData) => {
        console.log('读取文件成功：', outputData);
        const data = JSON.parse(outputData);
        console.log(data);

        editor.destroy()
        // 在这里处理读取到的数据
        editor = new EditorJS({

            holder: 'editorjs',
            tools: {
                header: { class: Header, inlineToolbar: true },

                embed: Embed,
                input: Input,
                checklist: {
                    class: Checklist,
                    inlineToolbar: true,
                },
                image: SimpleImage,
                button: {
                    class: Button,
                    data: {}
                },
                list: {
                    class: EditorjsList,
                    inlineToolbar: true,
                    config: {
                        defaultStyle: 'unordered'
                    },
                },
                code: CodeTool,
                mark: {
                    class: MarkerTool,
                    shortcut: 'CMD+M',
                },
                inlineCode: {
                    class: InlineCode,
                    shortcut: 'CMD+SHIFT+M',
                },
                myTune: MyBlockTune,

            },
            tunes: ['myTune'],
            data: data


        })
    }).catch((error) => {
        console.log('读取文件失败：', error);
    });
}
)

window.DRAPI.openFile((dataDir) => {
    window.DRAPI.read(dataDir).then((outputData) => {
        console.log('读取文件成功：', outputData);
        const data = JSON.parse(outputData);
        console.log(data);

        editor.destroy()
        // 在这里处理读取到的数据
        editor = new EditorJS({

            holder: 'editorjs',
            tools: {
                header: { class: Header, inlineToolbar: true },

                embed: Embed,
                input: Input,
                checklist: {
                    class: Checklist,
                    inlineToolbar: true,
                },
                image: SimpleImage,
                button: {
                    class: Button,
                    data: {}
                },
                list: {
                    class: EditorjsList,
                    inlineToolbar: true,
                    config: {
                        defaultStyle: 'unordered'
                    },
                },
                code: CodeTool,
                mark: {
                    class: MarkerTool,
                    shortcut: 'CMD+M',
                },
                inlineCode: {
                    class: InlineCode,
                    shortcut: 'CMD+SHIFT+M',
                },
                myTune: MyBlockTune,

            },
            tunes: ['myTune'],
            data: data


        })
    }).catch((error) => {
        console.log('读取文件失败：', error);
    });
})

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
        const id = editor.blocks.getBlockByIndex(editor.blocks.getCurrentBlockIndex()).id
        console.log(editor.blocks.getBlockByIndex(editor.blocks.getCurrentBlockIndex()))
        console.log('id', id)
        getBlockIndexByID(id).then((index) => {
            console.log('index', index)
        })
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


//建立id与index映射
async function buildIdIndexMap(editor) {
    return editor.save().then((outputData) => {
        for (let i = 0; i < outputData.blocks.length; i++) {
            const block = outputData.blocks[i];
            // 将id与index映射保存到全局变量中
            idIndexMap[block.id] = i;
        }
    }).catch((error) => {
        console.log('保存失败：', error)
    });
}

async function getBlockIndexByID(id) {

    await buildIdIndexMap(editor);
    if (idIndexMap[id] !== undefined) {
        return idIndexMap[id];
    } else {
        console.log('id not found in idIndexMap');
        return -1;
    }


}


//侧边栏
const property = document.getElementById('property');
const event = document.getElementById('event');
property.addEventListener('click', () => {
    property.style.backgroundColor = '#575757';
    event.style.backgroundColor = '#6c6c6c';
    showProperty();
})
event.addEventListener('click', () => {
    property.style.backgroundColor = '#6c6c6c';
    event.style.backgroundColor = '#575757';
    showEvent();
})

function showProperty() {
    const propertyContent = document.getElementById('property-content');
    const eventContent = document.getElementById('event-content');
    propertyContent.style.display = 'block';
    eventContent.style.display = 'none';
}
function showEvent() {
    const propertyContent = document.getElementById('property-content');
    const eventContent = document.getElementById('event-content');
    propertyContent.style.display = 'none';
    eventContent.style.display = 'block';
}