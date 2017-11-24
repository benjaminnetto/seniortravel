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

  $stateProvider.state('cadastropacote', {
    url: '/cadastropacote',
    templateUrl: 'templates/cadastropacote.html',
    controller: 'cadastropacoteCtrl'
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

.controller('cadastropacoteCtrl', function($scope, $firebaseArray, $state){ 
  
      $scope.viagem = {};
  
      $scope.salvar = function(pacote) {
        var ref = firebase.database().ref().child('pacotes');
        $firebaseArray(ref).$add(pacote);
  
        $state.go('tabs.pacotes');
      }
})

.controller('viagemCtrl', function($scope, $firebaseArray, $state, $stateParams){

    var user = firebase.auth().currentUser;
  
    var ref = firebase.database().ref("viagens").child(user.uid);
    $scope.viagens = $firebaseArray(ref);
  
})

.controller('geralCtrl', function($scope, $state, $stateParams, $firebaseObject){ 

    var id = $stateParams.id;

    var user = firebase.auth().currentUser;

    var ref = firebase.database().ref("pacotes").child(id);
    $scope.pacote = $firebaseObject(ref);

    $scope.comprar =function() {
       var ref = firebase.database().ref("viagens").child(user.uid).child($scope.pacote.$id);
       $firebaseObject(ref).$loaded(function(viagem) {
         viagem.destino = $scope.pacote.destino;
         viagem.preco = $scope.pacote.preco;
         viagem.dataCompra = new Date().getTime();

         viagem.$save().then(function() {
           $state.go("tabs.viagem");
         })
       })
    }

})

.controller('informacoesCtrl', function($scope, $state, $stateParams, $firebaseObject){

      var id = $stateParams.id;
  
      var ref = firebase.database().ref("pacotes").child(id);
      $scope.pacote = $firebaseObject(ref);

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

  var ref = firebase.database().ref().child("pacotes");
  $scope.pacotes = $firebaseArray(ref);
  
  $scope.apagar = function(id) {
    
          var obj = $scope.pacotes.$getRecord(id);
    
          $scope.pacotes.$remove(obj); // objeto inteiro ou índice
        }
  
  
})

.controller('dicasCtrl', function(){ 
})