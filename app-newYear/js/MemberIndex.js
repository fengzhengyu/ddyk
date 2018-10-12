/**
 * Created by Administrator on 2017/8/29.
 */
$(function(){
    var uploadImg = $('#uploadImg'), //上传头像按钮
        uploadPhotoBtn = $('#uploadPhotoBtn'),// 确定上传头像
        popup_btn = $('#btn_popup'), //遮罩
        popup_box = $('.popup_box'), //遮罩内容
        close_btn = $('#close_btn'), //关闭遮罩
        close_btn2 = $('#close_btn2'),//取消遮罩
        token = $.cookie('userToken'),//userId
        nickname = $('#nickname'),//昵称
        registerTime = $('#registerTime'),//注册时间
        goldTotal = $.cookie('goldTotal'),//会员积分
        userPhoto = $('#photo'), //头像容器
        integral = $('#integral'),  //签到积分
        time = new Date().getTime(),//+ 60*60*24*1000
        integralCount = $('#integralCount'),//显示积分容器
        signUrl = DD_api.memberLoginGoldAuth,
        signList = {userToken:token,memberAddGoldTime:time},
        signRes = getAjax(signUrl,signList);
    //判断签到状态
    if(signRes.flag == 'success'){
        if(signRes.info == '未签到'){
            integral.val('签到送积分');
            integral.css('background','#30a5ff');
            integral.css('cursor','pointer');
        }else{
            integral.val('已签到');
            integral.attr('disabled',"false");
            integral.css('background','#ccc');
            integral.css('color','#0060a9');
            integral.css('cursor','auto');
        }
    }
    //积分显示
    integralCount.html(goldTotal);
    //上传头像遮罩
        uploadImg.click(function(e){
        popup(popup_btn );
        e.stopPropagation();
    });
    close_btn.click(function(){
        popup_btn .fadeOut();
    });
    close_btn2.click(function(){
        popup_btn .fadeOut();
    });
   popup_box.click(function(e){
        e.stopPropagation();
    });
    $(document).click(function(){
        popup_btn.fadeOut();
    });
    //上传头像
    uploadPhotoBtn.click(function(){
        var options= {
            url: DD_api.memberIndexPhoto,
            type:"post",
            data:{userToken:token},
            dataType: "text",
            contentType: "application/json;charset=utf-8",
            success:function(data){
                var res = JSON.parse(data);
                var photo = res.returnData;
               // console.log(res)
                if(res.flag == 'success'){
                    $.cookie('userPhoto',photo,{expires:1,path:'/'});
                    userPhoto.attr('src', $.cookie('userPhoto'));
                    popup_btn.fadeOut();
                    window.location.reload();
                }else{
                   alert(res.info);
                }
            },
            error : function(XmlHttpRequest, textStatus, errorThrown) {
                console.log(textStatus);
                console.log(errorThrown);
            }
        };
        $('#form').ajaxSubmit(options);
        return false;
    });

    if($.cookie('userPhoto')){
        userPhoto.attr('src',$.cookie('userPhoto'))
    }else{
        userPhoto.attr('src','images/photo.png');
    }
    if(token){
        var url = DD_api.memberAllInfo,
            list = {userToken:token},
            res = getAjax(url,list),
            member_data = $('.member_data'),
            data = res.data,
            num = '';
        for(var i=0;i<data.length;i++){
            num += '<a href="javascript:;"><div class="icon icon'+(i+1)+'"></div><div class="message"><p>'+data[i].num+'</p><span>已'+data[i].name+'信息</span></div></a>';
        }
        member_data.html(num);
        nickname.html($.cookie('userName'));
        registerTime.html($.cookie('userTime'));
    }
    integral.click(function(){
        var url = DD_api.memberLoginGold,
                list = {userToken:token,memberAddGoldTime:time},
                res =getAjax(url,list);
        if(res.flag == 'success'){
            alert(res.info);
            $(this).attr('disabled',"true");
            $(this).val('已签到');
            $(this).css('background','#ccc');
            $(this).css('color','#0060a9');
            var integration = parseInt(goldTotal)+parseInt(5);
            integralCount.html(integration);
            $.cookie('goldTotal',integration,{expires:1,path:'/'});
        }else{
            alert(res.info);
        }
    })

});