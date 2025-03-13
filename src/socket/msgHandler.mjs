import { getBlockIndexByID } from "../utils/IndexRId.mjs";

//msgHandlers
export const messageHandlers = {//消息处理函数
    //处理服务端发送的消息
    "test": (data, ws) => {
        console.log('处理 test 消息:', data);
    },
    "getBlockID": (data, ws) => {
        console.log('处理 getBlockID 消息:', data);
        const id = window.parent.editor.blocks.getBlockByIndex(window.parent.editor.blocks.getCurrentBlockIndex()).id;
        if (id)
            confirm(ws, data.requestId, { "status": "1", "id": id });
        else confirm(ws, data.requestId, { "status": "0", "err_msg": "get block id fail" });
    },

    "insertAfter": (data, ws) => {
        console.log('处理 insertAfter 消息:', data);
        if (data.id) {
            const index = getBlockIndexByID(data.id, window.parent.editor);
            if (data.blockType && data.data) {
                window.parent.editor.blocks.insert(data.blockType, data.data, {}, index, true);
                confirm(ws, data.requestId, { "status": "1" });
            } else confirm(ws, data.requestId, { "status": "0", "err_msg": "缺少参数" });
        } else confirm(ws, data.requestId, { "status": "0", "err_msg": "id is null" });
    },

    "update": (data, ws) => {
        console.log('处理 update 消息:', data);
        if (data.id) {
            if (data.data) {
                window.parent.editor.blocks.update(id, data.data);
                confirm(ws, data.requestId, { "status": "1" });
            } else confirm(ws, data.requestId, { "status": "0", "err_msg": "缺少参数" });
        } else confirm(ws, data.requestId, { "status": "0", "err_msg": "id is null" });
    },

    "confirm": (data, ws) => {
        console.log('处理服务端回复消息:', data);
        // 清除已处理的消息
        if (data.requestId) {
            window.parent.DRAPI.emit("confirm" + data.requestId, data);
        }
    }


};

//确认消息
function confirm(ws, requestId, data) {
    ws.send(JSON.stringify({
        type: "confirm",
        requestId: requestId,
        data: data
    }))
}