import { makeObservable, observable, action } from "mobx";

export default class Auth {
  private _token: string = "";

  constructor() {
    makeObservable<Auth, "_token">(this, {
      _token: observable,
      setToken: action,
    });
  }

  public get token() {
    return this._token;
  }

  public setToken(val: string) {
    this._token = val;
  }
}
