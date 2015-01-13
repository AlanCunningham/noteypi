/*
*   Author: Alan Cunningham
*   Date: 13/01/215
*
*   Allows the saving of objects to localStorage
*/



var localStorageHelper = {

    storeObject: function(key, object){

        window.localStorage.setItem(key, JSON.stringify(object));

    },

    getObject: function(key){

        var retrievedObject = window.localStorage.getItem(key);

        return JSON.parse(retrievedObject);

    }

}