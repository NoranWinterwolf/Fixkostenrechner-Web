"use strict";

////////////////////////////////////////////////////////
//
// Translation-Engine for translate the marked words 
// in the templates.
//
////////////////////////////////////////////////////////

export default class Bash_Translator{
    constructor(...languages){
        // Register all languages in the translator
        for(const lang of languages){
            this[lang] = Bash_Language[lang];
        }
    }
    // This function gets a key and the desired language and returns the value
    t(key, language = window.bash.system.currentLang){
        return this[language][key];
    }
}

let Bash_Language = {};
////////////////////////////////////////////////////////
// English translation
////////////////////////////////////////////////////////
Bash_Language.en = {
    //Settings
    language: "Language",
    german: "German",
    english: "English",

    //Login
    userplaceholder: "Your Username",
    passwordplaceholder: "Your Password"
};
////////////////////////////////////////////////////////
// German translation
////////////////////////////////////////////////////////
Bash_Language.de = {
    //Settings
    language: "Sprache",
    german: "Deutsch",
    english: "Englisch",

    //Login
    userplaceholder: "Dein Benutzername",
    passwordplaceholder: "Dein Passwort"
};