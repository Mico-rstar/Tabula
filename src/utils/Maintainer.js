module.exports = Maintainer;
class Maintainer {
    constructor() {
        this.container = {};
        this.id = 0;
    }

    add(key, value) {
        this.container[key] = value;
    }

    remove(key) {
        delete this.container[key];
    }

    get() {
        return this.container;
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }


}

