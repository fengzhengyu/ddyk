    /**
 * Created by Administrator on 2017/8/29.
 */
$(function(){
    var website = location.href,
        arr = website.split("?")[1];
    //是否？后面有参数
    if(arr){
        var arr1 = arr.split("&");
        for(var i = 0;i<arr1.length;i++){
            var arr2=arr1[i].split("=");
            if(arr2[0] == "channel"){
                var channel=arr2[1];
            }else if(arr2[0] == "area"){
                var area=arr2[1];
            }else if(arr2[0] == "page"){
                var pageId=arr2[1];
            }
        }
    }else{
        var channel ='',
            area='',
            pageId = 1;
    }
    var token = $.cookie('userToken'),
        num = 20,
        key = getQueryString('key'),
        url = DD_api.buyIndex,//默认数据
        list={num:num,page:pageId},
        res = getAjax(url,list),
        cData = res.dataChannel,
        aData = res.dataArea,
        data = res.dataBuy,
        total = res.buyTotal,
        urlSel = DD_api.selectBuy,
        listSel= {channelId:channel,areaId:area,buyName:key,num:num,page:pageId},
        resSel = getAjax(urlSel,listSel),
        dataSel = resSel.dataBuy,
        totalSel = resSel.buyTotal,
        innerC = '',
        innerA = '',
        inner = '',
        channelList = $('#agent_container_channel'),
        areaList = $('#agent_container_area'),
        dataList = $('#table tbody'),
        totalsList = $('.totals'),
        screen1 = $('#agent_container_screen1'),
        screen2 = $('#agent_container_screen2'),
        pageValue = $('#pageValue'),//翻页值
        pageGo = $('#pageGo'),//翻页搜索
        pageList = $('#page'),//页码列表
        keyWord = $('#keyWord');//关键词搜索
    //无数据执行
    if(!res){
        $('.agent_main').html('<div style="height: 300px;line-height: 300px;text-align: center;">暂无数据，请稍后再来！</div>')
        return;
    }
    //代理渠道
    for(var i=0;i<cData.length;i++){
        innerC += '<span><label for="channel'+i+'"><input type="radio" name="c_radio" value="'+cData[i].channelId+'" id="channel'+i+'"/>'+cData[i].channelName+'</label></span>';
    }
    channelList.html(innerC);
    //代理区域
    for(var j=0;j<aData.length;j++){
        innerA += '<span><label for="area'+j+'"><input type="radio" name="a_radio" value="'+aData[j].id+'" id="area'+j+'"/>'+aData[j].province+'</label></span>';
    }
    areaList.html(innerA);
    if(res.flag == 'success'){
        //默认数据列表
        for(var k=0;k<data.length;k++){
            inner += '<tr><td>'+data[k].buyName+'</td><td>'+data[k].buyArea+'</td><td>'+data[k].buyChannel+'</td><td>'+data[k].buyPerson+'</td><td><a href="javascript:;" class="look" id="'+data[k].buyId+'">查看</a></td></tr>';
        }
        dataList.html(inner);
        totalsList.html(total);
    }else{
        dataList.html('暂无数据！');
    }

    //代理渠道筛选
    var channelInp =  channelList.find('input'),
        areaInp = areaList.find('input'),
        clear_all = $('#clear_all');
    channelInp.click(function(){
        if($(this).prop('checked') ==true){
            var id = $(this).val();
            window.location.href = 'WantBuy.html?channel='+id+'&area='+area+'&page=';
        }
    });
    if(channel !=''){
        channelInp.eq(channel-1).attr('checked',true);
        clear_all.show();
        screen1.html('<span class="close">'+ channelInp.eq(channel-1).parent().text()+'</span>');
        if(resSel.flag == 'success'){
            var channelInner = '';
            for(var i =0;i<dataSel.length;i++){
                channelInner += '<tr><td>'+dataSel[i].buyName+'</td><td>'+dataSel[i].buyArea+'</td><td>'+dataSel[i].buyChannel+'</td><td>'+dataSel[i].buyPerson+'</td><td><a href="javascript:;" class="look" id="'+dataSel[i].buyId+'">查看</a></td></tr>';
            }
            dataList.html(channelInner);
            totalsList.html(totalSel);
        }else{
            window.location.href = 'WantBuy.html?channel=&area=&page=';
            alert("暂无数据");
        }
    }
    //代理区域筛选
    areaInp.click(function(){
        if($(this).prop('checked') == true){
            var id =$(this).val();
            window.location.href = 'WantBuy.html?channel=&area='+id+'&page=';
        }
    });
    if(area != ''){
        areaInp.eq(area-1).attr('checked',true);
        clear_all.show();
        screen2.html('<span class="close">'+ channelInp.eq(channel-1).parent().text()+'</span>');
        if(resSel.flag == 'success'){
            var areaInner = '';
            for(var i =0;i<dataSel.length;i++){
                areaInner += '<tr><td>'+dataSel[i].buyName+'</td><td>'+dataSel[i].buyArea+'</td><td>'+dataSel[i].buyChannel+'</td><td>'+dataSel[i].buyPerson+'</td><td><a href="javascript:;" class="look" id="'+dataSel[i].buyId+'">查看</a></td></tr>';
            }
            dataList.html(areaInner);
            totalsList.html(totalSel);
        }else{
            window.location.href = 'WantBuy.html?channel=&area=&page=';
            alert("暂无数据");
        }
    }
    //搜索筛选
    if(key !=null){
        if(resSel.flag == 'success'){
            var searchInner = '';
            for(var i =0;i<dataSel.length;i++){
                searchInner += '<tr><td>'+dataSel[i].buyName+'</td><td>'+dataSel[i].buyArea+'</td><td>'+dataSel[i].buyChannel+'</td><td>'+dataSel[i].buyPerson+'</td><td><a href="javascript:;" class="look" id="'+dataSel[i].buyId+'">查看</a></td></tr>';
            }
            dataList.html(searchInner);
            totalsList.html(totalSel);
        }else{
            window.location.href = 'WantBuy.html';
            alert("暂无数据");
        }
    }
    //代理渠道子渠道关闭
    screen1.on('click','.close',function(){
        channelInp.each(function(){
            if($(this).prop('checked')){
                $(this).prop('checked',false)
            }
        });
        $(this).remove();
        window.location.href = 'WantBuy.html?channel=&area='+area+'&page=';

    });
    //代理渠道子渠道关闭
    screen2.on('click','.close',function(){
        areaInp.each(function(){
            if($(this).prop('checked')){
                $(this).prop('checked',false)
            }
        });
        $(this).remove();
        window.location.href = 'WantBuy.html?channel='+channel+'&area=&page=';

    });
    //清除全部筛选
    clear_all.click(function(){
        $('.agent_container input[type="radio"]').each(function(){
            if($(this).prop('checked')){
                $(this).prop('checked',false)
            }
        });
        $(this).siblings('div').children().remove();
        clear_all.hide();
        window.location.href = 'WantBuy.html';
    });
    //关键字 搜索
    keyWord.click(function(){
        var text = $('#wordText').val(),
            reg = /^[0-9]*$/;
        if(text == '' || reg.test(text)){
            alert('关键字不能为空或输入有误！');
        }else{
            window.location.href = 'WantBuy.html?channel='+channel+'&area='+area+'&key='+text+'&page=';
        }

    });
    //翻页
    var GG = {
        "go":function(mm){
            if(key){
                window.location.href = 'WantBuy.html?channel='+channel+'&area='+area+'&key='+key+'&page='+mm;
            }else{
                window.location.href = 'WantBuy.html?channel='+channel+'&area='+area+'&page='+mm;
            }

        }
    };
    if(channel==''&& area==''){
        pageList.initPage(total,pageId,GG.go);
    }else{
        pageList.initPage(totalSel,pageId,GG.go);
    }
    //翻页搜索
    pageGo.click(function(){
        var page = pageValue.val();
        var GG = {
            "go":function(mm){
                if(key){
                    window.location.href = 'WantBuy.html?channel='+channel+'&area='+area+'&key='+key+'&page='+mm;
                }else{
                    window.location.href = 'WantBuy.html?channel='+channel+'&area='+area+'&page='+mm;
                }

            }
        };
        pageList.initPage(totalSel,pageId,GG.go(page));
    });
    //查看
    dataList.on('click','.look',function(e){
        if(token){
            var id = $(this).attr('id'),
                url = DD_api.buyFindAuth,
                list = {userToken:token,buyId:id},
                res = getAjax(url,list),
                count = res.data.buyCount,
                gold = res.data.consumeGold,
                Popup = $('.agentPopup');
            console.log(res)
            popup(Popup);
            e.stopPropagation();
            var val = '<div class="popupDiv"><div class="text">温馨提示：</div><div class="content" id="Auth"></div><div class="btn"><span class="btn_no">取消</span><span class="btn_yes">确定</span></div></div><div class="popupDiv2"></div>';
            Popup.html(val);
            var Auth = $('#Auth'),
                popupDiv = $('.popupDiv'),
                popupDiv2 = $('.popupDiv2');
            if(res.flag == 'success'){
                Auth.html(res.info);
                Popup.on('click','.btn_yes',function () {
                    var integral = $.cookie('goldTotal'),
                        integration = parseInt(integral) - parseInt(gold);
                    $.cookie('goldTotal',integration,{expires:1,path:'/'});
                    popupDiv.remove();
                    popupDiv2.show();
                    var url = DD_api.buyFindInfo,
                        list = {userToken:token,buyId:id,buyCount:count,consumeGold:gold},
                        res = getAjax(url,list),
                        data = res.dataBuy,
                        html = '<h2>求购详情：<i class="lookClose"></i></h2><p><span class="title">求购品种：</span><span class="content">'+data.buyName+'</span></p><p><span class="title">求购渠道：</span><span class="content">'+data.buyChannel+'</span></p><p><span class="title">求购区域：</span><span class="content">'+data.buyArea+'</span></p><p><span class="title">求购留言：</span><span class="content">'+data.buyMessage+'</span></p><p><span class="title">联系人：</span><span class="content">'+data.buyPerson+'</span></p><p><span class="title">联系手机：</span><span class="content">'+data.buyPhone+'</span></p><p><span class="title">联系QQ：</span><span class="content">'+data.qq+'</span></p><p><span class="title">联系微信：</span><span class="content">'+data.weChat+'</span></p><p><span class="title">求购时间：</span><span class="content">'+data.publishTime+'</span></p><div></div></div>';
                    popupDiv2.html(html);

                });
                popupDiv2.on('click','.lookClose',function(){
                    $(this).parents('.popupDiv2').children().remove();
                    Popup.fadeOut();
                })
            }else{
                Auth.html(res.info);
            }
            //取消
            Popup.on('click','.btn_no',function () {
                Popup.html('');
                Popup.fadeOut();

            })
        }else{
            alert("请登录");
        }
    });

});