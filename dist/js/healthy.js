$(function(){var t=location.href.split("?")[1];if(t)for(var a=t.split("&"),e=0;e<a.length;e++){var l=a[e].split("=");if("parent"==l[0])i=l[1];else if("sun"==l[0])var h=l[1];else if("page"==l[0])s=l[1]}else var i="",s=1;var n=getQueryString("key"),r=DD_api.healthElite,o=DD_api.healthTop,c={num:5},d={num:10},g=getAjax(r,c),p=getAjax(o,d),f=g.healthDataList,m=p.healthDataList,_="",v="",u=$("#splendid"),D=$("#hot"),k=$(".market_tab"),y=$("#page"),I=$(".totals"),T=$("#searchText"),x=$("#searchGo");if(null!=n){var L=DD_api.searchHealth,P={healthTitle:n,num:10,page:s},w=getAjax(L,P),b=w.healthDataList,j=w.healthTotal;if("success"==w.flag){for(var A="",e=0;e<b.length;e++){null==b[e].healthPhoto||b[e].healthPhoto;A+='<a href="healthyDetails.html?id='+b[e].healthId+'" target="_blank" class="market_t_l_message"><div class="img fl"></div><div class="title fl"><h2>'+b[e].healthTitle+"</h2><p>"+b[e].healthIntroduce+"</p></div></a>"}k.html(A),I.html(j)}else k.html("没有数据")}else{var C=DD_api.healthIndex,S={num:10,parentId:i,sunId:h,page:s},q=getAjax(C,S),E=q.healthData,G=(q.healthSunData,q.healthDataList),H=q.healthTotal,N="",Q="",W=$("#parentList"),z=$("#dataList");if(!q)return $(".market_main").html('<div style="height: 300px;line-height: 300px;text-align: center;">暂无数据，请稍后再来！</div>'),void $("#pageWrap").html("");for(e=0;e<E.length;e++)N+='<li><a href="javascript:;" id="'+E[e].healthTypeId+'">'+E[e].healthTypeName+"</a></li>";W.html(N);for(e=0;e<G.length;e++){null==G[e].healthPhoto||G[e].healthPhoto;Q+='<a href="healthyDetails.html?id='+G[e].healthId+'" target="_blank" class="market_t_l_message"><div class="title fl"><h2>'+G[e].healthTitle+"</h2><p>"+G[e].healthIntroduce+"</p></div></a>"}z.html(Q),I.html(H);var B=$("#parentList li");""==i?B.eq(0).addClass("on"):B.each(function(){$(this).children().attr("id")==i&&$(this).addClass("on")}),B.click(function(){var t=$(this).children().attr("id");window.location="healthy.html?parent="+t+"&page=1"})}if("success"==g.flag){for(e=0;e<f.length;e++)_+='<a href="healthyDetails.html?id='+f[e].healthId+'" target="_blank" class="market_r_c1_content_list"><div class="market_r_c1_content_list_l fl"><p>'+f[e].healthTitle+"</p><span>"+f[e].healthIntroduce+'</span></div><div class="market_r_c1_content_list_r fl"><img src="'+f[e].healthPhoto+'"/></div></a>';u.html(_)}else u.html("暂无数据!");if("success"==p.flag){for(e=0;e<m.length;e++)v+=' <a href="healthyDetails.html?id='+m[e].healthId+'" target="_blank" class="market_r_c2_content_list"><span class="red">'+(e+1)+"</span>"+m[e].healthTitle+"</a>";D.html(v)}else D.html("暂无数据!");T.focus(function(){$(this).val("")}),x.click(function(){var t=T.val();""==t||"搜索文章"==t?alert("搜索不能为空或请输入文章标题"):window.location.href="healthy.html?key="+t+"&page="});var F={go:function(t){window.location.href=n?"healthy.html?&key="+n+"&page="+t:"healthy.html?parent="+i+"&page="+t}};n?y.initPage(j,s,F.go):y.initPage(H,s,F.go)});