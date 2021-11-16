import React from 'react';
import ReactDOM from 'react-dom';
import './assets/main.css';
import './assets/mystyle.css';
import './assets/hover.css'
import App from './App';

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import zh from "./locales/zh";
import kh from "./locales/kh";
import en from "./locales/en";

import Cookies from 'universal-cookie';

const cookies = new Cookies();

i18n.use(initReactI18next).init({
  resources: {
    en,
    kh,
    zh,
  },
  lng: cookies.get("lang") || "en",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);