$(function(){var t=location.href.split("?")[1];if(t)for(var l=t.split("&"),a=0;a<l.length;a++){var n=l[a].split("=");if("parent"==n[0])e=n[1];else if("sun"==n[0])n[1];else if("page"==n[0])i=n[1]}else var e="",i=1;var s=getQueryString("key"),o=DD_api.consultElite,c=DD_api.consultTop,r={num:5},h={num:10},u=getAjax(o,r),f=getAjax(c,h),m=u.consultDataList,d=f.consultDataList,g="",p="",_=$("#splendid "),v=$("#hot"),D=$(".market_tab"),k=$("#page"),T=$(".totals"),I=$("#searchText"),x=$("#searchGo");if(null!=s){var y=DD_api.searchConsult,L={consultTitle:s,num:10,page:i},P=getAjax(y,L),w=P.consultDataList,b=P.consultTotal;if("success"==P.flag){for(var j="",a=0;a<w.length;a++){null==w[a].consultPhoto||w[a].consultPhoto;j+='<a href="informationDetails.html?id='+w[a].consultId+'" target="_blank" class="market_t_l_message "><div class="img fl"></div><div class="title fl"><h2>'+w[a].consultTitle+"</h2><p>"+w[a].consultIntroduce+"</p></div></a>"}D.html(j),T.html(b)}else D.html("没有数据")}else{var A=DD_api.consultIndex,C={num:10,parentId:e,page:i},S=getAjax(A,C),q=S.consultData,E=(S.consultSunData,S.consultDataList),G=S.consultTotal,N="",Q="",W=$("#parentList"),z=$("#dataList");if(!S)return $(".market_main").html('<div style="height: 300px;line-height: 300px;text-align: center;">暂无数据，请稍后再来！</div>'),void $("#pageWrap").html("");for(a=0;a<q.length;a++)N+='<li><a href="javascript:;" id="'+q[a].consultTypeId+'">'+q[a].consultTypeName+"</a></li>";W.html(N);for(a=0;a<E.length;a++){null==E[a].consultPhoto||E[a].consultPhoto;Q+='<a href="informationDetails.html?id='+E[a].consultId+'" target="_blank" class="market_t_l_message"><div class="title fl"><h2>'+E[a].consultTitle+"</h2><p>"+E[a].consultIntroduce+"</p></div></a>"}z.html(Q),T.html(G);var B=$("#parentList li");""==e?B.eq(0).addClass("on"):B.each(function(){$(this).children().attr("id")==e&&$(this).addClass("on")}),B.click(function(){var t=$(this).children().attr("id");window.location="information.html?parent="+t+"&page=1"})}if("success"==u.flag){for(a=0;a<m.length;a++)g+='<a href="informationDetails.html?id='+m[a].consultId+'" target="_blank" class="market_r_c1_content_list"><div class="market_r_c1_content_list_l fl"><p>'+m[a].consultTitle+"</p><span>"+m[a].consultIntroduce+'</span></div><div class="market_r_c1_content_list_r fl"><img src="'+m[a].consultPhoto+'"/></div></a>';_.html(g)}else _.html("暂无数据！");if("success"==f.flag){for(a=0;a<d.length;a++)p+=' <a href="informationDetails.html?id='+d[a].consultId+'" target="_blank" class="market_r_c2_content_list"><span class="red">'+(a+1)+"</span>"+d[a].consultTitle+"</a>";v.html(p)}else v.html("暂无数据！");I.focus(function(){$(this).val("")}),x.click(function(){var t=I.val();""==t||"搜索文章"==t?alert("搜索不能为空或请输入文章标题"):window.location.href="information.html?key="+t+"&page="});var F={go:function(t){window.location.href=s?"information.html?&key="+s+"&page="+t:"information.html?parent="+e+"&page="+t}};s?k.initPage(b,i,F.go):k.initPage(G,i,F.go)});