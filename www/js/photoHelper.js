/*
*   Author: Alan Cunningham
*   Date:   13/01/2015
*/


var photoHelper = {


    // Retrieve photos from today
    getTodayPhotos: function(){

        // Open database and retrieve photo base64 and timestamp
        var photos = new Array();

        for(var i = 0; i < 3; i++){
            photos.push({
                id: i,
                date: dateHelper.getTime()
            });
        }

    },

    // Temporarily saves data to localStorage - testing for onNotification functionality
    savePhoto: function(){

        var photos = localStorageHelper.getObject("photos");

        photos.push({
            date: dateHelper.getDate() + " at " + dateHelper.getTime()
        });

        localStorageHelper.storeObject("photos")



    },

    // Retrieve historical photos
    getHistoryPhotos: function(){
        var photos = new Array();

        for(var i = 0; i < 10; i++){
            photos.push({
                id: i,
                date: dateHelper.getDate() + " at " + dateHelper.getTime()
            });
        }

        return photos;
    }

}