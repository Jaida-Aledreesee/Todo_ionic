//Todolists Controller
app.controller('TodosCtrl', ['$scope','TodosService','$http','$ionicHistory',function($scope,TodosService,$http,$ionicHistory){


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
        $ionicHistory.goBack(-1);

    };
}]);

/**
 * Created by coder on 3/7/2016.
 */
