/*
*   Author: Alan Cunningham
*   Date:   13/01/2015
*/


var photoHelper = {


    // Retrieve photos from today
    getTodayPhotos: function(){

        // Open database and retrieve photo base64 and timestamp

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