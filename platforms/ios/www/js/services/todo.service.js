/**
 * Created by coder on 3/7/2016.
 */
// Getting data from Api
app.factory('TodosService', ['$http', '$state',function ($http,$state) {
    var baseUrl = 'http://skyhi.cloudapp.net:8001/';

    //var baseUrl = 'http://192.168.204.134:8001/';


    var promise = $http.get(baseUrl + 'todolist/_all_records');
    var id;

    return {


        getlists: function (callback) {
            promise.success(callback);
        },

        getitems: function (callback) {
            var promise1 = $http.get(baseUrl + 'todo/list/'+id);
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
            var res = $http.post(baseUrl + 'todolist', dataObj);
        },
        postitem: function(dataObj) {
            var res = $http.post(baseUrl + 'todo', dataObj);
        },
        deletelist: function(listid){
            $http.delete(baseUrl + 'todolist/'+listid);

        },
        deleteTask: function(todoid){
            $http.delete(baseUrl + 'todo/'+todoid);

        },
        changeState: function () {
            $state.go('todo.detail', {id:id});
        }

    };
}]);
