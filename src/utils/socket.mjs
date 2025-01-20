// socket.mjs
const ws = new WebSocket("ws://127.0.0.1:8888/");

ws.onopen = function (event) {
    console.log('websocket已连接');
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

export { ws, sendMessage };