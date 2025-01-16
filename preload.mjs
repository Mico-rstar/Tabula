// preload.js
console.log('Exposing blocksuite to window');
import { contextBridge, ipcRenderer } from "electron"





console.log('Exposing blocksuite to window');
contextBridge.exposeInMainWorld('DRAPI', {
    // create: () => createEmptyDoc,
    // editor: () => PageEditor,
    // text: () => Text
    node: () => process.versions.node,
    saveFile: (callback) => ipcRenderer.on('save-file', (event, value) => callback(value))

});




