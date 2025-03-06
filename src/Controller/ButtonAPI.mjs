export class ButtonAPI {

    constructor(fun) {
        this.callRunner = fun;
        this.id;
    }

    setClickListener(editor, id) {
        this.id = id;
        editor.blocks.getById(id).call('setClickListener', this);
    }

    callback(event) {
        console.log("ButtonAPI", "recieve");
        this.callRunner(event);

    }

}