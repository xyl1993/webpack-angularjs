import './../bower_components/bootstrap/dist/css/bootstrap.css'
import './assets/css/styles.css'
import index from './templates/index/index.html'

//模块化
var mainModule = angular.module('mainModule', ['ui.router',
				'ngResource', 'ngSanitize']);

//全局配置
mainModule.run(['$rootScope','$state','$http','$stateParams','$location','$timeout','$window',
	function($rootScope, $state, $http, $stateParams, $location,$timeout,$window) {
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
	
	// 路由调整完成后根据state添加标志
	$rootScope.$on('$stateChangeSuccess', 
		function(event, toState, toParams, fromState){
          var toStateUrl = toState.name,
              $item = $('.nav-item');
          $rootScope.toStateUrl = toStateUrl;
          $item.removeClass('active');
	});
}]);

///路由配置
mainModule.config(['$stateProvider','$urlRouterProvider','$compileProvider',
	function($stateProvider,$urlRouterProvider,$compileProvider) {
	$stateProvider.state('index',{
		url : '/index',               
		template : index
	})
	$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|sms):/);
	$urlRouterProvider.otherwise('/index');   //默认home
}]);

