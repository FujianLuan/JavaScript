/**
 * Geolocation API
 * navigator.geolocation对象的三个方法：
 * 1.getCurrentPosition(successCallback[,errorCallback][,optionO]);
 * 	注一：successCallback(position)成功回调函数，传入getCurrentPosition返回的position。
 * 	该position对象始终包含coords.latitude、coords.longitude 以及 coords.accuracy 属性。如果可用，则会返回其他下面的属性。
 * 	coords.latitude	十进制数的纬度
 *  coords.longitude 十进制数的经度
 *  coords.accuracy	位置精度
 *  coords.altitude	海拔，海平面以上以米计
 *  coords.altitudeAccuracy	位置的海拔精度
 *  coords.heading	方向，从正北开始以度计
 *  coords.speed	速度，以米/每秒计
 *  timestamp	响应的日期/时间
 * 	注二：optionO参数为额外参数，也是可选参数，对象。option参数支持三个可选参数API，为：enableHighAccuracy, timeout, maximumAge.
 *  1.1. enableHighAccuracy参数表示是否高精度可用，为Boolean类型，默认为false，如果开启，响应时间会变慢，同时，在手机设备上会用掉更多的流量，也就是money了。
 *  1.2. timeout参数表示等待响应的最大时间，默认是0毫秒，表示无穷时间。
 *  1.3. maximumAge表示应用程序的缓存时间。单位毫秒，默认是0，意味着每次请求都是立即去获取一个全新的对象内容。
 *
 * 2.watchPosition();返回用户的当前位置，并继续返回用户移动时的更新位置（就像汽车上的 GPS）
 * 3.clearWatch(watchId) - 停止 watchPosition() 方法,watchId为watchPosition方法返回的watchId。
 *
 * 
 */
function getPosition(){   
    if (navigator.geolocation){   
        navigator.geolocation.getCurrentPosition(successCallback,errorCallback);   
    }else{   
        alert("浏览器不支持地理定位。");   
    }   
}
function successCallback(position){ 
     do(position);
}
function errorCallback(error){   
    switch(error.code) {   
        case error.PERMISSION_DENIED:   
        	alert("定位失败,用户拒绝请求地理定位");   
            break;   
        case error.POSITION_UNAVAILABLE:   
        	alert("定位失败,位置信息不可用");   
            break;   
        case error.TIMEOUT:   
        	alert("定位失败,请求获取用户位置超时");   
            break;   
        case error.UNKNOWN_ERROR:   
        	alert("定位失败,定位系统失效");   
            break;   
    }   
}




$(function(){
	getLocation();
})
/**
 * 
 * 业务逻辑
 * 
 */
function do(position){
	/**
	 * 百度地图获取位置信息
	 * 
	 */
	var latlon = position.coords.latitude+','+position.coords.longitude;
	 //baidu 
    var url = "http://api.map.baidu.com/geocoder/v2/?ak=C93b5178d7a8ebdb830b9b557abce78b&callback=renderReverse&location="+latlon+"&output=json&pois=0"; 
    $.ajax({  
        type: "GET",  
        dataType: "jsonp",  
        url: url, 
        beforeSend: function(){ 
            //$("#location").html('正在定位...'); ===============业务代码
        }, 
        success: function (json) {  
            if(json.status==0){ 
                //$("#location").html(json.result.formatted_address);
                //$("#location").html(json.result.city);===============业务代码
            } 
        }, 
        error: function (XMLHttpRequest, textStatus, errorThrown) {  
            //$("#location ").html(latlon+"地址位置获取失败");  ===============业务代码
        } 
    }); 
}