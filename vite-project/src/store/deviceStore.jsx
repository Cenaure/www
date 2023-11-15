import {makeAutoObservable} from "mobx";

export default class deviceStore {
    constructor(){
        this._devices = [
            {id: 1, name: 'd1'},
            {id: 2, name: 'd2'}
        ]
        makeAutoObservable(this);
    }

    setDevices(devices){ this._devices = devices; }

    get Devices() { return this._devices; }
}