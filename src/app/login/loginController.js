'use strict';
angular.module('app')
    .controller('loginController',[ '$rootScope', '$scope','ajaxRquest', '$state','$interval', function($rootScope,$scope,ajaxRquest,$state,$interval) {
        $scope.isMobile = false;//手机号是否正确
        $scope.isValid = true;//是否获取过验证码
        $scope.isValidCode = false;//验证码是否正确
        $scope.$watch('mobile',function(newValue){
            if(!newValue){
                $scope.isMobile = false;
            }else if(newValue.toString().length>=11){
                if (!(/^((13|15|18|14|17)[0-9]{9})$/.test($scope.mobile))) {
                    $scope.formError({text:"请输入正确的手机号"});
                    $scope.isMobile = false;
                }else{
                    $scope.isMobile = true;
                }
            }else{
                $scope.isMobile = false;
            }
        })
        $scope.$watch('validCode',function(newValue){
            if(!newValue){
                $scope.isValidCode = false;
            }else if(newValue.toString().length>=4){
                if (!(/^[0-9]{4}$/.test($scope.validCode))) {
                    $scope.formError({text:"请输入正确的手机验证码"});
                    $scope.isValidCode = false;
                }else{
                    $scope.isValidCode = true;
                }
            }else{
                $scope.isValidCode = false;
            }
        })
        $scope.validFont = "获取验证码";
        $scope.getValidCode = function(){
            // 获取手机验证码接口–王坤
            ajaxRquest.getData('/userCenter/sendSmsCode',{
                mobile: ($scope.mobile).toString(),	//	String	获取验证码的手机好	是
                opType: "register",	//	String	短信类型	是(register-注册，login-登录或者授权)
            }).then(function(res){
                console.log(res);
                if(res.resCode === "00000"){
                    $scope.$apply(function(){
                        $scope.isValid = false;
                        var time = 10;
                        $scope.validFont = time + "s";
                        var timer = $interval(function(){
                            // $scope.isMobile = false;
                            time--;
                            $scope.validFont = time + "s";
                            if(time == 0){
                                $interval.cancel(timer);
                                $scope.validFont = "重新获取";
                                $scope.isValid = true;
                            }
                        },1000);
                    })
                }else{
                    $scope.formError({text: res.resMsg});
                }
            })
        }
        // 表单验证提交
        $scope.submit = function(){
            if($scope.isValid){
                console.log(123)
                $scope.loginData();
            }

        }
        // 注册接口–王坤
        $scope.loginData = function(){
            ajaxRquest.getData('/userCenter/register',{
                mobile: ($scope.mobile).toString(), //	String	手机号	是
                uid_hyz:"123abc",
                verifyCode: ($scope.validCode).toString(),	//	String	手机验证码	是
            }).then(function(res){
                console.log(res);
                if(res.resCode === "00000"){
                    $state.go("access.index");
                }else{
                    $scope.isValid = false;
                    $scope.formError({text:res.resMsg});
                }
            })
        }

    } ]);
