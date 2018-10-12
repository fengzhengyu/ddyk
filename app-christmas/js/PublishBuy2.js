/**
 * Created by Administrator on 2017/9/15.
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
    if(res.flag == 'success'){
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

    }else{
        alert(res.info);
    }
    //修改渲染
    var changeUrl = DD_api.memberBuyGoodsEdit,
        changeList = {userToken:token,buyId:id},
        changeRes = getAjax(changeUrl,changeList),
        buyName = $('#buyName'),
        buyPerson = $('#buyPerson'),
        buyPhone = $('#buyPhone'),
        qq = $('#qq'),
        weChat = $('#weChat'),
        buyMessage = $('#buyMessage');
    if(changeRes.flag == 'success'){
        var totals = changeRes.data,
            nameH = totals.buyName,
            personH = totals.buyPerson,
            phoneH = totals.buyPhone,
            qqH = totals.qq,
            weChatH = totals.weChat,
            messageH = totals.buyMessage,
            channelId = totals.buyChannel,
            areaId = totals.buyArea,
            channelArr = channelId.split(','),
            areaArr = areaId.split(','),
            arr= area.find('input'),
            arr2= channel.find('input');
        //修改输出
        buyName.val(nameH);
        buyPerson.val(personH);
        buyPhone.val(phoneH);
        qq.val(qqH);
        weChat.val(weChatH);
        buyMessage.val(messageH);
        //channel渲染
        for(j=0;j<arr2.length;j++){
            for(var i=0;i<channelArr.length;i++){
                if(arr2[j].value == channelArr[i]){
                    arr2[j].checked = 'checked';
                }
            }
        }
        //area渲染
        for(var i=0;i<arr.length;i++){
            for(var j=0;j<areaArr.length;j++){
                if(arr[i].value == areaArr[j]){
                    arr[i].checked = 'checked';
                }
            }
        }
    }else{
        alert(changeRes.info);
    }
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
            url = DD_api.memberUpdateBuyGoods,
            list = {userToken:token,buyName:name,buyPerson:person,buyPhone:phone,buyArea:areaId,buyChannel:channelId,qq:qq,weChat:weChat,buyMessage:message,buyId:id},
            res = getAjax(url,list);
        if(res.flag == 'success'){
            alert(res.info);
            window.location.href = 'ManagementBuy.html';
        }else{
            alert(res.info);
        }
    });
});