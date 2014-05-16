var app = angular.module('appDemo', [])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        controller : 'login',
        templateUrl: '/view/login.html'
      })
      .when('/lista', {
        controller : 'listaAmigos',
        templateUrl: '/view/listaAmigos.html'
      })
      .when('/perfil', {
        controller : 'perfil',
        templateUrl: '/view/perfil.html'
      })
      .otherwise({ redirectTo: '/' });
  });


//Login
app.controller('login', function ($scope, $location, $http) {
  $scope.enviar = function () {
    $http.post('/login', {
      email: $scope.email,
      pass : $scope.pass
    })
    .success(function (data) {
      if (data.login) {
        $scope.error = null;
        $location.path('/lista');

      } else {
        $scope.error = 'Usuário ou senha inválidos';
      }
    })
  };
});


//Lista de amigos
app.controller('listaAmigos', function ($scope, $http) {
  $http.get('/friends')
    .success(function (data) {
      $scope.friends = data.friends;
    });
});


//Perfil
app.controller('perfil', function ($scope, $http) {
  $http.get('/user')
    .success(function (data) {
      $scope.user = data;
    });

  $scope.back= '#/lista';
});
