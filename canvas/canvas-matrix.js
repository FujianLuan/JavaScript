// JavaScript Document
window.onload=function(){

/**
 * 初始化，取得canvas元素和画笔pen
 */
//var canvasOption={id:'666',width:'550px',height:'550px',style:'',pEle:'body',dimension:''};;
var canvasandpen=init();
var pen=canvasandpen.pen;
var canvas=canvasandpen.canvas;
//var s=window.screen;
//var width = matrixBG.width = window.screen.width;
//var height = matrixBG.height = window.screen.height;
var yPositions = Array(300).join(0).split('');
//var ctx=matrixBG.getContext('2d');

var draw = function () {
  pen.fillStyle='rgba(0,0,0,.05)';
  pen.fillRect(0,0,canvas.width,canvas.height);
  pen.fillStyle='#0F0';
  pen.font = '10pt Georgia';
  yPositions.map(function(y, index){
    text = String.fromCharCode(30+Math.floor( Math.random()*95 ));
    x = (index * 10)+10;
    pen.fillText(text, x, y);
	if(y > 100 + Math.random()*1e4)
	{
	  yPositions[index]=0;
	}
	else
	{
      yPositions[index] = y + 10;
	}
  });
};
RunMatrix();
function RunMatrix()
{
	if(typeof Game_Interval != "undefined") clearInterval(Game_Interval);
			Game_Interval = setInterval(draw, 33);
}
function StopMatrix()
{
	clearInterval(Game_Interval);
}
/**
//setInterval(draw, 33);
$("button#pause").click(function(){
StopMatrix();});
$("button#play").click(function(){RunMatrix();});
*/
}