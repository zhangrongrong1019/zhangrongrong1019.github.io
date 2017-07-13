/**
 * Created by Admin on 2017/7/11.
 */
(function(){
    var isPlay = true;
    var music=document.querySelector(".music");
    var aud=document.querySelector(".aud");
    var _img=$(".img");
    setTimeout(function(){
        aud.play();
    },100);

    music.addEventListener("touchstart",function(){
        if(!isPlay){
            aud.play();
            isPlay = true;
            _img.css({'-webkit-animation-play-state':'running','animation-play-state':'running'});
            //_img.style.animationPlayState="running"
            //_img.style.webkitAnimationPlayState="running"
            /*  _img.setAttribute("class", "startMusic");*/
        }else{
            aud.pause();
            _img.css({'-webkit-animation-play-state':'paused','animation-play-state':'paused'});
            //_img.style.animationPlayState="paused"
            //_img.style.webkitAnimationPlayState="paused"
            /* _img.setAttribute("class", "stopMusic");*/
            /* _img.style.animationPlayState="paused"*/
//			this.style.opacity=0
        }
    })
/*2秒后loading页消失*/
setTimeout(function(){
    $(".loading").css("display","none")
    $(".firstPage").css("display","block")
},3000)
/*点击手势，页面跳转*/
    $(".firstPage").click(function(){
        $(".firstPage").css("display","none")
        $("#touchs").css("display","block")
    })
    /*爆品场景文字切换*/
    $(".baopinText img:not(:first)").css("display","none");//只显示第一张图片，其它隐藏
    var last = $(".baopinText img:last");
    var first = $(".baopinText img:first");
    setInterval(function(){
        if(last.is(":visible")){
            first.fadeIn(400).addClass("in");
            last.hide();
        }else{
            $(".baopinText img:visible").addClass("in");
            $(".baopinText img.in").next().fadeIn(400);
            $(".baopinText img.in").fadeOut(400).removeClass("in");
        }
    },2000);
    /*表演场景文字切换*/
    $(".biaoyanText img:not(:first)").css("display","none");//只显示第一张图片，其它隐藏
    var last1 = $(".biaoyanText img:last");
    var first1 = $(".biaoyanText img:first");
    setInterval(function(){
        if(last1.is(":visible")){
            first1.fadeIn(400).addClass("in");
            last1.hide();
        }else{
            $(".biaoyanText img:visible").addClass("in");
            $(".biaoyanText img.in").next().fadeIn(400);
            $(".biaoyanText img.in").fadeOut(400).removeClass("in");
        }
    },1500);
    /*PK赛场景文字切换*/
    $(".PKsaiText img:not(:first)").css("display","none");//只显示第一张图片，其它隐藏
    var last2 = $(".PKsaiText img:last");
    var first2 = $(".PKsaiText img:first");
    setInterval(function(){
        if(last2.is(":visible")){
            first2.fadeIn(500).addClass("in");
            last2.hide();
        }else{
            $(".PKsaiText img:visible").addClass("in");
            $(".PKsaiText img.in").next().fadeIn(500);
            $(".PKsaiText img.in").fadeOut(500).removeClass("in");
        }
    },2000);

   /* wx.onMenuShareTimeline({
        title: 'asdfasd', // 分享标题
        desc: 'asdfasd', // 分享描述
        link: "zhangrongrong1019.github.io", // 分享链接
        imgUrl: "https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png", // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
            //errorMessage("分享成功");
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            //errorMessage("未分享");
        }
    });
    //获取“分享给朋友”按钮点击状态及自定义分享内容接口
    wx.onMenuShareAppMessage({
        title: "asdfasd", // 分享标题
        desc: "afasdfa", // 分享描述
        link: "zhangrongrong1019.github.io", // 分享链接
        type: 'link', // 分享类型,music、video或link，不填默认为link
        imgUrl: "https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png", // 分享图标
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            // 用户确认分享后执行的回调函数
            //errorMessage("分享成功");
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            //errorMessage("未分享");
        }
    });*/

})()