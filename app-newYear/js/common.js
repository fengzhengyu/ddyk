/**
 * Created by Administrator on 2017/6/7.
 */
(function(window) {
    var theUA = window.navigator.userAgent.toLowerCase();
    if ((theUA.match(/msie\s\d+/) && theUA.match(/msie\s\d+/)[0]) || (theUA.match(/trident\s?\d+/) && theUA.match(/trident\s?\d+/)[0])) {
        var ieVersion = theUA.match(/msie\s\d+/)[0].match(/\d+/)[0] || theUA.match(/trident\s?\d+/)[0];
        if (ieVersion <= 9) {

            var str = "你的浏览器版本太low了,请升级浏览器:";
            var str2 = "推荐使用:谷歌、火狐、搜狗、360、IE10、IE11等浏览器;";
            document.writeln("<pre style='text-align:center;color:#fff;background-color:#ff6000; height:100%;border:0;position:fixed;top:0;left:0;width:100%;z-index:1234'>" +
            "<h2 style='padding-top:200px;margin-bottom:30px;'><strong>" + str + "<br/></strong></h2><h2>" +
            str2 + "</h2></pre>");
        };
    }
})(window);
function popup(name){
    $(name).fadeIn();
    $(name).width($(document).offsetWidth);
    $(name).height($(document).offsetHeight);

};
function getAjax(url,list){

    var data = '';
    $.ajax({
        url:url,
        type:'post',
        data:list,
        async:false,
        dataType:"json",
        cache: false,
        crossDomain: true == !(document.all),
        success:function (res) {
            //console.log(res);
            data = res;
        },
        error:function(){
           console.log("Ajax获取数据失败！");
        }
    });
    return data;
}
//获取顶部文字防止乱码
function getQueryString(key){
    var reg = new RegExp("(^|&)"+key+"=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    return result?decodeURIComponent(result[2]):null;
}
//获取选中input 数组
function getSelected(obj){
    var  array=[];
    var  arr = obj;
    for(i=0;i<arr.length;i++){
        if(arr[i].checked){
            var a = arr[i].value;
            array.push(a)
        }
    }
    return array;
}
//获取元素位置
function getOffset(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    while (el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
    }
    return {
        left: left,
        top: top
    }
}
// 分享吸顶
function shareOffset(obj){
    var shareList = obj,
        shareTop = shareList.offset().top;
    $(window).scroll(function() {
        var scrollTop = $(window).scrollTop();
        if (scrollTop >= shareTop) {
            shareList.css({position: 'fixed',top: '20px'});
        } else {
            shareList.css('position','static');
        }
    });
}
//页面加载时
function loading(){
    document.onreadystatechange = function(){
        if (document.readyState == "complete") {
            var pageWrap = document.getElementById('pageWrap');
            if(!pageWrap){
                return;
            }
            pageWrap.style.display = 'block';
        }
    }
}
//主页顶部信息
function indexTop(){

    if($.cookie('userName') && $.cookie('userPhone') && $.cookie('userToken')){
        var name= $.cookie('userName');
        var html = '<a href="MemberIndex.html" title="会员中心">'+name+'</a>';
        $('.top_state span:first').html(html);
        $('.top_state').show();
        $('#login_register').hide();

        $('#close_login').click(function(){
            $.cookie('userName',null,{expires:-1,path:'/'});
            $.cookie('userPhone',null,{expires:-1,path:'/'});
            $.cookie('userToken',null,{expires:-1,path:'/'});
            $.cookie('userPhoto',null,{expires:-1,path:'/'});
            $.cookie('userTime',null,{expires:-1,path:'/'});
            $.cookie('userEmail',null,{expires:-1,path:'/'});
            $.cookie('goldTotal',null,{expires:-1,path:'/'});
            $(this).parent().hide();
            $('#login_register').show();
        })
    }else{
        $('.top_state ').hide();
        $('#login_register').show();
    }
}
//搜索商品 回车事件
function commodity(){
    document.onkeydown = function(e){
        var ev = document.all ? window.event : e;
        if(ev.keyCode==13) {
            var value =$('#searchText').val();
            if(value == ''|| value =='搜索商品'){
                alert('搜索不能为空或请输入的商品')
            }else{
                window.location.href="search.html?search="+value;
            }
        }
    };
}

//会员顶部信息
function memberTop(){
    if($.cookie('userName')){
        var name= $.cookie('userName');
        var photo = $.cookie('userPhoto');
        $('.top_right .account').html(name);
        $('.user_logo img').attr('src',photo);
        $('.top_right .top_close').click(function(){
            $.cookie('userName',null,{expires:-1,path:'/'});
            $.cookie('userPhone',null,{expires:-1,path:'/'});
            $.cookie('userToken',null,{expires:-1,path:'/'});
            $.cookie('userPhoto',null,{expires:-1,path:'/'});
            $.cookie('userTime',null,{expires:-1,path:'/'});
            $.cookie('userEmail',null,{expires:-1,path:'/'});
            $.cookie('goldTotal',null,{expires:-1,path:'/'});
            window.location.href="login.html";
        })
    }else{
        alert("您未登录,请登录！");
        window.location.href="login.html";
    }
}
$(function(){
    //  顶部导航
    $('.top_nav>ul>li').hover(function(){
        $(this).toggleClass('on');
    });

    //会员左侧导航栏
    $('.menu_list dt').click(function(){
        $(this).addClass('on').parent().siblings().children('dt').removeClass('on');
        $(this).siblings('dd').slideToggle(500).parent().siblings().children('dd').slideUp(500);
    });
    //


});

//获取视频父类列表标题
function parentList(url,videoTypeImg,videoType){
    var res = getAjax(url);   //分类api
    if(res.flag == 'success'){
        var data = res.data;      //分类数据
        if(data){
            var videoTypeName = '';   //分类inner
            for(var i=0;i<data.length;i++){
                videoTypeName += '<a href="videoList.html?id='+data[i].typeId+'" class="navList"><div class="navListImg fl">'+
                    '<img src="images/'+videoTypeImg[i]+'_img.png" alt=""/></div><div class="navListTitle fl">'+
                    '<h3>'+data[i].parentName+'</h3>'+
                    '<p>中国医药大健康发展高峰论坛</p></div></a>'
            }
            videoType.html(videoTypeName);

        }else{
            console.log('分类接口报错！');
        }

    }
}

//获取视频子类请求数据
function sunList(id,sunId,num){
    var url= DD_api.videoTypeList,
        list = {typeId:id,typeSunId:sunId,num:num},
        res = getAjax(url,list);
    var data = [];
    if(res.flag == 'success'){
        data = res.data;
    }else{
        return data;
    }
    return data;
};
//输出子类请求数据
function dataList(sunData,dataList1,pId,sunId){
    var sunVal = '',
        dataList = sunData;
    if(dataList.length<=0){
        dataList1.html('<p style="height: 350px;line-height:350px;font-size: 16px;color: #000;text-align: center;">暂无视频！</p>');
    }else{


        for(var i=0;i<dataList.length;i++){
            sunVal += '<li>'+
                '<a href="videoDetails.html?pId='+pId+'&sunId='+sunId+'&vId='+dataList[i].videoId+'" class="dataBox">'+
                '<div class="dataImg">'+
                '<img src="'+dataList[i].urlPhoto +'" alt="图片已丢失"/>'+
                '<p class="dataInfo">'+dataList[i].videoName+'</p>'+
                '<div class="playIcon on">'+
                '<div class="shade"></div>'+
                '<i class="iconfont icon-bofang icon"></i>'+
                '</div>'+
                '</div>'+
                '<div class="dataTitle">'+
                '<p>'+dataList[i].introduce+'</p></div></a></li>';
        }
        dataList1.html(sunVal);
    }
};

//分页插件
$.fn.extend({
    "initPage":function(listCount,currentPage,fun){
        var maxshowpageitem = $(this).attr("maxshowpageitem");
        if(maxshowpageitem!=null&&maxshowpageitem>0&&maxshowpageitem!=""){
            page.maxshowpageitem = maxshowpageitem;
        }
        var pagelistcount = $(this).attr("pagelistcount");
        if(pagelistcount!=null&&pagelistcount>0&&pagelistcount!=""){
            page.pagelistcount = pagelistcount;
        }

        var pageId = $(this).attr("id");
        page.pageId=pageId;
        if(listCount<0){
            listCount = 0;
        }
        if(currentPage<=0){
            currentPage=1;
        }
        page.setPageListCount(pageId,listCount,currentPage,fun);

    }
});

var  page = {
    "maxshowpageitem":5,//最多显示的页码个数
    "pagelistcount":10,//每一页显示的内容条数
    /**
     * 初始化分页界面
     * @param listCount 列表总量
     */
    "initWithUl":function(pageId,listCount,currentPage){

        var pageCount = 1;
        if(listCount>0){
            var pageCount = listCount%page.pagelistcount>0?parseInt(listCount/page.pagelistcount)+1:parseInt(listCount/page.pagelistcount);
        }
        var appendStr = page.getPageListModel(pageCount,currentPage);
        $("#"+pageId).html(appendStr);
    },
    /**
     * 设置列表总量和当前页码
     * @param listCount 列表总量
     * @param currentPage 当前页码
     */
    "setPageListCount":function(pageId,listCount,currentPage,fun){
        listCount = parseInt(listCount);
        currentPage = parseInt(currentPage);
        page.initWithUl(pageId,listCount,currentPage);
        page.initPageEvent(pageId,listCount,fun);

    },
    "initPageEvent":function(pageId,listCount,fun){
        $("#"+pageId +">li[class='pageItem']").on("click",function(){
            if(typeof fun == "function"){
                fun($(this).attr("page-data"));
            }
            page.setPageListCount(pageId,listCount,$(this).attr("page-data"),fun);
        });
    },
    "getPageListModel":function(pageCount,currentPage){
        var prePage = currentPage-1;
        var nextPage = currentPage+1;
        var prePageClass ="pageItem";
        var nextPageClass = "pageItem";
        if(prePage<=0){
            prePageClass="pageItemDisable";
        }
        if(nextPage>pageCount){
            nextPageClass="pageItemDisable";
        }
        var appendStr ="";
        appendStr+="<li class='"+prePageClass+"' page-data='1' page-rel='firstpage'>首页</li>";
        appendStr+="<li class='"+prePageClass+"' page-data='"+prePage+"' page-rel='prepage'>&lt;</li>";
        var miniPageNumber = 1;
        if(currentPage-parseInt(page.maxshowpageitem/2)>0&&currentPage+parseInt(page.maxshowpageitem/2)<=pageCount){
            miniPageNumber = currentPage-parseInt(page.maxshowpageitem/2);
        }else if(currentPage-parseInt(page.maxshowpageitem/2)>0&&currentPage+parseInt(page.maxshowpageitem/2)>pageCount){
            miniPageNumber = pageCount-page.maxshowpageitem+1;
            if(miniPageNumber<=0){
                miniPageNumber=1;
            }
        }
        var showPageNum = parseInt(page.maxshowpageitem);
        if(pageCount<showPageNum){
            showPageNum = pageCount
        }
        for(var i=0;i<showPageNum;i++){
            var pageNumber = miniPageNumber++;
            var itemPageClass = "pageItem";
            if(pageNumber==currentPage){
                itemPageClass = "pageItemActive";
            }

            appendStr+="<li class='"+itemPageClass+"' page-data='"+pageNumber+"' page-rel='itempage'>"+pageNumber+"</li>";
        }
        appendStr+="<li class='"+nextPageClass+"' page-data='"+nextPage+"' page-rel='nextpage'>&gt;</li>";
        appendStr+="<li class='"+nextPageClass+"' page-data='"+pageCount+"' page-rel='lastpage'>尾页</li>";
        return appendStr;

    }
};
