/**
 * Created by Admin on 2017/7/11.
 */
(function(){
    var music=document.querySelector(".music")
    var aud=document.querySelector(".aud")
    var _img=document.querySelector(".img")
    music.addEventListener("click",function(){
        if(aud.paused){
            aud.play()
            _img.style.animationPlayState="running"
        }else{
            aud.pause()
            _img.style.animationPlayState="paused"
//			this.style.opacity=0
        }
    })
/*2秒后loading页消失*/
setTimeout(function(){
    $(".loading").css("display","none")
    $(".firstPage").css("display","block")
},3000)
/*点击手势，页面跳转*/
    $(".firstBtn").click(function(){
        $(".firstPage").css("display","none")
        $("#touchs").css("display","block")
    })
    /**/


    wx.onMenuShareTimeline({
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
    });

})()