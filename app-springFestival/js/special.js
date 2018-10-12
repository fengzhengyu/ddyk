/**
 * Created by Administrator on 2017/8/29.
 */
$(function(){
    var website = location.href,
        arr = website.split('?')[1];
    if(arr){
        var arr1 = arr.split('&');
        for(var i=0;i<arr1.length;i++){
            var arr2 = arr1[i].split('=');
            if(arr2[0] == 'parent'){
                parentId = arr2[1];
            }else if(arr2[0] == 'page'){
                pageId = arr2[1];
            }
        }
    }else{
        parentId = '';
        pageId = 1;
    }
    var key = getQueryString('key'),
        urlJ = DD_api.specialElite,//精彩推荐
        urlR = DD_api.specialTop,//热门推荐
        listJ = {num:5},
        listR = {num:10},
        resJ = getAjax(urlJ,listJ),
        resR = getAjax(urlR,listR),
        dataJ = resJ.specialDataList,
        dataR = resR.specialDataList,
        htmlJ = '',
        htmlR= '',
        splendid = $('#splendid'),
        hot = $('#hot'),
        market_tab = $('.market_tab'),
        page_tab =$('.page_tab'),
        pageList = $('#page'),
        totalsList = $('.totals'),
        searchValue = $('#searchText'),
        searchGo =  $('#searchGo') ;

    if(key != null){
        var urlSearch = DD_api.searchSpecial,
            listSearch = {specialTitle:key,num:10,page:pageId},
            resSearch = getAjax(urlSearch,listSearch),
            dataSearch = resSearch.specialDataList,
            totalsSearch = resSearch.specialtTotal;
        if(resSearch.flag == 'success'){
            var inner = '';
            for(var i=0;i<dataSearch.length;i++){
                var imgSearch =dataSearch[i].specialPhoto == null ? "" : dataSearch[i].specialPhoto;
                inner += '<a href="'+dataSearch[i].specialUrl+'" target="_blank" class="market_t_l_message"><div class="img fl"><img src="'+imgSearch+'" alt="图片"/></div><div class="title has-photo fl"><h2>'+dataSearch[i].specialTitle+'</h2><p>'+dataSearch[i].specialDescription+'</p></div></a>';
            }
            market_tab.html(inner);
            totalsList.html(dataSearch);
        }else{
            market_tab.html('没有数据');
        }
    }else{
        var num =10,
            url = DD_api.specialIndex,
            list = {num:num,parentId:parentId,page:pageId},
            res = getAjax(url,list),
            pData = res.specialData,
            data = res.specialDataList,
            dataTotals = res.specialTotal,
            htmlP = '',
            html = '',
            parentList = $('#parentList'),
            dataList = $('#dataList');
        //无数据执行
        if(!res){
            $('.market_main').html('<div style="height: 300px;line-height: 300px;text-align: center;">暂无数据，请稍后再来！</div>');
            $('#pageWrap').html('');
            return;
        }

        if(res.flag == 'success'){
            //父类
            for(var i=0;i<pData.length;i++){
                htmlP += '<li><a href="javascript:;" id="'+pData[i].specialTypeId+'">'+pData[i].specialTypeName+'</a></li>'
            }
            parentList.html(htmlP);
            if(data){
                //数据列表
                for(var i=0;i<data.length;i++){
                    var imgState = data[i].specialPhoto == null ? "" : data[i].specialPhoto;
                    html += '<a href="'+data[i].specialUrl+'" target="_blank" class="market_t_l_message  has-photo"><div class="img  fl"><img src="'+imgState+'"/></div><div class="title fl"><h2>'+data[i].specialTitle+'</h2><p>'+data[i].specialDescription+'</p></div></a>';
                }
                dataList .html(html);
                totalsList.html(dataTotals);
            }else{
                dataList .html(res.info);
                page_tab.css('opacity',0);
            }
            var parentType = $('#parentList li');
            if(parentId ==''){
                parentType.eq(0).addClass('on');
            }else{
                parentType.each(function(){
                    var id= $(this).children().attr('id');
                    if(id == parentId ){
                        $(this).addClass('on');
                    }
                });
            }
            //父类切换
            parentType.click(function(){
                var id = $(this).children().attr('id');
                window.location= 'special.html?parent='+id+'&page=';
            });

        }else{
            alert(res.info)
        }
    }
    //精彩
    if(resJ.flag == 'success'){
        for(var i=0;i<dataJ.length;i++){
            htmlJ += '<a href="'+dataJ[i].specialUrl+'" target="_blank" class="market_r_c1_content_list"><div class="market_r_c1_content_list_l fl"><p>'+dataJ[i].specialTitle+'</p><span>'+dataJ[i].specialDescription+'</span></div><div class="market_r_c1_content_list_r fl"><img src="'+dataJ[i].specialPhoto+'"/></div></a>';
        }
        splendid.html(htmlJ);
    }else{
        splendid.html('暂无数据！');
    }
    if(resR.flag == 'success'){
        //热门
        for(var i=0;i<dataR.length;i++){
            htmlR += ' <a href="'+dataR[i].specialUrl+'" target="_blank" class="market_r_c2_content_list"><span class="red">'+(i+1)+'</span>'+dataR[i].specialTitle+'</a>';
        }
        hot.html(htmlR);
    }else{
        hot.html('暂无数据！');
    }

    //搜索
    searchValue.focus(function(){
        $(this).val('')
    });
    searchGo.click(function(){
        var value= searchValue.val();
        if(value == '' || value == '搜索文章'){
            alert('搜索不能为空或请输入文章标题')
        }else{
            window.location.href = 'special.html?key='+value+'&page=';
        }
    });
    //翻页
    var DD = {
        'go':function(mm){
            if(key){
                window.location.href = 'special.html?&key='+key+'&page='+mm;
            }else{
                window.location.href = 'special.html?parent='+parentId+'&page='+mm;
            }

        }
    };
    if(key){
        pageList.initPage(totalsSearch,pageId,DD.go);
    }else{
        pageList.initPage(dataTotals,pageId,DD.go);
    }
});