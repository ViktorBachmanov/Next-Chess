import { makeObservable, observable, computed, action, flow } from "mobx";

export default class Auth {
  private _loginStatus: boolean = false;

  constructor() {
    makeObservable<Auth, "_loginStatus">(this, {
      _loginStatus: observable,
      setLoginStatus: action,
    });
  }

  public get loginStatus() {
    return this._loginStatus;
  }

  public setLoginStatus(val: boolean) {
    this._loginStatus = val;
  }
}
