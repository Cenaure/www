import {makeAutoObservable} from "mobx";
import fetchAllOrders from "../components/axios-components/order/fetchAllOrders";

export default class orderStore {
    constructor(){
        this._orders = []
        makeAutoObservable(this);
    }

    setOrders(orders){ this._orders = orders; }

    get orders() { return this._orders; }

    async updateOrders() {
        const orders = await fetchAllOrders();
        this.setOrders([...orders])
    }
}