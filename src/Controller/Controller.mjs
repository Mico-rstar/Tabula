import { ButtonAPI } from "./ButtonAPI.mjs";
import { InputAPI } from "./InputAPI.mjs";
import { ImgAPI } from "./ImgAPI.mjs";

export class Controller {
    constructor(fun) {
        this.buttonAPI = new ButtonAPI(fun);
        this.inputAPI = new InputAPI(fun);
        this.imgAPI = new ImgAPI(fun);

    }


}