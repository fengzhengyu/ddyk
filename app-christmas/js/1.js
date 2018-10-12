/**
 * Created by Administrator on 2017/10/24.
 */
$(function(){
    $("#phone").blur(function(e){
        e.preventDefault(),
            e.stopPropagation(),
        $(this).siblings(".tips").text("");
        var t=$(this).val().trim();
        checkPhone(t)||(""==t?$(this).siblings(".tips").text("请输入手机号码"):$(this).siblings(".tips").text("手机号码格式不正确"))
    }),
    $("#get-code").on("click",function(e){
            e.preventDefault(),
                $("#phone").siblings(".tips").text("");
            var t=$(this);
            t.attr("disabled","disabled");
            var s=$("#phone").val();
            checkPhone(s)?$.post("/teacher/check-phone",{phone:s},function(e){
                if(0==e.code){
                    $("#img-code-input").val("").siblings(".tips").text("");
                    var s=getRandom(0,100,0);
                    $("#img-code-imgcon").attr("src","/code/captcha?"+s),
                        $(".mask,.img-code").show(),t.removeAttr("disabled")
                }else
                    1==e.code?($("#phone").siblings(".tips").text("该号码已经注册"),
                        t.removeAttr("disabled")):($("#phone").siblings(".tips").text("手机号码格式不正确"),t.removeAttr("disabled"))},"json").error(function(e){
                t.removeAttr("disabled"),showTips(e.responseJSON.msg)}):(""==s?$("#phone").siblings(".tips").text("请输入手机号码"):$("#phone").siblings(".tips").text("手机号码格式不正确"),t.removeAttr("disabled"))
    }),
        $("#img-code-sure").on("click",function(e){
            e.preventDefault(),
                $(this).siblings(".tips").text("");
            var t=$(this);t.attr("disabled","disabled");
            var s=$("#phone").val(),
                i=$("#img-code-input").val().trim();
            ""===i?(t.siblings(".tips").text("请先填写图片验证码"),
                t.removeAttr("disabled")):TEA.getCode(s,i,function(e){
                if(0==e.code){
                    $(".img-code,.mask").hide(),
                        t.removeAttr("disabled"),
                        $("#get-code").css("color","#9a9b9b").attr("disabled","disabled");
                    var s=60,
                        i=setInterval(function(){
                            s>=0?$("#get-code").text(s--+"秒"):(clearInterval(i),
                                $("#get-code").css("color","#2199de").text("获取验证码").removeAttr("disabled"))
                        },1e3)}
                else
                    t.siblings(".tips").text(e.msg),
                        t.removeAttr("disabled")
            })
        }),
        $("#name1").blur(function(e){
            e.preventDefault(),e.stopPropagation(),
                $(this).siblings(".tips").text("");var t=$(this).val().trim();
            ""==t?$(this).siblings(".tips").text("请将姓名填写完整"):/^[\u4e00-\u9fa5]+$/.test(t)?t.length>2&&$(this).siblings(".tips").text("请输入正确的姓氏"):$(this).siblings(".tips").text("请输入中文姓名")}),
        $("#name2").blur(function(e){
            e.preventDefault(),e.stopPropagation(),
                $(this).siblings(".tips").text("");
            var t=$(this).val().trim();
            ""==t?$(this).siblings(".tips").text("请将姓名填写完整"):/^[\u4e00-\u9fa5]+$/.test(t)||$(this).siblings(".tips").text("请输入中文姓名")}),
        $("#pass1").blur(function(e){
            e.preventDefault(),e.stopPropagation(),
                $(this).siblings(".tips").text("");
            var t=$(this).val().trim(),
                s=/\W/g;if(t.length<6)$(this).siblings(".tips").text("密码长度不能少于6位");
            else if(s.test(t))
                $(this).siblings(".tips").text("密码只能由数字和字母组成");
            else{
                $(".level-tips").text("").removeClass("level1").removeClass("level2").removeClass("level3");
                var i=testLevel(t);
                switch(i){
                    case 1:
                        $(".level-tips").text("密码安全级别：低").addClass("level"+i);
                        break;
                    case 2:
                        $(".level-tips").text("密码安全级别：中").addClass("level"+i);
                        break;
                    case 3:
                        $(".level-tips").text("密码安全级别：高").addClass("level"+i)
                }
            }
        }),
        $("#pass2").blur(function(e){
            e.preventDefault(),e.stopPropagation(),
                $(this).siblings(".tips").text("");
            var t=$("#pass1").val().trim(),
                s=$(this).val().trim(),
                i=/\W/g;s.length<6?$(this).siblings(".tips").text("密码长度不能少于6位"):i.test(s)?$(this).siblings(".tips").text("密码只能由数字和字母组成"):t!=s&&$(this).siblings(".tips").text("两次输入密码不相同")}),
        $(".submit-reg-btn").on("click",function(e){
            e.preventDefault();
            var t=$(this);
            t.attr("disabled","disabled");
            var s=$("#phone").val().trim(),
                i=$("#check").val().trim(),
                l=$("#name1").val().trim(),
                a=$("#name2").val().trim(),
                n=$("#pass1").val().trim(),
                o=$("#pass2").val().trim(),
                d=$("#read"),r=/\W/g;
            checkPhone(s)?""==i?($("#check").siblings(".tips").text("验证码不能为空"),
                t.removeAttr("disabled")):(TEA.resetTip(),TEA.checkCode(s,i,function(e){
                if(0==e.code)
                    if(""==l||""==a)
                    $("#name1").siblings(".tips").text("姓名不能为空");
                    else if(/^[\u4e00-\u9fa5]+$/.test(l)&&/^[\u4e00-\u9fa5]+$/.test(a))if(l.length>2)$("#name1").siblings(".tips").text("请输入正确的姓氏");else if(""==n)$("#pass1").siblings(".tips").text("密码不能为空");else if(n.length<6)$("#pass1").siblings(".tips").text("密码长度不能少于6位");else if(r.test(n))$("#pass1").siblings(".tips").text("密码只能由数字和字母组成");else if(n!=o)$("#pass2").siblings(".tips").text("两次输入密码不相同");else if(d.is(":checked")){$(".level-tips").text("").removeClass("level1").removeClass("level2").removeClass("level3");var s=testLevel(n);switch(s){case 1:$(".level-tips").text("密码安全级别：低").addClass("pass"+s);break;case 2:$(".level-tips").text("密码安全级别：中").addClass("pass"+s);break;case 3:$(".level-tips").text("密码安全级别：高").addClass("pass"+s)}$(".mask,.school-content").show()}else $("#read").siblings(".tips").text("您还未同意协议条款");else $("#name1").siblings(".tips").text("请输入中文姓名");t.removeAttr("disabled")})):(""==s?$("#phone").siblings(".tips").text("手机号码不能为空"):$("#phone").siblings(".tips").text("手机号码格式不正确"),t.removeAttr("disabled"))}),$("#submit").on("click",function(e){e.preventDefault();var t=$(this);t.attr("disabled","disabled");var s=$(".school-div div ul .selected-item").attr("data-id");s||""!=$("#schoolName-input").val()?s||/[\u4e00-\u9fa5]/.test($("#schoolName-input").val())?($(".school-content").hide(),$(".add-class-win").show()):showTips("请输入正确的学校名称！"):showTips("请选择学校"),t.removeAttr("disabled")}),$(".add-class-btn").off("click"),$(".add-class-btn,.skip-btn").on("click",function(){$(".add-class-btn,.skip-btn").attr("disabled","disabled");var e=$("#phone").val().trim(),t=$("#check").val().trim(),s=$("#name1").val().trim(),i=$("#name2").val().trim(),l=$("#pass1").val().trim(),a=testLevel(l),n=$(".province-div ul .selected-item").attr("data-id"),o=$(".city-div ul .selected-item").attr("data-id"),d=$(".area-div ul .selected-item").attr("data-id");if(""!=$("#schoolName-input").val())var r=$("#schoolName-input").val(),c=0,p=2;else var r="",c=$(".school-div div ul .selected-item").attr("data-id"),p=$(".school-div div ul .selected-item").attr("data-type");if($(this).hasClass("add-class-btn")){if(!allClass.length)return showTips("尚未选择任何班级"),$('button[disabled="disabled"]').removeAttr("disabled"),0;for(var v=[],h=$(".sel-year-now").attr("data-id"),b=0;b<allClass.length;b++)allClass[b].split("-")[0]==h&&(v[b]={},v[b].year=allClass[b].split("-")[0],v[b].school_level=allClass[b].split("-")[1],v[b].grade=allClass[b].split("-")[2],v[b].class=allClass[b].split("-")[3])}
        $.post("/teacher/register",{phone:e,password:l,first_name:s,given_name:i,code:t,high_school:p,province_id:n,city_id:o,area_id:d,school_id:c,school_name:r,secure_level:a,classes:v}, function(e){
            0==e.code&&(allClass=[],
        $(".seled-class ul").html(""),
        $(".seled-class-tips").show(),
        $(".reg-win,.add-class-win,.mask").hide(),
        $(".reg-suc").show(),
        setTimeout(function(){window.location.href="index.html"},2e3)),$('button[disabled="disabled"]').removeAttr("disabled")},"json").error(function(e,t){var s=JSON.parse(e.responseText);
        switch(s.code){
            case 60001:
                showTips("验证码错误");
                break;
            case 70001:
                showTips("该手机号已经注册");
                break;
            default:showTips(s.message)}
        $('button[disabled="disabled"]').removeAttr("disabled")
    })
    })
});