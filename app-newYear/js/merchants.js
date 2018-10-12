/**
 * Created by Administrator on 2017/8/29.
 */
$(function () {
//获取URL参数值
    var website = location.href,
        arr = website.split("?")[1];
    if (arr) {
        var arr1 = arr.split("&");
        for (var i = 0; i < arr1.length; i++) {
            var arr2 = arr1[i].split("=");
            if (arr2[0] == "sunId") {
                var sunId = arr2[1];
            } else if (arr2[0] == "id") {
                var loc = arr2[1];
            } else if (arr2[0] == "page") {
                var pageV = arr2[1];
            }
        }
    } else {
        var sunId = 11,
            loc = 1,
            pageV = 1;
    }

//获取url父类的text
    var sunNameText = getQueryString('sunName'),
        num = 20,//每页显示多少数据
        list = {typeId: loc, typeSunId: sunId, num: num, page: pageV},
        urlP = DD_api.parentTypeGoods,//父类数据列表
        resP = getAjax(urlP, list),
        dataP = resP.data,
        parentType = $('.merchans_tab'),//父类容器
        pHtml = '',
        urlS = DD_api.sunTypeGoods, //子类数据列表
        resS = getAjax(urlS, list),
        dataS = resS.data,
        sunType = $('.sunType'), //子类容器
        sHtml = '',
        url = DD_api.merchantsGoods,//详情数据列表
        res = getAjax(url, list),
        data = res.data,
        dataTotal = res.dataTotal,  //数据总数量
        dataList = $('.wares ul'), //详情数据融入
        txt = '',
        totalNum = $('.page_tab .totals'),
        pageValue = $('#pageValue'), // 翻页页数值
        pageList = $('#page'), //翻页容器
        pageGo = $('#pageGo'), //执行翻页按钮
        searchV = $('#searchText'), // 搜索值
        searchGo = $('#searchGo'); // 执行搜索按钮

    if(!dataP){
        $('.zs_main').html('<div style="height: 600px;line-height: 600px;text-align: center;">暂无数据，请稍后再来！</div>');
        return;
    }
//十大父类
    for (var i = 0; i < dataP.length; i++) {
        pHtml += '<li><a href="javascript:;" id="' + dataP[i].id + '">' + dataP[i].goodsParentsName + '<span></span></a></li>';
    }
    parentType.html(pHtml);
//父类之子类
    for (var i = 0; i < dataS.length; i++) {
        sHtml += '<a href="javascript:;" id="' + dataS[i].id + '">' + dataS[i].goodsSunName + '</a>';
    }
    sunType.html(sHtml);

//面包屑之子类
    if (!sunNameText) {
        $('#sunName').html($('.sunType a:first').text());
    } else {
        $('#sunName').html(sunNameText);
    }
    var sunNameT = sunNameText ? sunNameText : $('.sunType a:first').text();
//对应商品详情
    if (res.flag == 'success') {
        for (var i = 0; i < data.length; i++) {
            txt += '<li><a href="merchantsDetails.html?id=' + data[i].id + '&parentId=' + data[i].parentId + '&sunName=' + sunNameT + '" target="_blank" class="coat"><div class="img"><img src="' + data[i].photoUnify + '" alt="商品图片"/></div><div class="explain"><dl><dt>' + data[i].goodsName + '</dt><dd class="dd1">' + data[i].approve + '</dd><dd class="dd2"><span class="sp1">生产企业:</span><span class="sp2">' + data[i].productCompany + '</span></dd> <dd class="dd3"><span class="sp1">功能主治:</span><span class="sp2">' + data[i].effect + '</span></dd></dl></div></a><div class="details"><a href="merchantsDetails.html?id=' + data[i].id + '&parentId=' + data[i].parentId + '&sunName=' + sunNameT + '"  target="_blank"  class="talk1">详情查询</a><a href="merchantsDetails.html?id=' + data[i].id + '&parentId=' + data[i].parentId + '&sunName=' + sunNameT + '&anchor=#agent1"  target="_blank"  class="talk2">我要代理</a></div></li>';
        }
        dataList.html(txt);
        //商品总数
        totalNum.html(dataTotal);
        //分页搜索值
        pageValue.val(pageV);
    } else {
        alert(res.info)
    }
//父类点击刷新数据
    var merchansKind = parentType.find('li');
    merchansKind.click(function () {
        $(this).addClass('on').siblings().removeClass('on');
        var id = $(this).find('a').attr('id');
        window.location.href = 'merchants.html?id=' + id + '&sunId=&sunName=&page=1';
    });
    if (loc) {
        merchansKind.eq(loc - 1).addClass('on').siblings().removeClass('on');
        //面包屑之父类
        var text = merchansKind.filter('.on').children('a').text();
        $('#parentName').html('<a href="merchants.html?id=' + loc + '&sunId=&sunName=&page=1">' + text + '</a>');
    }
//子类点击刷新数据
    sunType.on('click', 'a', function () {
        $(this).addClass('hover').siblings().removeClass('hover');
        var sId = $(this).attr('id'),
            sunName = $(this).text(),
            pId = $('.merchans_tab li').filter('.on').children('a').attr('id');
        window.location.href = 'merchants.html?id=' + pId + '&sunId=' + sId + '&sunName=' + sunName + '&page=1';
    });
//商品鼠标效果
    $('.wares ul li').hover(function () {
        $(this).addClass('hover').siblings().removeClass('hover');
    });

//分页器
    var DD = {
        "go": function (mm) {
            window.location.href = 'merchants.html?id=' + loc + '&sunId=' + sunId + '&sunName=' + sunNameText + '&page=' + mm;
        }
    };
    pageList.initPage(dataTotal, pageV, DD.go);
//翻页搜索
    pageGo.click(function () {
        var page = $('#pageValue').val();
        var GG = {
            "go": function (mm) {
                window.location.href = 'merchants.html?id=' + loc + '&sunId=' + sunId + '&sunName=' + sunNameText + '&page=' + mm;
            }
        };
        pageList.initPage(dataTotal, pageV, GG.go(page));
    });
//商品搜索
    searchV.focus(function () {
        $(this).val('')
    });
    searchGo.click(function () {
        var value = searchV.val();
        if (value == '' || value == '搜索商品') {
            alert('搜索不能为空或请输入的商品')
        } else {
            window.location.href = "search.html?search=" + value;
        }
    });
});