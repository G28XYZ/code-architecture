class StateModule {
  store: Record<string, any>;
  private config: Record<string, any>;
  services: Record<string, any>;
  /**
   * @param store {Store}
   * @param config {Object}
   */
  constructor(store: Record<string, any>, config: Record<string, any> = {}) {
    this.store = store;
    this.config = config;
    this.services = store.services;
  }

  defaultConfig() {
    return {};
  }

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {};
  }

  getState() {
    return this.store.getState()[this.config.name];
  }

  setState(newState: Record<string, any>, description = "setState") {
    this.store.setState(
      {
        ...this.store.getState(),
        [this.config.name]: newState,
      },
      description
    );
  }
}

export default StateModule;
