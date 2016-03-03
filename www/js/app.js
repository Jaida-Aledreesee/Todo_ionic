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
        
        return TodosService.getTodo($stateParams.todo);
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
    var promise1 = $http.get('http://skyhi.cloudapp.net:8000/todo/_all_records');
    return {
        getlists: function (callback) {
            promise.success(callback);
        },
        getitems: function (callback) {
            promise1.success(callback);
        },

        // index is undefined 
       getTodo: function(index) { 
      return  console.log('index is', index);
    }
    };
}]);


//Todolists Controller
app.controller('TodosCtrl', ['$scope','TodosService',function($scope,TodosService,$http){
 TodosService.getlists(function(data) {
      $scope.todos = data;
      $scope.apply;
        todos=$scope.todos;
      console.log('$scope.todos: %o', $scope.todos);    
  });

}]);



//Todo Items Controller
app.controller('TodoCtrl', ['$scope','TodosService',function($scope,TodosService,$http){
 TodosService.getitems(function(data) {
      $scope.items = data.rows[0];
      $scope.apply;
     console.log('data is %o', data.rows[0]); 
  });


}]);


