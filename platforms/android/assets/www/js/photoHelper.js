/*
*   Author: Alan Cunningham
*   Date:   13/01/2015
*/


var photoHelper = {

    // TODO: Remove when indexedDB is implemented.  This should no longer be required.
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
/*
        $http.get("http://alan.manaha.co.uk:1337/base64").then(function(response){
          console.log("photoHelper:savePhoto - Retrieving base64 of image");

        }, function(error){
          alert("Aww " + error.status);
        })
*/
        // Retrieve the base64 photo snapshot from the server
        $.ajax({
            url: "http://alan.manaha.co.uk:1337/base64",
            success: function(base64Result){
                // Parse the date and time sent from the server (Original format is: 2015-01-17 14:44:09 +0000)
                var parsedDate = Date.parse(dateTime).toString("dddd d MMMM"); // Format: Monday 01 January
                var parsedTime = Date.parse(dateTime).toString("HH:mm:ss"); // Format: 15:30:02

                // Save the photo at the beginning of the array
                var photo = {
                    date: parsedDate + " at " + parsedTime,
                    base64: base64Result
                };

                database.addRecord("photos", photo, function(e){
                    console.log("Added record");
                });

            }
        });




        //console.log("Number of stored photos: " + localStorageHelper.getObject("photos").length);
    },

    // Retrieve photos from today
    getTodayPhotos: function(completedHandler){
       var allPhotos = localStorageHelper.getObject("photos");
       var todayPhotos = new Array();

       database.readAllRecords("photos", function(e){
        var result = e.target.result;
        if(result){
            //console.log("photoHelper:getTodayPhotos - " + (result.value.date));
            var formattedPhotoDate = Date.parse(result.value.date).toString("ddMMyy");
            var formattedTodayDate = Date.today().toString("ddMMyy");

            if(formattedTodayDate == formattedPhotoDate){
                console.log("photoHelper:getTodayPhotos - Found photo for today: " + (result.value.date));
                // Unshift to get the latest photos first
                todayPhotos.unshift(result.value);
            }

            result.continue();
        } else {
            completedHandler(todayPhotos);
        }

       })
    },

    // Retrieve historical photos
    getHistoryPhotos: function(completedHandler){
       var allPhotos = localStorageHelper.getObject("photos");
       var historyPhotos = new Array();

       database.readAllRecords("photos", function(e){
        var result = e.target.result;
        if(result){
            //console.log("photoHelper:getHistoryPhotos - " + (result.value.date));
            var formattedPhotoDate = Date.parse(result.value.date).toString("ddMMyy");
            var formattedTodayDate = Date.today().toString("ddMMyy");

            if(formattedTodayDate != formattedPhotoDate){
                console.log("photoHelper:getHistoryPhotos - Found history photos: " + (result.value.date));
                // Unshift to get the latest photos first
                historyPhotos.unshift(result.value);
            }

            result.continue();
        } else {
            completedHandler(historyPhotos);
        }
       })

       //return todayPhotos;
    },

    deletePhoto: function(indexToDelete, completedHandler){
        database.deleteRecord("photos", "date", indexToDelete, function(e){
            completedHandler();
        });
    }

}