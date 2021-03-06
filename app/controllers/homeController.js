contactApp.controller('homeController', function($scope, contactService) {

  $scope.loading = true;

  $scope.contacts = {};

  $scope.open = 0;

  $scope.showUpdateModal = false;

  $scope.currentContact = {};

  $scope.emptyContact = {};

  $scope.visibleUpdateModal = false;

  $scope.visibleAddModal = false;

  $scope.openContact = function ( id ) {
    if ( $scope.open == 0 ) {
      $scope.open = id;
    } else {
      $scope.open = 0;
    }
  };

  $scope.deleteContact = function (id) {

    var youSure = confirm('Are you sure you want to delete this contact?');

    if ( youSure ) {
      contactService.deleteById(id).finally(function () {
        $scope.loadContacts(); // reload contacts
      });
    }

  };

  $scope.updateContact = function () {
    contactService.update( $scope.currentContact ).finally(function () {
      $scope.hideModal();
      $scope.loadContacts(); // reload contacts
    });
  };

  $scope.addContact = function () {
    contactService.add( $scope.emptyContact ).finally(function () {
      $scope.hideModal();
      $scope.loadContacts(); // reload contacts
    });
  };

  $scope.addModal = function () {
    $scope.visibleAddModal = true;
    console.log('Hesso');
  };

  $scope.updateModal = function ( id ) {
    $scope.visibleUpdateModal = true;
    contactService.getById( id ).then(function (contact) {
      $scope.currentContact = contact;
    });
  };

  $scope.hideModal = function () {
    $scope.visibleUpdateModal = false;
    $scope.visibleAddModal = false;
  };

  $scope.loadContacts = function () {
    contactService.allContacts().then(function (contacts) {
      $scope.contacts = contacts;
    }).finally(function () {
      $scope.loading = false;
    });
  };

  $scope.loadContacts(); // load contacts every time

});
