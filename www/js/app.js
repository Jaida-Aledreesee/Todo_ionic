angular.module('todo', ['ionic'])

.controller('TodoCtrl', function($scope, $ionicModal) {
  // No need for testing data anymore
  $scope.lists = [];
   $scope.items = {
    //testing
      name: 'item1',  
    }

        $ionicModal.fromTemplateUrl('templates/contact-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal
    })

    $scope.openModal = function() {
      $scope.modal.show()
    }

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });

  // Create and load the Modal
  $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });


  // Called when the form is submitted
  $scope.createTask = function(task) {
    $scope.lists.push({
      title: task.title
    });
    $scope.taskModal.hide();
    task.title = "";
  };



  // Open our new task modal
  $scope.newTask = function() {
    $scope.taskModal.show();
  };


  // Close the new task modal
  $scope.closeNewTask = function() {
    $scope.taskModal.hide();
  };


});




