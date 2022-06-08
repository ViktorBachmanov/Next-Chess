import Tables from "./tables/Tables";
import Theme from "./theme/Theme";
import Auth from "./auth/Auth";

export default class RootStore {
  public tables: Tables | null = null;
  public theme: Theme;
  public auth: Auth;

  constructor() {
    this.tables;
    this.theme = new Theme();
    this.auth = new Auth();
  }
}
