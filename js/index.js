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
})()