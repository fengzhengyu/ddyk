/**
 * Created by Administrator on 2017/11/27.
 */

$(function(){

    var token = $.cookie('userToken'),
        goldTotal = $.cookie('goldTotal'),
        videoAddress = $.cookie('videoAddress'),
        videoId = $.cookie('videoId'),
        notice = $('#notice'), //黑色遮罩
        videoWarp = $('#playerBtn'),//播放遮罩
        popup = $('.videoPopup'),//弹框
        videoContent = $('#video'), // 视频内容
        link = window.location.search,
        id= link.substring(link.lastIndexOf('=')+1, link.length);
    var parentSelect = $('#classifyNav');           //父分类选择器
    var videoTypeImg = ['romm','meet','product','publicity']; //父分类图标
    parentList(DD_api.videoType,videoTypeImg,parentSelect); //父类列表数据渲染
    console.log(token)
    videoWarp.click(function(e){
        e.stopPropagation();
        if(token){
            var url= DD_api.videoInfo,
                list = {videoId:id,userToken:token},
                res = getAjax(url,list);
            if(res.flag == 'success'){
                console.log(res)
                var html = '<div class="title">温馨提示：<span class="close">×</span></div><div class="content" id="videoInfo"></div><div class="btnWrapper"><span class="confirm" >确定</span><span class="cancel">取消</span></div>';
                popup.html(html);
                popup.find('#videoInfo').html(res.info);
                popup.show();
                var consumeGold = res.data.consumeGold,
                    videoId = res.data.videoId;
                popup.find('.confirm').attr('data-id',videoId);
                popup.find('.confirm').attr('data-score',consumeGold);
            }else{
                alert(res.info)
            }
        }else{
            alert('您未登录，请登录！');
            location.href = 'login.html'
        }
    });
    //确认观看
    popup.on('click','.confirm',function(e){
        e.stopPropagation();
        var url = DD_api.videoPlay,
            score = $(this).attr('data-score'),
            videoId =  $(this).attr('data-id'),
                list = {userToken:token,videoId:videoId,consumeGold: score},
            res = getAjax( url,list);
        if(res.flag == 'success'){
            var address = res.info.urlAddress;
            $.cookie('videoAddress',address,{expires:1});
            var integration = parseInt(goldTotal) - parseInt( score);
            $.cookie('goldTotal',integration,{expires:1,path:'/'});
            $.cookie('videoId',id,{expires:1});
            var videoObject = {
                container: '#video',
                variable: 'player',
                autoplay:true,
                poster: '',
                video:{
                    file: address,//视频地址
                    type: 'video/mp4'
                }
            };
            var player =new ckplayer(videoObject);
            videoContent.show();
            videoWarp.hide();
            notice.hide();
            popup.hide();


        }else{
            alert(res.info)
        }
    });
    //取消弹框
    popup.on('click','.cancel',function(e){
       e.stopPropagation();
        notice.hide();
        popup.hide();

    });
    //取消弹框
    popup.on('click','.close',function(e){
       e.stopPropagation();
        notice.hide();
        popup.hide()

    })
    //
    if(token && videoId == id){
        videoContent.show();
        videoWarp.hide();
        var videoObject = {
            container: '#video',
            variable: 'player',
            poster: '',
            video:{
                file: videoAddress,//视频地址
                type: 'video/mp4'
            }
        };
        var player =new ckplayer(videoObject);
    }

});