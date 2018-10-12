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
    var url = DD_api.consultInfo,
        list = {consultId:id},
        res =getAjax(url,list),
        data = res.consultData,
        parentType = data.consultTypeName,
        sunType = data.consultSunTypeName,
        parentId = data.consultTypeId,
        sunId = data.consultTypeSunId,
        parent = $('#parentName'),
        sun = $('#sunName'),
        details =$('#details'),
        searchValue = $('#searchText'),
        searchGo = $('#searchGo'),
        html ='<div class="market_left_text_tit1"><h1>'+data.consultTitle+'</h1></div><div  class="market_left_text_tit2"><span class="time">'+data.publishTime+'</span><a href="javascript:;">点击量：'+data.hit+'</a></div><div  class="market_left_text_tit3">'+data.consultContent+'</div>';
    details.html(html);
    parent.html( '<a href="information.html?parent='+parentId+'&sun=&page=">'+parentType+'</a>');
    sun.html( '<a href="information.html?parent='+parentId+'&sun='+sunId+'&page=">'+sunType+'</a>');
    document.title =data.consultTitle;
    //精彩定义
    var urlJ = DD_api.consultElite,
        listJ = {num:5},
        resJ = getAjax(urlJ,listJ),
        dataJ = resJ.consultDataList,
        htmlJ = '',
        splendid = $('#splendid'),
    //热门定义
        urlR = DD_api.consultTop,
        listR = {num:10},
        resR = getAjax(urlR,listR),
        dataR = resR.consultDataList,
        hot = $('#hot'),
        htmlR= '';
    if(resJ.flag == 'success'){
        //精彩推荐
        for(var i=0;i<dataJ.length;i++){
            htmlJ += '<a href="informationDetails.html?id='+dataJ[i].consultId+'" target="_blank" class="market_r_c1_content_list"><div class="market_r_c1_content_list_l fl"><p>'+dataJ[i].consultTitle+'</p><span>'+dataJ[i].consultIntroduce+'</span></div><div class="market_r_c1_content_list_r fl"><img src="'+dataJ[i].consultPhoto+'" /></div></a>';
        }
        splendid.html(htmlJ);
    }else{
        splendid.html('暂无数据！');
    }
    if(resR.flag == 'success'){
        //热门推荐
        for(var i=0;i<dataR.length;i++){
            htmlR += ' <a href="informationDetails.html?id='+dataR[i].consultId+'" target="_blank" class="market_r_c2_content_list"><span class="red">'+(i+1)+'</span>'+dataR[i].consultTitle+'</a>';
        }
        hot.html(htmlR);
    }else{
        hot.html('暂无数据！');
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
            window.location.href = 'information.html?key='+value+'&page=';
        }
    });
});