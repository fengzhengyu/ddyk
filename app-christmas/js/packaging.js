/**
 * Created by Administrator on 2017/12/7.
 */

//ajax封装
function getAjax(url,list){

    var data = '';
    $.ajax({
        url:url,
        type:'post',
        data:list,
        async:false,
        dataType:"json",
        cache: false,
        crossDomain: true == !(document.all),
        success:function (res) {
            //console.log(res);
            data = res;
        },
        error:function(){
            console.log("Ajax获取数据失败！");
        }
    });
    return data;
}

//获取顶部文字防止乱码
function getQueryString(key){
    var reg = new RegExp("(^|&)"+key+"=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    return result?decodeURIComponent(result[2]):null;
}

//获取选中input 数组

function getSelected(obj){
    var  array=[];
    var  arr = obj;
    for(i=0;i<arr.length;i++){
        if(arr[i].checked){
            var a = arr[i].value;
            array.push(a)
        }
    }
    return array;
}

//获取url 参数  例如  www.baidu.com? param1=10&param2=20&param3=30
var website=location.href,
    arr = website.split("?")[1];
//是否？后面有参数
if(arr){
    var arr1 = arr.split("&");
    for(var i = 0;i<arr1.length;i++){
        var arr2=arr1[i].split("=");
        //param1 为url 参数名
        if(arr2[0] == "param1"){
            var parentId=arr2[1];
        }else if(arr2[0] == "param2"){
            var sunId=arr2[1];
        }else if(arr2[0] == "param3"){
            var pageId=arr2[1];
        }
    }
}else{
    var  parentId = 1,
        sunId = 2,
        pageId = 3;
}