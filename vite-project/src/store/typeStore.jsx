import {makeAutoObservable} from "mobx";
import fetchTypes from "../components/axios-components/types/fetchTypes";

export default class typeStore {
    constructor(){
        this._types = []
        makeAutoObservable(this);
    }

    setTypes(types){ this._types = types; }

    get types() { return this._types; }

    async updateTypes() {
        const types = await fetchTypes();
        this.setTypes([...types])
    }    
}