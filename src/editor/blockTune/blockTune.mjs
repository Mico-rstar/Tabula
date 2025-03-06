import BlockSetting from '../../utils/BlockSetting.mjs'

class MyBlockTune {
    constructor({ api }) {
        this.api = api;
    }

    static get isTune() {
        return true;
    }

    // render() {

    //     const button = document.createElement('button');

    //     button.classList.add(this.api.styles.button);
    //     button.textContent = 'Workflows';

    //     button.addEventListener('click', () => {
    //         console.log('clicked');
    //         const sidebar = document.getElementById('sidebar');
    //         const content = document.getElementById('content');
    //         //弹出侧边栏
    //         sidebar.style.right = '0';
    //         content.style.marginRight = '300px';

    //         console.log(this);



    //         const mySetting = new BlockSetting(this.api);
    //     })

    //     return button;

    // }
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

                console.log("config", this.config);

                const mySetting = new BlockSetting(this.api);


            }
        }
    }
}

export default MyBlockTune;