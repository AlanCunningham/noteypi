/*
*   Author: Alan Cunningham
*   Date: 13/01/215
*
*   Allows the saving of objects to localStorage
*/



var localStorageHelper = {

    storeObject: function(keyString, objectToStore){

/*
        objectToStore = {
            name: "Test"
        };
*/
        window.localStorage.setItem(keyString, JSON.stringify(objectToStore));

    },

    getObject: function(key){

        var retrievedObject = window.localStorage.getItem(key);

        return JSON.parse(retrievedObject);

    }

}