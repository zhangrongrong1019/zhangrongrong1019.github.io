'use strict';
// 

var app = angular.module('app')
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        // 默认地址
        $urlRouterProvider.otherwise('/access/index');
        // 状态配置
        $stateProvider
        .state('access', {
            url: '/access',
            templateUrl: 'src/app/app.html?',
            controller: 'appController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                    return uiLoad.load('src/app/appController.js?');
                }]
            }
        })
        /*授权*/ 
        .state('access.index',{
            url: '/index',
            templateUrl: 'src/app/index/index.html',
            controller: 'indexController',
            data:{
                required:false
            },
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                    return uiLoad.load('src/app/index/indexController.js?');
                }]
            }
        })   
        /*首页 （k码和趣场景）*/ 
        .state('access.activity',{
            url: '/activity',
            templateUrl: 'src/app/activity/activity.html',
            controller: 'activityController',
            data:{
                required:false
            },
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                    return uiLoad.load('src/app/activity/activityController.js?');
                }]
            }
        })
        .state('access.login',{
            url:'/login',
            templateUrl:'src/app/login/login.html?',
            controller:'loginController',
            data:{
                required:false
            },
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                    return uiLoad.load('src/app/login/loginController.js?');
                }]
            }
        })
    }])
    .controller("navCtrl",function($rootScope,$state,$scope) {

    })
    .run(['$rootScope', '$state', '$stateParams','$timeout', '$templateCache',
          function ($rootScope,$state,$stateParams,$timeout, $templateCache) {
                //console.log(window.location.href);
              //$scope.getUrlParam(window.location.href);
              //var uid = $scope.getUrlParam("uid");
              //var phone = $scope.getUrlParam("phone");
              //var platform = $scope.getUrlParam("platform");
              //var webType = $scope.getUrlParam("webType");
              //$.cookie("uid",uid);
              //$.cookie("phone",phone);
              //$.cookie("platform",platform);
              //$.cookie("webType",webType);
              $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                  var from =  fromState.name, to = toState.name;
              });
             $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

             } )
          }
      ]);