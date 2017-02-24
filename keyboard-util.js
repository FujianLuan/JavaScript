/**
 *键盘工具
 *1.虚拟键盘
 *2.键盘code检测
 *3.按键事件
 */
(function ($) {
	/**
	 * 键盘映射
	 * */
	$.fn.keyd=function(callback){
		this.keydown(function() {
			if (event.keyCode == "13") {//keyCode=13是回车键
					callback();
					//alert(1);
				}
			});
	};
	/**
	 * 键码检测
	 * */
	$.extend({
		getKeyCode:function(){
		$('html').keydown(function(){
			alert(event.keyCode);
		})
	}
	})
	
})(jQuery)