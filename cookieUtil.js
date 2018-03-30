/**
 * @param
 *   n cookie name
 *   v cookie value
 *   mins cookie expiredate
 *   dn cookie domain
 *   path cookie path
 * @return
 *   null
 * */
function setCookie(n, v, mins, dn, path){
	if(n) {
	    if(!mins) mins = 365 * 24 * 60;
	    var date = new Date();
	    date.setTime(date.getTime() + (mins * 60 * 1000));
	    var expires = "; expires=" + date.toGMTString();
	    
	    if(dn) dn = "domain=" + dn + "; ";
	    
	    if(!path) path = "/";
	    
	    document.cookie = n + "=" + v + expires + "; " + dn + "path=" + path;
    }
}
function setCookie(name,value,expiredDays){
	//cookie如果未设置expires则在本次会话有效，关闭浏览器后，或页面则失效。
	//如果设置expires则使用GMT格式的时间
        //单位为毫秒
	//大于或等于1天时expres直接跟天数如expires:7;？
	//少于1天时转换为毫秒；？
	var expdate=new Date();
	expdate.setTime(expdate.getTime()+(expiredDays*24*60*60*1000));
	document.cookie=name+"="+escape(value)+((expiredDays==null) ? "" : ";expires="+expdate.toUTCString());
}
/**
 * @param
 *   n cookie name
 * @return
 *   v cookie value
 * */
function getCookie(n) {
    var name = n + "=";
	var cookieArray = document.cookie.split(';');
	for(var i=0;i<cookieArray.length;i++) {
		var c = cookieArray[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
	}
	return "";
}
