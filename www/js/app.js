angular.module('starter', ['ionic', 'firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {

      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  });

  $stateProvider.state('tabs', {
    abstract:true,
    url: '/tabs',
    templateUrl: 'templates/tabs.html'
    // controller: 'perfilCtrl'
  });

  $stateProvider.state('cadastro', {
    url: '/cadastro',
    templateUrl: 'templates/cadastro.html',
    controller: 'CadastroCtrl'
  });

  $stateProvider.state('tabs.geral', {
    url: '/geral/:id',
    views: {
      "tab-pacotes": {
        templateUrl: 'templates/geral.html',
        controller: 'geralCtrl'
      }
    }      
  });

  $stateProvider.state('tabs.informacoes', {
    url: '/informacoes/:id',
    views: {
      "tab-pacotes": {
        templateUrl: 'templates/informacoes.html',
        controller: 'informacoesCtrl'
      }
    }    
  });

  $stateProvider.state('senha', {
    url: '/senha',
    templateUrl: 'templates/senha.html',
    controller: 'senhaCtrl'
  });

  $stateProvider.state('roteiro', {
    url: '/roteiro',
    templateUrl: 'templates/roteiro.html',
    controller: 'roteiroCtrl'
  });

  $stateProvider.state('chat', {
    url: '/chat',
    templateUrl: 'templates/chat.html',
    controller: 'chatCtrl'
  });

  $stateProvider.state('lista', {
    url: '/lista',
    templateUrl: 'templates/lista.html',
    controller: 'listaCtrl'
  });

  $stateProvider.state('perfil', {
    url: '/perfil',
    templateUrl: 'templates/perfil.html',
    controller: 'perfilCtrl'
  });

  $stateProvider.state('tabs.viagem', {
    url: '/viagem',
    views: {
      "tab-viagem" : {
        templateUrl: 'templates/viagem.html',
        controller: 'viagemCtrl'
      }
    }    
  });

  $stateProvider.state('tabs.pacotes', {
    url: '/pacotes',
    views: {
      "tab-pacotes" : {
        templateUrl: 'templates/pacotes.html',
        controller: 'pacotesCtrl'
      }
    }    
  });

  $stateProvider.state('tabs.dicas', {
    url: '/dicas',
    views: {
      "tab-dicas" : {
        templateUrl: 'templates/dicas.html',
        controller: 'dicasCtrl'
      }
    }    
  });

  $stateProvider.state('cadastroviagem', {
    url: '/cadastroviagem',
    templateUrl: 'templates/cadastroviagem.html',
    controller: 'cadastroviagemCtrl'
  });

$urlRouterProvider.otherwise('/login');
})

.controller('loginCtrl', function($scope, $firebaseAuth, $state){  

  $scope.usuario = {}; // Usuario usuario = new Usuario();
  
      $scope.login = function(usuario) {
  
          $firebaseAuth().$signInWithEmailAndPassword(usuario.email, usuario.password)
              .then(function(firebaseUser) {
                  // autenticado com sucesso.
                  $state.go('tabs.viagem');
              })
              .catch(function(error) {
                  // falha na autenticação.
                  alert(error);
              });
      }

})

.controller('CadastroCtrl', function($scope, $firebaseAuth, $state) {
  
  $scope.usuario = {};
  $scope.criar = function(usuario){
    
    $firebaseAuth().$createUserWithEmailAndPassword(usuario.email, usuario.password).catch(function(error){
      var errorCode = error.code;
      var errorMessage = error.message;
    })
        alert("Cadastro Criado com Sucesso !");
        $state.go('login');
  }
})

.controller('cadastroviagemCtrl', function($scope, $firebaseArray, $state){ 
  
      $scope.viagem = {};
  
      $scope.salvar = function(viagem) {
        var ref = firebase.database().ref().child('viagens');
        $firebaseArray(ref).$add(viagem);
  
        $state.go('tabs.pacotes');
      }
})

.controller('viagemCtrl', function(){
})

.controller('geralCtrl', function($scope, $state, $stateParams, $firebaseObject){ 

    var id = $stateParams.id;

    var ref = firebase.database().ref("viagens").child(id);
    $scope.viagem = $firebaseObject(ref);

})

.controller('informacoesCtrl', function($scope, $state, $stateParams, $firebaseObject){

  var id = $stateParams.id;
  
      var ref = firebase.database().ref("viagens").child(id);
      $scope.viagem = $firebaseObject(ref);

})

.controller('senhaCtrl', function(){ 
})

.controller('roteiroCtrl', function(){
})

.controller('chatCtrl', function(){ 
})

.controller('listaCtrl', function(){ 
})

.controller('perfilCtrl', function(){ 
})

.controller('pacotesCtrl', function($scope, $firebaseArray){

  var ref = firebase.database().ref().child("viagens");
  $scope.viagens = $firebaseArray(ref);
  
  $scope.apagar = function(id) {
    
          var obj = $scope.viagens.$getRecord(id);
    
          $scope.viagens.$remove(obj); // objeto inteiro ou índice
        }
  
  
})

.controller('dicasCtrl', function(){ 
})