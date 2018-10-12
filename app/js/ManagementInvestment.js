/**
 * Created by Administrator on 2017/8/30.
 */
$(function(){
    //数据填充
    var token = $.cookie('userToken');
    if(token){
        var website = window.location.search,
            pageId = website.substring(website.lastIndexOf('=')+1, website.length),
            num = 20,
            list ={userToken:token,page:pageId,num:num},
            url = DD_api.managementInvestment,
            res = getAjax(url,list),
            data = res.data,
            total =res.total,
            page_total = $('.page_total'),
            dataList = $('#gl_table tbody'),
            pageList = $("#page"),
            popupBtn = $('.zs_popup'),
            html = '';
        if(res.flag=='success'){
            for(var i=0;i<data.length;i++){
                html += ' <tr><td class="cp_name"><a href="merchantsDetails.html?id='+data[i].id+'&parentId='+data[i].parentId+'&sunName='+data[i].sunName+'" target="_blank">'+data[i].goodsName+'</a></td><td class="cp_kind">'+data[i].parentsName+'</td><td class="cp_class">'+data[i].sunName+'</td><td class="cp_date">'+data[i].passTime+'</td><td class="cp_state1">'+data[i].checkType+'</td><td  class="cp_operation"><a href="javascript:;" class="zs_stick" data-goodsId="'+data[i].id+'">置顶</a><a href="javascript:;" class="zs_refresh" data-id="'+data[i].id+'" data-status="'+data[i].adStatus+'">申请广告位</a><a href="ManagementInvestment2.html?id='+data[i].id+'" class="zs_modify">修改</a><a href="javascript:;" class="zs_delete" id="'+data[i].id+'">删除</a></td></tr>';
            }
            dataList.html(html);
            page_total.html(total);

            //判断text改变样式
            var testState = $('#gl_table .cp_state1');
            testState.each(function(){
                var checkType = $(this).text();
                if(checkType == "已审核"){
                    $(this).css('color','#20c300');
                    $(this).next().children('.zs_modify').hide();

                }else if(checkType == "未通过"){
                    $(this).css('color','#ff0000');
                    $(this).next().children('.zs_modify').show();
                    $(this).next().children('.zs_refresh').hide();
                    $(this).next().children('.zs_stick').hide();
                }else{
                    $(this).css('color','#ff8400');
                    $(this).next().children('.zs_modify').show();
                    $(this).next().children('.zs_refresh').hide();
                    $(this).next().children('.zs_stick').hide();
                }
            });
            //是否已申请广告
            var  advertising = $('#gl_table td');
            advertising.find('.zs_refresh').each(function(){
                if($(this).attr('data-status') == '已申请'){
                    $(this).text('已申请广告位');
                    $(this).css('color','#999');
                    $(this).click(function(){
                        return false;
                    });
                }
            });

            //申请广告位
            advertising.on('click','.zs_refresh',function(e){
                var _that = $(this),
                    popupDiv = '<div class="popup_box"><div class="top">申请广告位信息<span class="zs_popup_close"></span></div><div class="zs_middle"><div class="commodity"><span>申请产品：</span> <p class="commodityName"></p></div><div class="commodity time"><span>申请周期：</span><p class="commodityTime"></p></div><div class="commodity type"><span>广告类型：</span><p class="commodityType"></p></div> <div class="commodity info">此广告位为付费推广服务，需在您购买之后方予开通。<br/>请您致电：010-59492286 / 13521918319</div></div><div class="bottom"><span class="btn2 zs_popup_close2">取消</span><span class="btn1 zs_confirm" id="advertising_affirm">确认</span></div></div>';
                popupBtn.html(popupDiv);
                popup(popupBtn);
                e.stopPropagation();
                _that.css('color','red')
                var goodsId = $(this).attr('data-id');
                var text=$(this).parent().siblings('.cp_name').html(),
                    confirm = $('#advertising_affirm'),
                    commodityName = $('.commodityName');
                commodityName.html(text);
                if(token){
                    var list = {userToken:token},
                        url = DD_api.advertisingTypeDate,
                        res= getAjax(url,list),
                        dataTime = res.timeData,
                        dataType = res.asTypeData,
                        timeH='',
                        typeH='',
                        commodityTime = $('.commodityTime'),
                        commodityType = $('.commodityType');
                    for(var i=0;i<dataTime.length;i++){
                        timeH += '<label for="dTime'+i+'"><input type="radio" id="dTime'+i+'" value="'+dataTime[i].timeId+'" name="dTime"/>'+dataTime[i].timeName+'</label>';
                    }
                    commodityTime.html(timeH);
                    for(var i=0; i<dataType.length;i++){
                        typeH += '<label for="dType'+i+'"><input type="radio" id="dType'+i+'" value="'+dataType[i].adTypeId+'" name="dType"/>'+dataType[i].adName+'</label>';
                    }
                    commodityType.html(typeH);

                }
                //提交广告信息
                confirm.click(function(){
                    var timeV = $('.commodityTime input[name="dTime"]:checked').val(),
                        typeV =  $('.commodityType input[name="dType"]:checked').val(),
                        list = {userToken:token,goodsId:goodsId,timeId:timeV,adTypeId:typeV},
                        url =  DD_api.submitAdvertisement,
                        res = getAjax(url,list);
                    if(res.flag == 'success'){
                        console.log(res);
                        alert(res.info);
                        popupBtn.fadeOut();
                        $(this).parent().parent().remove();
                        _that.css('color','#999');
                        _that.click(function(){
                            return false;
                        });
                    }else{
                        alert(res.info);
                    }
                })
            });
            //申请置顶
            advertising.on('click','.zs_stick',function(e){
               var id = $(this).attr('data-goodsId');
                popup(popupBtn);
                var popupDiv ='<div class="popup_box"><div class="top">置顶<span class="zs_popup_close"></span></div><div class="zs_middle"> <div class="zs_stick">什么是置顶？<br/>是使您当前提交的置顶产品，在招商栏目中所对应类别列表中置顶排名的功能。<br/>只支持单个产品的置顶功能。<br/></div><div class="zs_stickInfo"></div></div><div class="bottom"><span class="btn2 zs_popup_close2">取消</span><span class="btn1 zs_confirm" id="stick_affirm" data-id="'+id+'">确认</span></div></div>';
                popupBtn.html(popupDiv);
                e.stopPropagation();

                var url = DD_api.investmentGoldSure,
                    list = {userToken:token,goodsId:id},
                    res = getAjax(url,list);
                if(res.flag == 'success'){
                    //消耗金币提醒
                    popupBtn.find('.zs_stickInfo').html(res.info);
                    //获取金币数量
                    consumeGold = res.data.consumeGold;
                    //确认置顶

                }else{
                    //消耗金币提醒
                    popupBtn.find('.zs_stickInfo').html(res.info);
                }

            });
            //删除商品信息
            advertising.on('click','.zs_delete',function(){
                var _this = $(this),
                    id =$(this).attr('id'),
                    url = DD_api.deleteSureGoods,
                    list = {userToken:token,goodsId:id},
                    res =getAjax(url,list);
                if(res.flag == 'success'){
                    _this.parent().parent().remove();
                    alert(res.info);
                }else{
                    alert(res.info);
                }

            });
        }else{
            alert(res.info)
        }
         //申请置顶确定
        popupBtn.on('click','#stick_affirm',function(){
            var url = DD_api.investmentTop,
                id = $(this).attr('data-id'),
                list = {userToken:token,goodsId:id,consumeGold:consumeGold },
                res = getAjax(url,list);
            if(res.flag == 'success'){
                alert(res.info);
                popupBtn.fadeOut();
                $(this).parents('.popup_box').remove();
                var integral = $.cookie('goldTotal'),
                    integration = parseInt(integral) - parseInt(consumeGold);
                $.cookie('goldTotal',integration,{expires:1,path:'/'});
            }else{
                alert(res.info);
            }
        });
        //翻页
        var GG = {
            "go":function(mm){
                window.location.href = "ManagementInvestment.html?page="+mm;
            }
        };
       pageList.initPage(total,pageId,GG.go);
        //取消 关闭弹窗
        $(document).on('click','.zs_popup_close',function(){
            $(this).parent().parent().remove();
            popupBtn.fadeOut();
        });
        $(document).on('click','.zs_popup_close2',function(){
            $(this).parent().parent().remove();
            popupBtn.fadeOut();
        });
    }
});