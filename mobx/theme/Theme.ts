import { LightStatus } from "./types";
import { Storage } from "../../constants";
import { makeObservable, observable, computed, action, flow } from "mobx";

export default class Theme {
  private _lightStatus: LightStatus;

  constructor() {
    this._lightStatus = LightStatus.DARK;

    makeObservable<Theme, "_lightStatus">(this, {
      _lightStatus: observable,
      setLightStatus: action,
    });
  }

  get lightStatus() {
    return this._lightStatus;
  }

  public setLightStatus(val: LightStatus) {
    //console.log("MobX setLightStatus: ", val);
    this._lightStatus = val;
  }
}
