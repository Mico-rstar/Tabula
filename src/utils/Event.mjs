export class Event {
    eventTypes = [{ "name": "加载时", "type": "common-load" }];
};

export class ButtonEvent {
    eventTypes = [{ "name": "加载时", "type": "common-load" }, { "name": "点击", "type": "click" }];
};

export class InputEvent {
    eventTypes = [{ "name": "加载时", "type": "common-load" }, { "name": "输入", "type": "input" }, { "name": "改变", "type": "change" }, { "name": "失去焦点", "type": "blur" }, { "name": "获得焦点", "type": "focus" }];

};

export class ImgEvent {
    eventTypes = [{ "name": "加载时", "type": "common-load" }, { "name": "点击", "type": "click" }];
};