export class ImgAPI {

    constructor(fun) {
        this.callRunner = fun;
        this.id;
    }

    setLoadListener(editor, id) {
        this.id = id;
        editor.blocks.getById(id).call('setLoadListener', this);
    }

    setClickListener(editor, id) {
        this.id = id;
        editor.blocks.getById(id).call('setClickListener', this);
    }

    removeLoadListener(editor, id) {
        editor.blocks.getById(id).call('removeLoadListener', this);
    }

    removeClickListener(editor, id) {
        editor.blocks.getById(id).call('removeClickListener', this);
    }

    callback(event) {
        console.log("ImgAPI", "recieve");
        this.callRunner(event);

    }

}