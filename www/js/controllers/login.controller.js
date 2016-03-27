
app.controller("LoginCtrl", ['$scope','$cordovaOauth','$state','$location','$rootScope','$window',function($scope, $cordovaOauth,$state,$location,$rootScope,$window) {


    if(!window.cordova) {
        $scope.msg = "Debug mode - will not authenticate. Use simulator for actual login";
    }
    $scope.imgurLogin = function() {
        $cordovaOauth.imgur("CLIENT_ID_HERE").then(function(result) {
            console.log(JSON.stringify(result));
        }, function(error) {
            console.log(JSON.stringify(error));
        });
    };

    $scope.twitterLogin = function() {
        $cordovaOauth.twitter("CLIENT_ID_HERE", "CLIENT_SECRET_HERE").then(function(result) {
            console.log(JSON.stringify(result));
        }, function(error) {
            console.log(JSON.stringify(error));
        });
    };

    $scope.facebookLogin = function() {
        $cordovaOauth.facebook("CLIENT_ID_HERE", ["email"], {"auth_type": "rerequest"}).then(function(result) {
            console.log(JSON.stringify(result));
        }, function(error) {
            console.log(JSON.stringify(error));
        });
    };

    $scope.googleLogin = function() {

        if(!window.cordova) {
            $scope.msg = "Debug mode";
            $state.go("todos.index", {}, { reload: true });

        }else {
             $cordovaOauth.google("730155743962-5b0lmdndv8e2lfa0v940v9uc30e6lig1.apps.googleusercontent.com", ["https://www.googleapis.com/auth/calendar"]).then(function(result) {
                 console.log(JSON.stringify(result));
                 $state.go("todos.index", {}, { reload: true });

             }, function(error) {
                 console.log(error);
                 $scope.msg = error;
             });
        }
    };



    $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams, options){
            //event.preventDefault();

            console.log("$stateChangeStart");

            console.log("toState: " + JSON.stringify(toState) + " "
                + "toParams: " + JSON.stringify(toParams) + " "
                + "fromState: " + JSON.stringify(fromState) + " "
                + "fromParams: " +JSON.stringify(fromParams) + " "
                + "options: " + JSON.stringify(options));
            // transitionTo() promise will be rejected with
            // a 'transition prevented' error
        });


    $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams){

            console.log("$stateChangeSuccess");

            console.log("toState: " + JSON.stringify(toState) + " "
                + "toParams: " + JSON.stringify(toParams) + " "
                + "fromState: " + JSON.stringify(fromState) + " "
                + "fromParams: " +JSON.stringify(fromParams));

        });




    $rootScope.$on('$viewContentLoading',
        function(event, viewConfig){
            // Access to all the view config properties.
            // and one special property 'targetView'
            // viewConfig.targetView

            console.log("$viewContentLoading: viewConfig" +""
                +viewConfig

                + JSON.stringify(viewConfig.targetView));

        });

    $rootScope.$on('$stateNotFound',
        function(event, unfoundState, fromState, fromParams){
            console.log("$stateNotFound");
            console.log(unfoundState.to); // "lazy.state"
            console.log(unfoundState.toParams); // {a:1, b:2}
            console.log(unfoundState.options); // {inherit:false} + default options
        });

    $rootScope.$on('$stateChangeError',
        function(event, toState, toParams, fromState, fromParams, error){

            console.log("$stateChangeError");

            console.log("toState" + JSON.stringify(toState) + " "
                + "toParams" + JSON.stringify(toParams) + " "
                + "fromState" + JSON.stringify(fromState) + " "
                + "fromParams" +JSON.stringify(fromParams) + " "
                + "options" + JSON.stringify(error));

        });

    $scope.$on('$viewContentLoaded',
        function(event){


            console.log("$viewContentLoaded");

        });

}]);

