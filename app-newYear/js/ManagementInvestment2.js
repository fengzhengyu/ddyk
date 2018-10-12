/**
 * Created by Administrator on 2017/8/30.
 */
$(function(){
    //数据填充
    var token = $.cookie('userToken');
    if (token){
        var link = window.location.search,
            loc = link.substring(link.lastIndexOf('=')+1, link.length),
            list = {userToken: token,goodsId: loc},
            url = DD_api.modifyManagementInvestment,
            res = getAjax(url, list),
            data = res.data,
            html ='',
            modifyList = $('#modify');
        if( res.flag == 'success'){
            html = '<li><span class="text"><i></i>商品父类:</span><div class="content"><select name="" id="parent"></select></div></li><li><span class="text"><i></i>商品子类:</span><div class="content"><select name="" id="sun"></select></div></li><li><span class="text"><i></i>商品标题:</span><div class="content"><input type="text" value="'+data.goodsName+'" id="goodsName" name="goodsName" class="txt" maxlength="21"/></div></li><li><span class="text"><i></i>商品图片:</span><div class="upload"><img src="'+data.photoUnify+'" alt="图片" class="modify_img"/><label for="goodsPhoto" class="modify">修改商品图片</label><input type="file" name="goodsPhoto" id="goodsPhoto"  style="position: absolute;clip: rect(0,0,0,0);"/></div></li><li><span class="text"><i></i>批准文号:</span><div class="content"><input type="text" value="'+data.approve+'" id="approve" name="approve" class="txt" /></div></li><li><span class="text"><i></i>生产企业:</span><div class="content"><input type="text" value="'+data.productCompany+'" id="productCompany" name="productCompany" class="txt"/></div></li><li><span class="text"><i></i>功能主治:</span><div class="content"><input type="text" value="'+data.effect+'" id="effect" name="effect" class="txt" maxlength="101"/></div></li><li><span class="text"><i></i>主要成分:</span><div class="content"><input type="text" value="'+data.basis+'" id="basis" name="basis" class="txt" maxlength="101"/></div></li><li><span class="text"><i></i>产品规格:</span><div class="content"><input type="text" value="'+data.norms+'" id="norms" name="norms" class="txt" /></div></li><li><span class="text"><i></i>招商需求:</span><div class="content"><input type="text" value="'+data.require+'" id="require" name="require" class="txt" maxlength="101"/></div></li><li><span class="text"><i></i>联系人:</span><div class="content"><input type="text" value="'+data.relationPerson+'" id="relationPerson" name="relationPerson" class="txt" maxlength="11"/></div></li><li><span class="text"><i></i>联系手机:</span><div class="content"><input type="text" value="'+data.phone+'" class="txt" id="phone" name="phone"/></div></li><li><span class="text"><i></i>联系QQ:</span><div class="content"><input type="text" value="'+data.qq+'" id="qq" name="qq" class="txt"/></div></li><li><span class="text"><i></i>联系电话:</span><div class="content"><input type="text" value="'+data.telephone+'" id="telephone" name="telephone" class="txt"/></div></li><li><span class="text"><i></i>联系地址:</span><div class="content"><input type="text" value="'+data.addressInfo+'" id="addressInfo" name="addressInfo" class="txt"/></div></li><li><span class="text"><i></i></span><div class="content"><input type="button" value="确认修改"  class="modify_btn"/></div></li>';
            modifyList.html(html)
        }else{
            alert(res.info);
        }
        var parentH = '<option value="'+data.parentId+'">'+data.goodsParentsName+'</option>',
            sunH = '<option value="'+data.sunId+'">'+data.goodsSunName+'</option>',
            parentList = $('#parent'),
            sunList = $('#sun');
            parentList.html(parentH);
            sunList.html(sunH);
        //父类数据
        var url2 = DD_api.parentTypeGoods,
            list2 = {userToken: token},
            res2 = getAjax(url2, list2),
            data2 = res2.data;
        if(res2.flag == 'success'){
            var pHtml = '';
            for(var i=0;i<data2.length;i++){
                pHtml += '<option value="'+data2[i].id+'">'+data2[i].goodsParentsName+'</option>';
            }
            $('#parent').append(pHtml);
        }
        //子类数据
        var pId = $('#parent').children('option:selected').val(),
            url3 = DD_api.sunTypeGoods,
            list3 = {userToken: token,typeId:pId},
            res3 = getAjax(url3,list3),
            data3 = res3.data;
        if(res2.flag == 'success') {
            var sHtml = '';
            for (var i = 0; i < data3.length; i++) {
                sHtml += '<option value="' + data3[i].id + '">' + data3[i].goodsSunName + '</option>';
            }
            sunList.append(sHtml);
        }
        parentList.change(function(){
            var pid=($(this).children('option:selected').val()),
                data={typeId:pid},
                url = DD_api.sunTypeGoods,
                res = getAjax(url,data),
                city =res.data,
                val='';
            for(var i=0;i<city.length;i++){
                val += '<option value="'+city[i].id+'">'+city[i].goodsSunName+'</option>';
            }
            sunList.html(val);
        });

        //修改提交
        $('.modify_btn').click(function(){
            var parentId =$('#parent').children('option:selected').val();
            var sunId =$('#sun').children('option:selected').val();
            var options= {
                url:DD_api.modifyPublishingInvestment,
                type:"post",
                data:{userToken:token, parentId: parentId,sunId:sunId,goodsId:loc},
                dataType: "text",
                contentType: "application/json;charset=utf-8",
                success:function(data){
                    var res = JSON.parse(data);
                    console.log(res);
                    if(res.flag == "success"){
                        alert(res.info);
                        window.location.href = "ManagementInvestment.html";
                    }else{
                        alert(res.info)
                    }
                },
                error : function(XmlHttpRequest, textStatus, errorThrown) {
                    console.log(textStatus);
                    console.log(errorThrown);

                }
            };
            $('#formModify').ajaxSubmit(options);
            return false;
        })
    }
});