'use strict';
angular.module('app')
	.controller('indexController',[  '$scope','$state','ajaxRquest', function($scope,$state,ajaxRquest) {
		$.cookie('runToken  ', null);

		$scope.mobile="13636460836";


		$scope.showModel=false;
		$scope.getVerificationCode=function(){
			$scope.showModel=true;
			var uuid=setUuid(32, 16);
			$scope.$watch('one', function (value) {
				if (value) {
					$(".modelBox").find('input').eq(1).focus()
					if ($scope.four) {
						$scope.postDate()
					}
				} else if (value == '') {
					$(".modelBox").find('input').css("border", "0rem");
					$scope.isShow = false;
				}
			})
			$scope.$watch('two', function (value) {

				if (value) {
					$(".modelBox").find('input').eq(2).focus()
					if ($scope.four) {
						$scope.postDate()
					}
				} else if (value == '') {
					$(".modelBox").find('input').css("border", "0rem");
					$scope.isShow = false;
					$(".modelBox").find('input').eq(0).focus()
				}
			})
			$scope.$watch('three', function (value) {
				if (value) {
					$(".modelBox").find('input').eq(3).focus()
					if ($scope.four) {
						$scope.postDate()
					}
				} else if (value == '') {
					$(".modelBox").find('input').eq(1).focus()
					$(".modelBox").find('input').css("border", "0rem");
					$scope.isShow = false;
				}
			})
			$scope.$watch('four', function (value) {
				if (value) {
					$scope.postDate()
				} else if (value == '') {
					$(".modelBox").find('input').css("border", "0rem");
					$scope.isShow = false;
					$(".modelBox").find('input').eq(2).focus()
				}
			})
			$scope.postDate = function () {
				if (!$scope.one || !$scope.two || !$scope.three || !$scope.four) {
					//验证码未输完整
					return false
				} else {
					$(".modelBox").find('input').css("border", "1px red solid");
					$scope.isShow = true;
					//验证码输入完整
					/*		ajaxRquest.getData("URL",{
					 'uuidParam':uuid
					 }).then(function(msg){
					 if(msg.resCode === "00000"){
					 //验证码输入正确
					 }else{
					 //验证码输入错误

					 }
					 })*/

				}
		}}
		$scope.closeModel=function(){
			$scope.showModel=false;
		}
} ]);

//(function (window, document) {
//		var active = 0;
//		var getInputVal="";
//		var errorMsg=document.getElementById("errorMsg");
//		var inputBtn = document.querySelectorAll('input');
//		console.log(inputBtn.length);
//		for (var i =0 ; i < inputBtn.length; i++) {
//			inputBtn[i].addEventListener('click', function () {
//				inputBtn[active].focus();
//			}, false);
//			inputBtn[i].addEventListener('focus', function () {
//				this.addEventListener('keyup', listenKeyUp, false);
//			}, false);
//			inputBtn[i].addEventListener('blur', function () {
//				this.removeEventListener('keyup', listenKeyUp, false);
//			}, false);
//		}
//		/**
//		 * 监听键盘的敲击事件
//		 */
//		function listenKeyUp() {
//			var beginBtn = document.querySelector('#beginBtn');
//			if (!isNaN(this.value) && this.value.length !=0 ) {
//				if (active < 3) {
//					active +=1 ;
//				}else if(active == 3){
//					for (var j =0 ; j < inputBtn.length; j++) {
//						getInputVal +=inputBtn[j].value;
//					}
//					if(getInputVal == 1234){
//						alert("ok")
//					}else{
//						//errorMsg.style.display="block";
//						$scope.$apply(function () {
//							$scope.isShow=true
//						})
//
//					}
//
//				}
//				/*console.log( this.value);*/
//				inputBtn[active].focus();
//			} else if (this.value.length == 0) {
//				if (active >0 ) {
//					active -=1 ;
//					console.log("cative-:"+active)
//				}
//				console.log( this.value);
//				inputBtn[active].focus();
//			}
//		}
//	}
//
//)(window, document);