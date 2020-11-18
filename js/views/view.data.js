"use strict";

////////////////////////////////////////////////////////
//
//  Page for showing income and outcome data from person
//  This page shows detailed informations
//
////////////////////////////////////////////////////////

import Bash_Route from "../bash/bash-spa-route.js";

export default class DataView extends Bash_Route{
    constructor(slug, template){
        super(slug, template);
    }

    init(){
        if(!window.bash.utils.getCookie("user")) {
            window.location.hash = "/login";
        }
        console.log("data");
    }
}