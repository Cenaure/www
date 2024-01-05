import {makeAutoObservable} from "mobx";

class deviceStore {
    constructor(){
        this._devices = []
        makeAutoObservable(this);
    }

    setDevices(devices){ this._devices = devices; }

    get Devices() { return this._devices; }
}

export default deviceStore