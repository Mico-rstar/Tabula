
import EditorJS from '../editor/editorjs.mjs';
import Header from '../editor/block/header.mjs';
import Button from '../editor/block/button.mjs';
import MarkerTool from '../editor/inlineTool/inlineTool.mjs';
import MyBlockTune from '../editor/blockTune/blockTune.mjs';
import Input from '../editor/block/input.mjs'
import InlineCode from '../editor/inlineTool/inline-code.mjs';
import EditorjsList from '../editor/block/editorjs-list.mjs';
import Embed from '../editor/block/embed.mjs';
import Checklist from '../editor/block/checklist.mjs'
import SimpleImage from '../editor/block/simple-image.mjs';
import { Controller } from '../Controller/Controller.mjs';
import { Runner } from '../Runner/Runner.mjs';
import MySocket from '../socket/MySocket.mjs';
import { createMenu, transDataToMenuData } from '../utils/Menu.mjs';
import { getBlockIndexByID } from '../utils/IndexRId.mjs'


const myRunner = new Runner();
//为controller绑定消息回调函数
const controller = new Controller(myRunner.callback);

// first define the tools to be made avaliable in the columns
let column_tools = {
    alert: Alert,
    delimiter: Delimiter,
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
    table: Table,
    Math: {
        class: EJLaTeX,
        shortcut: 'CMD+SHIFT+M'
    },
    list: {
        class: EditorjsList,
        inlineToolbar: true,
        config: {
            defaultStyle: 'unordered'
        },
    },
    code: editorjsCodeflask,
    mark: {
        class: MarkerTool,
        shortcut: 'CMD+M',
    },
    inlineCode: {
        class: InlineCode,
        shortcut: 'CMD+SHIFT+M',
    },
    myTune: {
        class: MyBlockTune

    }
}
const tools = {
    alert: Alert,
    delimiter: Delimiter,
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
    table: Table,
    Math: {
        class: EJLaTeX,
        shortcut: 'CMD+SHIFT+M'
    },
    list: {
        class: EditorjsList,
        inlineToolbar: true,
        config: {
            defaultStyle: 'unordered'
        },
    },
    code: editorjsCodeflask,
    mark: {
        class: MarkerTool,
        shortcut: 'CMD+M',
    },
    inlineCode: {
        class: InlineCode,
        shortcut: 'CMD+SHIFT+M',
    },
    myTune: {
        class: MyBlockTune

    },
    columns: {
        class: editorjsColumns,
        config: {
            EditorJsLibrary: EditorJS, // Pass the library instance to the columns instance.
            tools: column_tools, // IMPORTANT! ref the column_tools
            tunes: ['Tune']
        }
    }

};
var editor = new EditorJS({

    holder: 'editorjs',
    tools: tools,
    tunes: ['myTune'],

});







//WebSocket通信
const ws = new MySocket("ws://127.0.0.1:5200/");
ws.sendMsg({ type: 'test-from-client', data: {} }).then((data) => {
    console.log('服务端回复', data);
})

window.parent.ws = ws;
window.parent.DRAPI.emit('add-node');





function transOutputToMenuData(outputData) {
    var menuData = { name: 'Blocks', children: [] };
    for (let i = 0; i < outputData.blocks.length; i++) {
        menuData.children.push({
            name: i,
            children: transDataToMenuData(outputData.blocks[i].data, ['block[' + i.toString() + ']', 'data'], 'data')
        });
    }

    return menuData;
}



function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');

    if (sidebar.style.right === '-400px') {
        sidebar.style.right = '0';
        content.style.marginRight = '300px';
    } else {
        sidebar.style.right = '-400px';
        content.style.marginRight = '0';
    }
}
document.getElementById('sidebar-toggle-btn').addEventListener('click', toggleSidebar);

document.getElementById('property').style.backgroundColor = '#575757';
console.log('blockEditor.mjs loaded');








// 将 editor, controller, myRunner 挂载到全局对象
window.editor = editor;
window.controller = controller;
window.myRunner = myRunner;


window.parent.DRAPI.saveFile((dataDir) => {
    console.log('saveFile')
    const flowData = window.parent.flowMaintainer.save();
    console.log('flowData:', flowData);
    const composeData = { "editor": {}, "runner": window.myRunner.save(), "flowEditor": flowData.flowEditor, "flowContainer": flowData.flowContainer };
    console.log('composeData:', composeData);
    editor.save().then((outputData) => {
        composeData.editor = outputData;
        window.parent.DRAPI.write(dataDir, JSON.stringify(composeData)).then(() => {
            console.log('File written successfully.');
        }).catch((error) => {
            console.log('写入文件失败：', error);
        });

    }).catch((error) => {
        console.log('保存失败：', error)
    });
}
)

window.parent.DRAPI.recoverFile((dataDir) => {
    window.parent.DRAPI.read(dataDir).then((composeData) => {
        const data = JSON.parse(composeData);

        editor.destroy()
        console.log(data);
        // 在这里处理读取到的数据
        editor = new EditorJS({

            holder: 'editorjs',

            holder: 'editorjs',
            tools: tools,
            tunes: ['myTune'],
            data: data.editor


        })
        window.editor = editor;
        window.parent.flowMaintainer.recover(data.flowEditor, data.flowContainer);
        window.editor.isReady.then(() => {
            window.myRunner.recover(data.runner, window.controller, window.editor);
        });


    }).catch((error) => {
        console.log('读取文件失败：', error);
    });
}
)

window.parent.DRAPI.openFile((dataDir) => {
    window.parent.DRAPI.read(dataDir).then((outputData) => {
        console.log('读取文件成功：', outputData);
        const data = JSON.parse(outputData);
        console.log(data);

        editor.destroy()
        // 在这里处理读取到的数据
        editor = new EditorJS({

            holder: 'editorjs',
            tools: tools,
            tunes: ['myTune'],
            data: data.editor


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
        editor.blocks.insert("paragraph", { text: "hello world" }, {}, 0, true)
    });

    const getIDButton = document.getElementById('getID');
    getIDButton.addEventListener('click', async () => {
        console.log('getID')
        const id = editor.blocks.getBlockByIndex(editor.blocks.getCurrentBlockIndex()).id

        //console.log(editor.blocks.getBlockByIndex(editor.blocks.getCurrentBlockIndex()))
        //console.log(editor.blocks.getBlockByIndex(editor.blocks.getCurrentBlockIndex()))
        //console.log('id', editor.blocks.getById(id).call('setClickListener', controller));
        //console.log(controller.buttonAPI);
        //controller.buttonAPI.setClickListener(editor, id);
        //console.log(editor.blocks.getBlockByIndex(1))
        //editor.blocks.getBlockByIndex(1).selected = true;

        const defaultBlockData = await editor.blocks.composeBlockData("alert");
        console.log(defaultBlockData);
        // const index = await getBlockIndexByID(id, editor);
        // console.log(index, id);

        // ws.sendMsg({ type: 'test', data: {} }).then((data) => {
        //     console.log('服务端回复', data);
        // })


    });



    const argsInput = document.getElementById('args-input');
    let oldValue = argsInput.value; // 初始化旧值
    argsInput.addEventListener('input', function (event) {
        let newValue = event.target.value; // 获取新值
        let increment = ''; // 用来保存增量

        // 用户增加了内容
        increment = newValue.substring(oldValue.length);
        console.log(increment);
        const menuContainer = document.getElementById('menu');
        if (newValue.length > oldValue.length) {
            if (increment === '{') {

                editor.save().then((outputData) => {
                    console.log('args-input focus', outputData);
                    //将outputData转换为menuData的形式
                    console.log(transOutputToMenuData(outputData));

                    // 清空menu容器中的内容
                    menuContainer.innerHTML = '';

                    menuContainer.appendChild(createMenu(transOutputToMenuData(outputData)));
                });
            }
        } else if (newValue.length < oldValue.length) {

            menuContainer.innerHTML = '';
        }
        oldValue = newValue;
    });
});






