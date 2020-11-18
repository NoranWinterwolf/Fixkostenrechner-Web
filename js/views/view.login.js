"use strict";

////////////////////////////////////////////////////////
//
//  Login Page, does what it says
//
////////////////////////////////////////////////////////
import Bash_Route from "../bash/bash-spa-route.js";

// Have to extend Bash_Route
export default class LoginView extends Bash_Route{
 constructor(slug, template){
     super(slug, template);
 }

 // OVERWRITE
 init() {
     // If user have no cookie, start login
    if (!window.bash.utils.getCookie("user")){
        $("#login").unbind("click").on("click", function(){
            let username = $("#username").val();
            let password = $("#password").val();
            window.bash.api.login(username, password, function(mySQLResult){
                console.log(mySQLResult);
            // If api returns NOT 'noMatch' login was successful
            if (mySQLResult !== "noMatch"){
                // set a cookie with userdata to work with
                window.bash.utils.setCookie("user", mySQLResult, 30);
                // redirect to the mainmenu
                window.location.hash = "/";
            } else {
                // if username is empty, make the border red
                if (username == "") {
                    $("#username").css("border-color", "red");
                } else {
                    $("#username").css("border-color", "#344152")
                }
                // if password is empty, red border
                if (password == "") {
                    $("#password").css("border-color", "red");
                } else {
                    $("#password").css("border-color", "#344152")
                }
                console.log("Login Error: " + mySQLResult);
            }
            });
        });
        // user is able to login with the 'enter'-key
        $(document).keyup(function(event){
            if (event.which === 13) {
                $("#login").click();
            }
        });
    }  
    }
}