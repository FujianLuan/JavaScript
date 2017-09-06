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