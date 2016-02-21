angular.module('todo', ['ionic'])
.factory('Lists', function() {
  return {
    all: function() {
      var projectString = window.localStorage['lists'];
      if(projectString) {
        return angular.fromJson(projectString);
      }
      return [];
    },
    save: function(lists) {
      window.localStorage['lists'] = angular.toJson(lists);
    },
    newList: function(listTitle) {
      // Add a new list
      return {
        title: listTitle,
        tasks: []
      };
    },
    getLastActiveIndex: function() {
      return parseInt(window.localStorage['lastActiveProject']) || 0;
    },
    setLastActiveIndex: function(index) {
      window.localStorage['lastActiveProject'] = index;
    }
  }
})

.controller('TodoCtrl', function($scope, $ionicModal,Lists) {

  /**
 * The Lists factory handles saving and loading lists
 * from local storage, and also lets us save and load the
 * last active list index.
 */

    var createList = function(listTitle) {
    var newList = Lists.newList(listTitle);
    $scope.lists.push(newList);
    Lists.save($scope.lists);
    $scope.selectList(newList, $scope.lists.length-1);
  }

  // No need for testing data anymore
  $scope.lists = Lists.all();
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
   Lists.save($scope.lists);

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




