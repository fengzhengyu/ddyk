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
                var parentId = arr2[1];
            }else if(arr2[0] == 'sun'){
                var sunId = arr2[1];
            }else if(arr2[0] == 'page'){
                var pageId = arr2[1];
            }
        }
    }else{
       var parentId = '',
           sunId = '',
           pageId = 1;
    }
    var key = getQueryString('key'),
        urlJ = DD_api.consultElite,//精彩推荐
        urlR = DD_api.consultTop,//热门推荐
        listJ = {num:5},
        listR = {num:10},
        resJ = getAjax(urlJ,listJ),
        resR = getAjax(urlR,listR),
        dataJ = resJ.consultDataList,
        dataR = resR.consultDataList,
        htmlJ = '',
        htmlR= '',
        splendid = $('#splendid '),
        hot = $('#hot'),
        market_tab = $('.market_tab'),
        pageList = $('#page'),
        totalsList = $('.totals'),
        searchValue = $('#searchText'),
        searchGo =  $('#searchGo') ;
    if(key != null){
        var urlSearch = DD_api.searchConsult,
            listSearch = {consultTitle:key,num:10,page:pageId},
            resSearch = getAjax(urlSearch,listSearch),
            dataSearch = resSearch.consultDataList,
            totalsSearch = resSearch.consultTotal;

        if(resSearch.flag == 'success'){
            var inner = '';
            for(var i=0;i<dataSearch.length;i++){
                var imgSearch =dataSearch[i].consultPhoto == null ? "" : dataSearch[i].consultPhoto;
                inner += '<a href="informationDetails.html?id='+dataSearch[i].consultId+'" target="_blank" class="market_t_l_message "><div class="img fl"></div><div class="title fl"><h2>'+dataSearch[i].consultTitle+'</h2><p>'+dataSearch[i].consultIntroduce+'</p></div></a>'; //<img src="'+imgSearch+'" alt="图片"/>
            }
            market_tab.html(inner);
            totalsList.html(totalsSearch);
        }else{
            market_tab.html('没有数据');
        }
    }else{
        var num =10,
            url = DD_api.consultIndex,
            list = {num:num,parentId:parentId,sunId:sunId,page:pageId},
            res = getAjax(url,list),
            pData = res.consultData,
            sData = res.consultSunData,
            data = res.consultDataList,
            dataTotals = res.consultTotal,
            htmlP = '',
            htmlS ='',
            html = '',
            parentList = $('#parentList'),
            sunList = $('#sunList'),
            dataList = $('#dataList');

        //无数据执行
        if(!res){
            $('.market_main').html('<div style="height: 300px;line-height: 300px;text-align: center;">暂无数据，请稍后再来！</div>');
            $('#pageWrap').html('');
            return;
        }

        //父类
        for(var i=0;i<pData.length;i++){
            htmlP += '<li><a href="javascript:;" id="'+pData[i].consultTypeId+'">'+pData[i].consultTypeName+'</a></li>'
        }
        parentList.html(htmlP);
        //子类
        for(var i=0;i<sData.length;i++){
            htmlS += '<a href="javascript:;" id="'+sData[i].consultTypeId+'">'+sData[i].consultSunTypeName+'</a>';
        }
        sunList.html(htmlS);
        //数据列表
        for(var i=0;i<data.length;i++){
            var imgState = data[i].consultPhoto == null ? "" : data[i].consultPhoto;   //图片 code <div class="img fl"><img src="'+imgState+'"/></div>
            html += '<a href="informationDetails.html?id='+data[i].consultId+'" target="_blank" class="market_t_l_message"><div class="title fl"><h2>'+data[i].consultTitle+'</h2><p>'+data[i].consultIntroduce+'</p></div></a>';
        }
        dataList .html(html);
        totalsList.html(dataTotals);
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
            window.location= 'information.html?parent='+id+'&sun=&page=';
        });
        var sunType = $('#sunList a');
        if(sunId == ''){
            sunType.eq(0).addClass('on');
        }else{
            sunType.each(function(){
                var id= $(this).attr('id');
                if(id == sunId ){
                    $(this).addClass('on');
                }
            })
        }
        //子类切换
        sunType.click(function(){
            var id = $(this).attr('id');
            window.location= 'information.html?parent='+parentId+'&sun='+id+'&page=';
        });
    }
    if(resJ.flag =='success'){
        //精彩
        for(var i=0;i<dataJ.length;i++){
            htmlJ += '<a href="informationDetails.html?id='+dataJ[i].consultId+'" target="_blank" class="market_r_c1_content_list"><div class="market_r_c1_content_list_l fl"><p>'+dataJ[i].consultTitle+'</p><span>'+dataJ[i].consultIntroduce+'</span></div><div class="market_r_c1_content_list_r fl"><img src="'+dataJ[i].consultPhoto+'"/></div></a>';
        }
        splendid.html(htmlJ);
    }else{
        splendid.html("暂无数据！");
    }
    if(resR.flag == 'success'){
        //热门
        for(var i=0;i<dataR.length;i++){
            htmlR += ' <a href="informationDetails.html?id='+dataR[i].consultId+'" target="_blank" class="market_r_c2_content_list"><span class="red">'+(i+1)+'</span>'+dataR[i].consultTitle+'</a>';
        }
        hot.html(htmlR);
    }else{
        hot.html("暂无数据！");
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
            window.location.href = 'information.html?key='+value+'&page=';
        }
    });
    //翻页
    var DD = {
        'go':function(mm){
            if(key){
                window.location.href = 'information.html?&key='+key+'&page='+mm;
            }else{
                window.location.href = 'information.html?parent='+parentId+'&sun='+sunId+'&page='+mm;
            }

        }
    };
    if(key){
        pageList.initPage(totalsSearch,pageId,DD.go);
    }else{
        pageList.initPage(dataTotals,pageId,DD.go);
    }
});