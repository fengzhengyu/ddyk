/**
 * Created by Administrator on 2017/8/29.
 */
$(function(){
    var website = location.href,
        arr = website.split('?')[1],
        arr1 = arr.split('&');
    for(var i=0;i<arr1.length;i++){
        var arr2 = arr1[i].split('=');
        if(arr2[0]=='id'){
            var id= arr2[1];
        }
    }
    var url = DD_api.procurementInfo,
        list = {procurementId:id},
        res =getAjax(url,list),
        data = res.procurementData,
        urlJ = DD_api.procurementElite,//精彩推荐;
        urlH = DD_api.procurementTop,//热门推荐
        listJ = {num:10},
        resJ = getAjax(urlJ,listJ),
        resH = getAjax(urlH,listJ),
        jData =resJ.procurementDataList,
        hData = resH.procurementDataList,
        htmlJ ='',
        htmlH ='',
        splendidList = $('#splendid'),
        hotList = $('#hot'),
        details =$('#details'),
        parent = $('#parentName'),
        sun = $('#sunName'),
        parentType = data.procurementTypeName,
        sunType = data.procurementSunTypeName,
        parentId = data.procurementTypeId,
        sunId = data.procurementTypeSunId,
        searchValue = $('#searchText'),
        searchGo = $('#searchGo'),
        html ='<div class="market_left_text_tit1"><h1>'+data.procurementTitle+'</h1></div><div  class="market_left_text_tit2"><span class="time">'+data.publishTime+'</span><a href="javascript:;">点击量：'+data.hit+'</a></div><div  class="market_left_text_tit3">'+data.procurementContent+'</div>';
    details.html(html);
    parent.html( '<a href="marketing.html?parent='+parentId+'&sun=&page=">'+parentType+'</a>');
    sun.html( '<a href="marketing.html?parent='+parentId+'&sun='+sunId+'&page=">'+sunType+'</a>');
    document.title =data.procurementTitle;
    // console.log(res)
    if(resJ.flag == 'success'){
        //精彩推荐
        for(var j =0;j<jData.length;j++){
            htmlJ += '<a href="purchaseDetails.html?id='+jData[j].procurementId+'" class="market_r_c2_content_list"><span>'+(j+1)+'</span>'+jData[j].procurementTitle+'</a>';
        }
        splendidList.html(htmlJ);
    }else{
        splendidList.html('暂无数据！');
    }
    if(resH.flag == 'success'){
        //热门推荐
        for(var j =0;j<hData.length;j++){
            htmlH += '<a href="purchaseDetails.html?id='+hData[j].procurementId+'" class="market_r_c2_content_list"><span>'+(j+1)+'</span>'+hData[j].procurementTitle+'</a>';
        }
        hotList.html(htmlH);
    }else{
        hotList.html('暂无数据！');
    }

    //搜索
    searchValue.focus(function(){
        $(this).val('');
    });
    searchGo.click(function(){
        var value= searchValue.val();
        if(value == '' || value == '搜索文章'){
            alert('搜索不能为空或请输入文章标题')
        }else{
            window.location.href = 'purchase.html?key='+value+'&page=';
        }
    });
});