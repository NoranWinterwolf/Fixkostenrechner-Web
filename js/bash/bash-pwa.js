"use strict";

import Bash_SPA_Router from "./bash-spa-router.js";
import Bash_Utils from "./bash-utils.js";
import Bash_Translator from "./bash-translator.js";
import API from "./bash-api.js";

export default class bash_pwa {
    constructor(webRoot, templatesPath, routes, ...languages) {
        let defaultLanguage = this.getBrowserLanguage();
        ////// Bind the API access on window.bash.api ///////
        this.api = new API();
        ////// System-Variables ///////
        this.system = {
            webRoot: webRoot,
            templatesPath: templatesPath,
            currentLang: defaultLanguage,
            debugmode: true
        };
        //////// Translator-Module ////////
        this.translator = new Bash_Translator(...languages);
        /////// Bind this class on window.bash to easy access this ////////
        window.bash = this;
        ///////// Util template for helpful functions and Cookie-Access ///
        this.utils = new Bash_Utils();
        ///////// router-functions, bind on window.bash.router ////////////
        this.router = new Bash_SPA_Router(routes);
    }

    t(key, language){
        return(this.translator.t(key, language));
    }

    getBrowserLanguage() {
        let index = window.navigator.language.substring(0).indexOf('-');
        return window.navigator.language.substring(0, index);
    }

    createListeners() {
        // EventListener for navbar-buttons
        //Logout
        $("#logout").unbind("click").on("click", function() {
            $("#navbar").css("visibility", "hidden");
            window.bash.utils.deleteCookie("user");
            window.location.hash = "/login";
        }); 
        //Home
        $("#home").unbind("click").on("click", function() {
            window.location.hash = "/";
        });
    }
}