/**
 * Created by Administrator on 2017/9/12.
 */
$(function(){
    var website=location.href,
        arr=website.split("?")[1],
        arr1=arr.split("&");
    for(var i=0;i<arr1.length;i++){
        var arr2=arr1[i].split("=");
        if(arr2[0]=="id"){
            var id=arr2[1];
        } if(arr2[0] == "page"){
            var  pageId = arr2[1];
        }
    }
    if(!pageId){
        var  pageId =1;
    }
    var url = DD_api.userSelectShopGoods,
        list = {goodsId:id,num:16,page:pageId},
        res =getAjax(url,list),
        userData =res.dataMember,
        Count = res.dataGoodsCount,
        banner =userData.shopPhoto,
        shopName = userData.shopName,
        company = userData.company,
        person = userData.relationPerson,
        phone = userData.relationPhone,
        address1 = userData.addressDetail,
        address2 = userData.address,
        mobile = userData.relationMobile,
        email = userData.relationEmail,
        QQ = userData.QQ,
        weChat = userData.weChat,
        data = res.dataShop,
        bannerBox = $('#shopPhoto'),
        companyBox =$('#company'),
        addressBox =$('#address'),
        phoneBox = $('#phone'),
        personBox = $('#person'),
        mobileBox = $('#mobile'),
        qqBox = $('#qq'),
        weChatBox = $('#weChat'),
        emailBox = $('#email'),
        dataHtml = '',
        dataList = $('#dataList'),
        totals = $('.totals'),
        pageList = $('#page');
   // console.log(res)
    bannerBox.attr('src',banner);
    companyBox.html(company);
    addressBox.html(address1);
    phoneBox.html(phone);
    personBox.html(person);
    mobileBox.html(mobile);
    qqBox.html(QQ);
    weChatBox.html(weChat);
    emailBox.html(email);
    if(shopName){
        document.title = company;
    }else{
        document.title = '商铺首页';
    }
    if(res.flag == 'success'){
        if(data){
            for(var i=0;i<data.length;i++){
                dataHtml += ' <li><a href="merchantsDetails.html?id=' + data[i].id + '&parentId=' + data[i].parentId + '&sunName=' + data[i].sunName + '" target="_blank"><div class="img"><img src="'+data[i].photoUnify+'" alt="商品图"/></div><p class="text">'+data[i].goodsName+'</p></a></li>';
            }
            dataList.html(dataHtml);
            totals.html(Count);
            //分页器
            var DD = {
                "go": function (mm) {
                    window.location.href = 'myShop.html?id='+id+'&page=' + mm;
                }
            };
            pageList.initPage(Count, pageId, DD.go);
        }else{
            dataList.html('<h2 style="text-align: center">您还没有添加商品，请前往招商管理发布信息！</h2>');
            pageBox.hide();
        }
    }

});