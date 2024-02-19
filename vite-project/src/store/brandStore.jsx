import {makeAutoObservable} from "mobx";
import fetchBrands from "../components/axios-components/brands/fetchBrands";

export default class brandStore {
    constructor(){
        this._brands = []
        makeAutoObservable(this);
    }

    setBrands(brands){ this._brands = brands; }

    get brands() { return this._brands; }

    async updateBrands() {
        const brands = await fetchBrands();
        this.setBrands([...brands])
    }
}