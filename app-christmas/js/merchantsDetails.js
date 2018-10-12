/**
 * Created by Administrator on 2017/8/29.
 */
$(function(){
    //获取URL参数值
    var token = $.cookie('userToken'),
        website=location.href,
        arr=website.split("?")[1],
        arr1=arr.split("&");
    for(var i=0;i<arr1.length;i++){
        var arr2=arr1[i].split("=");
        if(arr2[0]=="id"){
           var loc=arr2[1];
        } if(arr2[0] == "parentId"){
           var  parentId = arr2[1];
        }
    }
    //获取 URL子类的text
    var sunNameText = getQueryString('sunName'),
    //详情渲染
        url1 = DD_api.merchantsDetailsGoods,
        list={goodsId:loc},
        res = getAjax(url1,list),
        data = res.data,
        Details_img = $('.Details_log>img'),
        Details_img2 =  $('.Details_log2>img'),
        Details_text1 = $('.Details_explain .text1'),
        Details_text2 = $('.Details_explain .text2'),
        Details_text3 = $('.Details_explain .text3'),
        Details_text4 = $('.Details_explain .text4 ul'),
        Details_talk = $('.Details_talk'),
        details='<dl><dt>| 主要成分：</dt><dd>'+data.basis+'</dd></dl><dl><dt>| 功能主治：</dt><dd>'+data.effect+'</dd></dl><dl><dt>| 产品规格：</dt><dd>'+data.norms+'</dd></dl><dl><dt>| 招商要求：</dt><dd>'+data.require+'</dd></dl> <dl class="dl4"><dt>| 联系方式：</dt><dd>招商热线：'+data.relationType+'</dd><dd>企业名称：'+data.productCompany+'</dd><dd>企业地址：'+data.addressInfo+'</dd><dd>联 系人：'+data.relationPerson+'</dd></dl>',
        text3Span = '<span class="sp1">批准文号</span><span class="sp2">'+data.approve+'</span><span class="sp3"><a href="http://app1.sfda.gov.cn/datasearch/face3/dir.html">[国家食药局查询]</a></span>',
        text4Li = '<li><span>生产企业：'+data.productCompany+'</span></li><li><span>发布时间：</span>'+data.addTime+'</li><li><span>更新时间：</span>'+data.updateTime+'</li><li><span>在线咨询：</span><a target="_blank" class="left_QQ" href="http://wpa.qq.com/msgrd?v=3&uin='+data.QQ+'&site=qq&menu=yes"><img src="images/qq22.png" alt="在线客服" title="在线客服" /></a><i class="seek">联系时请说明来自“当代医药市场网”，会获得更多优惠和支持！</i></li>';
    console.log(res)
    Details_img.attr('src',data.photoUnify);
    Details_img2.attr('src',data.photoUnify);
    Details_text1.html(data.goodsName);
    Details_text2.append(data.relationType);
    Details_text3.html(text3Span);
    Details_text4.html(text4Li);
    Details_talk.html(details);
    document.title = data.goodsName;
    //全国省数据
    var cityUrl = DD_api.provinceData,
        cityRes = getAjax(cityUrl),
        province = cityRes.data,
        pVal = '',
        provinceHtml = $('#select'),
        cityH = $('.selectContent'),
        authCode = $('.verification .update'),
        submit = $('.v_submit'),
        parentList = $('.merchans_tab li'),//十大父类
        parentName = $('#parentName'),//面包父类名字
        sunName = $('#sunName'), //面包子类名字
        collection = $('#collection'),//收藏
        searchV = $('#searchText'),//搜索值
        searchGo = $('#searchGo'),//搜索
        visitShop = $('#visitShop');
    provinceHtml.html('<option value="0">全国</option>');
        cityH.html('');

    for(var i=0;i<province.length;i++){
        pVal += '<option value="'+province[i].id+'">'+province[i].province+'</option>';
    }
    provinceHtml.append(pVal);
    //城市数据
    provinceHtml.change(function(){
        if($(this).val() == 0){
            cityH.html('');
            return false;
        }
        var pid=($(this).children('option:selected').val()),
            data={pid:pid},
            url= DD_api.cityData,
            res = getAjax(url,data),
            city =res.data,
            val='';
        for(var i=0;i<city.length;i++){
            val += '<label for="cityId'+i+'"><input type="checkbox" id="cityId'+i+'" value="'+city[i].id+'"/>'+city[i].city+'</label>';
        }
        cityH.append(val);
    });
    //代理渠道数据
    var cUlr= DD_api.agentChannelData,
        cRes= getAjax(cUlr),
        cData = cRes.channelData,
        aData = cRes.agencyData,
        channel =$('#channel'),
        cHtml = '',
        agent = $('#agent'),
        aHtml= '';
    for(var i=0;i<cData.length;i++){
        cHtml +='<label for="check'+i+'"><input type="checkbox" name="channelInp" id="check'+i+'" value="'+cData[i].channelId+'"/>'+cData[i].channelName+'</label>';
    }
    channel.html(cHtml);
    //代理性质数据
    for(var i=0;i<aData.length;i++){
        aHtml += '<label for="a_check'+i+'"><input type="checkbox" name="agentInp" id="a_check'+i+'" value="'+aData[i].agencyId+'"/>'+aData[i].agencyName+'</label>';
    }
    agent.html(aHtml);
    //收藏功能
    collection.click(function(){
        if(token){
            var url = DD_api.merchantsDetailsCollection,
                list ={goodsId:loc,userToken:token},
                res = getAjax(url,list);
            alert(res.info);
        }else{
            alert("您未登录，请登录！");
        }
    });
    //获取验证码
    authCode.click(function(){
        if(token){
            var url = DD_api.merchantsDetailsCode,
                list ={goodsId:loc,userToken:token},
                res = getAjax(url,list),
                data =res.data;
            $(this).html(data);
        }else{
            $(this).html("获取验证码");
            alert("您未登录，请登录！")
        }
    });
    //提交留言
    submit.click(function(){
        if(token){
            //意向区域id
            var cityId = getSelected($('.selectContent input')),
            //代理渠道id
                channelId = getSelected($('#channel input')),
            //代理性质id
                agentId = getSelected($('#agent input')),
                person = $('#person').val(),
                phone = $('#phone').val(),
                mobile = $('#mobile').val(),
                content = $('#content').val(),
                code = $('#code').val(),
                list = {goodsId:loc,userToken:token,relationPerson:person,relationPhone:phone,authCode:code,
                    area:cityId,shellChannel:channelId,agency:agentId,content:content,relationMobile:mobile
                },
                url = DD_api.merchantsDetailsMessage,
                res =getAjax(url,list);
            alert(res.info);
        }else{
            alert("您未登录，请登录！");
        }
    });
    //面包屑之父类、子类
    sunName.html(sunNameText);
    //十大父类加样式
    if(parentId){
        parentList.eq(parentId-1).addClass('on').siblings().removeClass('on');
        var text = parentList.filter('.on').children('a').text();
        parentName.html('<a href="merchants.html?id='+parentId+'&sunId=&sunName=&page=1">'+text+'</a>');
    }
    //访问商铺
    visitShop.attr('href','myShop.html?id='+loc);
    //搜索商品
    searchV.focus(function(){
        $(this).val('')
    });
    searchGo.click(function(){
        var value =searchV.val();
        if(value == ''|| value =='搜索商品'){
            alert('搜索不能为空或请输入的商品')
        }else{
            window.location.href="search.html?search="+value;
        }

    });
    //推荐数据
    var urlR = DD_api.recommendGoods,
        listR = {goodsId:loc,num:10},
        resR = getAjax(urlR,listR),
        dataR = resR.data,
        htmlR = '',
        recommend = $('.recommend');
    if(resR.flag == 'success'){

        for(var i=0;i<dataR.length;i++){
            htmlR +='<li><a href="merchantsDetails.html?id='+dataR[i].id+'&parentId='+dataR[i].parentId+'&sunName='+dataR[i].sunName+'" target="_blank">'+dataR[i].goodsName+'</a></li>';
        }
        recommend.html(htmlR);
    }else{
        recommend.html("暂时没有推荐商品！");
    }
});