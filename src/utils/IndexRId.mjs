const idIndexMap = {};

//建立id与index映射
async function buildIdIndexMap(editor) {
    return editor.save().then((outputData) => {
        for (let i = 0; i < outputData.blocks.length; i++) {
            const block = outputData.blocks[i];
            // 将id与index映射保存到全局变量中
            idIndexMap[block.id] = i;
        }
    }).catch((error) => {
        console.log('保存失败：', error)
    });
}

export async function getBlockIndexByID(id, editor) {

    await buildIdIndexMap(editor);
    console.log('idIndexMap:', idIndexMap);
    if (idIndexMap[id] !== undefined) {
        return idIndexMap[id];
    } else {
        console.log('id not found in idIndexMap');
        return -1;
    }


}
