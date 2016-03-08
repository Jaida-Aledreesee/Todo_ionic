var app = angular.module("ionicApp", ["ionic"]);

// functions to generate random and unique ids
    function uniqueNumber() {
    var date = Date.now();
    
    if (date <= uniqueNumber.previous) {
        date = ++uniqueNumber.previous;
    } else {
        uniqueNumber.previous = date;
    }

    return date;
}

uniqueNumber.previous = 0;

function s4(){
  return uniqueNumber();
};

// Routes 

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

  $stateProvider.state("addtask",
  {
    url: "/addtask",
 
    views:
    {
      additem:
      {
        templateUrl: "addtask.html"
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
app.factory('TodosService', ['$http', '$state',function ($http,$state) {
    var promise = $http.get('http://skyhi.cloudapp.net:8001/todolist/_all_records');
    var id 
  
    return {
        getlists: function (callback) {
                  promise.success(callback);
                                      },
         
        getitems: function (callback) {
                  var promise1 = $http.get('http://skyhi.cloudapp.net:8001/todo/list/'+id);
                  promise1.success(callback);
                                      },
        getTodo: function(listid) { 
                                   id = listid;
                                   return  listid;
                                 },
        getListId: function() { 
                                return  id;
                              },
        postlist: function(dataObj) { 
                  var res = $http.post('http://skyhi.cloudapp.net:8001/todolist', dataObj);
                                 },
        postitem: function(dataObj) { 
                  var res = $http.post('http://skyhi.cloudapp.net:8001/todo', dataObj);
                                 },
        deletelist: function(listid){
          $http.delete('http://skyhi.cloudapp.net:8001/todolist/'+listid);

        },
      changeState: function () {
      $state.go('todo.detail', {id:id});
      }

    };
}]);



//Todolists Controller
app.controller('TodosCtrl', ['$scope','TodosService','$http',function($scope,TodosService,$http){

  
 TodosService.getlists(function(data) {
      $scope.todos = data;
      todos=$scope.todos;
    });

 $scope.removeItem = function (index,listid) {
  console.log('index is', index);
  console.log('list id is', listid); 
  $scope.todos.rows.splice(index, 1);
  TodosService.deletelist(listid);

 };
 //create new list
 $scope.createList = function(task) {
   // generate random ids for each new list
 
 var id = s4();
 $scope.todos.rows.push({
                             "id":id,
                             "name":task.name,
                             "description":"Description of todolist",
                              "due_date":"1/1/2017",
                              "completed":false,
                              "completed_date":null
                          });
    var dataObj = [{
                    id:id,
                    name:task.name,
                    description:"Description of task",
                    due_date:"1/1/2017",
                    completed:true,completed_date:null     
                  }]
    TodosService.postlist(dataObj);
    task.title = "";  
  };
}]);

//Todo Items Controller
app.controller('TodoCtrl', ['$scope','TodosService',function($scope,TodosService,$state){   
var currentListID = TodosService.getListId();
TodosService.getitems(function(data) {
      $scope.tasks = data;
      items=$scope.items;      
  });
$scope.addTask = function(task) {  
    var id = s4();
    $scope.tasks.rows.push(
                             {
      "id": id,
      "todolistid": parseInt(currentListID),
      "name": task.name,
      "description": "Description of task",
      "due_date": "1/1/2017",
      "completed": "false",
      "completed_date": "null"
    
                          });
       var dataObj = [{
                    id:id, 
                    todolistid:parseInt(currentListID),
                     name:task.name,
                     description:"Description of task", 
                     due_date:"1/1/2017"
                    ,completed:false,
                    completed_date:null     
                  }]

    TodosService.postitem(dataObj);
    TodosService.changeState();
    task.title = "";
  
  };

}]);


