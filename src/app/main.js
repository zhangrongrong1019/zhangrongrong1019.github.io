'use strict';

var app = angular.module('app', ['ui.load', 'ui.router', 'ngStorage', 'brantwills.paging', 'oc.lazyLoad', 'ngImgCrop']);

/* Controllers */
angular.module('app')
  .controller('AppCtrl', ['$scope', '$localStorage', '$window','$http','$state','$rootScope','$timeout',
    function($scope,$localStorage,$window,$http,$state,$rootScope,$timeout) {
        var isIE = !!navigator.userAgent.match(/MSIE/i);
        isIE && angular.element($window.document.body).addClass('ie');
        isSmartDevice($window) && angular.element($window.document.body).addClass('smart');

        function isSmartDevice($window) {
            // Adapted from http://www.detectmobilebrowsers.com
            var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
            // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
            return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
        }
        $scope.getUrlParam= function(name) {
            var paramIndex=window.location.href.indexOf('?')
            if(paramIndex!=-1){
                var parameter= window.location.href.substring(paramIndex)
                var reg = new RegExp("(^|[&|?])" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
                var r = parameter.match(reg); //匹配目标参数
            }
            if (r != null) return unescape(r[2]); return null; //返回参数值
        }
        var uid = $scope.getUrlParam("uid");
        var phone = $scope.getUrlParam("phone");
        var platform = $scope.getUrlParam("platform");
        var webType = $scope.getUrlParam("webType");
        $.cookie("uid",uid);
        $.cookie("phone",phone);
        $.cookie("platform",platform);
        $.cookie("webType",webType);
        $.ajaxSetup({
            type : "POST",
            beforeSend: function(evt, request, settings) {
                var huiToken=$.cookie("huiToken");
                evt.setRequestHeader("huiToken", huiToken);
            },
            error : function(jqXHR, textStatus, errorThrown) {
                switch (jqXHR.status) {
                case (404):
                $scope.formError({
                    text:"提交数据出错了！", //内容
                    // btnCancel:false, //取消按钮
                    // btnConfirm:true, //确认按钮
                    // resCode:'00001'
                })
                break;
                }
            }
        });
        $scope.uuid=function(len, radix) {
            var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
            var uuid = [], i;
            radix = radix || chars.length;
            
            if (len) {
                // Compact form
                for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
            } else {
                // rfc4122, version 4 form
                var r;
            
                // rfc4122 requires these characters
                uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
                uuid[14] = '4';
            
                // Fill in random data.  At i==19 set the high bits of clock sequence as
                // per rfc4122, sec. 4.1.5
                for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random()*16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
                }
            }
            
            return uuid.join('');
        }
        $scope.formatDate=function(time){
            // 对Date的扩展，将 Date 转化为指定格式的String
            // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
            // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
            // 例子： 
            // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
            // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
            Date.prototype.Format = function (fmt) { //author: meizz 
                var o = {
                    "M+": this.getMonth() + 1, //月份 
                    "d+": this.getDate(), //日 
                    "h+": this.getHours(), //小时 
                    "m+": this.getMinutes(), //分 
                    "s+": this.getSeconds(), //秒 
                    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
                    "S": this.getMilliseconds() //毫秒 
                };
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            }
            if(time){
            return new Date(time); 
            }else{
            return new Date(); 
            }     
        }
        // $rootScope.alertModel = $scope.alertModel = function(options){
        //     var params = {
        //         text:"我要提交咯！", //内容
        //         btnCancel:false, //取消按钮
        //         btnConfirm:true, //确认按钮
        //         resCode:'00001',
        //         closeSelf:false
        //     }
        //     $.extend(params,options);
        //     if(params.resCode=='00003'||params.resCode=='00005'){
        //         $state.go("access.login");
        //         // return false;
        //     }
        //     var reg1=/^[0][0-9]{3}[1-9]{1}$/.test(params.resCode);  //不是五个0 ，以0开头的
        //     var reg2=/^[1][0-9]{4}/.test(params.resCode);           //以1开头的

        //     var alertBox=document.createElement('div');
        //     alertBox.id='alertModel';
        //     alertBox.className='alertModel';
        //     var html='';
        //                 // html+='<div id="alertModel" class="alertModel">'
        //                 html+= '<div class="alertBox">'
        //                     html+='<h2 class="text-title marTop-sm">温馨提示'
        //                     html+='<i id="alertClose" class="iconfont icon-cancel cursor">&#xe62b;</i>'
        //                     html+='</h2><div class="alertContent">'
        //                     if(params.closeSelf){
        //                         html+='<div class="alertText"><i class="iconfont icon-stress">&#xe610;</i><span>'+params.text+'<br>窗口将在<em id="Countdown">3</em>s后关闭</span></div><div class="text-center">'
        //                    }else{
        //                         // html+='<i  class="iconfont icon-cancel cursor"></i>'
        //                         // html+='</h2><div class="alertContent">'
        //                         if(reg2){
        //                              html+='<div class="alertText2 alertText"><i class="iconfont icon-normal">&#xe603;</i><span class="text">'+params.text+'</span></div><div class="text-center">'
        //                         }
        //                         if(reg1){
        //                              html+='<div class="alertText2 alertText"><i class="iconfont">&#xe604;</i><span class="text">'+params.text+'</span></div><div class="text-center">'                   
        //                         }
        //                         if(params.btnCancel&&!params.closeSelf){
        //                              html+='<input type="button" class="btn btn-radius btn-lg btn-blue" id="cancleAlert" value="取消">'
        //                         } 
        //                         if(params.btnConfirm&&!params.closeSelf){
        //                              html+='<input type="button" class="btn btn-radius btn-lg btn-blue-bg marLeft-lg" autofocus id="confirmAlert" value="确认">'
        //                         } 
        //                     }          
        //                 html+='</div>'
        //               html+= '</div>'
        //              // html+='</div>'
        //    // alert(options.resCode)
        //     if(!$rootScope.onOff){
        //         $rootScope.onOff = !$rootScope.onOff;
        //         alertBox.innerHTML=html
        //         $('body').append(alertBox);
        //     }    
        //     var Countdown=$('#Countdown');
        //     var alertModel = $("#alertModel");
        //     if(params.closeSelf){
        //         $('.alertText').find('span').css({
        //             'lineHeight':'45px',
        //             'letter-spacing':'5px'
        //         })
        //         $('.alertText').find('.iconfont').css({
        //             'lineHeight':'92px'
        //         })
               
        //         return new Promise(function(resolve,reject){
        //              $("#alertClose").on('click',function(){
        //                 $rootScope.onOff = !$rootScope.onOff;
        //                 alertModel.remove();
        //                 clearInterval(timer)

        //             })  
        //             var i=3;
        //             var timer=setInterval(function(){
        //                 i--
        //                 Countdown.html(i);
        //                 if(i==0){
        //                     $rootScope.onOff=!$rootScope.onOff;   
        //                     alertModel.remove();
        //                     resolve()
        //                     clearInterval(timer)
        //                 }
        //             },1000);
        //         }) 
        //     }
        //     var alertFn=function(){
        //         function keyDownFn(){
        //             // alert(11)
        //             if(event.keyCode == '13'){
        //                 // alert('您输入的是回车键！');
        //                 $("#confirmAlert").click();
        //             }
        //         }
        //         if(document.getElementById("confirmAlert")){
        //             document.getElementById("confirmAlert").focus(); 
        //         }
                
        //         $(document).on('keydown',keyDownFn);
        //         return new Promise(function(resolve,reject){
        //             $("#confirmAlert").on('click',function(){
        //                 alertModel.remove();
        //                 $rootScope.onOff = !$rootScope.onOff;
        //                 resolve(params.text);
        //             })
        //             $("#cancleAlert").on('click',function(){
        //                 $rootScope.onOff = !$rootScope.onOff;
        //                 alertModel.remove();
        //                 // reject();
        //             }); 
        //            $("#alertClose").on('click',function(){
        //                 $rootScope.onOff = !$rootScope.onOff;
        //                 alertModel.remove();
        //             })  
        //         }) 
        //     } 
        //     return alertFn();
        // }
        $rootScope.formError = $scope.formError = function(options){
            var params = {
                text:"错误信息", //内容
            }
            $.extend(params,options);
            var alertBox=document.createElement('div');
            alertBox.id='alertModel';
            alertBox.className='alertModel';
            var html = '<div class="loadingMessage">'+
                            '<font>'+ params.text +'</font></div>';
            if(!$rootScope.onOff){
                $rootScope.onOff = !$rootScope.onOff;
                alertBox.innerHTML = html;
                $('body').append(alertBox);
            }    
            var alertModel = $("#alertModel");
            return new Promise(function(resolve,reject){
                var timer = $timeout(function(){
                    $rootScope.onOff = !$rootScope.onOff; 
                    alertModel.remove();
                    resolve();
                    $timeout.cancel(timer);
                },1000);
            }) 
        }
        $scope.percentage=function(value){
            return Number(value*100).toFixed(2)+'%';
        }

        $scope.getUrlParam= function(name) {
            var paramIndex=window.location.href.indexOf('?')
            if(paramIndex!=-1){
               var parameter= window.location.href.substring(paramIndex)
               var reg = new RegExp("(^|[&|?])" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
               var r = parameter.match(reg); //匹配目标参数
            }
           
            if (r != null) return unescape(r[2]); return null; //返回参数值
        }

        //隐藏数字中间, 调用：numHide(13888888888)或numHide('13888888888');

        $scope.replaceNumber=function(m){
            if(m.length <= 11){
                return m.substr(0, 3) + '****' + m.substr(7);
            }else{
                return m.substr(0, 4) + ' **** **** ' + m.substr(13);
            }
        }

    }]);