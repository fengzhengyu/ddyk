/**
 * Created by Administrator on 2017/9/11.
 */
$(function(){
    //获取URL参数值
    var website = location.href,
        arr = website.split("?")[1];
    var arr1 = arr.split("&");
    for (var i = 0; i < arr1.length; i++) {
        var arr2 = arr1[i].split("=");
        if (arr2[0] == "page") {
            var pageV = arr2[1];
        }
    }
    var search = getQueryString('search'),
        num = 10,
        url = DD_api.searchGoodsList,
        list ={goodsName:search,num:num},
        res = getAjax(url,list),
        data = res.data,
        total = res.dataTotal,
        str = '',
        pageList = $('#page'),
        dataList = $('#searchList'),
        dataTotals =  $('#totals'),
        dataTotals2 =  $('.totals'),
        page_tab = $('.page_tab'),
        searchText = $('#searchText');
    searchText.val(search);
    if(res.flag == 'success'){

        //每页出现的数量
        for(var i=0;i<data.length;i++){
            str += '<li><a href="merchantsDetails.html?id='+data[i].id+'&parentId='+data[i].parentId+'&sunName='+data[i].sunName+'"><div class="search_demo_photo fl"><img src="'+data[i].photoUnify+'" alt="'+data[i].goodsName+'"/></div><dl class="search_demo_info fl"><dt>'+data[i].goodsName+'</dt><dd>商品分类：<span>'+data[i].parentsName+'</span></dd><dd>商品子类：<span>'+data[i].sunName+'</span></dd><dd>批准文号：<span>'+data[i].approve+'</span></dd><dd>生产企业：<span>'+data[i].productCompany+'</span></dd></dl></a></li>';
        }
        dataList.html(str);
        dataTotals.html(total);

        //分页器
        var DD = {
            "go": function (mm) {
                window.location.href = 'search.html?search='+search+'&page='+mm;
            }
        };
        pageList.initPage(total, pageV, DD.go);
        dataTotals2.html(total);
    }else{
        dataList.html('<span class="fontC">'+res.info+'</span>');
        dataTotals.html(0);
        page_tab.css('opacity',0);
    }
    $('#searchGo').click(function(){
        var val = $('#searchText').val();
        window.location.href= 'search.html?search='+val+'&page=1';
    });
});