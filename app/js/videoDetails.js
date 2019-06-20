/**
 * Created by Administrator on 2017/11/27.
 */

$(function(){
    var website=location.href,
        arr=website.split("?")[1],
        arr1=arr.split("&");
    for(var i=0;i<arr1.length;i++){
        var arr2=arr1[i].split("=");
        if(arr2[0]=="pId"){
            var pId=arr2[1]; //获取父类Id
        }  if(arr2[0]=="sunId") {
            var sunId = arr2[1]; //获取父类Id
        }if(arr2[0]=="vId"){
            var id=arr2[1];
        }

    }
    var token = $.cookie('userToken'),
        goldTotal = $.cookie('goldTotal'),
        videoAddress = $.cookie('videoAddress'),
        videoId = $.cookie('videoId'),
        notice = $('#notice'), //黑色遮罩
        videoWarp = $('#playerBtn'),//播放遮罩
        popup = $('.videoPopup'),//弹框
        videoContent = $('#video'), // 视频内容
        parentSelect = $('#classifyNav'),    //父分类选择器
        videoTypeImg = ['romm','meet','product','publicity'], //父分类图标
        relationDataBox = $('#relationData'),
        relationUrl = DD_api.relationVideo,
        relationList = {videoId:id},
        relationRes = getAjax(relationUrl,relationList);
    console.log(relationRes)
    //相关视频数据
    if(relationRes.flag == 'success'){
        var relationDate = relationRes.data,
            relationVal = '';
        for(var r=0;r<relationDate.length;r++){
            relationVal += '<li><a href="videoDetails.html?pId='+pId+'&sunId='+sunId+'&vId='+relationDate[r].videoId+'" class="video_link"><div class="fl picture"><img src="'+relationDate[r].urlPhoto+'" alt="图已丢失"/><span class="time">'+relationDate[r].timeLong+'</span></div><div class="fl text"><span>'+relationDate[r].videoName+'</span><p>'+relationDate[r].introduce+'</p></div></a></li>'
        }
        relationDataBox.html(relationVal);
    }else{
        relationDataBox.html('<p style="height: 570px;color:#fff;text-align: center;line-height: 570px">暂无</p>');
    }

    //标题显示
    var parentName = $('#parentName');
    //图片显示
    var pData = sunList(pId,sunId);
    $.each(pData,function(i,item){

        if(item.videoId == id){
            videoWarp.html('<img src="'+item.urlPhoto+'" alt="图片已丢失"><i class="iconfont icon-bofang icon player-icon"></i>');
            parentName.html(item.videoName);
        }
    });


    parentList(DD_api.videoType,videoTypeImg,parentSelect); //父类列表数据渲染
    //确认观看
    videoWarp.click(function(e){
        e.stopPropagation();

        if(token){
            var url= DD_api.videoInfo,
                list = {videoId:id,userToken:token},
                res = getAjax(url,list);
            // console.log(token)
            // console.log(id)
            // console.log(res)
                if(res.code == 1){
                    var html = '<div class="title">温馨提示：<span class="close">×</span></div><div class="content" id="videoInfo"></div><div class="btnWrapper"><span class="confirm" >确定</span><span class="cancel">取消</span></div>';
                    popup.html(html);
                    popup.find('#videoInfo').html(res.info);
                    popup.show();
                    var consumeGold = res.data.consumeGold,
                        videoId = res.data.videoId;
                    popup.find('.confirm').attr('data-id',videoId);
                    popup.find('.confirm').attr('data-score',consumeGold);
                }else if(res.flag == 'error'){
                    var html1 = '<div class="title">温馨提示：<span class="close">×</span></div><div class="content" id="videoInfo"></div><div class="btnWrapper"><span ><a href="IntegralRecharge.html" class="goGold">前往充值</a></span><span class="cancel">取消</span></div>';
                    popup.html(html1);
                    popup.find('#videoInfo').html(res.info);
                    popup.show();
                }
                else{
                    var videoUrl = res.data.urlAddress;
                    videoContent.show();
                    videoWarp.hide();
                    var videoObject = {
                        container: '#video',
                        variable: 'player',
                        poster: videoWarp.children('img').attr('src'),
                        autoplay:true,
                        video:{
                            file: videoUrl,//视频地址
                            type: 'video/mp4'
                        }
                    };
                    var player =new ckplayer(videoObject);
                }



        }else{
            alert('您未登录，请登录！');
            location.href = 'login.html'
        }
    });



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
                logo: 'null',
                autoplay:true,
                poster: videoWarp.children('img').attr('src'),
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

});