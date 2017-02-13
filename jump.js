function JumpObj(elem, range, startFunc, endFunc) {
	var curMax = range = range || 6;
   	startFunc = startFunc || function(){};
	endFunc = endFunc || function(){};
	var drct = 0;
	var step = 1;

	init();

	function init() { elem.style.position = 'relative';active() }
	function active() { elem.onmouseover = function(e) {if(!drct)jump()} }
	function deactive() { elem.onmouseover = null }

	function jump() {
		 var t = parseInt(elem.style.top);
		if (!drct) motionStart();
		else {
			var nextTop = t - step * drct;
			if (nextTop >= -curMax && nextTop <= 0) elem.style.top = nextTop + 'px';
			else if(nextTop < -curMax) drct = -1;
		   else {
				var nextMax = curMax / 2;
				if (nextMax < 1) {motionOver();return;}
				curMax = nextMax;
				drct = 1;
			}
		}
		setTimeout(function(){/*alert(200 / (curMax+3) + drct * 3)*/;jump()}, 200 / (curMax+3) + drct * 3);
	 }
	function motionStart() {
		startFunc.apply(this);
		elem.style.top='0';
		drct = 1;
	}
	  function motionOver() {
		endFunc.apply(this);
		curMax = range;
		drct = 0;
		elem.style.top = '0';
	}

	this.jump = jump;
	this.active = active;
	this.deactive = deactive;
}
/*
<script type="text/javascript">
$(function(){
	 $("#ul img").each(function(k,img){
		new JumpObj(img);
		//第一个参数代表元素对象
		//第二个参数代表抖动幅度
	});
});
</script>
*/
(function ($) {
	$.fn.jump=function (option) {
		/**
		 * 参数设置
		 *
		 */
		var _ele=this;
		var defaultSetting={
			ele:_ele.get(0), //跳动的元素
			range:"10", //跳动最大高度
			/**
			 * 跳动开始和结束的回调函数
			*/
			startFunc:function(){}, 
			endFunc:function(){}
		};
		var setting=$.extend({},defaultSetting,option);

		var curMax = setting.range;//跳动最大高度
		var drct = 0;//跳动方向
		var step = 1;//跳动距离的单位值

		init();

		function init() { setting.ele.style.position = 'relative';active() }
		function active() { setting.ele.onmouseover = function(e) {if(!drct)jump()} }
		function deactive() { setting.ele.onmouseover = null }

		function jump() {
			 var t = parseInt(setting.ele.style.top);
			if (!drct) motionStart();
			else {
				var nextTop = t - step * drct;
				if (nextTop >= -curMax && nextTop <= 0) setting.ele.style.top = nextTop + 'px';
				else if(nextTop < -curMax) drct = -1;
			   else {
					var nextMax = curMax / 2;
					if (nextMax < 1) {motionOver();return;}
					curMax = nextMax;
					drct = 1;
				}
			}
			setTimeout(function(){/*alert(200 / (curMax+3) + drct * 3)*/;jump()}, 200 / (curMax+3) + drct * 3);
		 }
		function motionStart() {
			startFunc.apply(this);
			setting.ele.style.top='0';
			drct = 1;
		}
		  function motionOver() {
			endFunc.apply(this);
			curMax = setting.range;
			drct = 0;
			setting.ele.style.top = '0';
		}

		this.jump = jump;
		this.active = active;
		this.deactive = deactive;

	}
	
})(jQuery)