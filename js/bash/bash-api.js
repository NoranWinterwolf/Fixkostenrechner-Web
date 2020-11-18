"use strict";

////////////////////////////////////////////////////////////
//
//  API - Functions, reconnect to api.php to get data 
//  from Database.
//
////////////////////////////////////////////////////////////

export default class API {
    constructor() {}

    ////////////////////////////////// Login ///////////////////////////
    login(username, password, callback) {
        let credentials = {
            username: username,
            password: password
        };
        API.request("Login", JSON.stringify(credentials), callback);
    }

    /////////////////////////////////// Persons /////////////////////////////////////////
    getPersons(userID, callback) {
        let userData = {
            userID: userID
        };
        API.request("getPersons", JSON.stringify(userData), callback);
    }

    /////////////////////////////////// Incomes /////////////////////////////////////////
    getIncomes(personID, callback) {
        let personData = {
            personID: personID
        };
        API.request("getIncomes", JSON.stringify(personData), callback);
    }

        /////////////////////////////////// Outgoings /////////////////////////////////////////
        getOutgoings(personID, callback) {
            let personData = {
                personID: personID
            };
            API.request("getOutgoings", JSON.stringify(personData), callback);
        }

    //////////////////////////////////// API REQUEST ///////////////////////////////////////
    static request(purpose, json, callback) {
        $.ajax({
            url: "http://127.0.0.1/fixkostenrechner/api.php",
            data: {
                purpose: purpose,
                data: json
            },
            method: 'POST'
        }).done(function (data) {
            callback(data);
        });
    }
}