/*
*   Author: Alan Cunningham
*   Date:   13/01/2015
*/


var photoHelper = {

    // Retrieve photos from today
    getTodayPhotos: function(){

       var todayPhotos = localStorageHelper.getObject("photos");

        return todayPhotos;
    },

    // Temporarily saves data to localStorage - testing for onNotification functionality
    savePhoto: function(){

        // This really needs to be moved as to the application init
        if(localStorageHelper.getObject("photos") == null){
            console.log("Photo storage does not yet exist - creating");
            var photos = new Array();
        } else {
            var photos = localStorageHelper.getObject("photos");
        }

        photos.unshift({
            date: dateHelper.getDate() + " at " + dateHelper.getTime()
        });

        localStorageHelper.storeObject("photos", photos);
        console.log("Number of stored photos: " + localStorageHelper.getObject("photos").length);
    },

    // Retrieve historical photos
    getHistoryPhotos: function(){
        var photos = new Array();

        for(var i = 0; i < 4; i++){
            photos.unshift({
                id: i,
                date: dateHelper.getDate() + " at " + dateHelper.getTime()
            });
        }

        return photos;
    }

}