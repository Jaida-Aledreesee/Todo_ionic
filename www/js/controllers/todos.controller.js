//Todolists Controller
app.controller('TodosCtrl', ['$scope','TodosService','$http','$ionicHistory',function($scope,TodosService,$http,$ionicHistory){
$scope.todos=[];
const userid1= "1234";

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

    $scope.share = function(groupid1){
        console.log("groupid is", groupid1);
        var shareduser = s4();
        var dataObj2 = [{
            userid:shareduser,
            groupid:groupid1
        }];

        TodosService.postUsergroup(dataObj2);

    };

    //create new list
    $scope.createList = function(task) {
        // generate random ids for each new list

       var id = s4();
        $scope.todos.rows.push({
            "id":id,
            "todolistid":"",
            "groupid":"3",
            "name":task.name,
            "description":"Description of todolist",
            "due_date":"1/1/2017",
            "completed":true,
            "completed_date":null
        });

        var dataObj = [{
            id:id,
            todolistid:"",
            groupid:"3",
            name:task.name,
            description:"Description of task",
            due_date:"1/1/2017",
            completed:true,completed_date:null
        }];

        var dataObj2 = [{
            userid:userid1,
            groupid:"3"
        }];


        TodosService.postlist(dataObj);
        TodosService.postUsergroup(dataObj2);
        task.title = "";
        $ionicHistory.goBack(-1);

    };
}]);

/**
 * Created by coder on 3/7/2016.
 */
