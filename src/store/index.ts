import { createContext } from "react";
import * as m from "./exports";

const modules = m as Record<string, any>;

class Store {
  services: Record<string, any>;
  config: Record<string, any>;
  state: Record<string, any>;
  listeners: Record<string, any>;
  modules: Record<string, any>;
  /**
   * @param services {Services}
   * @param config {Object}
   */
  constructor(services: Record<string, any>, config: object = {}) {
    // Менеджер сервисов
    this.services = services;
    this.config = {
      log: false,
      ...config,
    };
    // Состояние приложения (данные)
    this.state = {};
    // Слушатели изменений state
    this.listeners = [];

    // Модули
    this.modules = {};
    for (const name of Object.keys(modules)) {
      // Экземпляр модуля. Передаём ему ссылку на store и название модуля.
      this.modules[name] = new modules[name](this, { name, ...(this.config.modules[name] || {}) });
      // По названию модуля устанавливается свойство с начальным состоянием от модуля
      this.state[name] = this.modules[name].initState();
    }
  }

  /**
   * Доступ к модулю состояния
   * @param name {String} Название модуля
   */
  get(name: string) {
    return this.modules[name];
  }

  /**
   * Выбор state
   * @return {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка state
   * @param newState {Object}
   * @param [description] {String} Описание действия для логирования
   */
  setState(newState: Record<string, any>, description = "setState") {
    if (this.config.log) {
      console.group(
        `%c${"store.setState"} %c${description}`,
        `color: ${"#777"}; font-weight: normal`,
        `color: ${"#1E90FF"}; font-weight: bold`
      );
      console.log(`%c${"prev:"}`, `color: ${"#d77332"}`, this.state);
      console.log(`%c${"next:"}`, `color: ${"#2fa827"}`, newState);
      console.groupEnd();
    }
    this.state = newState;
    // Оповещаем всех подписчиков об изменении state
    for (const listener of this.listeners as any) {
      listener();
    }
  }

  /**
   * Подписка на изменение state
   * @param callback {Function}
   * @return {Function} Функция для отписки
   */
  subscribe(callback: Record<string, any>) {
    this.listeners.push(callback);
    // Возвращаем функцию для удаления слушателя
    return () => {
      this.listeners = this.listeners.filter((item: Function) => item !== callback);
    };
  }
}

export default Store;
