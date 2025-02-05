
import file from 'node:fs/promises';
import path from 'node:path'
import url from 'url'
let __filename = url.fileURLToPath(import.meta.url)
let __dirname = path.dirname(__filename)

console.log('dirname', __dirname)
console.log('filename', __filename)
export const readFile = (filePath) => {
    return file.readFile(filePath, 'utf8');

};

export const writeFile = (filePath, data) => {
    return file.writeFile(filePath, data, 'utf8');
};

//测试
const filePath = path.resolve(__dirname, 'test.txt');
writeFile(filePath, 'Hello, World!').then(() => {
    console.log('File written successfully.');
});
readFile(filePath).then(data => {
    console.log(data);
});


