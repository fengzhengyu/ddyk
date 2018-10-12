/**
 * Created by Administrator on 2018/2/24.
 */
(function(){
    function isMobile() {
        var UA = navigator.userAgent;
        var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPod"];
        var flag = false;
        for (var v = 0; v < Agents.length; v++) {
            if (UA.indexOf(Agents[v]) > 0) {
                flag = true;
                break;
            }
        }
        return flag;
    }
    function setFontSize() {
        document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
    }
    isMobile()?setFontSize():document.documentElement.style.fontSize="50px";


})();