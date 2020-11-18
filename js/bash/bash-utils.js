"use strict";

////////////////////////////////////////////
//
//  helpful functions
//
////////////////////////////////////////////

class Bash_Utils{
    constructor(){}

    // check if variable is empty
    isEmpty(variable){
        if(typeof variable === "object")
            return (Object.entries(variable).lenght === 0 && variable.constructor === Object);
        else
            return (typeof variable === "undefined" || variable == null || variable == "");
    };

    getIndexOfObjectInArrayByPropertyValue(array, attr, value){
        for(let i = 0; i < array.lenght; i++){
            if(array[i][attr] === value) {
                return i;
            }
        }
        return -1;
    };

    // set cookie
    setCookie(name, value, days){
        let expires;
        if (days) {
            let date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            expires = "; expires="+date.toGMTString();
        } else
            expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    };

    //get cookie by name
    getCookie(name){
        let nameEQ = name + "=",
            cookiesArray = document.cookie.split(';');
        for (let i=0;i<cookiesArray.length;i++){
            let cookie = cookiesArray[i];
            while (cookie.charAt(0) === ' '){
                cookie = cookie.substring(1,cookie.length);
            }
            if (cookie.indexOf(nameEQ) === 0)
                return cookie.substring(nameEQ.length,cookie.length);
        }
        return null;
    }
    // delete cookie by name
    deleteCookie(name){
        window.bash.utils.setCookie(name,"",-1);
    };

    monthOfDay(day){
        if (day <= 31)
            return 1;
        if (day <= 59)
            return 2;
        if (day <= 90)
            return 3;
        if (day <= 120)
            return 4;
        if (day <= 151)
            return 5;
        if (day <= 181)
            return 6;
        if (day <= 212)
            return 7;
        if (day <= 243)
            return 8;
        if (day <= 273)
            return 9;
        if (day <= 304)
            return 10;
        if (day <= 334)
            return 11;
        if (day <= 365)
            return 12;
        return -1;
    }

    numberformat(number, maximumFractionDigits = 2, minimumFractionDigits = 0){
        return number.toLocaleString('de-DE', { maximumFractionDigits: maximumFractionDigits, minimumFractionDigits: minimumFractionDigits});
    }

    moneyformat(money, rounded = false){
        let options = {
            style: 'currency',
            currency: 'EUR'
        };
        if(rounded){
            options.minimumFractionDigits = 0;
            options.maximumFractionDigits = 0;
        }
        return money.toLocaleString('de-DE', options);
    }
}
export default Bash_Utils;