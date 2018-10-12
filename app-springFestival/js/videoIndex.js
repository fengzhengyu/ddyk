/**
 * Created by Administrator on 2017/11/24.
 */
$(function(){
    //视频分类
    var videoType = $('#classifyNav');
    var dataList1 = $('#dataList1');  //分类1选择器
    var dataList2 = $('#dataList2');  //分类2选择器
    var dataList3 = $('#dataList3');  //分类3选择器
    var dataList4 = $('#dataList4');  //分类4选择器
   // var sunData1 = sunList(1);  //分类1数据
    var sunData2 = sunList(2);  //分类2数据
    var sunData3 = sunList(3);  //分类3数据
    var sunData4 = sunList(4);  //分类4数据
    var videoTypeImg = ['romm','meet','product','publicity']; //父分类图标

    parentList(DD_api.videoType,videoTypeImg,videoType); //父分类列表数据
    //dataList(sunData1,dataList1,1,6);        // 子类1数据
    dataList(sunData2,dataList2,2);        // 子类2数据
    dataList(sunData3,dataList3,3);        // 子类3数据
    dataList(sunData4,dataList4,4);        // 子类4数据

    var indexUrl = DD_api.memberSelectVideo,
        indexNum = 10,
        indexList = {num:indexNum},
        indexRes = getAjax(indexUrl,indexList);
    console.log( indexRes)
    if(indexRes.flag == 'success'){
        var indexVal = '',
            indexData = indexRes.data;
        for(var i=0;i< indexData.length;i++){
            indexVal += '<li>'+
                '<a href="videoDetails.html?pId='+ indexData[i].typeId+'&sunId='+ indexData[i].typeSunId +'&vId='+ indexData[i].videoId+'" class="dataBox">'+
                '<div class="dataImg">'+
                '<img src="'+ indexData[i].urlPhoto +'" alt="图片已丢失"/>'+
                '<p class="dataInfo">'+indexData[i].videoName+'</p>'+
                '<div class="playIcon on">'+
                '<div class="shade"></div>'+
                '<i class="iconfont icon-bofang icon"></i>'+
                '</div>'+
                '</div>'+
                '<div class="dataTitle">'+
                '<p>'+indexData[i].introduce+'</p></div></a></li>';
        }
        dataList1.html(indexVal);
    }else{
        dataList1.html('<p style="height: 350px;line-height:350px;font-size: 16px;color: #000;text-align: center;">暂无视频！</p>');
    }


});
