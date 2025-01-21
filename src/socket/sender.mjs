const pendingMessages = new Map();
export function sendMessageWithRetry(ws, message, retries = 3, delay = 1000) {
    console.log('test-ws', ws)

    const requestId = Date.now() + Math.random().toString(36).substr(2, 9);
    const messageWithId = { ...message, requestId };

    ws.send(JSON.stringify(messageWithId));

    const timeout = setTimeout(() => {
        if (retries > 0) {
            console.log(`重试发送消息: ${requestId}, 剩余重试次数: ${retries}`);
            sendMessageWithRetry(ws, message, retries - 1, delay);
        } else {
            console.log(`消息发送失败: ${requestId}`);
        }
    }, delay);

    pendingMessages.set(requestId, { timeout });
}

export function clearPendingMessage(requestId) {
    if (pendingMessages.has(requestId)) {
        clearTimeout(pendingMessages.get(requestId).timeout);
        pendingMessages.delete(requestId);
    }
}