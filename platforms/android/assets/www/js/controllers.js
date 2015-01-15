angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope, $state) {

  // Temporarily hard coded in.  The array will eventually be added to when a notification is received.

  /*
  $scope.todayPhotos = [
    { date: '10:06:02', id: 1 },
    { date: '09:31:42', id: 2 },
    { date: '07:16:26', id: 3 }
  ];
  */
  $scope.todayPhotos = photoHelper.getTodayPhotos();

   $scope.refresh = function(){
      //photoHelper.savePhoto();
      //$state.go($state.current, {}, {reload: true});
      $scope.todayPhotos = photoHelper.getTodayPhotos();
      $scope.$broadcast('scroll.refreshComplete');
    };

})

.controller("HistoryCtrl", function($scope){

  $scope.historyPhotos = photoHelper.getHistoryPhotos();
  //$scope.historyPhotos = localStorageHelper.getObject("photos");

})
