angular.module('todo', ['ionic'])





.controller('TodoCtrl', function($scope, $ionicModal,$http) {

  //getting existing lists from json

  $http.get('http://skyhi.cloudapp.net:8000/todo/_all_records').then(function(resp) {
    $scope.lists1 = resp.data;
    $scope.$apply();
    console.log(resp.data);
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })


  $scope.lists1 = [];
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




  // Posting new lists to json
  // This is not working 
  $scope.createTask = function(task) {
    $scope.lists1.rows.push({
     "id":4,"todolistid":1, "name":task.name,"description":"Description of task", "due_date":"1/1/2017","completed":false,"completed_date":null
    });

    var dataObj = [{
       id:4,todolistid:1, name:task.name,description:"Description of task", due_date:"1/1/2017",completed:false,completed_date:null
       
    }]

    var res = $http.post('http://skyhi.cloudapp.net:8000/todo', dataObj);
    res.success(function(data, status, headers, config) {
      $scope.message = data;
    });
    res.error(function(data, status, headers, config) {
      alert( "failure message: " + JSON.stringify({data: data}));
    }); 
    $scope.taskModal.hide();
   Lists.save($scope.lists1);

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




