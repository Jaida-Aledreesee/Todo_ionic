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
       $scope.removeItem = function (index,taskId) {
        console.log('index is', index);
        console.log('task id is', taskId);
        $scope.tasks.rows.splice(index, 1);
        TodosService.deleteTask(taskId);

    };

    $scope.addTask = function(task) {
        var id = s4();
       /* $scope.tasks.rows.push(
            {
                "id": id,
                "todolistid": parseInt(currentListID),
                "name": task.name,
                "description": "Description of task",
                "due_date": "1/1/2017",
                "completed": "false",
                "completed_date": "null"

            });*/
        var dataObj = [{
            id:id,
            todolistid:parseInt(currentListID),
            name:task.name,
            description:"Description of task",
            due_date:"1/1/2017"
            ,completed:"false",
            completed_date:null,
            completed_by:"userid"
        }]
 
        TodosService.postitem(dataObj);
       // TodosService.changeState();

        $ionicHistory.clearCache();
        $ionicHistory.goBack(-1);


    };
    $scope.doneTask = function(completed, taskId, taskName, date){
       if (completed== false)
          {
                completed =true;
                date = new Date();
                var month = date.getUTCMonth() + 1; //months from 1-12
                var day = date.getUTCDate();
                var year = date.getUTCFullYear();    
                newdate = month + "/" + day + "/" + year;
          }
        else
        {
                 completed=false;
                 newdate=null;
        }
    
        var dataObj = [{
            id:taskId,
            todolistid:parseInt(currentListID),
            name:taskName,
            description:"Description of task",
            due_date:"1/1/2017"
            ,completed:completed,
            completed_date:newdate
        }]
      

        TodosService.postitem(dataObj);
        TodosService.getitems(function(data) {
        $scope.tasks = data;
        items=$scope.items;

        });


    }

}]);