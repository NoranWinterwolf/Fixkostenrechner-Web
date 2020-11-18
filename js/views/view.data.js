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
        $("#navbar").css("visibility", "visible");
        window.bash.createListeners();
        let personID = this.getPersonID();
        console.log(personID);
        this.renderIncomes(personID);
        this.renderOutgoings(personID);
    }

    renderIncomes(personID){
        window.bash.api.getIncomes(personID, function(result){
            if (result !== "noData"){
                let incomes = JSON.parse(result);
                let tableData = "";

                /// Build Income table ///
                for (let i = 0; i < incomes.length; i++){
                    tableData += "<tr id="+incomes[i].incomeId+">";
                    tableData += "<td>"+incomes[i].incomeName+"</td>";
                    tableData += "<td>"+incomes[i].value+"</td>";
                    tableData += "<td>"+getInterval(incomes[i].incomeInterval)+"</td>";
                    tableData += "</tr>";
                }
                // Done! Put the finished table-data into html
                $(".incomeData").html(tableData);
            }
        });

        function getInterval(intervalID){
            switch(parseInt(intervalID)){
                case 0:
                    return "täglich";
                case 1:
                    return "monatlich";
                case 2:
                    return "quartalsmäßig";
                case 3:
                    return "jährlich";
            }
        }
    }

    renderOutgoings(personID){
        window.bash.api.getOutgoings(personID, function(result){
            console.log(result);
            if (result !== "noData"){
                let outgoings = JSON.parse(result);
                let tableData = "";

                /// Build Income table ///
                for (let i = 0; i < outgoings.length; i++){
                    tableData += "<tr id="+outgoings[i].outgoingId+">";
                    tableData += "<td>"+outgoings[i].outgoingName+"</td>";
                    tableData += "<td>"+outgoings[i].value+"</td>";
                    tableData += "<td>"+getInterval(outgoings[i].outgoingInterval)+"</td>";
                    tableData += "</tr>";
                }
                // Done! Put the finished table-data into html
                $(".outgoingData").html(tableData);
            }
        });

        function getInterval(intervalID){
            switch(parseInt(intervalID)){
                case 0:
                    return "täglich";
                case 1:
                    return "monatlich";
                case 2:
                    return "quartalsmäßig";
                case 3:
                    return "jährlich";
            }
        }
    }

    getPersonID() {
        return window.location.hash.substr(window.location.hash.indexOf('=') + 1);
    }
}