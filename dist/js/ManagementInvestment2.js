$(function(){var t=$.cookie("userToken");if(t){var e=window.location.search,a=e.substring(e.lastIndexOf("=")+1,e.length),s={userToken:t,goodsId:a},n=DD_api.modifyManagementInvestment,i=getAjax(n,s),l=i.data,o="",p=$("#modify");"success"==i.flag?(o='<li><span class="text"><i></i>商品父类:</span><div class="content"><select name="" id="parent"></select></div></li><li><span class="text"><i></i>商品子类:</span><div class="content"><select name="" id="sun"></select></div></li><li><span class="text"><i></i>商品标题:</span><div class="content"><input type="text" value="'+l.goodsName+'" id="goodsName" name="goodsName" class="txt" maxlength="21"/></div></li><li><span class="text"><i></i>商品图片:</span><div class="upload"><img src="'+l.photoUnify+'" alt="图片" class="modify_img"/><label for="goodsPhoto" class="modify">修改商品图片</label><input type="file" name="goodsPhoto" id="goodsPhoto"  style="position: absolute;clip: rect(0,0,0,0);"/></div></li><li><span class="text"><i></i>批准文号:</span><div class="content"><input type="text" value="'+l.approve+'" id="approve" name="approve" class="txt" /></div></li><li><span class="text"><i></i>生产企业:</span><div class="content"><input type="text" value="'+l.productCompany+'" id="productCompany" name="productCompany" class="txt"/></div></li><li><span class="text"><i></i>功能主治:</span><div class="content"><input type="text" value="'+l.effect+'" id="effect" name="effect" class="txt" maxlength="101"/></div></li><li><span class="text"><i></i>主要成分:</span><div class="content"><input type="text" value="'+l.basis+'" id="basis" name="basis" class="txt" maxlength="101"/></div></li><li><span class="text"><i></i>产品规格:</span><div class="content"><input type="text" value="'+l.norms+'" id="norms" name="norms" class="txt" /></div></li><li><span class="text"><i></i>招商需求:</span><div class="content"><input type="text" value="'+l.require+'" id="require" name="require" class="txt" maxlength="101"/></div></li><li><span class="text"><i></i>联系人:</span><div class="content"><input type="text" value="'+l.relationPerson+'" id="relationPerson" name="relationPerson" class="txt" maxlength="11"/></div></li><li><span class="text"><i></i>联系手机:</span><div class="content"><input type="text" value="'+l.phone+'" class="txt" id="phone" name="phone"/></div></li><li><span class="text"><i></i>联系QQ:</span><div class="content"><input type="text" value="'+l.qq+'" id="qq" name="qq" class="txt"/></div></li><li><span class="text"><i></i>联系电话:</span><div class="content"><input type="text" value="'+l.telephone+'" id="telephone" name="telephone" class="txt"/></div></li><li><span class="text"><i></i>联系地址:</span><div class="content"><input type="text" value="'+l.addressInfo+'" id="addressInfo" name="addressInfo" class="txt"/></div></li><li><span class="text"><i></i></span><div class="content"><input type="button" value="确认修改"  class="modify_btn"/></div></li>',p.html(o)):alert(i.info);var d='<option value="'+l.parentId+'">'+l.goodsParentsName+"</option>",c='<option value="'+l.sunId+'">'+l.goodsSunName+"</option>",r=$("#parent"),u=$("#sun");r.html(d),u.html(c);var v=DD_api.parentTypeGoods,m={userToken:t},x=getAjax(v,m),f=x.data;if("success"==x.flag){for(var g="",y=0;y<f.length;y++)g+='<option value="'+f[y].id+'">'+f[y].goodsParentsName+"</option>";$("#parent").append(g)}var h=$("#parent").children("option:selected").val(),I=DD_api.sunTypeGoods,b={userToken:t,typeId:h},D=getAjax(I,b).data;if("success"==x.flag){for(var T="",y=0;y<D.length;y++)T+='<option value="'+D[y].id+'">'+D[y].goodsSunName+"</option>";u.append(T)}r.change(function(){for(var t={typeId:$(this).children("option:selected").val()},e=DD_api.sunTypeGoods,a=getAjax(e,t).data,s="",n=0;n<a.length;n++)s+='<option value="'+a[n].id+'">'+a[n].goodsSunName+"</option>";u.html(s)}),$(".modify_btn").click(function(){var e=$("#parent").children("option:selected").val(),s=$("#sun").children("option:selected").val(),n={url:DD_api.modifyPublishingInvestment,type:"post",data:{userToken:t,parentId:e,sunId:s,goodsId:a},dataType:"text",contentType:"application/json;charset=utf-8",success:function(t){var e=JSON.parse(t);"success"==e.flag?(alert(e.info),window.location.href="ManagementInvestment.html"):alert(e.info)},error:function(t,e,a){}};return $("#formModify").ajaxSubmit(n),!1})}});