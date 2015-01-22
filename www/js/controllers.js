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

.controller('PlaylistsCtrl', function($scope, $state, $timeout, $ionicLoading) {

  /* Setup the loader
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });
  */



  $timeout(function(){
    $scope.getTodayPhotos();
    //$scope.refresh();
    //$ionicLoading.hide();
  }, 500); // Temporary timeout to allow the database to open.  TODO: Really we should have a listener to return when the database has opened.

  // TODO: Is this method actually required?  We could probably just use the same method...
  $scope.getTodayPhotos = function(){
    photoHelper.getTodayPhotos(function(photos){
      $scope.todayPhotos = photos;
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

})

.controller("HistoryCtrl", function($scope, $state, $timeout, $ionicLoading){

    $timeout(function(){
      $scope.getHistoryPhotos();
      //$ionicLoading.hide();
    }, 500); // Temporary timeout to allow the database to open.  Really we should have a listener to return when the database has opened.

      $scope.getHistoryPhotos = function(){
        photoHelper.getHistoryPhotos(function(photos){
          $scope.historyPhotos = photos;
          $scope.$broadcast('scroll.refreshComplete');
        });
      };


})
