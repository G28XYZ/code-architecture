import { action, observable, reaction, runInAction } from "mobx";
import StateModule from "../module";

/**
 * Состояние авторизации
 */
class CounterState extends StateModule {
  @observable value: number = 0;

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return this;
  }

  @action inc = () => {
    this.value++;
    runInAction(() => this.setState({ ...this }, "Increment"));
  };

  @action dec = () => {
    this.value--;
    runInAction(() => this.setState({ ...this }, "Decrement"));
  };
}

export default CounterState;
