import { makeAutoObservable } from "mobx";

export default class serverError {
  constructor() {
    this._serverE = "";
    makeAutoObservable(this);
  }

  setServerE = (e) => {
    this._serverE = e;
  }

  get serverE() { return this._serverE; }
}
