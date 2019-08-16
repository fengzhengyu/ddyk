/**
 * Created by Administrator on 2017/9/12.
 */
$(function(){
    var website = window.location.search,
    pageId = website.substring(website.lastIndexOf('=')+1, website.length);
    if(!pageId){
        var pageId =1;
    }
    var token =$.cookie('userToken'),
        url = DD_api.memberSelectShopGoods,
        list = {userToken:token,num:15,page:pageId},
        res = getAjax(url,list),
        userData =res.dataMember,
        Count = res.dataGoodsCount,
        banner =userData.shopPhoto,
        shopName = userData.shopName,
        company = userData.company,
        LicensePhoto = userData.LicensePhoto,
        QualificationPhoto = userData.QualificationPhoto,
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
        updatePhoto = $('#updatePhoto'),
        companyBox =$('#company'),
        licenseBox =$('#license'),
        qualificationBox =$('#qualification'),
        addressBox =$('#address'),
        phoneBox = $('#phone'),
        personBox = $('#person'),
        mobileBox = $('#mobile'),
        qqBox = $('#qq'),
        weChatBox = $('#weChat'),
        emailBox = $('#email'),
        dataHtml = '',
        dataList = $('#dataList'),
        pageBox= $('.zsgl_page'),
        totals = $('.page_total'),
        pageList = $('#page');
    bannerBox.attr('src',banner);
    licenseBox.attr('data-img',LicensePhoto);
    qualificationBox.attr('data-img',QualificationPhoto);
    companyBox.html(company);
    addressBox.html(address1);
    phoneBox.html(phone);
    personBox.html(person);
    mobileBox.html(mobile);
    qqBox.html(QQ);
    weChatBox.html(weChat);
    emailBox.html(email);
    // console.log(res)
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
                    window.location.href = 'ViewShops.html?page=' + mm;
                }
            };
            pageList.initPage(Count, pageId, DD.go);
        }else{
            dataList.html('<h2 style="text-align: center">您还没有添加商品，请前往招商管理发布信息！</h2>');
            pageBox.hide();
        }
    }

    //   查看
    $('.show-img').click(function(e){
        var src = $(this).attr('data-img');
        // console.log(src)
        popup($('#imgPopup'));
        var img = new Image();
        img.src = src;

        

        $('#imgPopup').html(img)
        e.stopPropagation();

    })
   $(document).click(function () {  
    $('#imgPopup').hide();
   })
 
    //上传头像
    updatePhoto.change(function(){
        var options= {
            url: DD_api.updateShopPhoto,
            type:"post",
            data:{userToken:token},
            dataType: "text",
            contentType: "application/json;charset=utf-8",
            success:function(data){
                var res = JSON.parse(data);
                // console.log(res)
                var photo = res.shopPhoto;
                if(res.flag == 'success'){
                    bannerBox.attr('src',photo);
                    window.location.reload();
                    alert(res.info);

                }else{
                    alert(res.info);
                }
            },
            error : function(XmlHttpRequest, textStatus, errorThrown) {
                console.log(textStatus);
                console.log(errorThrown);

            }
        };
        $('#form').ajaxSubmit(options);
        return false;
    });


});