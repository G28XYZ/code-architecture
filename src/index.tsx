import ReactDOM from "react-dom/client";
import "core-js";
import App from "./app";
import "./index.scss";
import Services from "./services";
import config from "./config";
import ServiceProvider from "./provider";

const services = new Services(config);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ServiceProvider services={services}>
    <App />
  </ServiceProvider>
);
