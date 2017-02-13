/**
 *
 * 表单验证 valid4me--author:luanfujian--date:2016
 * 
 * 
 *
 *
 *
 *
 *
 * 
 */
/*文档表单扫描工具*/
/*检验工具*/
/*
function trim(s){
	return s.replace(/(^\s*)|(\s*$)/g,"");
}
function trimAll(s) {
	return s.replace(/\s+/g,"");
}
*/
String.prototype.trim=function () {
	return this.replace(/(^\s*)|(\s*$)/g,"");
}
String.prototype.trimAll=function () {
	return this.replace(/(^\s*)|(\s*$)/g,"");
}
(function (win, doc,undefined) {
    //var docScanner
})(window, document);