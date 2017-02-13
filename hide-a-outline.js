/**
 *去除IE7下的a的outline，方法为为a添加'hidefocus=true'
*/
$('document').ready(function(){
	$('a').attr('hidefocus','true');
})
//(function (win, doc,undefined) {
    //$.fn.noIeAOutline=function(){
    		//this.each($(this).attr('hidefocus','true'));
    //}
    //$('a').noIeAOutline();
//})(window, document);