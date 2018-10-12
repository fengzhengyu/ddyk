/**
 * Created by Administrator on 2017/8/29.
 */
$(function(){
    var website = location.href;
    var arr = website.split('?')[1];
    if(arr){
        var arr1 = arr.split('&');
        for(var i=0;i<arr1.length;i++){
            var arr2 = arr1[i].split('=');
            if(arr2[0] == 'parent'){
                parentId = arr2[1];
            }else if(arr2[0] == 'sun'){
                sunId =arr2[1];
            } else if(arr2[0] == 'page'){
                pageId = arr2[1];
            }
        }
    }else{
        parentId = '';
        sunId = '';
        pageId = 1 ;
    }
    var key =getQueryString('key'),
        urlJ = DD_api.procurementElite,//精彩推荐;
        urlH = DD_api.procurementTop,//热门推荐
        listJ = {num: 10},
        resJ = getAjax(urlJ, listJ),
        resH = getAjax(urlH, listJ),
        jData = resJ.procurementDataList,
        hData = resH.procurementDataList,
        htmlJ = '',
        htmlH = '',
        splendidList = $('#splendid'),
        hotList = $('#hot'),
        market_tab = $('.market_tab '),
        pageList = $('#page'),
        totalsList = $('.totals'),
        searchValue = $('#searchText'),
        searchGo =  $('#searchGo') ;

    if(key != null){
        var urlSearch = DD_api.searchProcurement,
            listSearch = {procurementTitle:key,num:10,page:pageId},
            resSearch = getAjax(urlSearch,listSearch),
            dataSearch = resSearch.procurementDataList,
            totalsSearch = resSearch.procurementTotal;
        console.log( resSearch)
        if(resSearch.flag =='success'){
            var html = '';
            for(var i=0;i<dataSearch.length;i++){
                var imgSearch = dataSearch[i].procurementPhoto == null ? "" : dataSearch[i].procurementPhoto;
                html += '<a href="purchaseDetails.html?id='+dataSearch[i].procurementId+'" target="_blank" class="market_t_l_message"><div class="img fl"></div><div class="title fl"><h2>'+dataSearch[i].procurementTitle+'</h2><p>'+dataSearch[i].procurementIntroduce+'</p></div></a>';//<img src="'+imgSearch+'"/>
            }
            market_tab.html(html);
            totalsList.html(totalsSearch);
        }else{
            market_tab.html('没有数据');
        }

    }else {
        var num = 10,
            url = DD_api.procurementIndex,
            list = {parentId: parentId,sunId: sunId, num: num, page: pageId},
            res = getAjax(url, list),
            pData = res.procurementData,
            sData = res.procurementSunData,
            data = res.procurementDataList,
            dataTotals = res.procurementTotal,
            htmlP = '',
            htmlS = '',
            htmlD = '',
            parentList = $('#parentList'),
            sunList = $('#sunList'),
            dataList = $('#dataList');

        //无数据执行
        if(!res){
            $('.market_main').html('<div style="height: 300px;line-height: 300px;text-align: center;">暂无数据，请稍后再来！</div>');
            $('#pageWrap').html('');
            return;
        }
        //父类数据
        for (var i = 0; i < pData.length; i++) {
            htmlP += '<li><a href="javascript:;" id="' + pData[i].procurementTypeId + '">' + pData[i].procurementTypeName + '</a></li>';
        }
        parentList.html(htmlP);
        //子类数据
        for (var i = 0; i < sData.length; i++) {
            htmlS += '<a href="javascript:;" id="' + sData[i].procurementTypeId + '">' + sData[i].procurementSunTypeName + '</a>'
        }
        sunList.html(htmlS);
        //采购数据
        for (var i = 0; i < data.length; i++) {
            var imgState =data[i].procurementPhoto == null ? "" : data[i].procurementPhoto;   //图片code <div class="img fl"><img src="'+imgState+'"/></div>
            htmlD += '<a href="purchaseDetails.html?id='+ data[i].procurementId +'" target="_blank" class="market_t_l_message"><div class="title fl"><h2>' + data[i].procurementTitle + '</h2><p>'+data[i].procurementIntroduce+'</p></div></a>';
        }
        dataList.html(htmlD);
        totalsList.html(dataTotals);
        var parentType = $('#parentList li');
        if(parentId == ''){
            parentType.eq(0).addClass('on');
        }else{
            parentType.each(function(){
                var id= $(this).children().attr('id');
                if(id == parentId ){
                    $(this).addClass('on');
                }
            });
        }
        parentType.click(function(){
            var id = $(this).children().attr('id');
            window.location= 'purchase.html?parent='+id+'&sun=&page=';
        });
        var sunType = $('#sunList a');
        if(sunId == ''){
            sunType.eq(0).addClass('on');
        }else{
            sunType.each(function(){
                var id = $(this).attr('id');
                if(id == sunId ){
                    $(this).addClass('on');
                }
            })
        }
        sunType.click(function(){
            var id = $(this).attr('id');
            window.location= 'purchase.html?parent='+parentId+'&sun='+id+'&page=';
        });
    }
    if(resJ.flag == 'success'){
        //精彩推荐
        for(var j =0;j<jData.length;j++){
            htmlJ += '<a href="purchaseDetails.html?id='+jData[j].procurementId+'" target="_blank" class="market_r_c2_content_list"><span>'+(j+1)+'</span>'+jData[j].procurementTitle+'</a>';
        }
        splendidList.html(htmlJ);
    }else{
        splendidList.html('暂无数据！');
    }
    if(resH.flag == 'success'){
        //热门推荐
        for(var j =0;j<hData.length;j++){
            htmlH += '<a href="purchaseDetails.html?id='+hData[j].procurementId+'" target="_blank" class="market_r_c2_content_list"><span>'+(j+1)+'</span>'+hData[j].procurementTitle+'</a>';
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
    //翻页
    var DD = {
        'go':function(mm){
            if(key){
                window.location.href = 'purchase.html?&key='+key+'&page='+mm;
            }else{
                window.location.href = 'purchase.html?parent='+parentId+'&sun='+sunId+'&page='+mm;
            }
        }
    };
    if(key){
        pageList.initPage(totalsSearch,pageId,DD.go);
    }else{
        pageList.initPage(dataTotals,pageId,DD.go);
    }
});