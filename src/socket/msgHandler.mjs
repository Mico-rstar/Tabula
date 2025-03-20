import { getBlockIndexByID } from "../utils/IndexRId.mjs";

//msgHandlers
export const messageHandlers = {//消息处理函数
    //处理服务端发送的消息
    "test": async (data, ws) => {
        console.log('处理 test 消息:', data, ws);
        confirm(ws, data.requestId, { "status": "1" });
    },
    "getBlockID": async (data, ws) => {
        console.log('处理 getBlockID 消息:', data);
        console.log(window);
        const id = window.editor.blocks.getBlockByIndex(window.editor.blocks.getCurrentBlockIndex()).id;
        if (id)
            confirm(ws, data.requestId, { "status": "1", "id": id });
        else confirm(ws, data.requestId, { "status": "0", "err_msg": "get block id fail" });
    },

    "insertBefore": async (data, ws) => {
        console.log('处理 insertBefore 消息:', data);
        if (data.id) {
            const index = await getBlockIndexByID(data.id, window.editor);
            console.log("insert before ", index)
            if (data.blockType && data.data) {
                window.editor.blocks.insert(data.blockType, data.data, {}, index, true);
                confirm(ws, data.requestId, { "status": "1" });
            } else confirm(ws, data.requestId, { "status": "0", "err_msg": "缺少参数" });
        } else confirm(ws, data.requestId, { "status": "0", "err_msg": "id is null" });
    },

    "update": async (data, ws) => {
        console.log('处理 update 消息:', data);
        if (data.id) {
            if (data.data) {
                window.editor.blocks.update(id, data.data);
                confirm(ws, data.requestId, { "status": "1" });
            } else confirm(ws, data.requestId, { "status": "0", "err_msg": "缺少参数" });
        } else confirm(ws, data.requestId, { "status": "0", "err_msg": "id is null" });
    },

    "confirm": async (data, ws) => {
        console.log('处理服务端回复消息:', data);
        // 清除已处理的消息
        if (data.requestId) {
            window.parent.DRAPI.emit("confirm" + data.requestId, data);
        }
    },

    "*": async (data, ws) => { // 默认处理函数
        console.log('未知消息类型:', data);
        confirm(ws, data.requestId, { "status": "0", "err_msg": "未知消息类型" });
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