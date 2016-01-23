angular.module('Todo', []).factory('myhttpserv', function ($http) {
    return $http.get('storage.json').error(function(status){console.log(status)});
}).controller('TodoController', function ($scope, myhttpserv, $http) {
    $scope.appTitle = "MyTodoList",
    myhttpserv.then(function(response){
        $scope.todos = (response.data !== null) ? response.data : [];
        var httpPost = function() {
            $http.post('storage', JSON.stringify($scope.todos)).error(function(status){console.log(status)});
        };

        $scope.addTodo = function(){
						$scope.todos.push({
							text: $scope.todoText,
							doneProd: false,
							doneDev: false
						});
						$scope.todoText = ''; //clear the input after adding
            httpPost();
        };

        $scope.remaining = function() {
            var count = 0;
            angular.forEach($scope.todos, function(todo){
                count+= todo.doneProd && todo.doneDev ? 0 : 1;
            });
            return count;
        };

        $scope.archive = function() {
            var rusure = confirm("Are you sure you want to remove the completed tasks from the list?");
            if(rusure){
                var oldTodos = $scope.todos;
                $scope.todos = [];

                angular.forEach(oldTodos, function(todo){
                    if (!todo.doneProd || !todo.doneDev)
                        $scope.todos.push(todo);
                });
                httpPost();
            }
        };

        $scope.delete = function ( idx ) {
            var rusure = confirm("Are you sure you want to remove the task from the list?");
            if(rusure){
                $scope.todos.splice(idx, 1);
                httpPost();
            }
        };

        $scope.edit = function ( idx ) {
            var changes = prompt("Please make the changes below", $scope.todos[idx].text);
            if(changes != null){
                $scope.todos[idx].text = changes;
                httpPost();
            }
        };

        $scope.checkboxClick = function() {
            httpPost();
        };

        $('.splash, .container').fadeToggle();
    });
});