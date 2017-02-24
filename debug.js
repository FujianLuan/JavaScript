$.extend({
	log:function (msg){
		var now = new Date(),
		y=now.getFullYear(),
		m=now.getMonth()+1,//js中月份从0开始
		d=now.getDate(),
		h=now.getHours(),
		min=now.getMinutes(),
		s=now.getSeconds(),
		time=y+'/'+m+'/'+d+' '+h+':'+min+':'+s;
		console.log(time+' '+'info:'+' '+msg);
	},
	logO:function (msg){//打印对象详细信息
		var now = new Date(),
		y=now.getFullYear(),
		m=now.getMonth()+1,//js中月份从0开始
		d=now.getDate(),
		h=now.getHours(),
		min=now.getMinutes(),
		s=now.getSeconds(),
		time=y+'/'+m+'/'+d+' '+h+':'+min+':'+s;
		console.log(time+' '+'info:'+' ');
		console.dir(msg);
	}

})