$(function(){var e=$(".province"),a=$(".city"),t=$(".country"),n=$("#company"),o=$("#shopName"),i=$("#person"),l=$("#phone"),p=$("#detail"),c=$("#relationMobile"),d=$("#relationEmail"),r=$("#QQ"),s=$("#weChat"),h=$.cookie("userToken"),v=DD_api.enterpriseTypeCategory,m=DD_api.editMemberInfo,u={userToken:h},y=getAjax(v,u),g=getAjax(m,u),f=y.companyData,D=y.companyManageData,_="",k="",b=$(".enterprise_type"),x=$(".top_ten_kind"),I=$(".information_btn .btn"),T=g.data,j=T.companyType,w=T.address,A=T.companyManageType,M=T.company,C=T.shopName,Q=T.relationPerson,N=T.sex,P=T.relationPhone,E=T.addressDetail,S=T.relationMobile,q=T.relationEmail,z=T.QQ,B=T.weChat,F=DD_api.provinceData,G=getAjax(F).data,H="";e.html('<option value="">选择省（市）</option>'),a.html('<option value="">选择市（区）</option>'),t.html('<option value="">选择区（县）</option>');for(ne=0;ne<f.length;ne++)_+='<label for="companyId'+ne+'"><input type="checkbox" name="companyType" id="companyId'+ne+'" value="'+f[ne].companyId+'"/>'+f[ne].companyName+"</label>";b.append(_);for(ne=0;ne<D.length;ne++)k+='<label for="manageId'+ne+'"><input type="checkbox" name="companyManageType" id="manageId'+ne+'" value="'+D[ne].manageId+'"/>'+D[ne].manageTypeName+"</label>";x.append(k);for(ne=0;ne<G.length;ne++)H+='<option value="'+G[ne].id+'" name="address">'+G[ne].province+"</option>";if(e.append(H),e.change(function(){var e=$(this).children("option:selected").val(),n={pid:e},o=DD_api.cityData,i=getAjax(o,n),l=i.data;if("success"==i.flag){for(var p="",c=0;c<l.length;c++)p+='<option value="'+l[c].id+'" name="address">'+l[c].city+"</option>";a.html(p);var d=a.children("option:selected").val(),r={cityId:d},s=DD_api.countryData,h=getAjax(s,r),v=h.data;if("success"==h.flag){for(var m="",c=0;c<v.length;c++)m+='<option value="'+v[c].id+'" name="address">'+v[c].country+"</option>";t.html(m)}}}),a.change(function(){for(var e={cityId:$(this).children("option:selected").val()},a=DD_api.countryData,n=getAjax(a,e).data,o="",i=0;i<n.length;i++)o+='<option value="'+n[i].id+'" name="address">'+n[i].country+"</option>";t.html(o)}),b.on("click","label",function(){$(".enterprise_type label").each(function(){$(this).click(function(){$(this).toggleClass("on")})})}),x.on("click","label",function(){$(".top_ten_kind label").each(function(){$(this).click(function(){$(this).toggleClass("on")})})}),j){0==z&&(z=""),0==S&&(S=""),n.val(M),o.val(C),i.val(Q),l.val(P),p.val(E),c.val(S),d.val(q),r.val(z),s.val(B);for(var J=j.split(","),K=A.split(","),L=w.split(","),O=L[0],R=L[1],U=L[2],V=DD_api.cityData,W={pid:O},X=getAjax(V,W).data,Y="",Z=DD_api.countryData,ee={cityId:R},ae=getAjax(Z,ee).data,te="",ne=0;ne<G.length;ne++)G[ne].id==O&&(H+='<option value="'+G[ne].id+'" name="address" selected>'+G[ne].province+"</option>");e.html(H);for(ne=0;ne<X.length;ne++)X[ne].id==R&&(Y+='<option value="'+X[ne].id+'" name="address" selected>'+X[ne].city+"</option>"),Y+='<option value="'+X[ne].id+'" name="address">'+X[ne].city+"</option>";a.html(Y);for(ne=0;ne<ae.length;ne++)ae[ne].id==U&&(te+='<option value="'+ae[ne].id+'" name="address" selected>'+ae[ne].country+"</option>"),te+='<option value="'+ae[ne].id+'" name="address">'+ae[ne].country+"</option>";t.html(te),$('input[name="sex"]').each(function(){$(this).val()==N&&$(this).prop("checked",!0)}),$(".enterprise_type input").each(function(){for(var e=0;e<J.length;e++)$(this).val()==J[e]&&($(this).prop("checked",!0),$(this).parent().addClass("on"))}),$(".top_ten_kind input").each(function(){for(var e=0;e<K.length;e++)$(this).val()==K[e]&&($(this).prop("checked",!0),$(this).parent().addClass("on"))})}I.click(function(){var v=getSelected($(".enterprise_type input")),m=getSelected($(".top_ten_kind input")),u=e.children("option:selected").val(),y=a.children("option:selected").val(),g=t.children("option:selected").val(),f=$('input[name="sex"]:checked').val(),D=n.val(),_=o.val(),k=i.val(),b=l.val(),x=p.val(),I=c.val(),T=d.val(),j=r.val(),w=s.val(),A=[];if(A.push(u),A.push(y),A.push(g),""==I||/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(I))if(""==T||/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(T))if(""==j||/[1-9][0-9]{4,}/.test(j)){var M=DD_api.insertMemberInfo,C={userToken:h,companyType:v,address:A,companyManageType:m,company:D,shopName:_,relationPerson:k,relationPhone:b,addressDetail:x,relationMobile:I,relationEmail:T,QQ:j,weChat:w,sex:f},Q=getAjax(M,C);Q.flag,alert(Q.info)}else alert("QQ格式不对！");else alert("邮箱格式不对！");else alert("电话格式不对！")})});