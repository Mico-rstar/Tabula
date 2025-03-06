export class InputAPI {

    constructor(fun) {
        this.callRunner = fun;
        this.id;
    }

    setBlurListener(editor, id) {
        this.id = id;
        editor.blocks.getById(id).call('setBlurListener', this);
    }
    setFocusListener(editor, id) {
        this.id = id;
        editor.blocks.getById(id).call('setFocusListener', this);
    }
    setChangeListener(editor, id) {
        this.id = id;
        editor.blocks.getById(id).call('setChangeListener', this);
    }
    setInputListener(editor, id) {
        this.id = id;
        editor.blocks.getById(id).call('setInputListener', this);
    }

    callback(event) {
        console.log("InputAPI", "recieve");
        this.callRunner(event);
    }

}