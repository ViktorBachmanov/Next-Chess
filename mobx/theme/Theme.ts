import { LightStatus } from "./types";
import { Storage } from "../../constants";
import { makeObservable, observable, computed, action, flow } from "mobx";

export default class Theme {
  private _lightStatus: LightStatus;

  //constructor(lightMode: LightStatus) {
  constructor() {
    this._lightStatus = LightStatus.DARK;

    //console.log(this._lightStatus);

    makeObservable<Theme, "_lightStatus">(this, {
      _lightStatus: observable,
      setLightStatus: action,
    });
  }

  get lightStatus() {
    //console.log("get lightStatus: ", this._lightStatus);
    return this._lightStatus;
  }

  public setLightStatus(val: LightStatus) {
    //console.log("setLightStatus: ", val);
    this._lightStatus = val;
  }
}
