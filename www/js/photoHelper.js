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
    savePhoto: function(){

        var photos = localStorageHelper.getObject("photos");

        // Save the photo at the beginning of the array
        photos.push({
            date: dateHelper.getDate() + " at " + dateHelper.getTime()
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
                // We'll have the history in chronological order - so we use push instead of unshift
                historyPhotos.push(allPhotos[i]);
            }
          }

        return historyPhotos;
    }

}