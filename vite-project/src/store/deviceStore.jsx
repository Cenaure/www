import {makeAutoObservable} from "mobx";
import fetchDevicesByType from "../components/axios-components/devices/fetchAllDevices";

export default class deviceStore {
    constructor(){
        this._devices = []
        makeAutoObservable(this);
    }

    setDevices(devices){ this._devices = devices; }

    get devices() { return this._devices; }

    async updateDevices() {
        const devices = await fetchDevicesByType();
        this.setDevices(devices);
    }
}
    