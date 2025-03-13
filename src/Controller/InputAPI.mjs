export class InputAPI {

    constructor(fun) {
        this.callRunner = fun;
        this.id;
        this.bindId;

    }

    setBlurListener(editor, id, bindId) {
        this.id = id;
        this.bindId = bindId;
        editor.blocks.getById(id).call('setBlurListener', this);
    }
    setFocusListener(editor, id, bindId) {
        this.id = id;
        this.bindId = bindId;
        editor.blocks.getById(id).call('setFocusListener', this);
    }
    setChangeListener(editor, id, bindId) {
        this.id = id;
        this.bindId = bindId;
        editor.blocks.getById(id).call('setChangeListener', this);
    }
    setInputListener(editor, id, bindId) {
        this.id = id;
        this.bindId = bindId;
        console.log("InputAPI", id);
        console.log(editor);
        editor.blocks.getById(id).call('setInputListener', this);
    }

    removeFocusListener(editor, id) {
        editor.blocks.getById(id).call('removeFocusListener', this);
    }

    removeBlurListener(editor, id) {
        editor.blocks.getById(id).call('removeBlurListener', this);
    }

    removeInputListener(editor, id) {
        editor.blocks.getById(id).call('removeInputListener', this);
    }

    removeChangeListener(editor, id) {
        editor.blocks.getById(id).call('removeChangeListener', this);
    }

    callback(event) {
        console.log("InputAPI", "recieve");
        this.callRunner(event);
    }

}