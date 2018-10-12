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
    var sunData1 = sunList(1);  //分类1数据
    var sunData2 = sunList(2);  //分类2数据
    var sunData3 = sunList(3);  //分类3数据
    var sunData4 = sunList(4);  //分类4数据
    var videoTypeImg = ['romm','meet','product','publicity']; //父分类图标

    parentList(DD_api.videoType,videoTypeImg,videoType); //父分类列表数据
    dataList(sunData1,dataList1);        // 子类1数据
    dataList(sunData2,dataList2);        // 子类2数据
    dataList(sunData3,dataList3);        // 子类3数据
    dataList(sunData4,dataList4);        // 子类4数据


});
