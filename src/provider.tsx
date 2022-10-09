import React from "react";
import propTypes from "prop-types";
import { useLocalObservable } from "mobx-react-lite";

/**
 * Контекст для Services
 * @type {React.Context<{}>}
 */
export const ServicesContext = React.createContext({});

/**
 * Провайдер Services.
 */
function ServicesProvider({ services, children }: any) {
  const store = useLocalObservable(() => services);
  return <ServicesContext.Provider value={store}>{children}</ServicesContext.Provider>;
}

ServicesProvider.propTypes = {
  services: propTypes.object.isRequired,
  children: propTypes.oneOfType([propTypes.arrayOf(propTypes.node), propTypes.node]).isRequired,
};

export default React.memo(ServicesProvider);
