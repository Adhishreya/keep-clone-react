import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./firebase/config.js";
import App from "./App";
import Main from "./Main.js";
import * as serviceWorker from './serviceWorker';

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Main />
  </StrictMode>,
  rootElement
);
