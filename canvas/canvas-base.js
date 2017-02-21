function getCanvas(id,width,height,style,pEle){//创建画布,设置id,width,height.
	var canvas=document.createElement("canvas");
	//设置属性id,w,h
	canvas.id=id||'c'+Math.floor((Math.random()*10));
	canvas.width=width||window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	canvas.height=height||window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;;
	//alert(id);
	//alert(canvas.width);
	//alert(canvas.height);
	//设置样式
	var style=style||'position:fixed;top:0px;left:0px;z-index:-1;opacity:1;';
	canvas.style.cssText = style;
	//添加到html文档中
	var pEle=pEle||'body';
	document.getElementsByTagName(pEle)[0].appendChild(canvas);
	
	return canvas;
}
function getPen(id,dimension){
	var c = document.getElementById(id);
	var d=dimension||'2d';//默认2d,可传入webgl
	var ctx=c.getContext(d);
	return ctx;
}
function init(option) {
	var option=option||{id:'',width:'',height:'',style:'',pEle:'',dimension:''};

	var canvas=getCanvas(option.id,option.width,option.height,option.style,option.pEle);
	var ctx = getPen(canvas.id,option.dimension);
	var initData={canvas:canvas,pen:ctx};
	return initData;
}
