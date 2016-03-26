var app = angular.module("ionicApp", ["ionic"]);

// Routes
app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/signin')

    $stateProvider
        .state("signin",
        {
            url: "/signin",    
            templateUrl: "/templates/signin.html"
                
            }
        )
        .state("todos",
        {
            abstract: true,
            url: "/todos",
            templateUrl: 'templates/todos.html'
        })

        .state("todos.home",
        {
            cache: false,
            url: "/home",
            views: {
                'todos-home': {
                    templateUrl: "/templates/todos.home.html"
                }
            }
        })
  
        .state("todos.index",
        {
            cache: false,
            url: "/index",
            views: {
                'todos-index': {
                    templateUrl: "templates/todos.index.html",
                    controller: "TodosCtrl"
                }
            }

        })

        .state("todos.detail",
        {
            cache: false,
            url: "/detail/:id",
            views: {
                'todos-index': {
                    templateUrl: "templates/todos.index.detail.html",
                    controller: "TodoCtrl"
                }
            },
            resolve: {
                id: function ($stateParams, TodosService) {
                    return TodosService.getTodo($stateParams.id);
                }
            }
        })
        .state("todos.createlist",
        {
            cache: false,
            url: "/createlist",

            views: {
                'todos-index': {
                    templateUrl: "templates/todos.index.createlist.html"
                }
            }
        }).state("todos.addtask",
        {
            cache: false,
            url: "/addtask",
            views: {
                'todos-index': {
                    templateUrl: "templates/todos.index.detail.addtask.html"
                }
            }
        }).state("todos.help",
        {
            url: "/help",
            views: {
                help: {
                    templateUrl: "templates/todos.help.html"
                }
            }
        });
});


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

function s4() {
    return uniqueNumber();
};
