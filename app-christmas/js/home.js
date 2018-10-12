/**
 * Created by Administrator on 2017/6/7.
 */
(function (window) {
    var theUA = window.navigator.userAgent.toLowerCase();
    if ((theUA.match(/msie\s\d+/) && theUA.match(/msie\s\d+/)[0]) || (theUA.match(/trident\s?\d+/) && theUA.match(/trident\s?\d+/)[0])) {
        var ieVersion = theUA.match(/msie\s\d+/)[0].match(/\d+/)[0] || theUA.match(/trident\s?\d+/)[0];
        if (ieVersion <= 9) {
            var str = "你的浏览器版本太low了,请升级浏览器:";
            var str2 = "推荐使用:谷歌、火狐、搜狗、360、IE10、IE11等浏览器;";
            document.writeln("<pre style='text-align:center;color:#fff;background-color:#ff6000; height:100%;border:0;position:fixed;top:0;left:0;width:100%;z-index:1234'>" +
                "<h2 style='padding-top:200px;margin-bottom:30px;'><strong>" + str + "<br/></strong></h2><h2>" +
                str2 + "</h2></pre>");
        }
    }
})(window);

$(function () {

    document.onreadystatechange = function () {
        if (document.readyState == "complete") {
            //弹出广告
            var pageWrap = document.getElementById('notice');
            pageWrap.style.display = 'block';

        }
    }

    //定义变量
    var topNav = $('#top_nav>li'),//顶部导航list
        searchV = $('#searchText'),//搜索值
        searchGo = $('#searchGo'), //搜索按钮
        token = $.cookie('userToken'), //登陆唯一标示
        userName = $.cookie('userName'), //登录名
        userPhone = $.cookie('userPhone'),//登陆手机
        userPhoto = $.cookie('userPhoto'),//登陆头像
        login_register = $('#login_register'),//登陆注册
        login_close = $('#login_close'), //登录关闭
        login_photoR = $('#right_photo'), //右侧头像选择器
        login_photoT = $('#top_photo'),  //顶部头像选择器
        login_state = $('#login_btn1'),  //右侧登陆状态
        disLogin_state = $('#login_btn2'), //右侧非登陆状态
        numUrl = DD_api.memberAllInfo,  //登陆数据条接口
        numList = {userToken: token},
        numRes = getAjax(numUrl, numList),
        numData = numRes.data,
        numHtml = '',
        user_message = $('.user_message'),//登陆数据条选择器
        floorList = $('#floor_side li '),
        notice = $('#notice');

    //顶部nav
    topNav.hover(function () {
        $(this).toggleClass('hover');
    });
    //搜索
    searchV.focus(function () {
        $(this).val('');
    });
    searchGo.click(function () {
        var value = searchV.val();
        if (value == '' || value == '搜索商品') {
            alert('搜索不能为空或请输入的商品');
        } else {
            window.location.href = "search.html?search=" + value + '&page=1';
        }

    });
    document.onkeydown = function (e) {
        var ev = document.all ? window.event : e;
        if (ev.keyCode == 13) {
            var value = $('#searchText').val();
            if (value == '' || value == '搜索商品') {
                alert('搜索不能为空或请输入的商品');
            } else {
                window.location.href = "search.html?search=" + value + '&page=1';
            }
        }
    };

    //是否登录状态
    if (userName && userPhone && token) {
        login_register.hide();
        login_close.show();
        login_state.hide();
        disLogin_state.show();
        $('#user_info1').html(userName);
        $('#user_info2').html(userName);
        $('#right_text').html("你好," + userName);
        login_photoR.attr('src', userPhoto);
        login_photoT.attr('src', userPhoto);
        //登陆数据显示信息
        for (var i = 0; i < numData.length; i++) {
            numHtml += '<p class="shop1"><span class="align_r">' + numData[i].name + '：<b>' + numData[i].num + '</b></span></p>'
        }
        user_message.html(numHtml);

        //昵称字数限制
        var login_name = $('.nameBan'),//登陆昵称
            login_nameH = login_name.html();
        if (login_nameH.length > 6) {
            login_nameH = login_nameH.substring(0, 5) + '...';
        }
        login_name.html(login_nameH);
        login_name.attr('title', userName);

    } else {
        login_register.show();
        login_close.hide();

        $('#user_info1').html('我的当代');
        $('#user_info2').html('请登录！');
        $('#right_text').html('请登录!');
        login_photoR.attr('src', 'images/account.png');
        login_photoT.attr('src', 'images/account.png');
        login_state.show();
        disLogin_state.hide();
        var noHtml = '<p class="shop1"><span class="align_r">发布招商：<b>0</b></span></p><p class="shop1"><span class="align_r">审核招商：<b>0</b></span></p><p class="shop1"><span class="align_r">收藏招商：<b>0</b></span></p><p class="shop1"><span class="align_r">收到留言：<b>0</b></span></p>';
        user_message.html(noHtml);
    }
    //进入会员中心
    $('#user_info1').click(function () {
        window.location.href = "MemberIndex.html";
    });
    //点击退出账号
    login_close.click(function () {
        login_register.show();
        login_close.hide();
        $('#user_info1').html('我的当代');
        $('#user_info2').html('请登录！');
        $('#right_text').html('请登录!');
        login_photoR.attr('src', 'images/account.png');
        login_photoT.attr('src', 'images/account.png');
        login_state.show();
        disLogin_state.hide();
        var noHtml = '<p class="shop1"><span class="align_r">发布招商：<b>0</b></span></p><p class="shop1"><span class="align_r">审核招商：<b>0</b></span></p><p class="shop1"><span class="align_r">收藏招商：<b>0</b></span></p><p class="shop1"><span class="align_r">收到留言：<b>0</b></span></p>';
        user_message.html(noHtml);
        $.cookie('userName', null, {expires: -1, path: '/'});
        $.cookie('userPhone', null, {expires: -1, path: '/'});
        $.cookie('userToken', null, {expires: -1, path: '/'});
        $.cookie('userPhoto', null, {expires: -1, path: '/'});
        $.cookie('userTime', null, {expires: -1, path: '/'});
        $.cookie('userEmail', null, {expires: -1, path: '/'});
        $.cookie('goldTotal', null, {expires: -1, path: '/'});
    });
    //右侧点击退出账号
    $('.right_close').click(function () {
        login_register.show();
        login_close.hide();
        $('#user_info1').html('我的当代');
        $('#user_info2').html('请登录！');
        $('#right_text').html('请登录!');
        login_photoR.attr('src', 'images/account.png');
        login_photoT.attr('src', 'images/account.png');
        login_state.show();
        disLogin_state.hide();
        var noHtml = '<p class="shop1"><span class="align_r">发布招商：<b>0</b></span></p><p class="shop1"><span class="align_r">审核招商：<b>0</b></span></p><p class="shop1"><span class="align_r">收藏招商：<b>0</b></span></p><p class="shop1"><span class="align_r">收到留言：<b>0</b></span></p>';
        user_message.html(noHtml);
        $.cookie('userName', '', {expires: -1, path: '/'});
        $.cookie('userPhone', '', {expires: -1, path: '/'});
        $.cookie('userToken', '', {expires: -1, path: '/'});
        $.cookie('userPhoto', null, {expires: -1, path: '/'});
        $.cookie('userTime', null, {expires: -1, path: '/'});
        $.cookie('userEmail', null, {expires: -1, path: '/'});
        $.cookie('goldTotal', null, {expires: -1, path: '/'});
    });

    //关闭广告
    notice.find('.close').click(function () {
        notice.fadeOut();
    });
    //楼层鼠标事件
    floorList.hover(function () {
        $(this).toggleClass('hover');
    });

    //楼层
    (function () {
        var oNav = $('#floor_side');
        var aNav = oNav.find('li'); //列表
        var aDiv = $('.floorStart .floor'); //楼层
        $(window).scroll(function () {
            //可视窗口高度
            var winH = $(window).height();
            //鼠标滚动的距离
            var iTop = $(window).scrollTop();

            if (iTop >= $(".header").height() + $(".main").height()) {
                oNav.fadeIn();
                //鼠标滑动样式改变
                aDiv.each(function () {
                    if (winH + iTop - $(this).offset().top > winH / 2) {
                        aNav.removeClass('hover');
                        aNav.eq($(this).index()).addClass('hover');
                    }

                })
            } else {
                oNav.fadeOut();
            }
        });
        //点击回到当前楼层
        aNav.click(function () {
            var t = aDiv.eq($(this).index()).offset().top;
            $('body,html').animate({
                "scrollTop": t
            }, 500);
            $(this).addClass('hover').siblings().removeClass('hover');
        });
    })();
    //主页数据
    var url = DD_api.indexGoods,
        res = getAjax(url),
        data = res.data,//左侧菜单列表
    //轮播数据
        slider = $('#slider .container'),
        directionBtn = $('#direction-btn'),
        dataAd = res.dataAd,//轮播数据
        slider_content = '',
        slider_list = '',
        slider_num = $('#slider_list'),
    //热门推荐数据
        hot_slider = $('#hot_slider'),
        hotData = res.adGoodsData,
        hot_content = '',
    //热门推荐新闻
        hot2_news = $('#h2_ul'),
            dataNews = res.dataAdNews,
        newsCon = '',
    //左侧菜单数据填充
        content = '',
        subMenu = $('#subMenu');

    //轮播数据
    if (!dataAd) {
        slider.html('<li class="slider-error" style="background: #fff;">暂无数据</li>');
        directionBtn.css('display', 'none');
    } else {
        for (var i = 0; i < dataAd.length; i++) {
            slider_content += '<li><a href="' + dataAd[i].jumpUrl + '" target="_blank"><img src="' + dataAd[i].picture + '" alt="图片已丢失"/></a></li>';
            slider_list += '<li></li>'
        }
        slider_num.html(slider_list);
        slider_num.find('li:first').addClass('active');
        slider.html(slider_content);
    }
    //热门推荐数据
    if (!hotData) {
        hot_slider.html('<p style="width: 720px;height: 170px;text-align: center;line-height: 170px;">暂无数据</p>');
    } else {
        for (var i = 0; i < hotData.length; i++) {
            hot_content += '<li><a href="merchantsDetails.html?id=' + hotData[i].id + '&parentId=' + hotData[i].ParentId + '&sunName=' + hotData[i].sunName + '" target="_blank"><div class="imgWarp"><img src="' + hotData[i].photoUnify + '" alt="图片"/></div><p class="item_tit">' + hotData[i].goodsName + '</p><p>' + hotData[i].productCompany + '</p></li></a>';
        }
        hot_slider.html(hot_content);
    }
    //热门推荐新闻
    if (!dataNews) {
        hot2_news.html('<p style="width: 240px;height: 167px;text-align: center;line-height: 167px;">暂无数据</p>');
    } else {

        for (var i = 0; i < dataNews.length; i++) {
            newsCon += '<li><a href="merchantsDetails.html?id=' + dataNews[i].id + '&parentId=' + dataNews[i].ParentId + '&sunName=' + dataNews[i].sunName + '" target="_blank">·' + dataNews[i].news + '</a></li>';
        }
        hot2_news.html(newsCon);
    }
    if (!data) {
        subMenu.html('暂无数据列表');
    } else {
        //左侧菜单列表填充
        for (var i = 0; i < data.length; i++) {
            content += '<li class="menu border0" id="' + data[i].id + '"><a href="merchants.html?id=' + data[i].id + '&sunId=&sunName=&page=1" class="menu_1" target="_blank"><p class="tit1">' + data[i].goodsParentsName + '</p><p class="tit2"><span id="' + data[i].sunData[0].id + '">' + data[i].sunData[0].goodsSunName + '</span><span class="line">|</span><span id="' + data[i].sunData[1].id + '">' + data[i].sunData[1].goodsSunName + '</span><span class="line">|</span><span id="' + data[i].sunData[2].id + '">' + data[i].sunData[2].goodsSunName + '</span></p><i class="active" id="menu_1_con1"></i></a><div class="item1"><div class="kind"></div><div class="category"><ul></ul></div></div></li>';
        }
        subMenu.html(content);
    }


    //左侧菜单 鼠标移入效果
    subMenu.find('.menu').mouseenter(function () {
        $(this).addClass('on');
        $(this).prev('.border0').find('.menu_1').toggleClass('border0');
        var id = $(this).attr('id'),
            url = DD_api.sunTypeGoods,//子类接口
            list = {typeId: id},
            res = getAjax(url, list),
            data = res.data,
            html = '',
            url2 = DD_api.indexEightList, //鼠标移上去数据接口
            list2 = {typeId: id, num: 8},
            res2 = getAjax(url2, list2),
            data2 = res2.data,
            html2 = '';



        //子类列表
        if (!data) {
            $(this).children('.item1').children('.kind').html('暂无分类信息');
        } else {
            for (var i = 0; i < data.length; i++) {
                html += '<a href="merchants.html?id=' + id + '&sunId=' + data[i].id + '&sunName=' + data[i].goodsSunName + '&page=1" id="' + data[i].id + '" target="_blank">' + data[i].goodsSunName + '</a>';
            }
            $(this).children('.item1').children('.kind').html(html);
        }
        if (!data2) {
            $(this).children('.item1').children('.category').children('ul').html('暂无数据列表');
        } else {
            //数据列表
            for (var i = 0; i < data2.length; i++) {
                html2 += '<li><dl><dt><img src="' + data2[i].photoUnify + '" alt="商品图片"/></dt><dd><p class="p1">' + data2[i].goodsName + '</p><p class="p2">' + data2[i].productCompany + '</p></dd><dd class="btn_dd1"><a href="merchantsDetails.html?id=' + data2[i].id + '&parentId=' + id + '&sunName=' + data2[i].sunName + '" target="_blank" class="details">查看详情</a><a href="merchantsDetails.html?id=' + data2[i].id + '&parentId=' + id + '&sunName=' + data2[i].sunName + '&anchor=#agent1" target="_blank" class="talk">洽谈留言</a></dd></dl></li>';
            }
            $(this).children('.item1').children('.category').children('ul').html(html2);
        }

    });
    subMenu.find('.menu').mouseleave(function () {
        $(this).removeClass('on');
        $(this).prev('.border0').find('.menu_1').toggleClass('border0');
    });



   if(res == ''|| res == null){
       $('#floor_content').html('<div style="height: 700px;text-align: center;line-height: 700px;">暂无数据，请稍后再来</div>')
       return;
   }
    //第一层中西药品数据
    var typeData1 = res.data[0].typeData,
        floor_ware1 = $('#floor_ware1 ul'),
        floor_w1 = '',

    //第2层中药药材数据
        typeData2 = res.data[1].typeData,
        floor_ware2 = $('#floor_ware2 ul'),
        floor_w2 = '',
    //第3层中药饮片数据
        typeData3 = res.data[2].typeData,
        floor_ware3 = $('#floor_ware3 ul'),
        floor_w3 = '',
    //第4层数据
        typeData4 = res.data[3].typeData,
        floor_ware4 = $('#floor_ware4 ul'),
        floor_w4 = '',
    //第5层数据
        typeData5 = res.data[4].typeData,
        floor_ware5 = $('#floor_ware5 ul'),
        floor_w5 = '',
    //第6层数据
        typeData6 = res.data[5].typeData,
        floor_ware6 = $('#floor_ware6 ul'),
        floor_w6 = '',
    //第7层数据
        typeData7 = res.data[6].typeData,
        floor_ware7 = $('#floor_ware7 ul'),
        floor_w7 = '',
    //第8层数据
        typeData8 = res.data[7].typeData,
        floor_ware8 = $('#floor_ware8 ul'),
        floor_w8 = '',
    //第9层数据
        typeData9 = res.data[8].typeData,
        floor_ware9 = $('#floor_ware9 ul'),
        floor_w9 = '',
    //第10层数据
        typeData10 = res.data[9].typeData,
        floor_ware10 = $('#floor_ware10 ul'),
        floor_w10 = '';

    if (!typeData1) {
        floor_ware1.html('<div style="width: 100%;height: 400px;text-align: center;line-height: 400px;color: #000;font-size: 20px;">暂无数据</div>');
    } else {
        for (var i = 0; i < typeData1.length; i++) {
            floor_w1 += '<li><a href="merchantsDetails.html?id=' + typeData1[i].id + '&parentId=1&sunName=' + typeData1[i].sunName + '" target="_blank"><div class="img"><img src="' + typeData1[i].photoUnify + '" alt="' + typeData1[i].goodsName + '"/></div><div class="explain"><dl><dt>' + typeData1[i].goodsName + '</dt><dd class="dd1">' + typeData1[i].approve + '</dd><dd class="dd2"><span class="sp1">生产企业:</span><span class="sp2">' + typeData1[i].productCompany + '</span></dd><dd class="dd3"><span class="sp1">功能主治:</span><span class="sp2">' + typeData1[i].effect + '</span></dd></dl></div></a><div class="details"><a href="merchantsDetails.html?id=' + typeData1[i].id + '&parentId=1&sunName=' + typeData1[i].sunName + '" target="_blank" class="talk1">详情查询</a><a href="merchantsDetails.html?id=' + typeData1[i].id + '&parentId=1&sunName=' + typeData1[i].sunName + '&anchor=#agent1" target="_blank" class="talk2">我要代理</a></div></li>';
        }
        floor_ware1.html(floor_w1);
    }
    if (!typeData2) {
        floor_ware2.html('<div style="width: 100%;height: 400px;text-align: center;line-height: 400px;color: #000;font-size: 20px;">暂无数据</div>');
    } else {
        for (var i = 0; i < typeData2.length; i++) {
            floor_w2 += '<li><a href="merchantsDetails.html?id=' + typeData2[i].id + '&parentId=2&sunName=' + typeData2[i].sunName + '" target="_blank"><div class="img"><img src="' + typeData2[i].photoUnify + '" alt="' + typeData2[i].goodsName + '"/></div><div class="explain"><dl><dt>' + typeData2[i].goodsName + '</dt><dd class="dd1">' + typeData2[i].approve + '</dd><dd class="dd2"><span class="sp1">生产企业:</span><span class="sp2">' + typeData2[i].productCompany + '</span></dd><dd class="dd3"><span class="sp1">功能主治:</span><span class="sp2">' + typeData2[i].effect + '</span></dd></dl></div></a><div class="details"><a href="merchantsDetails.html?id=' + typeData2[i].id + '&parentId=2&sunName=' + typeData2[i].sunName + '" target="_blank" class="talk1">详情查询</a><a href="merchantsDetails.html?id=' + typeData2[i].id + '&parentId=2&sunName=' + typeData2[i].sunName + '&anchor=#agent1" target="_blank"  class="talk2">我要代理</a></div></li>';
        }
        floor_ware2.html(floor_w2);
    }
    if (!typeData3) {
        floor_ware3.html('<div style="width: 100%;height: 400px;text-align: center;line-height: 400px;color: #000;font-size: 20px;">暂无数据</div>');
    } else {
        for (var i = 0; i < typeData3.length; i++) {
            floor_w3 += '<li><a href="merchantsDetails.html?id=' + typeData3[i].id + '&parentId=3&sunName=' + typeData3[i].sunName + '" target="_blank"><div class="img"><img src="' + typeData3[i].photoUnify + '" alt="' + typeData3[i].goodsName + '"/></div><div class="explain"><dl><dt>' + typeData3[i].goodsName + '</dt><dd class="dd1">' + typeData3[i].approve + '</dd><dd class="dd2"><span class="sp1">生产企业:</span><span class="sp2">' + typeData3[i].productCompany + '</span></dd><dd class="dd3"><span class="sp1">功能主治:</span><span class="sp2">' + typeData3[i].effect + '</span></dd></dl></div></a><div class="details"><a href="merchantsDetails.html?id=' + typeData3[i].id + '&parentId=3&sunName=' + typeData3[i].sunName + '" target="_blank" class="talk1">详情查询</a><a href="merchantsDetails.html?id=' + typeData3[i].id + '&parentId=3&sunName=' + typeData3[i].sunName + '&anchor=#agent1" target="_blank" class="talk2">我要代理</a></div></li>';
        }
        floor_ware3.html(floor_w3);
    }
    if (!typeData4) {
        floor_ware4.html('<div style="width: 100%;height: 400px;text-align: center;line-height: 400px;color: #000;font-size: 20px;">暂无数据</div>');
    } else {
        for (var i = 0; i < typeData4.length; i++) {
            floor_w4 += '<li><a href="merchantsDetails.html?id=' + typeData4[i].id + '&parentId=4&sunName=' + typeData4[i].sunName + '" target="_blank"><div class="img"><img src="' + typeData4[i].photoUnify + '" alt="' + typeData4[i].goodsName + '"/></div><div class="explain"><dl><dt>' + typeData4[i].goodsName + '</dt><dd class="dd1">' + typeData4[i].approve + '</dd><dd class="dd2"><span class="sp1">生产企业:</span><span class="sp2">' + typeData4[i].productCompany + '</span></dd><dd class="dd3"><span class="sp1">功能主治:</span><span class="sp2">' + typeData4[i].effect + '</span></dd></dl></div></a><div class="details"><a href="merchantsDetails.html?id=' + typeData4[i].id + '&parentId=4&sunName=' + typeData4[i].sunName + '" target="_blank" class="talk1">详情查询</a><a href="merchantsDetails.html?id=' + typeData4[i].id + '&parentId=4&sunName=' + typeData4[i].sunName + '&anchor=#agent1" target="_blank"  class="talk2">我要代理</a></div></li>';
        }
        floor_ware4.html(floor_w4);
    }
    if (!typeData5) {
        floor_ware5.html('<div style="width: 100%;height: 400px;text-align: center;line-height: 400px;color: #000;font-size: 20px;">暂无数据</div>');
    } else {
        for (var i = 0; i < typeData5.length; i++) {
            floor_w5 += '<li><a href="merchantsDetails.html?id=' + typeData5[i].id + '&parentId=5&sunName=' + typeData5[i].sunName + '" target="_blank"><div class="img"><img src="' + typeData5[i].photoUnify + '" alt="' + typeData5[i].goodsName + '"/></div><div class="explain"><dl><dt>' + typeData5[i].goodsName + '</dt><dd class="dd1">' + typeData5[i].approve + '</dd><dd class="dd2"><span class="sp1">生产企业:</span><span class="sp2">' + typeData5[i].productCompany + '</span></dd><dd class="dd3"><span class="sp1">功能主治:</span><span class="sp2">' + typeData5[i].effect + '</span></dd></dl></div></a><div class="details"><a href="merchantsDetails.html?id=' + typeData5[i].id + '&parentId=5&sunName=' + typeData5[i].sunName + '" target="_blank" class="talk1">详情查询</a><a href="merchantsDetails.html?id=' + typeData5[i].id + '&parentId=5&sunName=' + typeData5[i].sunName + '&anchor=#agent1" target="_blank" class="talk2">我要代理</a></div></li>';
        }
        floor_ware5.html(floor_w5);
    }
    if (!typeData6) {
        floor_ware6.html('<div style="width: 100%;height: 400px;text-align: center;line-height: 400px;color: #000;font-size: 20px;">暂无数据</div>');
    } else {
        for (var i = 0; i < typeData6.length; i++) {
            floor_w6 += '<li><a href="merchantsDetails.html?id=' + typeData6[i].id + '&parentId=6&sunName=' + typeData6[i].sunName + '" target="_blank"><div class="img"><img src="' + typeData6[i].photoUnify + '" alt="' + typeData6[i].goodsName + '"/></div><div class="explain"><dl><dt>' + typeData6[i].goodsName + '</dt><dd class="dd1">' + typeData6[i].approve + '</dd><dd class="dd2"><span class="sp1">生产企业:</span><span class="sp2">' + typeData6[i].productCompany + '</span></dd><dd class="dd3"><span class="sp1">功能主治:</span><span class="sp2">' + typeData6[i].effect + '</span></dd></dl></div></a><div class="details"><a href="merchantsDetails.html?id=' + typeData6[i].id + '&parentId=6&sunName=' + typeData6[i].sunName + '" target="_blank" class="talk1">详情查询</a><a href="merchantsDetails.html?id=' + typeData6[i].id + '&parentId=6&sunName=' + typeData6[i].sunName + '&anchor=#agent1" target="_blank" class="talk2">我要代理</a></div></li>';
        }
        floor_ware6.html(floor_w6);
    }
    if (!typeData7) {
        floor_ware7.html('<div style="width: 100%;height: 400px;text-align: center;line-height: 400px;color: #000;font-size: 20px;">暂无数据</div>');
    } else {
        for (var i = 0; i < typeData7.length; i++) {
            floor_w7 += '<li><a href="merchantsDetails.html?id=' + typeData7[i].id + '&parentId=7&sunName=' + typeData7[i].sunName + '" target="_blank"><div class="img"><img src="' + typeData7[i].photoUnify + '" alt="' + typeData7[i].goodsName + '"/></div><div class="explain"><dl><dt>' + typeData7[i].goodsName + '</dt><dd class="dd1">' + typeData7[i].approve + '</dd><dd class="dd2"><span class="sp1">生产企业:</span><span class="sp2">' + typeData7[i].productCompany + '</span></dd><dd class="dd3"><span class="sp1">功能主治:</span><span class="sp2">' + typeData7[i].effect + '</span></dd></dl></div></a><div class="details"><a href="merchantsDetails.html?id=' + typeData7[i].id + '&parentId=7&sunName=' + typeData7[i].sunName + '" target="_blank" class="talk1">详情查询</a><a href="merchantsDetails.html?id=' + typeData7[i].id + '&parentId=7&sunName=' + typeData7[i].sunName + '&anchor=#agent1" target="_blank" class="talk2">我要代理</a></div></li>';
        }
        floor_ware7.html(floor_w7);
    }
    if (!typeData8) {
        floor_ware8.html('<div style="width: 100%;height: 400px;text-align: center;line-height: 400px;color: #000;font-size: 20px;">暂无数据</div>');
    } else {
        for (var i = 0; i < typeData8.length; i++) {
            floor_w8 += '<li><a href="merchantsDetails.html?id=' + typeData8[i].id + '&parentId=8&sunName=' + typeData8[i].sunName + '" target="_blank"><div class="img"><img src="' + typeData8[i].photoUnify + '" alt="' + typeData8[i].goodsName + '"/></div><div class="explain"><dl><dt>' + typeData8[i].goodsName + '</dt><dd class="dd1">' + typeData8[i].approve + '</dd><dd class="dd2"><span class="sp1">生产企业:</span><span class="sp2">' + typeData8[i].productCompany + '</span></dd><dd class="dd3"><span class="sp1">功能主治:</span><span class="sp2">' + typeData8[i].effect + '</span></dd></dl></div></a><div class="details"><a href="merchantsDetails.html?id=' + typeData8[i].id + '&parentId=8&sunName=' + typeData8[i].sunName + '" target="_blank" class="talk1">详情查询</a><a href="merchantsDetails.html?id=' + typeData8[i].id + '&parentId=8&sunName=' + typeData8[i].sunName + '&anchor=#agent1" target="_blank" class="talk2">我要代理</a></div></li>';
        }
        floor_ware8.html(floor_w8);
    }
    if (!typeData9) {
        floor_ware9.html('<div style="width: 100%;height: 400px;text-align: center;line-height: 400px;color: #000;font-size: 20px;">暂无数据</div>');
    } else {
        for (var i = 0; i < typeData9.length; i++) {
            floor_w9 += '<li><a href="merchantsDetails.html?id=' + typeData9[i].id + '&parentId=9&sunName=' + typeData9[i].sunName + '" target="_blank"><div class="img"><img src="' + typeData9[i].photoUnify + '" alt="' + typeData9[i].goodsName + '"/></div><div class="explain"><dl><dt>' + typeData9[i].goodsName + '</dt><dd class="dd1">' + typeData9[i].approve + '</dd><dd class="dd2"><span class="sp1">生产企业:</span><span class="sp2">' + typeData9[i].productCompany + '</span></dd><dd class="dd3"><span class="sp1">功能主治:</span><span class="sp2">' + typeData9[i].effect + '</span></dd></dl></div></a><div class="details"><a href="merchantsDetails.html?id=' + typeData9[i].id + '&parentId=9&sunName=' + typeData9[i].sunName + '" target="_blank" class="talk1">详情查询</a><a href="merchantsDetails.html?id=' + typeData9[i].id + '&parentId=9&sunName=' + typeData9[i].sunName + '&anchor=#agent1" target="_blank" class="talk2">我要代理</a></div></li>';
        }
        floor_ware9.html(floor_w9);
    }
    if (!typeData10) {
        floor_ware10.html('<div style="width: 100%;height: 400px;text-align: center;line-height: 400px;color: #000;font-size: 20px;">暂无数据</div>');
    } else {
        for (var i = 0; i < typeData10.length; i++) {
            floor_w10 += '<li><a href="merchantsDetails.html?id=' + typeData10[i].id + '&parentId=10&sunName=' + typeData10[i].sunName + '" target="_blank"><div class="img"><img src="' + typeData10[i].photoUnify + '" alt="' + typeData10[i].goodsName + '"/></div><div class="explain"><dl><dt>' + typeData10[i].goodsName + '</dt><dd class="dd1">' + typeData10[i].approve + '</dd><dd class="dd2"><span class="sp1">生产企业:</span><span class="sp2">' + typeData10[i].productCompany + '</span></dd><dd class="dd3"><span class="sp1">功能主治:</span><span class="sp2">' + typeData10[i].effect + '</span></dd></dl></div></a><div class="details"><a href="merchantsDetails.html?id=' + typeData10[i].id + '&parentId=10&sunName=' + typeData10[i].sunName + '" target="_blank" class="talk1">详情查询</a><a href="merchantsDetails.html?id=' + typeData10[i].id + '&parentId=10&sunName=' + typeData10[i].sunName + '&anchor=#agent1" target="_blank" class="talk2">我要代理</a></div></li>';
        }
        floor_ware10.html(floor_w10);
    }

    //十大楼层标题
    var floor_t1 = '<a href="merchants.html?id=' + data[0].id + '&sunId=&sunName=&page=1" >' + data[0].goodsParentsName + '</a>',
        floor_t2 = '<a href="merchants.html?id=' + data[1].id + '&sunId=&sunName=&page=1" >' + data[1].goodsParentsName + '</a>',
        floor_t3 = '<a href="merchants.html?id=' + data[2].id + '&sunId=&sunName=&page=1" >' + data[2].goodsParentsName + '</a>',
        floor_t4 = '<a href="merchants.html?id=' + data[3].id + '&sunId=&sunName=&page=1" >' + data[3].goodsParentsName + '</a>',
        floor_t5 = '<a href="merchants.html?id=' + data[4].id + '&sunId=&sunName=&page=1" >' + data[4].goodsParentsName + '</a>',
        floor_t6 = '<a href="merchants.html?id=' + data[5].id + '&sunId=&sunName=&page=1" >' + data[5].goodsParentsName + '</a>',
        floor_t7 = '<a href="merchants.html?id=' + data[6].id + '&sunId=&sunName=&page=1" >' + data[6].goodsParentsName + '</a>',
        floor_t8 = '<a href="merchants.html?id=' + data[7].id + '&sunId=&sunName=&page=1" >' + data[7].goodsParentsName + '</a>',
        floor_t9 = '<a href="merchants.html?id=' + data[8].id + '&sunId=&sunName=&page=1" >' + data[8].goodsParentsName + '</a>',
        floor_t10 = '<a href="merchants.html?id=' + data[9].id + '&sunId=&sunName=&page=1" >' + data[9].goodsParentsName + '</a>';
    $('#floor_title1').html(floor_t1);
    $('#floor_title2').html(floor_t2);
    $('#floor_title3').html(floor_t3);
    $('#floor_title4').html(floor_t4);
    $('#floor_title5').html(floor_t5);
    $('#floor_title6').html(floor_t6);
    $('#floor_title7').html(floor_t7);
    $('#floor_title8').html(floor_t8);
    $('#floor_title9').html(floor_t9);
    $('#floor_title10').html(floor_t10);
    //楼层商品鼠标效果
    $('.floor_ware ul li').mouseover(function () {
        $(this).addClass('hover').siblings().removeClass('hover');
    });
    //轮播
    loop('#slider', '#slider .btn li', '#slider .container li', '#prev', '#next', '#slider_list');
    //hot 左侧轮播
    (function () {
        hot_slider('hot_container', 'left');
        function hot_slider(id, dir) {
            var obj = document.getElementById(id);
            var oUl = obj.getElementsByTagName('ul')[0];
            var aLi = obj.getElementsByTagName('li');
            if (!aLi.length) {
                return false;
            } else {
                var speed = -1;
                var timer = null;
                oUl.innerHTML = oUl.innerHTML + oUl.innerHTML;

                oUl.style.width = aLi[0].offsetWidth * aLi.length + 'px';
                timer = setInterval(function () {
                    oUl.style.left = oUl.offsetLeft + speed + 'px';

                    if (oUl.offsetLeft < -oUl.offsetWidth / 2) {
                        oUl.style.left = 0;
                    }
                    else if (oUl.offsetLeft > 0) {
                        oUl.style.left = -oUl.offsetWidth / 2 + 'px';
                    }
                }, 30);


                if (dir == 'left') {
                    speed = -1;
                }
                else {
                    speed = 1;
                }

                oUl.onmouseover = function () {
                    clearInterval(timer);
                };
                oUl.onmouseout = function () {
                    timer = setInterval(function () {
                        oUl.style.left = oUl.offsetLeft + speed + 'px';
                        if (oUl.offsetLeft < -oUl.offsetWidth / 2) {
                            oUl.style.left = '0';
                        } else if (oUl.offsetLeft > 0) {
                            oUl.style.left = -oUl.offsetWidth / 2 + 'px';
                        }
                    }, 30);
                };
            }


        }
    })();

    //右边消息无缝滚动
    (function () {
        gundong('push_message_content', 'up');
        function gundong(id, dir) {
            var obj = document.getElementById(id),
                oUl = obj.getElementsByTagName('ul')[0],
                aLi = obj.getElementsByTagName('li');

            if (!aLi.length) {
                return false;
            } else {
                var speed = -1;
                var timer = null;
                oUl.innerHTML += oUl.innerHTML;

                oUl.style.height = aLi[0].offsetHeight * aLi.length + 'px';
                timer = setInterval(function () {
                    oUl.style.top = oUl.offsetTop + speed + 'px';

                    if (oUl.offsetTop < -oUl.offsetHeight / 2) {
                        oUl.style.top = 0;
                    }
                    else if (oUl.offsetTop > 0) {
                        oUl.style.top = -oUl.offsetHeight / 2 + 'px';
                    }
                }, 30);

                if (dir == 'up') {
                    speed = -1;
                }
                else {
                    speed = 1;
                }

                oUl.onmouseover = function () {
                    clearInterval(timer);
                };
                oUl.onmouseout = function () {
                    timer = setInterval(function () {
                        oUl.style.top = oUl.offsetTop + speed + 'px';
                        if (oUl.offsetTop < -oUl.offsetHeight / 2) {
                            oUl.style.top = '0';
                        } else if (oUl.offsetTop > 0) {
                            oUl.style.top = -oUl.offsetHeight / 2 + 'px';
                        }
                    }, 30);
                };
            }

        }
    })();

});

function loop(obj, sliderBtn, sliderCon, prev, next, slider_list) {
    var i = 0,
        timer = null,
        slider_btn = $(sliderBtn),
        btnW = $(slider_list).outerWidth(true);//
    $(slider_list).css('margin-left', -btnW / 2);

    var len = slider_btn.length;
    slider_btn.hover(function () {
        var index = $(this).index();
        i = index;
        tab();
    });

    timer = setInterval(function () {
        i++;
        if (i == len) {
            i = 0;
        }
        tab();
    }, 2000);
    $(obj).hover(function () {
        clearInterval(timer);
    }, function () {
        timer = setInterval(function () {
            i += 1;
            if (i == len) {
                i = 0;
            }
            tab();
        }, 2000);
    });
    //向左走
    $(prev).click(function () {
        i--;
        if (i == -1) {
            i = len - 1;
        }
        tab();
    });
    //向右走
    $(next).click(function () {
        i++;
        if (i == len) {
            i = 0;
        }
        tab();
    });
    function tab() {
        $(sliderBtn).eq(i).addClass('active').siblings().removeClass('active');
        $(sliderCon).eq(i).fadeIn().siblings().fadeOut();
    };
}
function getAjax(url, list) {
    var data = '';
    $.ajax({
        url: url,
        type: 'post',
        data: list,
        async: false,
        dataType: "json",
        cache: false,
        crossDomain: true == !(document.all),
        success: function (res) {
            //console.log(res);
            data = res;
        },
        error: function () {
            console.log("Ajax获取数据失败！");
        }
    });
    return data;
}
function popup(name) {
    $(name).fadeIn();
    $(name).width($(document).offsetWidth);
    $(name).height($(document).offsetHeight);

};
