/**
 * Created by Administrator on 2017/9/25.
 */
$(function(){
    var  tabBtn = $('#pay_type li'),
         tabCont = $('#pay_content div'),
         weChat = $('.weChat'),
        we_QR_code = $('#QR_code'),
         token = $.cookie('userToken'),
         url = DD_api.memberSelectGold,
         list = {userToken:token},
         res = getAjax(url,list),
         goldTotals = res.data;
    if(res.flag=='success'){
        $.cookie('goldTotal',goldTotals,{expires:1,path:'/'});
        $('#integralNum').html($.cookie('goldTotal'));
        console.log($.cookie('goldTotal'));
    }else{
        $('#integralNum').html($.cookie('goldTotal'));
        console.log($.cookie('goldTotal'));
    }
   console.log(token);

    tabBtn.click(function(){
        $(this).addClass('on').siblings().removeClass('on');
        tabCont.eq($(this).index()).addClass('on').siblings().removeClass('on');
    });
    var moneyNum =  $('input[name="w_money"]:checked').val(),
        QR_code= 'http://www.ey99.com/ddyk/Api/weixinpay/weChatPay/userToken/'+token+'/money/'+moneyNum+'/payType/'+1;
    we_QR_code.attr('src',QR_code);
    weChat.on('click','label',function(){
        $(this).addClass('on').siblings().removeClass('on');
            var moneyNum =  $('input[name="w_money"]:checked').val(),
                QR_code= 'http://www.ey99.com/ddyk/Api/weixinpay/weChatPay/userToken/'+token+'/money/'+moneyNum+'/payType/'+1;
        we_QR_code.attr('src',QR_code);
    });


})