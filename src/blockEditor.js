
import EditorJS from './editor/editorjs.mjs';
import Header from './editor/header.mjs';
import Embed from './editor/embed.mjs';
import SimpleImage from "./editor/simple-image.mjs";
import Checklist from './editor/checklist.mjs'
const editor = new EditorJS({
    holder: 'editorjs',
    tools: {
        header: Header,
        image: SimpleImage,
        embed: Embed,
        checklist: {
            class: Checklist,
            inlineToolbar: true,
        }

    }


})


document.addEventListener('DOMContentLoaded', async () => {

});

