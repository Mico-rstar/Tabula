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

    callback(event) {
        console.log("ImgAPI", "recieve");
        this.callRunner(event);

    }

}