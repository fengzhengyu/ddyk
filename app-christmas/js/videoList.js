/**
 * Created by Administrator on 2017/11/27.
 */
$(function(){
    var website=location.href,
        arr=website.split("?")[1],
        arr1=arr.split("&");
    for(var i=0;i<arr1.length;i++){
        var arr2=arr1[i].split("=");
        if(arr2[0]=="id"){
            var id=arr2[1]; //获取父类Id
        } if(arr2[0] == "pageId"){
            var  pageId = arr2[1];  //获取翻页页码
        }else{
            pageId = 1;
        }
    }
    var parentSelect = $('#classifyNav');           //父分类选择器
    var videoTypeImg = ['romm','meet','product','publicity']; //父分类图标
    var sunSelect = $('#dataList'); //数据渲染选择器
    var paging  = $('#page');
    var data = sunList(id);  //请求数据
    var total = 100;
    parentList(DD_api.videoType,videoTypeImg,parentSelect); //父类列表数据渲染
    dataList(data,sunSelect); //数据渲染

    //标题显示
    var parentName = $('#parentName'),
    parentData = getAjax(DD_api.videoType);
    parentData.data.forEach(function(item){
        if(item.typeId == id){
            parentName.html(item.parentName);
        }
    });


    //select期数
    var url = DD_api.videoType,
        periods = $('#periods'),
        typeId = 1,
    list={typeId:typeId},
    res = getAjax(url,list),
        option = '';

    res.data.forEach(function (item){
        option += '<option value="'+item.typeId+'">'+item.sunName+'</option>';
    });
    periods.html(option);

   // periods.change(function(){

   // })
    //翻页
    var GG = {
        "go":function(mm){
            window.location.href = 'videoList.html?id='+id+'&page='+mm;
        }
    };
    paging.initPage(total,pageId,GG.go);
});
