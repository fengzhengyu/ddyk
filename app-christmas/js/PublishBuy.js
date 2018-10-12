/**
 * Created by Administrator on 2017/8/31.
 */
$(function(){
    var token = $.cookie('userToken'),
        website = window.location.search,
        id = website.substring(website.lastIndexOf('=')+1, website.length),
        url = DD_api.buyGoodsAdd ,
        res = getAjax(url),
        aData = res.dataArea,
        cData = res.dataChannel,
        innerA = '',
        innerC = '',
        area = $('#areaList'),
        channel = $('#channelList'),
        purchaseBtn = $('#purchaseBtn');
    //意向区域
    for(var i=0;i<aData.length;i++){
        innerA += ' <label for="area'+i+'"><input type="checkbox" name="a_checkbox" value="'+aData[i].id+'" id="area'+i+'"/>'+aData[i].province+'</label>';
    }
    area.html(innerA);
    //意向渠道
    for(var i=0;i<cData.length;i++){
        innerC += '<label for="channel'+i+'"><input type="checkbox" name="c_checkbox" value="'+cData[i].channelId+'" id="channel'+i+'"/>'+cData[i].channelName+'</label>';
    }
    channel.html(innerC);
    //提交
    purchaseBtn.click(function(){
        var name = $('#buyName').val(),
            person = $('#buyPerson').val(),
            phone = $('#buyPhone').val(),
            areaId = getSelected(area.find('input')),
            channelId =getSelected( channel.find('input')),
            qq = $('#qq').val(),
            weChat = $('#weChat').val(),
            message = $('#buyMessage').val(),
            url = DD_api.memberAddBuyGoods,
            list = {userToken:token,buyName:name,buyPerson:person,buyPhone:phone,buyArea:areaId,buyChannel:channelId,qq:qq,weChat:weChat,buyMessage:message},
            res = getAjax(url,list);
        if(res.flag == 'success'){
            alert(res.info);
            window.location.href = 'ManagementBuy.html';
        }else{
            alert(res.info);
        }
    });
});