$(function(){for(var t=location.href.split("?")[1].split("&"),a=0;a<t.length;a++){var i=t[a].split("=");if("id"==i[0])var e=i[1];if("sunId"==i[0])n=i[1];else var n=6}var o=$("#classifyNav"),p=["romm","meet","product","publicity"],d=$("#dataList"),r=($("#page"),$("#periods"));if(1==e){var s=DD_api.videoType,l={typeId:e},v="";getAjax(s,l).data.forEach(function(t){v+='<option value="'+t.typeId+'">'+t.sunName+"</option>"}),r.html(v)}else r.parent().hide();parentList(DD_api.videoType,p,o);var c=sunList(e,n);dataList(c,d,e,n);var f=$("#parentName");getAjax(DD_api.videoType).data.forEach(function(t){t.typeId==e&&f.html(t.parentName)}),r.find("option").each(function(){$(this).val()==n&&$(this).attr("selected","true")}),r.change(function(){var t=$(this).find("option:selected").val();window.location.href="videoList.html?id="+e+"&sunId="+t})});