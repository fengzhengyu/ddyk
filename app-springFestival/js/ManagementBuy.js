/**
 * Created by Administrator on 2017/8/31.
 */
$(function(){
    var token = $.cookie('userToken'),
        website = location.href,
        arr = website.split('?')[1];
    if(arr){
        var arr1 = arr.split('&');
        for(var i=0;i<arr1.length;i++){
            var arr2 =arr1[i].split('=');
            if(arr2[0] == 'page'){
                pageId = arr2[1]
            }
        }
    }else{
        pageId = 1;
    }

    var url = DD_api.memberBuyIndex,
        num = 20,
        list = {userToken:token,num:num},
        res = getAjax(url,list),
        data = res.data,
        totals =res.total,
        inner = '',
        table = $('#table tbody'),
        page_total = $('.page_total');//总数据class
    if(res.flag == 'success'){
        for(var i=0;i<data.length;i++){
            inner += '<tr><td class="cp_name">'+data[i].buyName+'</td><td>'+data[i].buyArea+'</td><td>'+data[i].buyChannel+'</td><td>'+data[i].publishTime+'</td><td class="cp_state1">'+data[i].checkStatus+'</td><td class="cp_operation"><a href="PublishBuy2.html?id='+data[i].buyId+'"  class="zs_modify">修改</a><a href="javascript:;" class="delete" id="'+data[i].buyId+'">删除</a></td></tr>';
        }
        table.html(inner);
        page_total.html(totals);
    }else{
        alert('暂无数据');
    }

    //判断text改变样式
    table.find('.cp_state1').each(function(){
        var checkType = $(this).text();
        if(checkType == "已审核"){
            $(this).css('color','#20c300');
            $(this).next().children('.zs_modify').hide();

        }else if(checkType == "未通过"){
            $(this).css('color','#ff0000');
            $(this).next().children('.zs_modify').show();
        }else{
            $(this).css('color','#ff8400');
            $(this).next().children('.zs_modify').show();
        }
    });
    table.find('.delete').each(function(){
        $(this).click(function(){
            var buyId= $(this).attr('id'),
                url = DD_api.buyDelete,
                list = {buyId:buyId,userToken:token},
                res = getAjax(url,list);
            if(res.flag =='success'){
                alert(res.info);
                $(this).parents('tr').remove();
                window.location.reload();
            }else{
                alert(res.info);
            }

        })
    });
    //翻页
    var DD = {
        "go":function(mm){
            window.location.href = "ManagementBuy.html?page="+mm;
        }
    };
    $('#page').initPage(totals,pageId,DD.go);
});