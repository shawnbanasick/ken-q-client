import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const xhttp = new XMLHttpRequest();
let data = {};

xhttp.onreadystatechange = function() {
  if (this.readyState === 4 && this.status === 200) {
    // grad json user settings and push to application state
    data = JSON.parse(xhttp.responseText);

    ReactDOM.render(<App {...data} />, document.getElementById('root'));
  }
};

xhttp.open('GET', `${process.env.PUBLIC_URL}/SETTINGS.json`, true);
xhttp.send();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

/*
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter } from "react-router-dom";
import state from "../src/store";

var xhttp = new XMLHttpRequest();
var data = {};

xhttp.onreadystatechange = function() {
  if (this.readyState === 4 && this.status === 200) {
    // grad json user settings and push to application state
    data = JSON.parse(xhttp.responseText);
    state.setState({
      // userSettings: data,
      statements: data.statementList
    });

    ReactDOM.render(
      <BrowserRouter>
        <App userData={data} />
      </BrowserRouter>,
      document.getElementById("root")
    );
  }
};

xhttp.open("GET", `${process.env.PUBLIC_URL}/SETTINGS.json`, true);
xhttp.send();

registerServiceWorker();

// hot module replacement
if (module.hot && process.env.NODE_ENV !== "production") {
  module.hot.accept();
}
*/
