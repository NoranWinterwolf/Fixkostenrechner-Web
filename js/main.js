"use strict";

import bash_pwa from './bash/bash-pwa.js';
import DataView from './views/view.data.js';
import LoginView from './views/view.login.js';
import MainMenuView from './views/view.mainmenu.js';

let routes = [
    new MainMenuView("/", "mainmenu"),
    new LoginView("/login", "login"),
    new DataView("/data", "data")
];

const Bash = new bash_pwa("http://127.0.0.1/fixkostenrechner/", "templates", routes, "de", "en");