class MyBlockTune {
    constructor({ data: d, api }) {
        this.api = api;
        this.data = d;
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
            onActivate: () => {
                console.log('clicked');
                const sidebar = document.getElementById('sidebar');
                const content = document.getElementById('content');
                //弹出侧边栏
                sidebar.style.right = '0';
                content.style.marginRight = '300px';
            }
        }
    }
}

export default MyBlockTune;