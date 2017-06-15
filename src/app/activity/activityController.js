
'use strict';
angular.module('app')
	.controller('activityController',['$scope', function($scope) {
		//ios所用的方法

		$scope.openNewApp=function(){
		var webType = $scope.getUrlParam("webType");
		console.log(webType)
		if(webType =="wkweb"){
			/!*alert(webType)*!/
			window.webkit.messageHandlers.HYZ_Model.postMessage({body: 'lincombfinance://Service/kcode'});
		}else{
				/!*alert(webType)*!/
			openApp(url="lincombfinance://Service/kcode")
				}
		}
		//Android所用的方法
		/*$scope.openNewApp=function(){
			window.Hstation.getData()
		}*/









		//锟斤拷锟斤拷锟絠os执锟叫的的凤拷锟斤拷
		/*$scope.openNewApp=function(){
				/!*openApp(url:lincombfinance://params?name=test')*!/
			}

			//锟斤拷锟斤拷锟紸ndroid执锟叫的的凤拷锟斤拷
		$scope.openNewApp=function(){
				web_webactivty.addJavascriptInterface(new MyJs(), "Hstation");
				window.Hstation.getData()
			}
*/

} ]);
