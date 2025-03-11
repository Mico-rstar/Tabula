
//msgHandlers
export const messageHandlers = {//消息处理函数
    //处理服务端发送的消息
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
            window.parent.DRAPI.emit("confirm" + data.requestId, data);
        }
    }
};

//确认消息
function confirm(ws, requestId) {
    ws.send(JSON.stringify({
        type: "confirm",
        requestId: requestId
    }))
}