import { clearPendingMessage } from "./sender.mjs";
//msgHandlers
export const messageHandlers = {
    "test": (data, ws, editor) => {
        console.log('处理 test 消息:', data);
    },
    "getBlockID": (data, ws, editor) => {
        console.log('处理 getBlockID 消息:', data);
        const id = editor.blocks.getBlockByIndex(editor.blocks.getCurrentBlockIndex()).id
        confirm(ws, data.requestId)
    },
    "confirm": (data, ws, editor) => {
        console.log('处理服务端回复消息:', data);
        // 清除已处理的消息
        if (data.requestId) {
            clearPendingMessage(data.requestId);
        }
    }
};



function confirm(ws, requestId) {
    ws.send(JSON.stringify({
        type: "confirm",
        requestId: requestId
    }))
}