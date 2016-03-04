var app = angular.module("ionicApp", ["ionic"]);

app.config(function($stateProvider, $urlRouterProvider)
{
  $urlRouterProvider.otherwise("/help");

  $stateProvider.state("home",
  {
    url: "/home",
    views:
    {
      home:
      {
        templateUrl: "home.html"
      }
    }
  });

  $stateProvider.state("todos",
  {
    abstract: true,
    url: "/todos",
    views:
    {
      todos:
      {
        template: "<ion-nav-view></ion-nav-view>"
      }
    }
  });

  $stateProvider.state("todos.index",
  {
    url: "",
    templateUrl: "todos.html",
    controller: "TodosCtrl"
  });

  $stateProvider.state("todos.detail",
  {
    url: "/:id",
    templateUrl: "todo.html",
    controller: "TodoCtrl",
    resolve:
    {
      id: function($stateParams, TodosService)
      {
         
        return TodosService.getTodo($stateParams.id);
      }
    }
  });

      $stateProvider.state("createlist",
  {
    url: "/createlist",
    views:
    {
      createlist:
      {
        templateUrl: "createlist.html"
      }
    }
  });

  $stateProvider.state("help",
  {
    url: "/help",
    views:
    {
      help:
      {
        templateUrl: "help.html"
      }
    }
  });
});

// Getting data from Api
app.factory('TodosService', ['$http', function ($http) {
    var promise = $http.get('http://skyhi.cloudapp.net:8000/todolist/_all_records');

    var id 
    
  
    return {
        getlists: function (callback) {
                  promise.success(callback);
                                      },
         
        getitems: function (callback) {
                  var promise1 = $http.get('http://skyhi.cloudapp.net:8000/todo/'+id);
                  promise1.success(callback);
                                      },
        // index is undefined 
        getTodo: function(index) { 
                                   id = index;
                                   return  index;
                                 }
    };
}]);


//Todolists Controller
app.controller('TodosCtrl', ['$scope','TodosService',function($scope,TodosService,$ionicModal,$http){
 TodosService.getlists(function(data) {
      $scope.todos = data;

        todos=$scope.todos;
      console.log('$scope.todos: %o', $scope.todos); 

  });



}]);



//Todo Items Controller
app.controller('TodoCtrl', ['$scope','TodosService',function($scope,TodosService,$http){

 TodosService.getitems(function(data) {
      $scope.items = data;
     console.log('data is %o', data.rows); 
  });


}]);


