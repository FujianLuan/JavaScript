function setCanvas(id,width,height){//创建画布,设置id,width,height.
	var canvas=document.createElement("canvas");
	canvas.id=id;
	canvas.width=width||window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	canvas.height=height||window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;;
	document.getElementsByTagName("body")[0].appendChild(canvas);
	return canvas.id;
}
function getPen(id,dimension){
	var canvas = document.getElementById(id);
	var dimension=dimension||'2d';//默认2d,可传入webgl
	var ctx=canvas.getContext(dimension);
	return ctx;
}
function init(option) {
	setCanvas(option.id,option.width,option.height);
	var pen = getPen(option.id,option.id,option.dimension); 
	return pen;
}
