// config
window.APP = { version : 'v=20170509' };
angular.module('app')
    .config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',function ($controllerProvider,   $compileProvider,   $filterProvider,   $provide) {
            // lazy controller, directive and service
            app.controller = $controllerProvider.register;
            app.directive  = $compileProvider.directive;
            app.filter     = $filterProvider.register;
            app.factory    = $provide.factory;
            app.service    = $provide.service;
            app.constant   = $provide.constant;
            app.value      = $provide.value;
    }])
    .config(function($provide){
        jQuery.validator.addMethod("mail", function (value, element) {
            var mail = /^[a-z0-9._%-]+@([a-z0-9-]+\.)+[a-z]{2,4}$/;
            return this.optional(element) || (mail.test(value));
        }, "邮箱格式不对");

        //电话和手机验证规则
        jQuery.validator.addMethod("contacts", function (value, element) {
                var contacts = /^0\d{2,3}-\d{7,8}$/;
                var mobile = /^1[3|4|5|7|8]\d{9}$/;
                var noactel = /^\d{7,8}$/;
            return function(){
                    if(contacts.test(value)||mobile.test(value)||noactel.test(value))
                        return true
                    }();
        }, "电话格式如：0371-68787027");

        //电话验证规则
        jQuery.validator.addMethod("phone", function (value, element) {
            var phone = /^0\d{2,3}-\d{7,8}$/;
            return this.optional(element) || (phone.test(value));
        }, "电话格式如：0371-68787027");

        //区号验证规则  
        jQuery.validator.addMethod("ac", function (value, element) {
            var ac = /^0\d{2,3}$/;
            return this.optional(element) || (ac.test(value));
        }, "区号如：010或0371");

        //无区号电话验证规则  
        jQuery.validator.addMethod("noactel", function (value, element) {
            var noactel = /^\d{7,8}$/;
            return this.optional(element) || (noactel.test(value));
        }, "电话格式如：68787027");

        //手机验证规则  
        jQuery.validator.addMethod("mobile", function (value, element) {
            var mobile = /^1[3|4|5|7|8]\d{9}$/;
            return this.optional(element) || (mobile.test(value));
        }, "手机格式不对");

        //邮箱或手机验证规则  
        jQuery.validator.addMethod("mm", function (value, element) {
            var mm = /^[a-z0-9._%-]+@([a-z0-9-]+\.)+[a-z]{2,4}$|^1[3|4|5|7|8]\d{9}$/;
            return this.optional(element) || (mm.test(value));
        }, "格式不对");

        //url  
        jQuery.validator.addMethod("url", function (value, element) {
            var url=/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
            return this.optional(element) || (url.test(value));
        }, "格式不对");

        //电话或手机验证规则  
        jQuery.validator.addMethod("tm", function (value, element) {
            var tm=/(^1[3|4|5|7|8]\d{9}$)|(^\d{3,4}-\d{7,8}$)|(^\d{7,8}$)|(^\d{3,4}-\d{7,8}-\d{1,4}$)|(^\d{7,8}-\d{1,4}$)/;
            return this.optional(element) || (tm.test(value));
        }, "格式不对");

        //年龄
        jQuery.validator.addMethod("age", function(value, element) {   
            var age = /^(?:[1-9][0-9]?|1[01][0-9]|120)$/;
            return this.optional(element) || (age.test(value));
        }, "不能超过120岁"); 
        ///// 20-60   /^([2-5]\d)|60$/

        //传真
        jQuery.validator.addMethod("fax",function(value,element){
            var fax = /^(\d{3,4})?[-]?\d{7,8}$/;
            return this.optional(element) || (fax.test(value));
        },"传真格式如：0371-68787027");

        //验证当前值和目标val的值相等 相等返回为 false
        jQuery.validator.addMethod("equalTo2",function(value, element){
            var returnVal = true;
            var id = $(element).attr("data-rule-equalto2");
            var targetVal = $(id).val();
            if(value === targetVal){
                returnVal = false;
            }
            return returnVal;
        },"不能和原始密码相同");

        //大于指定数
        jQuery.validator.addMethod("gt",function(value, element){
            var returnVal = false;
            var gt = $(element).data("gt");
            if(value > gt && value != ""){
                returnVal = true;
            }
            return returnVal;
        },"不能小于0 或空");

        //汉字
        jQuery.validator.addMethod("chinese", function (value, element) {
            var chinese = /^[\u4E00-\u9FFF]+$/;
            return this.optional(element) || (chinese.test(value));
        }, "格式不对");

        //指定数字的整数倍
        jQuery.validator.addMethod("times", function (value, element) {
            var returnVal = true;
            var base=$(element).attr('data-rule-times');
            if(value%base!=0){
                returnVal=false;
            }
            return returnVal;
        }, "必须是发布赏金的整数倍");

        //身份证
        jQuery.validator.addMethod("idCard", function (value, element) {
            var isIDCard1=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;//(15位)
            var isIDCard2=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;//(18位)

            return this.optional(element) || (isIDCard1.test(value)) || (isIDCard2.test(value));
        }, "格式不对");

        $.extend({'cookie':function(name, value, options) {
            if(cookieIsEnable){
                if (typeof value != 'undefined') { // name and value given, set cookie
                    options = options || {};
                    if (value === null) {
                        value = '';
                        options.expires = -1;
                    }
                    var expires = '';
                    if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                        var date;
                        if (typeof options.expires == 'number') {
                            date = new Date();
                            date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                        } else {
                            date = options.expires;
                        }
                        expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
                    }
                    var path = options.path ? '; path=' + options.path : '';
                    var domain = options.domain ? '; domain=' + options.domain : '';
                    var secure = options.secure ? '; secure' : '';
                    document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
                } else { // only name given, get cookie
                    var cookieValue = null;
                    if (document.cookie && document.cookie != '') {
                        var cookies = document.cookie.split(';');
                        for (var i = 0; i < cookies.length; i++) {
                            var cookie = jQuery.trim(cookies[i]);
                            // Does this cookie string begin with the name we want?
                            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                                break;
                            }
                        }
                    }
                    return cookieValue;
                }
            }else{
                alert('cookie 禁用');
            }
            function cookieIsEnable(){
                return window.navigator.cookieEnabled;
            }
        }});
        jQuery.validator.addMethod('stringCheck',function(value,element){
            return this.optional(element)||/^[a-zA-Z0-9\u4e00-\u9fa5]*$/.test(value);
        },'只能包含字母、数字和汉字');
        jQuery.validator.addMethod('isPhone',function(value,element){
            var mobileRgx = /^1[3-8][0-9]\d{8}$/;
            var telRgx =  /^(\d{3,4}-){0,1}\d{7,9}$/;
            return this.optional(element)||mobileRgx.test(value)||telRgx.test(value);
        },'请输入正确格式的手机或电话号码');
        jQuery.validator.addMethod('maxLengthB',function(value,element,params){
            var b=0,l=value.length;
            for(var i=0;i<l;i++){
                if(value.charCodeAt(i)>255){
                    b+=2;
                }else{
                    b++;
                }
            }
            return this.optional(element)||b<=params[0];
        });
    })
    .config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
      // We configure ocLazyLoad to use the lib script.js as the async loader
      $ocLazyLoadProvider.config({
          debug:false,
          events: true,
          modules: [{
              name: 'toaster',
              files: [
                  'lib/angular/toaster.js',
                  'lib/angular/toaster.css'
              ]
          }]
      });
    }])
    .filter('label', function() { // 显示为标签
          return function(input, s) {
              var l = input.split(s);
              var r = '';
              for(var i=0; i<l.length; i++) {
                  r += '<label class="label label-info">' + l[i] + '</label>\n';
              }
              return r;
          }
    })
    .filter('trustHtml', function ($sce) { // 安全HTML
        return function (input) {
            return $sce.trustAsHtml(input);
        }
    })
    .directive('tabs', function() {  
        return {  
            restrict: 'E',  
            transclude: true,  
            scope: {
                event:"="
            },  
            controller: [ "$scope", function($scope) {  
                var panes = $scope.panes = [];  
        
                $scope.select = function(pane) {  
                    angular.forEach(panes, function(pane) {  
                        pane.selected = false;  
                    });  
                    pane.selected = true;  
                }  
            
                this.addPane = function(pane) {  
                    if (panes.length == 0) $scope.select(pane);  
                    panes.push(pane);  
                }  

                $scope.changeTab=function(index){
                    // $scope.$apply(function(){
                       $scope.event=index 
                    // })
                     
                }
            }],  
            template:  
                '<div class="marTop-lg">' +  
                '<ul class="tabs clear">' +  
                    '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}" ng-click="changeTab($index)">'+  
                    '<a href="" ng-click="select(pane)">{{pane.title}}</a>' +  
                    '</li>' +  
                '</ul>' +  
                '<div class="marTop-lg tab-pane" ng-transclude></div>' +  
                '</div>',  
            replace: true  
        };  
    })
    .directive('tabItem', function() {  
        return {  
            require: '^tabs',  
            restrict: 'E',  
            transclude: true,  
            scope: { title: '@' },  
            link: function(scope, element, attrs, tabsCtrl) {  
                tabsCtrl.addPane(scope);  
            },  
            template:  
                '<div class="tab-item" ng-class="{active: selected}" ng-transclude></div>',  
            replace: true  
        };  
    }) 
    .directive('echart', ['$window','ajaxRquest','$timeout','$interval',function($window,ajaxRquest,$timeout,$interval) {  
        return {  
            scope: {  
                echartOptions:"=",
                data:'=',
                id:"@"
            },  
            restrict: 'AE',  
            template: '<div style="width:100%;height:400px;"></div>',  
            replace: true,  
            link: function(scope, element, attrs, controller) { },
            controller:function($scope){
                // alert(document.getElementById($scope.id))
                $scope.myChart = echarts.init(document.getElementById($scope.id),'macarons');
                var option = {
                    // 提示框，鼠标悬浮交互时的信息提示  
                    tooltip: {  
                        show: true,  
                        trigger: 'item'  
                    },  
                    // 图例  
                    legend: {  
                        textStyle:{color:'#393d40',fontSize:'14'},
                        data: [""]  
                    },  
                    // 横轴坐标轴  
                    xAxis: [{
                        type: 'category',
                        data: [],
                        boundaryGap:false
                    }],
                    // 纵轴坐标轴  
                    yAxis: [{  
                        type: 'value'  
                    }],  
                    // 数据内容数组  
                    series: [{
                        name:"",
                        type:"line",
                        data:[],
                        showAllSymbol: true,
                        // yAxisIndex: 0, 0默认第一条Y轴线  1...n条Y轴线 
                    }] 
                }  
                $scope.getdata = function(){
                    // console.log($scope.echartOptions);
                    $scope.myChart.showLoading();
                    var newOption = $.extend(option,$scope.echartOptions);
                    $scope.myChart = echarts.init(document.getElementById($scope.id),'macarons');
                    $scope.myChart.hideLoading();
                    // console.log(newOption);
                    $scope.myChart.setOption(newOption);
                    $window.onresize = function() {
                        $scope.myChart.resize(); 
                    };
                }
                $scope.getdata();
                $scope.$watch("data",function(newValue,oldValue){
                    if(newValue){
                        $scope.getdata();
                    }
                })
            }
        } 
    }])
    .directive('uiNav', ['$timeout', function($timeout) {
        return {
            restrict: 'AC',
            link: function(scope, el, attr) {
                var _window = $(window), 
                _mb = 768, 
                wrap = $('.app-aside'), 
                next, 
                backdrop = '.dropdown-backdrop';
                // unfolded
                el.on('click', 'a', function(e) {
                next && next.trigger('mouseleave.nav');
                var _this = $(this);
                _this.parent().siblings( ".active" ).toggleClass('active');
                _this.next().is('ul') &&  _this.parent().toggleClass('active') &&  e.preventDefault();
                // mobile
                _this.next().is('ul') || ( ( _window.width() < _mb ) && $('.app-aside').removeClass('show off-screen') );
                });

                // folded & fixed
                el.on('mouseenter', 'a', function(e){
                next && next.trigger('mouseleave.nav');
                $('> .nav', wrap).remove();
                if ( !$('.app-aside-fixed.app-aside-folded').length || ( _window.width() < _mb ) || $('.app-aside-dock').length) return;
                var _this = $(e.target)
                , top
                , w_h = $(window).height()
                , offset = 50
                , min = 150;

                !_this.is('a') && (_this = _this.closest('a'));
                if( _this.next().is('ul') ){
                    next = _this.next();
                }else{
                    return;
                }
                
                _this.parent().addClass('active');
                top = _this.parent().position().top + offset;
                next.css('top', top);
                if( top + next.height() > w_h ){
                    next.css('bottom', 0);
                }
                if(top + min > w_h){
                    next.css('bottom', w_h - top - offset).css('top', 'auto');
                }
                next.appendTo(wrap);

                next.on('mouseleave.nav', function(e){
                    $(backdrop).remove();
                    next.appendTo(_this.parent());
                    next.off('mouseleave.nav').css('top', 'auto').css('bottom', 'auto');
                    _this.parent().removeClass('active');
                });

                $('.smart').length && $('<div class="dropdown-backdrop"/>').insertAfter('.app-aside').on('click', function(next){
                    next && next.trigger('mouseleave.nav');
                });

                });

                wrap.on('mouseleave', function(e){
                    next && next.trigger('mouseleave.nav');
                    $('> .nav', wrap).remove();
                });
            }
        };
    }])
    .directive("myJob", ['ajaxRquest',function(ajaxRquest){
        return {
            restrict: 'AE',  
            transclude: true,
            replace: true,
            scope:{
                data:"=",
                accounttype:"=",
                callback:"&",
                defaultlabel:"@"
            },
            template:'<div class="inline-block jobs">'+
                        '<input type="text" ng-focus="showDetail()" name="job" title="{{name}}" class="txt-normal" ng-model="name" readOnly required placeholder="行业类型" data-msg-required="请填写行业类型"/>'+
                        '<div class="cover" ng-if="isShow">'+
                            '<div class="businessLabelDetail">'+
                                '<div class="title">选择行业（最多只能选择<span>5</span>项）</div>'+
                                '<div class="LabelDetailBody">'+
                                    '<div ng-if="data1.length" class="selecedItems">'+
                                        '<span ng-repeat="item in data1" ng-click="removeSelf($index)">{{item.industryName}} x</span>'+
                                    '</div>'+
                                    '<div class="sideBar">'+
                                        '<ul>'+
                                            '<li ng-repeat="item in jobs" class="{{item.class}}" ng-class="showBkg+$index" ng-click="select($index,item)">{{item.industryName}}</li>'+
                                        '</ul>'+
                                    '</div>'+
                                    '<div class="main">'+
                                        '<ul>'+
                                            '<li ng-repeat="item in jobs[index].detail"><span ng-click="choose(item)">{{item.industryName}}</span></li>'+
                                        '</ul>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="buttonWrap">'+
                                    '<button ng-click="confirm()">确定</button>'+
                                    '<button ng-click="cancle()">取消</button>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>',
            controller:function($scope){
                $scope.jobs = []; //整个左侧菜单和右侧列表的数组
                $scope.index = 0; //左侧菜单的下标
                $scope.data1 = [];   //输出的数组
                
                $scope.$watch('defaultlabel',function(){
                    $scope.name=$scope.defaultlabel
                    $scope.data1=angular.copy($scope.data)
                       
                    
                })
 
                $scope.getFirst = function(){
                    // 获取行业一级菜单
                    ajaxRquest.getData("/manageAccount/getIndustry",{
                        accountType: $scope.accounttype || "1" //	String	账户类型	否
                    }).then(function(res){
                        // console.log(res);
                        if(res.resCode == "00000"){
                            $scope.$apply(function(){
                                var p = {};
                                // $scope.firstItem = res.records;
                                angular.forEach(res.records,function(value,key){
                                    p = {
                                        industryName:value.industryName,
                                        industryNo:value.industryNo
                                    }
                                    $scope.jobs.push(p);
                                })
                                $scope.firstNo = res.records[0].industryNo;
                                $scope.jobs[$scope.index].class = "current";
                                $scope.getTwo();
                            })
                        }
                    });
                }
                //测试二级菜单接口
                $scope.getTwo = function(){
                    if(!$scope.jobs[$scope.index].detail){
                        ajaxRquest.getData("/manageAccount/getTwoEnterpriseType",{
                            accountType: $scope.accounttype || "1",
                            parentNo: ($scope.firstNo).toString()
                        }).then(function(res){
                            // console.log(res);
                            if(res.resCode == "00000"){
                                $scope.$apply(function(){
                                    $scope.jobs[$scope.index].detail=res.records;
                                })
                            }
                        });
                    }
                }
                $scope.getFirst();
                $scope.isShow=false;
                $scope.showDetail=function(){
                    $scope.isShow=true;
                    if($("#finishData")){
                        $("#finishData").css({"overflow-y":'visible'})
                    }
                    if($scope.data){
                        $scope.data1=angular.copy($scope.data)
                        $scope.arr =$scope.data1
                    }
                }
                // 左侧菜单点击
                $scope.select=function(_index,item){
                    $scope.index = _index;
                    var len = $scope.jobs.length;
                    for(var i=0;i<len;i++){
                        $scope.jobs[i].class='';
                    }
                    $scope.jobs[_index].class='current';
                    $scope.firstNo = item.industryNo;
                    $scope.getTwo();
                };
                // 右侧点击
                $scope.arr =[];
                $scope.choose=function(item){
                    var onOff = false; //默认点击二级行业不在数组里
                    var len = $scope.arr.length;
                    if(len > 0){
                        for(var i=0; i<len; i++){
                            if($scope.arr[i].industryNo == item.industryNo){
                                onOff = true;
                                $scope.arr.splice(i,1);
                                $scope.data1 = $scope.arr;
                                $scope.getName();
                                return;
                            }
                        }
                    }
                    if(!onOff && len < 5){
                        $scope.arr.push(item);
                    }
                    $scope.data1 = $scope.arr;

                    $scope.getName();
                };
                // 顶部选项移除
                $scope.removeSelf = function(_index){
                    $scope.data1.splice(_index,1);
                    $scope.getName();
                };
                // name字符串拼接
                $scope.getName = function(){
                    $scope.newName = [];
                    for(var j = 0; j < $scope.data1.length; j++){
                        $scope.newName.push($scope.data1[j].industryName);
                    }
                   
                }
                // 确定
                $scope.confirm = function(){
                    if($("#finishData")){
                        $("#finishData").css({"overflow-y":'scroll','opacity':1})
                    }
                    if($scope.callback){
                        $scope.callback($scope.data1);
                    }
                    $scope.data=$scope.data1
                    $scope.name = $scope.newName.join(",");
                    $scope.isShow=false;
                };
                // 取消
                $scope.cancle = function(){
                    if($("#finishData")){
                        $("#finishData").css("overflow-y",'scroll')
                    }

                    $scope.isShow = false;
                };

            }
        }
    }])
    .directive("upLoad",["$parse",function($parse){
        return{
            restrict: 'AE',
            scope:{
                data:'=',
                ratios:'@ratio'
            },
            controller:function($scope, $rootScope,fileReader,ajaxRquestImg){
                $scope.alertModel=function(value){
                    $rootScope.alertModel({
                        text:value, //内容
                        btnCancel:false, //取消按钮
                        btnConfirm:true, //确认按钮
                        resCode:'00001'
                    })
                }
                $rootScope.multiResult=[];//将最终结果挂载到根作用域
                $scope.data=[]; //将每个上传视图结果挂载到局部作用域
                $scope.imgNumber=0
                $scope.$watch("data",function(){
                     $rootScope.multiResult.push($scope.data);
                     
                })
                $rootScope.$watch('multiResult',function(newValue){
                    if(sessionStorage.getItem('multiResult')){     //fuck
                        var obj={}
                        obj.src=JSON.parse(sessionStorage.getItem('multiResult'))[0][0].src
                            $scope.data.push(obj)
                     }
                })

                $scope.upLoadImg=function(result){
                    ajaxRquestImg.getData('/upload/image',{
                        'fileData':result
                    }).then(function(res){
                        // console.log(res)
                        if(res.resCode=='00000'){
                            $scope.$apply(function(){
                                $scope.imgSrc=res.records[0];
                                $scope.checkImgSize();
                            })
                        }else{
                        $scope.imgNumber--
                        $rootScope.alertModel({
                            text:res.resMsg, //内容
                            resCode:res.resCode
                        })
                        }
                    })
                }

                
                $scope.checkImgSize=function(){
                    if($scope.ratios){
                        var arr=$scope.ratios.split(":");
                        $scope.ratio=Number(arr[0])/Number(arr[1]);
                    } 
                    var image = new Image();
                    image.src = $scope.imgSrc;
                    image.onload=function(){
                        var height = image.height;
                        var width = image.width; 
                        if($scope.ratio&&(width/height/$scope.ratio!==1)){
                            $scope.alertModel('请上传比例为'+$scope.ratios+'的图片')
                             $scope.imgNumber--
                            $scope.isRightRatio=false;
                        }else{
                            $scope.isRightRatio=true;
                        }
                        if($scope.ratio&&$scope.isRightRatio){
                            $scope.$apply(function(){
                                $scope.data.push({
                                    src:$scope.imgSrc
                                });
                            })
                        }else if(!$scope.ratio){
                            $scope.$apply(function(){
                                $scope.data.push({
                                    src:$scope.imgSrc
                                });
                            })
                        }
                    }
                }
                $scope.getFile = function () {
                    if(fileReader){
                            fileReader.readAsDataUrl($scope.file, $scope)
                            .then(function(result) {
                                $scope.upLoadImg(result);
                            });
                        }else{
                        $scope.alertModel('对不起！您的浏览器版本过低，请使用高版本浏览器');
                    }
                };
            },
            link:function(scope, element, attrs,$rootScope){
                scope.inputElement = element.find('input');
                scope.inputElement.bind('change', imgupload);
                function imgupload(event){
                    scope.multi=attrs.multi;
                    if(scope.multi<=scope.imgNumber){
                        return false
                    }
                    scope.imgNumber++
                    scope.obj=element;
                    scope.id=attrs.id;
                    //附件预览
                    if(event.dataTransfer){
                        scope.file= event.dataTransfer.files[0];
                    }else{
                        scope.file = (event.srcElement || event.target).files[0];
                    }
                    if(!/.(gif|jpg|jpeg|png|GIF|JPG|png)$/.test(scope.file.type)){
                        scope.alertModel('图片格式不正确');
                        this.value="";
                        scope.imgNumber--
                        return false;
                    }
                    if(scope.file.size>100000){
                        scope.alertModel('图片大小超过限制');
                        this.value="";
                        scope.imgNumber--
                        return false;
                    }
                    scope.getFile();
                    this.value="";
                }
                element[0].onclick=function(e){
                    var el=e||window.event;
                    var target=el.target||el.srcElement
                    if(target.nodeName.toLowerCase()=='span'){
                        var index=$(target).attr('index');
                        scope.$apply(function(){
                            scope.data.splice(index,1);
                            scope.imgNumber--
                        })
                    }
                    
                }
                var dropbox=element[0];
                dropbox.addEventListener("dragenter", function(e){
                    e.stopPropagation();
                    e.preventDefault();
                }, false);
                dropbox.addEventListener("dragover", function(e){
                    e.stopPropagation();
                    e.preventDefault();
                }, false);
                dropbox.addEventListener("drop", function(e){
                    e.stopPropagation();
                    e.preventDefault();
                    if(attrs.draggable){
                        imgupload(e);
                    }
                }, false);
            }
        }
    }])
    .factory('fileReader', ["$q", "$log", function($q, $log){
        var onLoad = function(reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.resolve(reader.result);
                });
            };
        };

        var onError = function (reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.reject(reader.result);
                });
            };
        };

        var getReader = function(deferred, scope) {
            var reader = new FileReader();
            reader.onload = onLoad(reader, deferred, scope);
            reader.onerror = onError(reader, deferred, scope);
            return reader;
        };

        var readAsDataURL = function (file, scope) {
            var deferred = $q.defer();
            var reader = getReader(deferred, scope);
            reader.readAsDataURL(file);
            return deferred.promise;
        };
        return {
            readAsDataUrl: readAsDataURL
        };
    }])
    .directive("mySelect",function(){
        return {
            restrict: 'E',
            replace:true,
            transclude:true,
            scope:{
                datadefault:"=",
                defaultid:"@",
                defaultname:"@",
                dataout:"=",
                datain:"@"
            },
            template:"<div class='selectWrap' ng-transclude></div>",
            link:function(scope,elemet,attrs){
                var oUl=elemet[0].getElementsByTagName("ul")[0];
                scope.input=elemet[0].getElementsByTagName("input");
                scope.freshData=function(){
                    if(!scope.defaultid&&!scope.defaultname){
                         scope.input[0].value=scope.li[0].scope.text;
                        scope.dataout=scope.li[0].scope.value;
                    }
                    // }else{
                    //     var datadefault = JSON.parse(scope.datadefault);
                    //      scope.input[0].value = defaultname?defaultname:datadefault.name;
                    //     scope.dataout = defaultid? datadefault.defaultid:datadefault.id;
                    // }

                    oUl.style.top= scope.input[0].offsetHeight+1+'px';
                    // oUl.style.top= '33px';
                    scope.input[0].onfocus=function(){
                        oUl.style.display='block';
                    }
                     scope.input[0].onblur=function(){
                        setTimeout(function(){
                            oUl.style.display='none';
                        },250)
                    }
                    for(var i=0 ;i<scope.li.length;i++){
                        scope.li[i].el[0].index=i;
                        scope.li[i].el[0].onclick=function(){
                            var _this=this;
                            scope.$apply(function(){
                                 scope.input[0].value=scope.li[_this.index].scope.text;
                                 scope.dataout=scope.li[_this.index].scope.value;
                            })
                        }
                    }
                }
            },
            controller:function($scope){
                $scope.$watch('defaultname+defaultid',function(v){
                   if(v){
                     $scope.input[0].value=$scope.defaultname
                   }
                })
                $scope.$watch('defaultid',function(v){
                   if(v){
                     $scope.dataout=$scope.defaultid
                   }
                })
                var aLi=$scope.li=[];
                this.getEl=function(data){
                    aLi.push(data);
                    $scope.freshData();
                }
            }
        }
    })
    .directive('myOption',function(){
        return {
            restrict: 'E',
            require:'^mySelect',
            replace:true,
            transclude:true,
            scope:{text:"@",value:"@",defaultname:"@",defaultvalue:"@"},
            link:function(scope,elemet,attrs,ctrls){
                ctrls.getEl({"el":elemet,"scope":scope});
            },
            template:"<li ng-transclude></li>"
        }
    })
    .service("ajaxRquest",["$q","$http",function($q,$http){
        var PD=new Array ;
        var PD2=new Array ;
        Array.prototype.remove=function(val){
            var index=this.indexOf(val);
            if(index>-1){
                this.splice(index,1);
            }
        }
        var request_param = function () {
            var clientName = 'nuojfApp';
            var clientVersion = '1.0.0';
            var os = 'ios';
            var osVersion = '7.0';
            var brand = 'Xiaomi';
            var model = 'RedmiNote4';
            var uuid = 'abcdefg';
            var networkType = 'wifi';
            var resolution = '1920*1080';
            var st = new Date().getTime();
            var key = 'key=82q*ngZzt7BoMMcUq%NvEUBdTnrw*DZ$';
            var paramStr = key+'&brand='+brand+'&clientName='+clientName+'&clientVersion='+clientVersion+'&model='+model+'&networkType='+networkType+'&os='+os+'&osVersion='+osVersion+'&resolution='+resolution+'&st='+st+'&uuid='+uuid;
            var sign = hex_md5(paramStr);
            return '?clientName='+clientName + '&clientVersion='+clientVersion+ '&os='+os+ '&osVersion='+osVersion+ '&brand='+brand+ '&model='+model+'&uuid='+uuid+ '&networkType='+networkType+ '&resolution='+resolution+ '&st='+st+ '&sign='+sign;
        };
        function loadingMessage(str) {
            var html = '<div class="loadingMessage" style="bottom: 100px; position: fixed; text-align: center; width: 100%; display:none; z-index:1000;"><font style="background-color: rgba(0, 0, 0, 0.7); border-radius: 5px; color: #fff; z-index:1000; display: inline-table; line-height: 170%; max-width: 80%; padding: 5px 10px;font-size:14px">'+ str +'</font></div>';
            $("body").append(html);
            $("body .loadingMessage").fadeIn("normal");
        }
        function hideLoading(){
            $("body .loadingMessage").fadeOut("normal",function(){
                $(this).remove();
            })
        }
        this.getData=function(url,params,method){
            var dtd = $.Deferred(); // 新建一个Deferred对象
            var dtd2=$.Deferred();
            for(var i=0;i<PD.length;i++){
                if(PD[i]==url){
                    return dtd2.promise();
                }
            }
            PD.push(url);
            PD2.push(params);
            var ifcToken= $.cookie('ifcToken');
            url = "/iFengChao-Hui-Web"+url+request_param();
            if(method==undefined||method==""||method=="undefined"){
                var method='POST';
            }
            var  secret='7$T5rcaOjA35bKoy&*dBbQS^ZPUsMDJj';
            // console.log(params);
            params=JSON.stringify(params);
            var requestStr=DES3.encrypt(secret,params);
            function ajax(){
                hideLoading();
                loadingMessage("数据加载中...")
                // var dtd = $.Deferred(); // 新建一个Deferred对象
                $.ajax({
                    url : url,
                    type:method,
                    data: {'data':requestStr},
                }).then(function(result) {
                    hideLoading();
                    if(result){
                        var decResult = DES3.decrypt(secret,result);
                        var msg = JSON.parse(decResult);
                        msg = JSON.parse(decResult);
                        dtd.resolve(msg);
                    }
                    
                   PD=[];
                   PD2=[]
                },function(result){
                    hideLoading();
                    if(result){
                        var decResult = DES3.decrypt(secret,result);
                        msg = JSON.parse(decResult);
                        dtd.reject(msg);
                    }
                     PD=[];
                     PD2=[]
                });
                return dtd.promise();
            }
            return $.when(ajax());
       };
    }])
    .service("ajaxRquestImg",["$q","$http",function($q,$http){
        var request_param = function () {
            var clientName = 'nuojfApp';
            var clientVersion = '1.0.0';
            var os = 'ios';
            var osVersion = '7.0';
            var brand = 'Xiaomi';
            var model = 'RedmiNote4';
            var uuid = 'abcdefg';
            var networkType = 'wifi';
            var resolution = '1920*1080';
            var st = new Date().getTime();
            var key = 'key=82q*ngZzt7BoMMcUq%NvEUBdTnrw*DZ$';
            var paramStr = key+'&brand='+brand+'&clientName='+clientName+'&clientVersion='+clientVersion+'&model='+model+'&networkType='+networkType+'&os='+os+'&osVersion='+osVersion+'&resolution='+resolution+'&st='+st+'&uuid='+uuid;
            var sign = hex_md5(paramStr);
            return '?clientName='+clientName + '&clientVersion='+clientVersion+ '&os='+os+ '&osVersion='+osVersion+ '&brand='+brand+ '&model='+model+'&uuid='+uuid+ '&networkType='+networkType+ '&resolution='+resolution+ '&st='+st+ '&sign='+sign;
        };

        function loadingMessage(str) {
            var html = '<div class="loadingMessage" style="bottom: 100px; position: fixed; text-align: center; width: 100%; display:none; z-index:100000;"><font style="background-color: rgba(0, 0, 0, 0.7); border-radius: 5px; color: #fff; z-index:1000; display: inline-table; line-height: 170%; max-width: 80%; padding: 5px 10px;font-size:14px">'+ str +'</font></div>';
            $("body").append(html);
            $("body .loadingMessage").fadeIn("normal")
        }
        function hideLoading(){
            $("body .loadingMessage").fadeOut("normal",function(){
                $(this).remove();
            })
        }

        this.getData=function(url,params,method){
            var ifcToken= $.cookie('ifcToken');
            url = "/iFengChao-Hui-Web"+url+request_param();
            if(method==undefined||method==""||method=="undefined"){
                var method='POST';
            }
            var  secret='7$T5rcaOjA35bKoy&*dBbQS^ZPUsMDJj';
            function ajax(){
                var dtd = $.Deferred(); // 新建一个Deferred对象
                loadingMessage("图片上传中...");
                $.ajax({
                    url : url,
                    data: params
                }).then(function(result) {
                    // console.log(result);
                    hideLoading();
                    var decResult = DES3.decrypt(secret,result);
                    var msg = JSON.parse(decResult);
                    msg = JSON.parse(decResult);
                    dtd.resolve(msg);
                },function(result){
                    hideLoading();
                    var decResult = DES3.decrypt(secret,result);
                    msg = JSON.parse(decResult);
                    dtd.reject(msg);
                });
                return dtd.promise();
            }
            return $.when(ajax());
        };
    }])
    .directive("pagination",function(){
        return {
            restrict:"E",
            replace:true,
            transclude:true,
            scope:{
                conf:"=",
            },
            link:function(scope,element,attrs){
                var button1=element.find(".button1")
                var button2=element.find(".button2")
                scope.jugedisable=function(){
                    if(scope.conf.currentPage<=1){
                        scope.conf.currentPage=1;
                        button1.attr("disabled",true);
                        button1.css('background',"#eee")
                    }else{
                    
                        button1.removeAttr("disabled");
                        button1.css('background',"#fff")
                    }

                    if(scope.conf.currentPage>=scope.totalPageNum){
                        scope.conf.currentPage=scope.totalPageNum;
                        button2.attr("disabled",true);
                        button2.css('background',"#eee")
                    }else{
                        button2.removeAttr("disabled");
                        button2.css('background',"#fff")
                    }
                }
                // scope.jugedisable()
            },
            controller:function($scope){
                if(typeof $scope.conf.total=='string'){
                     $scope.conf.total=Number($scope.conf.total)
                }
                if(typeof $scope.conf.pageSize){
                    $scope.conf.pageSize=Number($scope.conf.pageSize)
                }
                $scope.setList=function(){
                    $scope.totalPageNum=Math.ceil($scope.conf.total/$scope.conf.pageSize)
                    if($scope.totalPageNum<=1){
                        $scope.totalPageNum=1
                        $scope.isPaging=false
                    }else{
                        $scope.isPaging=true
                    }
                    //将接口请求到的分页总数放入数组记录
                    $scope.pageList=[];
                    
                    for(var i=1 ; i<=$scope.totalPageNum;i++){
                            $scope.pageList.push(i)
                    }
                    // if($scope.conf.paginLength>=$scope.totalPageNum){
                    //     $scope.conf.paginLength=$scope.totalPageNum
                    // }

                    //根据总页数和长度划分区间   每个区间为显示的分页数
                    
                        $scope.listRegion=[]
                        for(var i=1;i<=$scope.totalPageNum;i++){
                            // console.log(i,$scope.conf.paginLength)
                            if(i%$scope.conf.paginLength==1){
                                // alert(111)
                                $scope.listRegion.push(i);
                            }
                        }
                        // console.log($scope.listRegion)
                }

            // $scope.setList()

            //判断是否到达下一个分页区间
                $scope.nextList=function(){
                for(var i=0;i<$scope.listRegion.length;i++){
                        if(i<$scope.listRegion.length-1){
                            if($scope.conf.currentPage>=$scope.listRegion[i]&&$scope.conf.currentPage<$scope.listRegion[i+1]){
                                $scope.startPageNum=$scope.listRegion[i];           //记录开始页码
                                $scope.endPageNum=$scope.startPageNum+$scope.conf.paginLength-1 //记录结束页码
                                $scope.newPageList= $scope.pageList.slice($scope.startPageNum-1,$scope.endPageNum)//在总的分页素组中截取分页区间，呈现在页面的分页都是在这个数组中
                                break;
                            }
                        }else{
                                $scope.startPageNum=$scope.listRegion[i];           //记录开始页码
                                $scope.newPageList= $scope.pageList.slice($scope.startPageNum-1,$scope.totalPageNum)
                                break;
                        }
                    }
                }
                // $scope.nextList()

                // alert($scope.conf.totalPageNum)
                $scope.$watch("conf.total++conf.pageSize",function(newValue){
                    
                    $scope.setList()
                    $scope.nextList()
                    $scope.jugedisable()
                    $scope.isShowPoint()
                    if(typeof ($scope.conf.jumpPage)=="function"){
                    $scope.conf.jumpPage($scope.totalPageNum)
                    }
                })


                //点击...按钮跳转方法 
                $scope.passMore=function(){
                $scope.conf.currentPage+=$scope.conf.paginLength
                }


                $scope.choosePage=function(num){
                    if(num!==undefined){
                      $scope.goTo=''
                      $scope.conf.currentPage=num
                      return false
                    }
                    if(Number($scope.goTo)>=Number($scope.totalPageNum)){
                        $scope.goTo=$scope.totalPageNum
                    }
                    $scope.conf.currentPage=Number($scope.goTo)

                }
                $scope.prevPage=function(){
                    $scope.conf.currentPage-=1;
                    $scope.goTo=''
                }

                $scope.nextPage=function(){
                    $scope.conf.currentPage+=1;
                    $scope.goTo=''
                }

            
            $scope.isShowPoint=function(){
                if($scope.conf.currentPage<$scope.listRegion[$scope.listRegion.length-1]){
                    $scope.isShow=true
                }else{
                    $scope.isShow=false
                }
            }

            $scope.$watch("conf.currentPage",function(){
                $scope.isShowPoint();
                $scope.nextList();
                $scope.jugedisable()
            })

            $scope.keyUpFn=function(e){
                if(e.keyCode==13){
                    $scope.choosePage()
                }
            }
            },
            template:'<div class="paging noselect " ng-show="isPaging"><div class="pagingContent">'+
                '<button ng-click="choosePage(1)" class="button1">首页</button>'+
                '<button ng-click="prevPage()" class="button1" >上一页</button>'+
                '<ul class="fl">'+
                    '<li ng-repeat="item in newPageList"  ng-class="{current:conf.currentPage==item}" ng-click="choosePage(item)">{{item}}</li>'+
                    '<li ng-show="isShow" ng-click="passMore()">...</li>'+
                    '<li ng-show="isShow" ng-click="choosePage(totalPageNum)">{{totalPageNum}}</li>'+
                '</ul>'+
                '<button ng-click="nextPage()" class="button2">下一页</button>'+
                '<button ng-click="choosePage(totalPageNum)" class="button2">尾页</button>'+
                '<span>{{conf.currentPage}}/共{{totalPageNum}}页</i></span>'+
                '<i class="fl jump">跳转到第</i><input type="text" value="1"  ng-keyup="keyUpFn($event)" ng-model="goTo"><i class="fl jump">页</i>'+
                '<button ng-click="choosePage()">GO</button>'+
            '</div></div>'
        }
    })
    .factory('excel',function($window){
        var uri='data:application/vnd.ms-excel;base64,',
            template='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
            template = '<html><head><meta charset="UTF-8"></head><body><table>{table}</table></body></html>',
             base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) },
             format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
        return {
            tableToExcel:function(tableId,worksheetName,deleteObj){
                setTimeout(function(){
                    if (!tableId.nodeType) table = $(document.getElementById(tableId)).clone()[0]
                    if(deleteObj){
                        var len; 
                        for(var i=0;i<deleteObj.length;i++){
                           len = table.rows.length; 
                            for(var j = 0;j < len;j++){
                                 var k=deleteObj[i]-i
                                 table.rows[j].deleteCell(k);
                            }
                        }
                    }   
                    var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
                    document.getElementById(tableId+"a").href = uri + base64(format(template, ctx));
                    document.getElementById(tableId+"a").download = worksheetName+'.xls';
                    document.getElementById(tableId+"a").click();
                },100)
            }
        };
    })
    .directive('lazyLode',function(){
        return{
            restrict: 'E',
            scope:{
                data:'='
            },
            replace: true,
            template:"<div></div>",
            link:function(scope,element,attrs,ctrls){

                var elHeigth=element.parent().height();
                var docHeigth=element.siblings('.scroll-body').height()
                var scrollTop;
                element[0].parentNode.onscroll=function(){
                    scrollTop=element.parent().scrollTop()
                    if(scrollTop>=docHeigth-elHeigth){
                        scope.$apply(function(){
                            scope.data.current++;

                        })
                    }
                }
            }
        }
    })
