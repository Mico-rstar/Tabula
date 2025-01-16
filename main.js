// main.js

// Modules to control application life and create native browser window
import { app, BrowserWindow } from 'electron'
import path from 'node:path'

const __filename = new URL(import.meta.url).pathname
const __dirname = path.dirname(__filename)
console.log(__dirname)
console.log(path.resolve('D:\\Desktop\\project\\Tabula', 'preload.mjs'))



const createWindow = () => {
    // Create the browser window.
    console.log('createWindow')
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        webPreferences: {
            preload: path.resolve('D:\\Desktop\\project\\Tabula', 'preload.mjs'),
            nodeIntegration: true, // 确保 nodeIntegration 设置为 true
            contextIsolation: false,
            sandbox: false
        }
    })

    // 加载 index.html
    mainWindow.loadFile('index.html')
    mainWindow.on('ready-to-show', () => {
        mainWindow.show()
    })

    // 打开开发工具
    mainWindow.webContents.openDevTools()
}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        // 在 macOS 系统内, 如果没有已开启的应用窗口
        // 点击托盘图标时通常会重新创建一个新窗口
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态, 
// 直到用户使用 Cmd + Q 明确退出
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// 在当前文件中你可以引入所有的主进程代码
// 也可以拆分成几个文件，然后用 require 导入。