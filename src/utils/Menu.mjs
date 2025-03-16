export function createMenu(data) {
    const menu = document.createElement('div');
    menu.className = 'menu';

    function createMenuItem(item, level = 0) {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';

        const itemName = document.createElement('span');
        itemName.textContent = item.name;
        menuItem.appendChild(itemName);

        if (item.children && item.children.length > 0) {
            const toggleIcon = document.createElement('span');
            toggleIcon.className = 'toggle-icon'; // 添加类名
            toggleIcon.textContent = '▶';
            menuItem.appendChild(toggleIcon);

            const subMenu = document.createElement('div');
            subMenu.className = 'sub-menu';

            item.children.forEach(child => {
                subMenu.appendChild(createMenuItem(child, level + 1));
            });

            menuItem.appendChild(subMenu);

            toggleIcon.addEventListener('click', () => {
                subMenu.style.display = subMenu.style.display === 'block' ? 'none' : 'block';
                console.log('Clicked on menu item:', item.name);
                // 切换旋转状态
                toggleIcon.classList.toggle('rotated');
            });
        } else {
            menuItem.addEventListener('click', () => {
                //window.location.href = item.url;
                const argsInput = document.getElementById('args-input');
                argsInput.value = argsInput.value + item.url + "}";
                document.getElementById('menu').innerHTML = '';

            });
        }

        return menuItem;
    }

    data.children.forEach(child => {
        menu.appendChild(createMenuItem(child));
    });

    return menu;
}



export function transDataToMenuData(data, path, prekey) {
    // 截止条件：data不是数组也不是对象，或者data为空
    //console.log(typeof data);
    //console.log(data);
    var menuData = [];
    if (typeof data !== 'object' || data === null) {

        return [{ "name": prekey, "url": path.join('.') }];
    }

    //console.log(typeof data, data);
    // 遍历data对象
    if (!Array.isArray(data)) {
        for (let key in data) {
            const value = data[key];

            const mid = transDataToMenuData(value, path.concat(key), key);
            if (mid.length == 1)
                menuData.push(mid[0]);
            else menuData.push({ "name": key, "children": mid });

        }
    } else {
        //console.log('数组', data);
        data.forEach((item, index) => {
            path[path.length - 1] += '[' + index.toString() + ']';
            const middata = transDataToMenuData(item, path, prekey + index.toString());
            /*
            middata.forEach(mid => {
                menuData.push(mid);
            })
                */
            menuData.push({ "name": index, "children": middata });
        });
    }

    return menuData;
}
