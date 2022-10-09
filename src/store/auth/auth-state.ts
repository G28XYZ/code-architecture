import { action, observable } from "mobx";
import StateModule from "../module";

/**
 * Состояние авторизации
 */
class AuthState extends StateModule {
  @observable email: string = "";
  @observable password: string = "";
  @observable token: string = "";
  @observable waiting: boolean = false;

  /**
   * Начальное состояние
   * @return {Object}
   * PS - можно так объявить стейт и пробовать через редакс или контекст изменять стейт и тд
   * а можно использовать мобикс объявляя все поля как выше
   */
  initState() {
    return this;
  }

  @action setForm(name: string, value: string) {
    name === "email" && (this.email = value);
    name === "password" && (this.password = value);
    this.setState({ ...this }, `Изменения в инпут - ${name}`);
  }

  /**
   * Авторизация
   */
  async auth() {
    this.waiting = true;
    this.setState({ ...this }, "Ожидание авторизации");

    try {
      const response = await this.services.api.request({
        url: "/signin",
        method: "POST",
        body: JSON.stringify({ email: this.email, password: this.password }),
      });
      this.token = response.error ? "error" : JSON.parse(response).token;
      this.waiting = false;
      this.setState({ ...this }, "Записать результат");
    } catch (e) {
      this.waiting = false;
      this.setState({ ...this }, "Ошибка авторизации");
    }
  }

  clearForm() {
    this.password = "";
    this.email = "";
    this.setState({ ...this }, "Очистка формы");
  }
}

export default AuthState;
