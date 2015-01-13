/*
*   Author: Alan Cunningham
*   Date:   13/01/2015
*
*   Helper for retrieving the current date and other related functions
*/

var dateHelper = {

    getDate: function(){

        //var date = Date.today().day().toString("dddd d MMMM");
        // Currently used for the history page, so we minus one day.
        var date = Date.today().add(-1).day().toString("dddd d MMMM");

        return date;

    },

    getTime: function(){

        var time = Date.today().toString("HH:mm:ss");

        return time

    }

}