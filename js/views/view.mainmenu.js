"use strict";

import Bash_Route from "../bash/bash-spa-route.js";

////////////////////////////////////////////////////////
//
//  The main-view after login.
//  All persons which are connected
//  to the user account are shown in a list
//
////////////////////////////////////////////////////////

export default class MainMenuView extends Bash_Route{
    constructor(slug, template){
        super(slug, template);
        this.role = "user";
    }

    //OVERWRITE
    init(){
        if(!window.bash.utils.getCookie("user")) {
            window.location.hash = "/login";
        } else {
            this.renderView();
        }
    }

    renderView() {
        $("#navbar").css("visibility", "visible");
        window.bash.createListeners();
        let userID = JSON.parse(window.bash.utils.getCookie("user")).id;
        // call the API to get all persons from database from this userId
        window.bash.api.getPersons(userID, function(personData){
            let personJson = JSON.parse(personData);
            let tableData = "";
            // ONLY FOR TESTING //
            console.log(personJson);
            //////////////////////
            // build the table
            for (let i = 0; i < personJson.length; i++){
                tableData += "<tr id="+personJson[i].personId+">";
                tableData += "<td id=name"+personJson[i].personId+">"+ personJson[i].personName +"</td>";
                tableData += "<td id=incomes"+personJson[i].personId+">"+ personJson[i].incomeSum +"</td>";
                tableData += "<td id=outgoings"+personJson[i].personId+">"+ personJson[i].outgoingSum +"</td>";
                tableData += "<td id=diff"+personJson[i].personId+">"+(personJson[i].incomeSum - personJson[i].outgoingSum)+"</td>";
                tableData += "</tr>";
            }
            // if done write it in the html
            $(".personData").html(tableData);
            // Persons are clickable to access detailed informations
            $('tbody tr').unbind("click").on("click", function() {
            window.location.hash = "/data?personId=" + $(this).attr('id');
        })
        });
        
    }
}