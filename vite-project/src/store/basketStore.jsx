import {makeAutoObservable} from "mobx";
import getCart from "../components/axios-components/cart/getCart";

export default class basketStore {
  constructor(){
    this._isOpen = false;
    this._cart = {};
    makeAutoObservable(this);
  }

  setBasket(cart){ this._cart = cart; }
  setOpen(bool){ this._isOpen = bool; }

  get cart() { return this._cart; }
  get isOpen() { return this._isOpen; }

  async updateBasket(userId) {
    const cart = await getCart(userId)
    this.setBasket(cart)
  }
}