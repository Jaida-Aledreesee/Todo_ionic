/**
 * Created by coder on 3/7/2016.
 */

//Todo Items Controller
app.controller('TodoCtrl', ['$scope','TodosService','$state','$ionicHistory',function($scope,TodosService,$state,$ionicHistory){
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
       // TodosService.changeState();

        $ionicHistory.clearCache();
        $ionicHistory.goBack(-1);


    };

}]);