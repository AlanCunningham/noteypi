/*
*   Author: Alan Cunningham
*   Date:   19/01/2015
*
*   Initialising app after ionic is ready. Also handles initialisation after the database has been opened/created/upgraded.
*/

var application = {

    init: function(){
        database.open();
    },

    // Called from database.js after the database has been created
    postDatabase: function(){
        var self = this;
        console.log("application:postDatabase");

        //photoHelper.savePhoto("2015-01-22 11:44:09 +0000");

        // Register for push notifications
        pushHandler.register();

    },

    // TODO: Move this somewhere else
    showErrorMessage: function(message){
        console.log("Error: " + message);
        alert("Uh oh, something just went horribly wrong: \n\n" + message);
    }

}