import {makeAutoObservable} from "mobx";

export default class brandStore {
    constructor(){
        this._brands = [
            {id: 1, name: 'b1'},
            {id: 2, name: 'b2'}
        ]
        makeAutoObservable(this);
    }

    setBrands(brands){ this._brands = brands; }

    get Brands() { return this._brands; }
}