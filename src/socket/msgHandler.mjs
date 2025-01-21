

//msgHandlers
export const messageHandlers = {
    "test": (data, ws, editor) => {
        console.log('处理 test 消息:', data);
    },
    "getBlockID": (data, ws, editor) => {
        console.log('处理 getBlockID 消息:', data);
        const id = editor.blocks.getBlockByIndex(editor.blocks.getCurrentBlockIndex()).id
        ws.send(JSON.stringify({
            type: "reply",
            data: id,
            requestId: data.requestId
        }))
    },
    "reply": (data, ws, editor) => {
        console.log('处理服务端回复消息:', data);
    }
};