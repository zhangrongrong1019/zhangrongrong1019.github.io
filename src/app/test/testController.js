/**
 * Created by Administrator on 2017/6/9 0009.
 */
'use strict'

angular.module('#root').controller('controllerName',['$scope',function($scope){
    $scope.list = [{name:'你好',age:24},{name:'谢谢',age:18},{name:'hello',age:88}]
}])

'use strict';
angular.module('app')
    .controller('appController',[ '$rootScope', '$scope','ajaxRquest', '$state', function($rootScope,$scope,ajaxRquest,$state) {

        $scope.goBack=function(){
            history.go(-1);
        }
    } ]);