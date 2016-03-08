/**
 * Created by coder on 3/7/2016.
 */
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
