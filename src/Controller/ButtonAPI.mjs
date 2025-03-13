export class ButtonAPI {

    constructor(fun) {
        this.callRunner = fun;
        this.id;
        this.bindId;
    }

    setClickListener(editor, id, bindId) {
        this.id = id;
        this.bindId = bindId;
        editor.blocks.getById(id).call('setClickListener', this);
    }

    removeClickListener(editor, id) {
        editor.blocks.getById(id).call('removeClickListener', this);
    }

    callback(event) {
        console.log("ButtonAPI", "recieve");
        this.callRunner(event);

    }

}