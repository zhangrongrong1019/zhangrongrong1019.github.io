/**
 * Created by Admin on 2017/5/6.
 */
function getTopHeight(){
    var headerHeight = $("#header").height();
    var APPListHeight = $("#myAPPList").height();
    var paddingTop = parseFloat($("#myAPPList").css('padding-top'));
    var contentBoxHeight = (APPListHeight+headerHeight+paddingTop*2);
    console.log(headerHeight);
    console.log(APPListHeight);
    console.log(contentBoxHeight);
    $(".contentBox").css({
        "position":"relative",
        "top":contentBoxHeight,
        "z-index":1
    });

}

function show1(){
    $('#popDiv').show();
    var t = setTimeout(function (){
        $('#popDiv').hide();
    },1000);
}






$(function(){
    getTopHeight()

/*    getTopHeight();*/


   /* $(window).bind("scroll", function(){
        var scrollTop = $(document).scrollTop();

        console.log(scrollTop);
        if(scrollTop > 0){
            $("header").css({
                "position":"fixed",
                "top":0,
                "z-index":10
            });
            $("#myAPPList").css({
                "position":"fixed",
                "top":"0.54rem",
                "z-index":10
            });
        }*/




    $(".editBtn").click(function(){
        var myAPPListHeight = $("#myAPPList").height();
        console.log(myAPPListHeight);
        /*点击编辑按钮*/
        if($(this).text() == "编辑"){
            $(this).text("完成");
            $(".APPIconBox .APPIcon p").next().addClass("deleteIcon");
            var BoxAPPIcon = $(".APPIconBox .APPIcon");
            var recommendAppIcon = $(".recommendApp .APPIcon");
          /*  console.log(recommendAppIcon);*/
            for(var i=0;i<=BoxAPPIcon.length;i++){
                var APPIconBoxUrlId=BoxAPPIcon.eq(i).attr("urlId");
                for(var j=0;j<=recommendAppIcon.length;j++){
                    var recommendAppUrlId=recommendAppIcon.eq(j).attr("urlId");
                    if(APPIconBoxUrlId === recommendAppUrlId){
                        console.log(recommendAppIcon.eq(j).attr("urlId"));
                        recommendAppIcon.eq(j).children("p").next().addClass("alreadyAdd");
                    }
                    else{
                        recommendAppIcon.eq(j).children("p").next().addClass("addIcon");
                    }
                }
            }

            var APPIconNum = $(".APPIconBox .APPIcon")
            if(APPIconNum.length>3){
                $(".addIcon").unbind("click");
                $(".addIcon").click(function(){
                    show1();
                })

            }else{
                loadListener();
            }
        }else{
            /*点击完成按钮*/
            $(this).text("编辑");
            $(".APPIconBox .APPIcon p").next().removeClass("deleteIcon");
            $(".recommendApp .APPIcon p").next().removeClass("addIcon");
            $(".recommendApp .APPIcon p").next().removeClass("alreadyAdd");
            loadListener();
        }

    })
})


function loadListener(){
    /*点击加号*/
    $(".addIcon").off("click").on("click",function(){


        $(this).addClass("alreadyAdd").removeClass("addIcon");
        $(this).parent().clone().appendTo($(".APPIconBox"))
        $(".APPIconBox .APPIcon p").next().addClass("deleteIcon").removeClass("alreadyAdd");
        $(this).unbind("click");
        var APPIconNum = $(".APPIconBox .APPIcon")
        if(APPIconNum.length>3){
            $(".addIcon").unbind("click");
            $(".addIcon").click(function(){
                show1();
            })
            $(".deleteIcon").off("click").on("click",function(){
                loadListener();
                var thisUrlId=$(this).parent().attr("urlId");
                for(var j=0;j<recommendAppIcon.length;j++){
                    var recommendAppUrlId=recommendAppIcon.eq(j).attr("urlId");
                    /*  console.log(thisUrlId);*/
                    console.log(recommendAppUrlId);
                    if(recommendAppUrlId === thisUrlId){
                        /*console.log("ok!");*/
                        recommendAppIcon.eq(j).children("p").next().addClass("addIcon").removeClass("alreadyAdd");
                    }}
                $(this).parent().remove();
                console.log($(this).parent());
                getTopHeight();
            });
        }else{
            loadListener();
        }


        getTopHeight();
    });
    var recommendAppIcon = $(".recommendApp .APPIcon");
    /*点击减号*/
    $(".deleteIcon").off("click").on("click",function(){
        loadListener();
        var thisUrlId=$(this).parent().attr("urlId");
        for(var j=0;j<recommendAppIcon.length;j++){
            var recommendAppUrlId=recommendAppIcon.eq(j).attr("urlId");
            /*  console.log(thisUrlId);*/
            console.log(recommendAppUrlId);
            if(recommendAppUrlId === thisUrlId){
                /*console.log("ok!");*/
                recommendAppIcon.eq(j).children("p").next().addClass("addIcon").removeClass("alreadyAdd");
            }}
        $(this).parent().remove();
        console.log($(this).parent());
        loadListener();
        getTopHeight();
    });
}