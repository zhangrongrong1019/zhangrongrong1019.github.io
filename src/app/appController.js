'use strict';
angular.module('app')
	.controller('appController',[ '$rootScope', '$scope','ajaxRquest', '$state', function($rootScope,$scope,ajaxRquest,$state) {

       $scope.goBack=function(){
            history.go(-1);
       }
} ]);
