/*
*   Author: Alan Cunningham
*   Date:   14/01/2015
*
*   Controls changes to UI and storing of photos upon receiving a push notification.  Extracted out from pushHandler.js for sake of readability
*/

var pushResponse = {

    onNotification: function(payload){

        // Save a "photo" to storage.  At the moment, this grabs the datetime sent from the server
        // TODO: also save payload.photo
        photoHelper.savePhoto(payload.datetime);

    }

}