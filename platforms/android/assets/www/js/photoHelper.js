/*
*   Author: Alan Cunningham
*   Date:   13/01/2015
*/


var photoHelper = {

    checkStorage: function(){

        // This really needs to be moved as to the application init
        if(localStorageHelper.getObject("photos") == null){
        	console.log("Photo storage does not yet exist - creating");
        	var photos = new Array();
        	localStorageHelper.storeObject("photos", photos);
        }
    },

    // Temporarily saves data to localStorage - testing for onNotification functionality
    savePhoto: function(dateTime){

        var photos = localStorageHelper.getObject("photos");
        // Parse the date and time sent from the server (Original format is: 2015-01-17 14:44:09 +0000)
        var parsedDate = Date.parse(dateTime).toString("dddd d MMMM"); // Format: Monday 01 January
        var parsedTime = Date.parse(dateTime).toString("HH:mm:ss"); // Format: 15:30:02

        // Save the photo at the beginning of the array
        photos.push({
            date: parsedDate + " at " + parsedTime
        });

        localStorageHelper.storeObject("photos", photos);
        console.log("Number of stored photos: " + localStorageHelper.getObject("photos").length);
    },

    // Retrieve photos from today
    getTodayPhotos: function(){
       var allPhotos = localStorageHelper.getObject("photos");
       var todayPhotos = new Array();

       for(var i = 0; i < allPhotos.length; i++){
            var formattedPhotoDate = Date.parse(allPhotos[i].date).toString("ddMMyy");
            var formattedTodayDate = Date.today().toString("ddMMyy");//

            if(formattedTodayDate == formattedPhotoDate){
                // Unshift to get the latest photos first
                todayPhotos.unshift(allPhotos[i]);
            }
       }

       return todayPhotos;
    },

    // Retrieve historical photos
    getHistoryPhotos: function(){
        var allPhotos = localStorageHelper.getObject("photos");
        var historyPhotos = new Array();

          for(var i = 0; i < allPhotos.length; i++){
            var formattedPhotoDate = Date.parse(allPhotos[i].date).toString("ddMMyy");
            var formattedTodayDate = Date.today().toString("ddMMyy");//

            if(formattedTodayDate != formattedPhotoDate){
                historyPhotos.unshift(allPhotos[i]);
            }
          }

        return historyPhotos;
    }

}