/**
 * Created by Administrator on 2017/8/29.
 */
$(function(){

    //定义变量
    var Province =  $('.province'),
        City = $('.city'),
        Country =$('.country'),
        company = $('#company'),
        shopName = $('#shopName'),
        person = $('#person'),
        phone = $('#phone'),
        detail = $('#detail'),
        relationMobile = $('#relationMobile'),
        relationEmail = $('#relationEmail'),
        qq = $('#QQ'),
        weChat = $('#weChat'),
        provinceHtml = '<option value="">选择省（市）</option>',
        cityHtml = '<option value="">选择市（区）</option>',
        countryHtml = '<option value="">选择区（县）</option>',
        token = $.cookie('userToken'),
        typeUrl = DD_api.enterpriseTypeCategory, //企业类型及品类接口
        modifyUrl = DD_api.editMemberInfo,//修改接口
        typeList = {userToken: token},
        typeRes= getAjax(typeUrl,typeList),
        modifyRes= getAjax(modifyUrl,typeList), //修改数据接口
        data = typeRes.companyData,//企业类型数据
        data1 = typeRes.companyManageData,//经营品类数据
        type1='',
        type2='',
        enterprise_type = $('.enterprise_type'),//企业类型选择器
        top_ten_kind = $('.top_ten_kind'),//经营品类选择器
        save = $('.information_btn .btn'),//保存btn
        modifyData = modifyRes.data,//修改数据list
        companyTypeVal = modifyData.companyType, //修改后信息
        addressVal = modifyData.address, //修改后信息
        companyManageTypeVal = modifyData.companyManageType,//修改后信息
        companyVal = modifyData.company, //修改后信息
        shopNameVal = modifyData.shopName, //修改后信息
        personVal = modifyData.relationPerson, //修改后信息
        sexVal = modifyData.sex,////修改后信息
        phoneVal = modifyData.relationPhone, //修改后信息
        detailVal = modifyData.addressDetail, //修改后信息
        mobileVal = modifyData.relationMobile, //修改后信息
        emailVal = modifyData.relationEmail, //修改后信息
        qqVal = modifyData.QQ, //修改后信息
        weChatVal = modifyData.weChat,//修改后信息
    //渲染省级数据
        url = DD_api.provinceData,
        res = getAjax(url),
        province = res.data,
        Pval = '';

    console.log(modifyRes)
    Province.html(provinceHtml);
    City.html(cityHtml);
    Country.html(countryHtml);
    //企业类型数据
    for(var i=0;i<data.length;i++){
        type1 += '<label for="companyId'+i+'"><input type="checkbox" name="companyType" id="companyId'+i+'" value="'+data[i].companyId+'"/>'+data[i].companyName+'</label>';
    }
    enterprise_type.append(type1);
    //经营品类数据
    for(var i=0;i<data1.length;i++){
        type2 += '<label for="manageId'+i+'"><input type="checkbox" name="companyManageType" id="manageId'+i+'" value="'+data1[i].manageId+'"/>'+data1[i].manageTypeName+'</label>';
    }
    top_ten_kind.append(type2);
    //省级数据
    for(var i=0;i<province.length;i++){

        Pval += '<option value="'+province[i].id+'" name="address">'+province[i].province+'</option>';
    }
    Province.append(Pval);

    //省级联动
    Province.change(function(){
        var pid=$(this).children('option:selected').val(),
            listP={pid:pid},
            urlP= DD_api.cityData,
            resP = getAjax(urlP,listP),
            cityData =resP.data;
        if(resP.flag == 'success'){
            var val='';
            for(var i=0;i<cityData.length;i++){
                val += '<option value="'+cityData[i].id+'" name="address">'+cityData[i].city+'</option>';
            }
            City.html(val);
            var cid = City.children('option:selected').val(),
                listC = {cityId:cid},
                urlC= DD_api.countryData,
                resC = getAjax(urlC,listC),
                countryData = resC.data;
            console.log(pid)
            console.log(cid)
                if(resC.flag == 'success'){
                    var content = '';
                    for(var i=0;i<countryData.length;i++){
                        content += '<option value="'+countryData[i].id+'" name="address">'+countryData[i].country+'</option>';
                    }
                    Country.html(content);
                }
        }

    });
    //市级联动
    City.change(function() {
        var cid = ($(this).children('option:selected').val()),
            data={cityId:cid},
            url= DD_api.countryData,
            res = getAjax(url,data),
            country =res.data,
            val='';
        for(var i=0;i<country.length;i++){
            val += '<option value="'+country[i].id+'" name="address">'+country[i].country+'</option>';
        }
        Country.html(val)
    });

    //企业类型点击效果
    enterprise_type.on('click','label',function(){
        $('.enterprise_type label').each(function(){
            $(this).click(function(){
                $(this).toggleClass('on');
            })
        });
    });
    //十大品类点击效果
    top_ten_kind.on('click','label',function(){
        $('.top_ten_kind label').each(function(){
            $(this).click(function(){
                $(this).toggleClass('on');
            })
        });
    });
    //修改后的数据
    if(companyTypeVal){
        //修改渲染
        if(qqVal == 0){
            qqVal = '';
        }
        if(mobileVal == 0){
            mobileVal = '';
        }
        company.val(companyVal);
        shopName.val(shopNameVal);
        person.val(personVal);
        phone.val(phoneVal);
        detail.val(detailVal);
        relationMobile.val(mobileVal);
        relationEmail.val(emailVal);
        qq.val(qqVal);
        weChat.val(weChatVal);
        //修改三级联动
        var TypeArr1 = companyTypeVal.split(','),
            TypeArr2 = companyManageTypeVal.split(','),
            threeLevel = addressVal.split(','),
            provinceV =  threeLevel[0],
            cityV = threeLevel[1],
            countryV =threeLevel[2],
            url1 = DD_api.cityData,
            list = {pid:provinceV},
            cityRes = getAjax(url1,list),
            city = cityRes.data,
            Cval = '',
            url2 = DD_api.countryData,
            list1 = {cityId:cityV},
            countryRes = getAjax(url2,list1),
            country = countryRes.data,
            countryVal = '';

        //省级数据
        for(var i=0;i<province.length;i++){
            if(province[i].id == provinceV){
                Pval += '<option value="'+province[i].id+'" name="address" selected>'+province[i].province+'</option>';
            }
        }
        Province.html(Pval);
        //市级数据
        for(var i=0;i<city.length;i++){
            if(city[i].id == cityV){
                Cval += '<option value="'+city[i].id+'" name="address" selected>'+city[i].city+'</option>';
            }
            Cval += '<option value="'+city[i].id+'" name="address">'+city[i].city+'</option>';

        }
        City.html(Cval);

        //区级数据
        for(var i=0;i<country.length;i++){
            if(country[i].id == countryV){
                countryVal += '<option value="'+country[i].id+'" name="address" selected>'+country[i].country+'</option>';
            }
            countryVal += '<option value="'+country[i].id+'" name="address">'+country[i].country+'</option>';

        }
        Country.html(countryVal);
        //判断男女
        $('input[name="sex"]').each(function(){
            if($(this).val()==sexVal){
                $(this).prop('checked',true);
            }
        })
        //企业类型修改
        $('.enterprise_type input').each(function(){
            for(var j =0;j<TypeArr1.length;j++){
                if($(this).val() == TypeArr1[j]){
                    $(this).prop('checked',true);
                    $(this).parent().addClass('on');
                }
            }
        });
        //经营品类修改
        $('.top_ten_kind input').each(function(){
            for(var j =0;j<TypeArr2.length;j++){
                if($(this).val() == TypeArr2[j]){
                    $(this).prop('checked',true);
                    $(this).parent().addClass('on');
                }
            }
        });
    }


    //保存
    save.click(function(){
        var companyType = getSelected($('.enterprise_type input')),
            manageType = getSelected($('.top_ten_kind input')),
            provinceV = Province.children('option:selected').val(),
            cityV =  City.children('option:selected').val(),
            countryV =  Country.children('option:selected').val(),
            sexV = $('input[name="sex"]:checked').val(),
            companyV = company.val(),
            shopNameV = shopName.val(),
            personV = person.val(),
            phoneV = phone.val(),
            detailV = detail.val(),
            mobileV = relationMobile.val(),
            emailV = relationEmail.val(),
            qqV = qq.val(),
            weChatV = weChat.val(),
            cityArr = [];
        cityArr.push(provinceV);
        cityArr.push(cityV);
        cityArr.push(countryV);
        if(mobileV != ''){
            if(!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(mobileV)){
                alert('电话格式不对！');
                return;
            }
        }
        if(emailV != ''){
            if(!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(emailV)){
                alert('邮箱格式不对！');
                return;
            }
        }
        if(qqV != ''){
            if(!/[1-9][0-9]{4,}/.test(qqV)){
                alert('QQ格式不对！');
                return;
            }
        }
        var url = DD_api.insertMemberInfo,
            list = {userToken:token,companyType:companyType,address:cityArr,companyManageType:manageType,company:companyV,shopName:shopNameV,relationPerson:personV,relationPhone:phoneV,addressDetail:detailV,relationMobile:mobileV,relationEmail:emailV,QQ:qqV,weChat:weChatV,sex:sexV},
            res = getAjax(url,list);
        console.log(typeof sexV)
        console.log(res)
        if(res.flag == "success"){
            alert(res.info);
        }else{
            alert(res.info)
        }


    })
});