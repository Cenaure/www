import {makeAutoObservable} from "mobx";

export default class typeStore {
    constructor(){
        this._types = [
            {id: 1, name: 't1'},
            {id: 2, name: 't2'}
        ]
        makeAutoObservable(this);
    }

    setTypes(types){ this._types = types; }

    get Types() { return this._types; }
}