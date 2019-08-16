/**
 * Created by Administrator on 2017/8/29.
 */
$(function(){
    var token = $.cookie('userToken');
    if(token){
        var modify_popup =  $(".modify_popup"),
            popupBox =$('.popup_box'),

            userName = $.cookie('userName'),
            userPhone = $.cookie('userPhone'),
            userEmail = $.cookie('userEmail'),
            niceName = $('#niceName'),
            nickname = $('#nickname'),
            cPhone = $('#cPhone'),
            emailName = $('#emailName'),
            setEmail = $('#setEmail'),
            modifyName = $('.modify1'),
            modifyPassword = $('.modify2'),
            modifyPhone = $('.modify3'),
            modifyEmail = $('.modify4');
            logout = $('.logout');
        //修改昵称界面
        modifyName.click(function(e){
            popup(modify_popup);
            e.stopPropagation();
            var html = '<div class="top">修改用户昵称<span class="popup_close"></span></div><div class="middle"><p class="modifyName">新昵称：<input type="text" class="memberName"/></p></div><div class="bottom"><span class="btn2 popup_close2">取消</span><span class="btn1" id="nameBtn">确认</span></div>';
            popupBox.html(html);

        });
        //修改密码界面
        modifyPassword.click(function(e){
            popup(modify_popup);
            e.stopPropagation();
            var html = ' <div class="top">修改登陆密码<span class="popup_close popup_close2"></span></div><div class="middle middle2"><p class="modifyPass"><span>当前登录密码：</span><input type="password" class="memberPass" id="pass"/></p><p class="modifyPass"><span>新的登录密码：</span><input type="password" class="memberPass" id="pass1"/></p><p class="modifyPass"><span>确认新的登录密码：</span><input type="password" class="memberPass" id="pass2"/></p></div><div class="bottom"><span class="btn2 popup_close2 popup_close22">取消</span><span class="btn1" id="passBtn">确认</span></div>';
            popupBox.html(html);

        });
        //修改手机号界面
        modifyPhone.click(function(e){
            popup(modify_popup);
            e.stopPropagation();
            var html = '<div class="top">修改手机号码<span class="popup_close popup_close3"></span></div><div class="middle middle3"><p class="modifyPass"><span>当前手机号：</span><input type="text" class="memberPhone" id="oldPhone"/></p><p class="modifyPass"><span>新的手机号：</span><input type="text" class="memberPhone" id="newPhone"/></p></div><div class="bottom"><span class="btn2 popup_close2 popup_close33">取消</span><span class="btn1" id="phoneBtn">确认</span></div>';
            popupBox.html(html);

        });
        //修改邮箱界面
        modifyEmail.click(function(e){
            popup(modify_popup);
            e.stopPropagation();
            var html = '<div class="top">修改绑定邮箱<span class="popup_close popup_close4"></span></div><div class="middle"><p class="modifyName">新邮箱：<input type="text" class="memberEmail" id="email"/></p></div><div class="bottom"><span class="btn2 popup_close2 popup_close44">取消</span><span class="btn1" id="emailBtn">确认</span></div>';
            popupBox.html(html);

        });

         //注销
         logout.click(function(e){
            popup(modify_popup);
            e.stopPropagation();
            var html = '<div class="top">注销提示：<span class="popup_close popup_close4"></span></div><div class="middle"><p class="modifyName">注销后所有数据将无法恢复，您确定要注销吗？</p></div><div class="bottom"><span class="btn2 popup_close2 popup_close44">取消</span><span class="btn1" id="layoutBtn">确认</span></div>';
            popupBox.html(html);

        });
        //关闭
        popupBox.on('click','.popup_close',function(){
            modify_popup.fadeOut();
            popupBox.html('');

        });
        //取消
        popupBox.on('click','.popup_close2',function(){
            modify_popup.fadeOut();
            popupBox.html('');
        });
        //阻止事件
        popupBox.click(function(e){
            e.stopPropagation();
        });
        //dom取消
        $(document).click(function(){
            modify_popup.fadeOut();
            popupBox.html('');
        });

        // 确认注销
        popupBox.on('click','#layoutBtn',function(){
       
            var url = DD_api.memberCancel,
            list = {userToken:token};
            res = getAjax(url,list);
            console.log(res)
            if(res.flag == "success"){
                modify_popup.fadeOut();
                popupBox.html('');
                $.cookie('userName',null,{expires:-1,path:'/'});
                $.cookie('userPhone',null,{expires:-1,path:'/'});
                $.cookie('userToken',null,{expires:-1,path:'/'});
                $.cookie('userPhoto',null,{expires:-1,path:'/'});
                $.cookie('userTime',null,{expires:-1,path:'/'});
                $.cookie('userEmail',null,{expires:-1,path:'/'});
                $.cookie('goldTotal',null,{expires:-1,path:'/'});
            
                Toast.init();
                Toast.show(res.info, 'success', null);

                setTimeout(function () {
                    Toast.hide();
                    window.location.href="index.html";
                }, 3000);
               
              
            }else{
                alert(res.info);
            }


        });

        //修改昵称确认
        popupBox.on('click','#nameBtn',function(){
            var memberName = $('.memberName').val(),
                url = DD_api.updateMemberName,
                list = {userToken:token,memberName:memberName},
                res = getAjax(url,list);
            if(res.flag == "success"){
                alert(res.info);
                $.cookie('userName',memberName,{expires:1,path:'/'});
                window.location.reload();
                modify_popup.fadeOut();
                popupBox.html('');
            }else{
                alert(res.info);
            }

        });
        //修改密码确认
        popupBox.on('click','#passBtn',function(){
            var oldPass = $('#pass').val(),
                newPass = $('#pass1').val(),
                newPass1 = $('#pass2').val(),
                url = DD_api.updateMemberPassword,
                list = {userToken:token,password:oldPass,newPassword:newPass,rePassword:newPass1},
                res = getAjax(url,list);
            if(res.flag == "success"){
                alert(res.info);
                modify_popup.fadeOut();
                popupBox.html('');
            }else{
                alert(res.info);
            }

        });
        //修改手机确认
        popupBox.on('click','#phoneBtn',function(){
            var oldPhone = $('#oldPhone').val(),
                newPhone = $('#newPhone').val(),
                url = DD_api.updateMemberPhone,
                list = {userToken:token,phone:oldPhone,newPhone:newPhone},
                res = getAjax(url,list);
            if(res.flag == "success"){
                $.cookie('userPhone',newPhone,{expires:1,path:'/'});
                alert(res.info);
                window.location.reload();
                modify_popup.fadeOut();
                popupBox.html('');

            }else{
                alert(res.info);
            }
        });
        popupBox.on('click','#emailBtn',function(){
            var email = $('#email').val(),
                url = DD_api.updateMemberEmail,
                list = {userToken:token,email:email},
                res = getAjax(url,list);
            if(res.flag == "success"){
                alert(res.info);
                $.cookie('userEmail',email,{expires:1,path:'/'});
                window.location.reload();
                modify_popup.fadeOut();
                popupBox.html('');
            }else{
                alert(res.info);
            }
        });
        //已设置未设置
        if(userName== '普通会员'){
            nickname.html('普通会员');
            //var value = phone.substr(0,3)+'*****'+phone.substr(7);
            var value1 = userPhone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
            cPhone.html(value1);
            niceName.html('未设置').attr('class','no_1');
        }else{
            niceName.html('已设置').attr('class','yes_1');
            var value2 = userPhone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
            cPhone.html(value2);
            nickname.html(userName);
        }
        if(userEmail == 'null' ){
            setEmail.html('未设置').attr('class','no_1');
            emailName.html('');
        }else{
            setEmail.html('已设置').attr('class','yes_1');
            var valueEmail =  userEmail.substr(0,3)+'****'+ userEmail.substr(7);
            emailName.html(valueEmail);
        }
    }else{
        alert('请登录！')
    }

});