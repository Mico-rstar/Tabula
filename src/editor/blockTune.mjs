class MyBlockTune {
    constructor({ api }) {
        this.api = api;
    }

    static get isTune() {
        return true;
    }

    render() {
        /*
        const button = document.createElement('button');

        button.classList.add(this.api.styles.button);
        button.textContent = 'H';

        return button;
        */
        return {
            icon: '<svg>...</svg>',
            title: 'Workflows',
            children: {
                items: [
                    {
                        icon: '<svg>...</svg>',
                        title: 'test',
                        onActivate: () => { }
                    }
                ]
            }
        }
    }
}

export default MyBlockTune;