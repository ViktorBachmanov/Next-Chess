import Tables from "./tables/Tables";
import Theme from "./theme/Theme";

export default class RootStore {
  public tables: Tables;
  public theme: Theme;

  constructor(tables: Tables, theme: Theme) {
    this.tables = tables;
    this.theme = theme;
  }
}
