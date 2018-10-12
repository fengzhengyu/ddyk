/**
 * Created by Administrator on 2017/8/30.
 */
$(function(){
    var token = $.cookie('userToken');
    if( token){
        var url = window.location.search,
            loc = url.substring(url.lastIndexOf('=')+1, url.length),
            url2 = DD_api.sunTypeGoods,
            list = {userToken: token,requestTag:1,typeId:loc},
            res = getAjax(url2, list),
            data = res.data,
            html = '',
            GoodsType = $('.zs_con_kind2'),
            kind_name = $('#kind_name'),
            next_step = $('.next_step1'),
            arr=[];
        for (var i = 0; i < data.length; i++) {
            html += '<span data-id="' + data[i].id + '" data-btn="0">' + data[i].goodsSunName + '</span>';
        }
        GoodsType.html(html);
        //招商选择商品大类----子类
        GoodsType.on('click','span',function(){
            $(this).addClass('on').siblings().removeClass('on');
            window.ide = $(this).attr('data-id');
            arr.push(ide);
        });
        if(loc == 1){
            kind_name.html('中西药品');
        } else if(loc == 2) {
            kind_name.html('中药材');
        }else if(loc == 3) {
            kind_name.html('中药饮片');
        }else if(loc == 4) {
            kind_name.html('滋补保健');
        }else if(loc == 5) {
            kind_name.html('医疗器械');
        }else if(loc == 6) {
            kind_name.html('中药加工设备');
        }else if(loc == 7) {
            kind_name.html('制药包装');
        }else if(loc == 8) {
            kind_name.html('医美药妆');
        }else if(loc == 9) {
            kind_name.html('母婴用品');
        }else{
            kind_name.html('成人用品');
        }
        //提交
        next_step.click(function() {
            if (arr.length == 0) {
                alert("请选择品类!");
                return false;
            }else{
                var options= {
                    url:DD_api.publishingInvestment,
                    type:"post",
                    data:{userToken:token,requestTag:1, parentId: loc,sunId:ide},
                    dataType: "text",
                    contentType: "application/json;charset=utf-8",
                    success:function(data){
                        var res = JSON.parse(data);
                        console.log(res);
                        if(res.flag == "success"){
                            alert(res.info);
                            window.location.href = "ManagementInvestment.html?page=1";
                        }else{
                            alert(res.info)
                        }
                    },
                    error : function(XmlHttpRequest, textStatus, errorThrown) {
                        console.log(textStatus);
                        console.log(errorThrown);
                    }
                };
                $('#form1').ajaxSubmit(options);
                return false;
            }
        })
    }else{
        alert("您未登录，请登录！");
        window.location="login.html";
    }
});