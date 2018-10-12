/**
 * Created by Administrator on 2017/8/29.
 */
$(function(){
    var website=location.href,
        arr = website.split("?")[1];
    //是否？后面有参数
    if(arr){
        var arr1 = arr.split("&");
        for(var i = 0;i<arr1.length;i++){
            var arr2=arr1[i].split("=");
            if(arr2[0] == "channel"){
               var  channel=arr2[1];
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
    var key = getQueryString('key'),
        num = 20,
        url = DD_api.agentData,
        list ={num:num,page:pageId},
    //默认数据
        res = getAjax(url,list),
        cData = res.dataChannel,
        aData = res.dataArea,
        data = res.dataAgent,
        dataTotal = res.agentTotal,
    //筛选数据
        url1 = DD_api.selectAgent,
        list1 ={num:num,page:pageId,channelId:channel,areaId:area,nowType:key},
        res1 = getAjax(url1,list1),
        dataS = res1.dataAgent,
        dataTotalS = res1.agentTotal,
        htmlC = '',
        htmlA = '',
        html = '',
        channelList = $('#agent_container_channel'),//渠道数据列表
        areaList = $('#agent_container_area'),//区域数据列表
        tableList = $('#table tbody'), //数据列表
        totals = $('.totals'),        //数据总数选择器
        screen1 = $('#agent_container_screen1'),//渠道筛选
        screen2 = $('#agent_container_screen2'),//区域筛选
        pageValue = $('#pageValue'),//翻页值
        pageGo = $('#pageGo'),//翻页搜索
        pageList = $("#page"), //页码列表
        keyWord = $('#keyWord'),//关键词搜索
        download = $('#download'); //数据下载
    //无数据执行
    if(!res){
        $('.agent_main').html('<div style="height: 300px;line-height: 300px;text-align: center;">暂无数据，请稍后再来！</div>')
        return;
    }
    //代理渠道
    for(var i=0;i<cData.length;i++){
        htmlC += '<span><label for="channel'+i+'"><input type="radio" name="c_radio" value="'+cData[i].channelId+'" id="channel'+i+'"/>'+cData[i].channelName+'</label></span>'
    }
    channelList.append(htmlC);
    //代理区域
    for(var j=0;j<aData.length;j++){
        htmlA += '<span><label for="area'+j+'"><input type="radio" name="a_radio" value="'+aData[j].id+'" id="area'+j+'"/>'+aData[j].province+'</label></span>'
    }
    areaList.append(htmlA);
    //数据库
    for(var k=0;k<data.length;k++){
        html += '<tr><td><input type="checkbox" name="checkbox" value="'+data[k].agentId+'"/></td><td>'+data[k].agentAddress+'</td><td>'+data[k].agentName+'</td><td>'+data[k].agentType+'</td><td>'+data[k].agentChannel+'</td><td>'+data[k].nowNum+'</td><td>'+data[k].nowType+'</td><td>'+data[k].agentArea+'</td><td>'+data[k].relationPersonName+'</td></tr>';
    }
    tableList.html(html);
    totals.html(dataTotal);
    var channelInp =  channelList.find('input'),
        areaInp = areaList.find('input'),
        clear_all = $('#clear_all'),
        message_all = $('#message_all');
    //代理渠道筛选
    channelInp.on('click',function () {
        if($(this).prop('checked') == true){
            var id = $(this).attr('value');
            window.location.href = 'agentDataBase.html?channel='+id+'&area='+area+'&page=';
        }

    });
    //代理区域筛选
    areaInp.on('click',function(){
        if($(this).prop('checked') == true){
            var id = $(this).attr('value');
            window.location.href = 'agentDataBase.html?channel='+channel+'&area='+id+'&page=';
        }
    });

    if(channel != ''){
        channelInp.eq(channel-1).attr('checked',true);
        clear_all.show();
        screen1.html('<span class="close">'+ channelInp.eq(channel-1).parent().text()+'</span>');
        if(res1.flag == 'success'){
            var agentC ='';
            for(var i=0;i<dataS.length;i++){
                agentC +='<tr><td><input type="checkbox" name="checkbox" value="'+dataS[i].agentId+'"/></td><td>'+dataS[i].agentAddress+'</td><td>'+dataS[i].relationPersonName+'</td><td>'+dataS[i].agentType+'</td><td>'+dataS[i].agentChannel+'</td><td>'+dataS[i].nowNum+'</td><td>'+dataS[i].nowType+'</td><td>'+dataS[i].agentArea+'</td><td>'+dataS[i].relationPersonName+'</td></tr>';
            }
            tableList.html(agentC);
            totals.html(dataTotalS)
        }else{
            window.location.href = 'agentDataBase.html';
            alert("暂无数据");
        }
    }
    if(area != ''){
        areaInp.eq(area-1).attr('checked',true);
        clear_all.show();
        screen2.html('<span class="close">'+ areaInp.eq(area-1).parent().text()+'</span>');
        if(res1.flag ='success'){
            var agentA ='';
            for(var i=0;i<dataS.length;i++){
                agentA +=' <tr><td><input type="checkbox" name="checkbox" value="'+dataS[i].agentId+'"/></td><td>'+dataS[i].agentAddress+'</td><td>'+dataS[i].relationPersonName+'</td><td>'+dataS[i].agentType+'</td><td>'+dataS[i].agentChannel+'</td><td>'+dataS[i].nowNum+'</td><td>'+dataS[i].nowType+'</td><td>'+dataS[i].agentArea+'</td><td>'+dataS[i].relationPersonName+'</td></tr>';
            }
            tableList.html(agentA);
            totals.html(dataTotalS)
        }else{
            screen2.remove();
            window.location.href = 'agentDataBase.html';
            alert("暂无数据");
        }

    }
    if(key != null){
        var agentK ='';
        for(var i=0;i<dataS.length;i++){
            agentK +=' <tr><td><input type="checkbox" name="checkbox" value="'+dataS[i].agentId+'"/></td><td>'+dataS[i].agentAddress+'</td><td>'+dataS[i].relationPersonName+'</td><td>'+dataS[i].agentType+'</td><td>'+dataS[i].agentChannel+'</td><td>'+dataS[i].nowNum+'</td><td>'+dataS[i].nowType+'</td><td>'+dataS[i].agentArea+'</td><td>'+dataS[i].relationPersonName+'</td></tr>';
        }
        tableList.html(agentK);
        totals.html(dataTotalS)
    }

    //代理渠道子渠道关闭
    screen1.on('click','.close',function(){
        channelInp.each(function(){
            if($(this).prop('checked')){
                $(this).prop('checked',false)
            }
        });
        $(this).remove();
        window.location.href = 'agentDataBase.html?channel=&area='+area+'&page=';

    });
    //代理渠道子渠道关闭
    screen2.on('click','.close',function(){
        areaInp.each(function(){
            if($(this).prop('checked')){
                $(this).prop('checked',false)
            }
        });
        $(this).remove();
        window.location.href = 'agentDataBase.html?channel='+channel+'&area=&page=';

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
        window.location.href = 'agentDataBase.html';
    });

    //data_message 全选
    message_all.click(function(){
        $('input[name="checkbox"]').prop("checked",this.checked);
    });
    var $subBox =  $('input[name="checkbox"]');
    $subBox.click(function(){
        message_all.attr("checked",$subBox.length == $("input[name='checkbox']:checked").length ? true : false)
    });
    //关键字 搜索
    keyWord.click(function(){
        var text = $('#wordText').val(),
            reg = /^[0-9]*$/;
        if(text == '' || reg.test(text)){
            alert('关键字不能为空或输入有误！');
        }else{
            window.location.href = 'agentDataBase.html?channel='+channel+'&area='+area+'&key='+text+'&page=';
        }

    });
    //翻页
    var GG = {
        "go":function(mm){
            if(key){
                window.location.href = 'agentDataBase.html?channel='+channel+'&area='+area+'&key='+key+'&page='+mm;
            }else{
                window.location.href = 'agentDataBase.html?channel='+channel+'&area='+area+'&page='+mm;
            }

        }
    };
    if(channel==''&& area==''){
        pageList.initPage(dataTotal,pageId,GG.go);
    }else{
        pageList.initPage(dataTotalS,pageId,GG.go);
    }
    //翻页搜索
    pageGo.click(function(){
        var page = pageValue.val();
        var GG = {
            "go":function(mm){
                if(key){
                    window.location.href = 'agentDataBase.html?channel='+channel+'&area='+area+'&key='+key+'&page='+mm;
                }else{
                    window.location.href = 'agentDataBase.html?channel='+channel+'&area='+area+'&page='+mm;
                }

            }
        };
        pageList.initPage(dataTotalS,pageId,GG.go(page));
    });
    //下载
    download.click(function(e){
        var token = $.cookie('userToken'),
            agentPopup = $('.agentPopup');//弹窗提示容器;
        if(token){
            popup(agentPopup);
            e.stopPropagation();
            var arr = getSelected($('input[name="checkbox"]:checked')),//下载数据id
                checkId = arr.join(','),
                url = DD_api.downloadAuth,
                list = {userToken:token,agentId:checkId},
                res = getAjax(url,list),
                val = '';


            console.log(arr);
            val = '<div class="popupDiv"><div class="text">温馨提示：</div><div class="content" id="Auth"></div><div class="btn"><span class="btn_no">取消</span><span class="btn_yes">确定</span></div></div>';
            agentPopup.html(val);
            if(res.flag=='success'){
                $('#Auth').html(res.info);
                var count =res.data.agentCount,//下载数量
                    gold = res.data.consumeGold,//消耗金币
                    numRemainder = res.numRemainder;
                if(count<numRemainder){
                    agentPopup.find('.btn_yes').click(function(){
                        alert('请勾选正确的条数');
                        return false;
                    })
                }else{
                    agentPopup.find('.btn_yes').click(function () {
                        var url = DD_api.agentDownload,
                            integral = $.cookie('goldTotal'),
                            integration = parseInt(integral) - parseInt(gold);
                        $.cookie('goldTotal',integration,{expires:1,path:'/'});

                        if(numRemainder>0){
                            window.location.href=url+'/userToken/'+token+'/agentId/'+checkId+'/agentCount/'+count+'/consumeGold/'+gold+'/numRemainder/'+numRemainder;
                            agentPopup.fadeOut();
                        }else{
                            window.location.href=url+'/userToken/'+token+'/agentId/'+checkId+'/agentCount/'+count+'/consumeGold/'+gold+'/numRemainder/'+0;
                            agentPopup.fadeOut();
                        }


                    });
                }

            }else{
                $('#Auth').html(res.info);
            }
            //取消弹窗
            agentPopup.find('.btn_no').click(function () {
                agentPopup.fadeOut();

            });
        }else{
            alert("请登录")
        }
    });
});