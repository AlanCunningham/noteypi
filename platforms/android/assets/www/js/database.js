/*
*   Author: Alan Cunningham
*   Date:   19/01/2015
*
*   Allows the creation of a database using IndexedDB.  Provides functions to add, read and remove from the db stores.
*/

var database = {

    thisDB: "",

    open: function(){
        var self = this;

        // TODO: Check if indexedDB is supported
        var openRequest = indexedDB.open("photoDb", 2);

        openRequest.onupgradeneeded = function(e){
            console.log("database:open - Upgrading database");
            self.thisDB = e.target.result;

            // Create photo table
            if(!self.thisDB.objectStoreNames.contains("photos")){
                console.log("database:open -Creating photos database");
                var photoTable = self.thisDB.createObjectStore("photos", {autoIncrement: true});
                photoTable.createIndex("date", "date", { unique: false });
            }
        }

        // On success
        openRequest.onsuccess = function(e){
            console.log("database:open - Successfully opened database");
            db = e.target.result;

            application.postDatabase();
        }

        openRequest.onerror = function(e){
            application.showErrorMessage("Unable to open database - " + e.target.error.name);
        }

    },

    // Add an object to a table
    addRecord: function(selectedTable, objectToAdd, successHandler){
        var self = this;

        // Define the table we want to write to
        var transaction = db.transaction([selectedTable], "readwrite");
        var table = transaction.objectStore(selectedTable);

        // Add the object to the database
        var request = table.add(objectToAdd);

        request.onsuccess = successHandler;
        request.onerror = function(e){
            application.showErrorMessage("Unable to add to database -" + e.target.error.name);
        }
    },

    // Remove an object from a table using index
    deleteRecord: function(selectedTable, index, indexValue){
        var transaction = db.transaction([table], "readwrite");
        var table = transaction.objectStore(selectedTable);
        var index = table.index(index);
        var request = index.openCursor(indexValue);

        request.onsuccess = function(e){
            var cursor = e.target.result;
            if(cursor){
                cursor.delete();
                cursor.continue();
            } else {
                // When the cursor has finished
                console.log("database:deleteRecord - Successfully deleted " + indexValue + " from " + store);
            }
        }

        request.onerror = function(e){
            application.showErrorMessage("Error deleting records");
        }

    },

    // Read an object from a table using index
    readRecord: function(selectedTable, index, indexValue, successHandler){
        var transaction = db.transaction([table], "readwrite");
        var store = transaction.objectStore(selectedTable);
        var index = store.index(index);
        var request = index.openCursor(indexValue);

        request.onsuccess = successHandler;

        request.onerror = function(e){
            application.showErrorMessage("Error reading records from database");
        }
    },

    // Read all records from a given table
    readAllRecords: function(selectedTable, successHandler){
        var transaction = db.transaction([selectedTable], "readonly");
        var objectStore = transaction.objectStore(selectedTable);
        var cursor = objectStore.openCursor();
        var resultsArray = new Array();
        var count = 0;

        // On succesful cursor creation, iterate over the store and return the results
        cursor.onsuccess = successHandler;
        cursor.onerror = function(e){
            application.showErrorMessage("Error reading all records from table");
        };
    },

    isOpen: function(){
        try {
            if(db){
                return true;
            } else {
                return false;
            }
        } catch(exception){
            //application.showErrorMessage("Error checking if database is open - " + exception);
            return false;
        }

    }
}