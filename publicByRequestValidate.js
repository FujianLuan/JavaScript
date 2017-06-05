//提示信息
var isNull='不能为空';
var isIllegal='包含非法字符';
var isTel='格式有误，如0531-88888888或15866612312';
var isMobile='格式有误';
var isCar='格式有误，如鲁A-00000';
var isNum='不是整数';
var isSel='请选择';
var isLen='长度应小于等于';
var isSame='不一致';
var isPublic='您输入的';
var isCard='格式有误';
var isPost='格式有误，如250000';
var isAddress='格式有误，如www.baidu.com';
var isCHN='必须为汉字';
var isFax='格式有误，如8888888';
var isPrice='格式有误';
var isEmail='格式有误，如xxx@163.com';
var isQQCheck='格式有误，如136986565';
var isUpperCase='全部应为大写';

//根据id得到对应值
function getValue(id){
	return document.getElementById(id).value;
}
//非空验证
function isEmpty(id,msg){
	var iempty=delTrim(id);
	if(iempty.length==0){
		txtName_blur_append(id,msg+isNull);
		return false;
	}else{
		txtName_focus(id);
		return true;
	}
}
//去除所有空格
function delAllTrim(id){
	var str=getValue(id);
	return str.replace(/\s+/g,"");
}
//去除两头空格
function delTrim(id){
	var str=getValue(id);
	return str.replace(/^\s+|\s+$/g,"");
}
//去除左边空格
function delLeftTrim(id){
	var str=getValue(id);
	return str.replace(/^\s*/, '');
}
//去除右边空格
function delRightTrim(id){
	var str=getValue(id);
	return str.replace(/(\s*$)/g,"");
}
// 去掉空格后赋值给id元素
function reTrimValue(id){
	var str=delTrim(id);
	document.getElementById(id).value=str;
}
//是否为拼音
function checkPin(id,msg){
	var str=delTrim(id);
	var reg = /^([a-zA-Z])$/;
	var result=false;
	for(var i =0; i<str.length;i++){
 			var code =str.substring(i,i+1);
				if(!reg.test(code)){
  					txtName_blur_append(id,msg+"不符合拼音格式");
    				return false;
			}
	}
	return true;
}
//非法字符验证
function illegalCheck(id,msg){
	var idval=delTrim(id); 
	var  p =new Array ( "﹉", "＃", "＠", "＆", "＊", "※", "§", "〃", "№", "〓", "○",
  "●", "△", "▲", "◎", "☆", "★", "◇", "◆", "■", "□", "▼", "▽",
  "㊣", "℅", "ˉ", "￣", "＿", "﹍", "﹊", "﹎", "﹋", "﹌", "﹟", "﹠",
  "﹡", "♀", "♂", "⊙", "↑", "↓", "←", "→", "↖", "↗", "↙","↘", "┄","︴", "﹏",
  "︻", "︼", "︽","︾","﹄", "<", ">", "\"",
  "≈", "≡", "≠", "＝", "≤", "≥", "≮", "≯", "∷",
  "±", "÷", "∫", "∮", "∝", "∧", "∨", "∞",
  "∑", "∏", "∪", "∩", "∈", "∵", "∴", "⊥", "∥", "∠", "⌒", "⊙",
  "≌", "∽", "≦", "≧", "≒", "≡","∟", "⊿", "∥", "㏒", "㏑","¥", "€", "￥", "£", "®", "™", "©", "…", "‥", "々","?",
   "‖","&","#","%","$", "@","\\");
	 for (var j = 0; j < p.length; j++) {
		if(idval.indexOf(p[j]) != -1) {
    		txtName_blur_append(id,msg+isIllegal);
    		return false;
   		}
  	}
	return true;
}

//非法用户字符检查
function illUserCheck(id,msg){
	var vid=delTrim(id);
	var patten=/^[0-9a-zA-Z_-]{1,}$/;
	if(!patten.test(vid)){
		txtName_blur_append(id,msg+isIllegal);
		return false;
	}
	return true;
}

//长度小于某一个值
function lengthCheck(id,lengthValue,msg){
	if(delTrim(id).length<lengthValue){
		return true;
	}else{
		txtName_blur_append(id,msg+isLen+(lengthValue-1));
		return false;
	}
}

// 姓名控制2-8个汉字
function xlengthCheck(id, msg){
	if(delTrim(id).length<=8 && delTrim(id).length>=2){
		return true;
	}else{
	    txtName_blur_append(id,msg+"应该为2-8个汉字");
		return false;
	}
}

//验证用户输入电话号码或手机号码是否符合规范
function telCheck(id,msg){
	var phone=delTrim(id);
	var p1 = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})?$/;       
	if(phone.substr(0,1)=="1"&&phone.substr(0,2)!="11"){
		return isMobileNO(id,msg);
	}else{
		var leng=phone.split("-")[0];
		if(leng.length==3){
			p1=/^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{8})?$/;
		}
		if (!p1.test(phone)){
			txtName_blur_append(id,isPublic+msg+isTel);
			return false;
		}
		return true;
	}
}
//验证带区号或者不带区号传真号码
function faxCheck(id,msg){
	var phone=delTrim(id);
	var p1 = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})?$/;       
	if (!p1.test(phone)){
		txtName_blur_append(id,isPublic+msg+isFax);
		return false;
	}
	return true;
}
//验证车牌号
function checkNo(id,msg){
	var str=delTrim(id);
	if(str.length!=8){
		txtName_blur_append(id,isPublic+msg+isCar);
		return false;
	}
	var Expression=/^[\u4E00-\u9FA5]?[A-Z]-[A-Z0-9]{5}$/; 
	var objExp=new RegExp(Expression);
	if(objExp.test(str)){
		return true;
	}else{
		txtName_blur_append(id,isPublic+msg+isCar);
		return false;
	}
}
//--身份证号码验证-支持新的带x身份证
function isIdCardNo(id,msg){ 
	var _id=delTrim(id);
	var powers=new Array("7","9","10","5","8","4","2","1","6","3","7","9","10","5","8","4","2");   
	var parityBit=new Array("1","0","X","9","8","7","6","5","4","3","2"); 
	var intStrLen = _id.length; 
	if ((intStrLen != 15) && (intStrLen != 18)) { 
		txtName_blur_append(id,isPublic+msg+isCard);
		return false; 
	}else if(intStrLen==15){
		for(var i=0;i<_id.length;i++){   
			//校验每一位的合法性   
			if(_id.charAt(i)<'0'||_id.charAt(i)>'9'){
				txtName_blur_append(id,isPublic+msg+isCard);
			    return false;   
				break;  
			 }   
		}   
	   var year=_id.substr(6,2);   
	   var month=_id.substr(8,2);   
	   var day=_id.substr(10,2);   
	   var sexBit=_id.substr(14);   
	   //校验年份位   
   
	   if(year<'01'||year >'90'){
	   		txtName_blur_append(id,isPublic+msg+isCard);
	   		return false;
	   }
		//校验月份   
   
	   if(month<'01'||month >'12'){
	   		txtName_blur_append(id,isPublic+msg+isCard);
	   		return false;
	   } 
		//校验日   
   
	   if(day<'01'||day >'31'){
	   		txtName_blur_append(id,isPublic+msg+isCard);
	   		return false;
	   }
	
	}else if(intStrLen==18){
		var _num=_id.substr(0,17);  
        var _parityBit=_id.substr(17);  
        var _power=0;  
        for(var i=0;i< 17;i++){  
            //校验每一位的合法性  
            if(_num.charAt(i)<'0'||_num.charAt(i)>'9'){
				txtName_blur_append(id,isPublic+msg+isCard);
                return false;  
                break;  
            }else{  
                //加权  
                _power+=parseInt(_num.charAt(i))*parseInt(powers[i]);  
            }  
        }  
        //取模  
        var mod=parseInt(_power)%11;  
        if(!(parityBit[mod]==_parityBit)){
        	txtName_blur_append(id,isPublic+msg+isCard);
            return false;  
        }  
        return true;
	}else{
		txtName_blur_append(id,isPublic+msg+isCard);
		return false;
	}
	return true;
}
//--身份证号码验证-支持新的带x身份证
function isIdCardNoMsg(id,msg){ 
	var _id=delTrim(id);
	var powers=new Array("7","9","10","5","8","4","2","1","6","3","7","9","10","5","8","4","2");   
	var parityBit=new Array("1","0","X","9","8","7","6","5","4","3","2"); 
	var intStrLen = _id.length; 
	if ((intStrLen != 15) && (intStrLen != 18)) { 
		//txtName_blur_append(id,isPublic+msg+isCard);
		return false; 
	}else if(intStrLen==15){
		for(var i=0;i<_id.length;i++){   
			//校验每一位的合法性   
			if(_id.charAt(i)<'0'||_id.charAt(i)>'9'){
				//txtName_blur_append(id,isPublic+msg+isCard);
			    return false;   
				break;  
			 }   
		}   
	   var year=_id.substr(6,2);   
	   var month=_id.substr(8,2);   
	   var day=_id.substr(10,2);   
	   var sexBit=_id.substr(14);   
	   //校验年份位   
   
	   if(year<'01'||year >'90'){
	   		//txtName_blur_append(id,isPublic+msg+isCard);
	   		return false;
	   }
		//校验月份   
   
	   if(month<'01'||month >'12'){
	   		//txtName_blur_append(id,isPublic+msg+isCard);
	   		return false;
	   } 
		//校验日   
   
	   if(day<'01'||day >'31'){
	   		//txtName_blur_append(id,isPublic+msg+isCard);
	   		return false;
	   }
	
	}else if(intStrLen==18){
		var _num=_id.substr(0,17);  
        var _parityBit=_id.substr(17);  
        var _power=0;  
        for(var i=0;i< 17;i++){  
            //校验每一位的合法性  
            if(_num.charAt(i)<'0'||_num.charAt(i)>'9'){
				//txtName_blur_append(id,isPublic+msg+isCard);
                return false;  
                break;  
            }else{  
                //加权  
                _power+=parseInt(_num.charAt(i))*parseInt(powers[i]);  
            }  
        }  
        //取模  
        var mod=parseInt(_power)%11;  
        if(!(parityBit[mod]==_parityBit)){
        	//txtName_blur_append(id,isPublic+msg+isCard);
            return false;  
        }  
        return true;
	}else{
		//txtName_blur_append(id,isPublic+msg+isCard);
		return false;
	}
	return true;
}
//邮政编码验证
function isPostCode(id,msg){
	var objValue = delTrim(id);
	if(typeof(objValue)=="undefined"){
		txtName_blur_append(id,isPublic+msg+isPost);
		return false;
	}
	var regExp = /^[1-9][0-9]{5}$/;
	if(regExp.test(objValue)){
		return true;
	}else if(objValue.length!=6){
		txtName_blur_append(id,isPublic+msg+isPost);
		return false;
	}else {
		txtName_blur_append(id,isPublic+msg+isPost);
		return false;
	}
	return true;
}
//整数
function isNaturalNumber(id,msg){
	var objValue = delTrim(id);
	if(typeof(objValue)=="undefined"){
		txtName_blur_append(id,msg+isNum);
		return false;
	}
	if(objValue=="" || objValue==null){ 
		txtName_blur_append(id,msg+isNum);
		return false;
	} 
	var regExp = /^\d*$/;
	if(regExp.test(objValue)){
		return true;
	}else{
		txtName_blur_append(id,msg+isNum);
		return false;
	}
	return true;
}
// 验证邮箱是否正确
function validateEmail(id,msg) {
	var objValue = delTrim(id);
	if(objValue.length==0){
		txtName_blur_append(id,msg+isEmail);
		return false;
	}
	var regExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
	if(regExp.test(objValue)){
		return true;
	}else{
		txtName_blur_append(id,msg+isEmail);
		return false;
	}
}
//验证网址
function addressCheck(id,msg){
	var urlreg= "^((https|http|ftp|rtsp|mms)://)?[a-z0-9A-Z]{3}\.[a-z0-9A-Z][a-z0-9A-Z-]{0,61}?[a-z0-9A-Z-]\.com|net|cn|cc (:s[0-9]{1-4})?/$";
	var re = new RegExp(urlreg);
	var url=delTrim(id);
	if(!re.test(url)){
		txtName_blur_append(id,isPublic+msg+isAddress);
     	return false;
    }
	return true;
}
//验证两次密码是否相同
function pwdCheck(id1,id2,msg){
	if(getValue(id1)!=getValue(id2)){
		txtName_blur_append(id1,msg+isSame);
		return false;
	}
	return true;
}
//验证QQ
function isQQ(id,msg){ 
	var qq=delTrim(id);
	if(qq.search(/^[1-9]\d{4,9}$/) != -1){ 
		return true;
	}else{ 
		txtName_blur_append(id,msg+isQQCheck);
		return false;
	} 
}
//验证浮点数
function isDouble(id,msg){
	var reg=/^[0-9]+[.]\d{1,2}$/;
	var val=delTrim(id);
	if(!reg.test(val)){
		txtName_blur_append(id,msg+isPrice);
		return false;
	}
	return true;
}
//判断下拉列表框是否选择
function isSelect(id,msg){
	var gval=getValue(id);
	if(gval==""||gval=="0"||gval==null){
		txtName_blur_append(id,isSel+msg);
		return false;
	}
	return true;
}
//数字、金额验证
function isMoney(id,msg){
	var objValue = delTrim(id);
	if(typeof(objValue)=="undefined"){
		txtName_blur_append(id,msg+isPrice);
		return false;
	}
	if(objValue=="" || objValue==null){ 
		txtName_blur_append(id,msg+isPrice);
		return false;
	}
	var regExp = /^\d+\.?\d*$/;
	if(regExp.test(objValue)){
		return true;
	}else{
		txtName_blur_append(id,msg+isPrice);
		return false;
	}
}
//验证不带区号的传真号码
function isNotAreaFax(id,msg){
	var phone=delTrim(id);
	var p1 = /^\d{7,8}?$/;       
	if (!p1.test(phone)){
		txtName_blur_append(id,isPublic+msg+isFax);
		return false;
	}
	return true;
}
//验证手机号码
function isMobileNO(id,msg){
	var objValue = delTrim(id);
	if(typeof(objValue)=="undefined"){
		txtName_blur_append(id,isPublic+msg+isMobile);
		return false;
	}
	if(objValue=="" || objValue==null){ 
		txtName_blur_append(id,isPublic+msg+isMobile);
		return false;
	} 
	if(objValue.length!=11){
		txtName_blur_append(id,isPublic+msg+isMobile);
		return false;
	}
	var myreg = /^(1[3-9]{1}[0-9]{1})\d{8}$/;
	if(!myreg.test(objValue)){
		txtName_blur_append(id,isPublic+msg+isMobile);
		return false;
	}
	return true;
}
//验证区号
function checkArea(id,msg){
	var sAreaNum = delTrim(id);
	if(!(/^\d{3,5}$/.test(sAreaNum))){
		txtName_blur_append(id,msg+isPrice);
		return false;
	}
	return true;
}
function checkDate(date){ 
	return true; 
}

//验证汉字
function checkCHN(id,msg){
	var reg=/^[\u4E00-\u9FA5]{1,}$/;
	if(!reg.test(delTrim(id))){
		txtName_blur_append(id,msg+isCHN);
		return false;
	}
	return true;
}

//验证空字符和是否为空
function check_blur(id,msg){
	if(!isEmpty(id)){
		txtName_blur_append(id,msg+isNull);
		return false;
	}else if(!illegalCheck(id)){
		txtName_blur_append(id,msg+isIllegal);
		return false;
	}else{
		return true;
	}
}

//验证全部为大写
function check_uppercase(id,msg){
	var vid=delTrim(id);
	var patten=/^[A-Z]+$/;
	if(!patten.test(vid)){
		txtName_blur_append(id,msg+isUpperCase);
		return false;
	}
	return true;
}

//创建漂浮框
//id 文本框id
//msg提示信息
function addFloat(id,msg){
	var $id=$("#"+id);
	var txttop=$id.offset().top;
	var txtleft=$id.offset().left;
	var txtwidth=$id.width();
	var txtheight=$id.height();
	$id.toggleClass("txt");
	if(typeof(msg)!=="undefined"){
		createDiv(id,msg,txtleft,txtwidth,txttop);
	}
}
//创建div
function createDiv(id,msg,txtleft,txtwidth,txttop){
	var id1=createId(id);
	var divIsExist=document.getElementById(id1);
	var $id1=$("#"+id1);
	if(divIsExist==null){
		var div=$("<div id='"+id1+"' class='divimg'><font>"+msg+"</font></div>");
		$("body").append(div);
	}else{
		$id1=$("#"+id1).html("<font>"+msg+"</font>");
	}
	$id1=$("#"+id1);
	$id1.css({"left":txtleft+txtwidth/2,"top":txttop-45});
	$id1.slideDown(1000);
}
//删除div
//id 文本框id
function deleteDiv(id){
	var $id=$("#"+id);
	$("body").remove($id);
	$id.removeClass("txt");
	var id1=createId(id);
	$("#"+id1).slideUp();
}
//生成ID
function createId(id){
	var id1=id+"_1";
	return id1;
}
function txtName_focus(id){
	var tdiv= document.getElementById(id+"_div");
	if(tdiv){
		tdiv.parentNode.removeChild(tdiv);
		//document.body.removeChild(tdiv);
		//document.getElementById(id).className="";
	}		
}
function txtName_blur_append(id,msg){
	var tdiv= document.getElementById(id)
	var div=document.createElement("div");
	txtName_focus(id);
	div.id=id+"_div";
	div.style.display="inline";
	div.innerHTML="<font color='red' font-size='12px'>"+msg+"</font>";
	tdiv.parentNode.appendChild(div);
}
function txtName_blur(id,msg){
	var tdiv= document.getElementById(id);
	txtName_focus(id);
	var div=document.createElement("div");
	div.id=id+"_div";
	var position =tdiv.getBoundingClientRect();
	div.style.height=tdiv.offsetHeight+tdiv.scrollHeight+"px";
	div.style.position="absolute";
	div.style.top=position.top+tdiv.scrollTop+tdiv.offsetHeight/2-6+"px";
	div.style.left=position.left+tdiv.offsetWidth+12+"px";
	div.innerHTML="<font color='red' font-size='12px'>"+msg+"</font>"
	document.body.appendChild(div);
}
//隐藏所有悬浮框
function hiddenAllDiv(){
	var objs=document.getElementsByTagName("div");
	for(var i=0;i<objs.length;i++) {
		if(objs[i].style.display=="block"){
			if(objs[i].id.length>=2){
				if(objs[i].id.substring(objs[i].id.length-2,objs[i].id.length)=="_1"){
					deleteDiv(objs[i].id.substring(0,objs[i].id.length-2));
				}
			}
		}
	}
}

//隐藏所有的框(即提示信息)
function hiddenAllDivs(){
	var objs=document.getElementsByTagName("div");
	for(var i=0;i<objs.length;) {
		if(objs[i].style.display=="inline"||objs[i].style.display=="block"){
			if(objs[i].id.length>=4){
				if(objs[i].id.substring(objs[i].id.length-4,objs[i].id.length)=="_div"){
					objs[i].parentNode.removeChild(objs[i]);
					i=0;
				}else{
					i++;
				}
			}else{
				i++;
			}
		}else{
			i++;
		}
	}
}

//验证是否选择复选框
function checkCheckBox(id,name,msg){
	var che=document.getElementsByName(name);
	var count=0;
	var tempvalue="";
	if(che){
		if(che.length>1){
			for(var i=0;i<che.length;i++){
				if(che[i].checked){
					count++;
					if(count==1){
						tempvalue=che[i].value;
					}
				}
			}
		}else{
			if(che.checked){
				count++;
			}
			if(count==1){
				tempvalue=che.value;
			}
		}
		if(count==0){
			txtName_blur_append(id,isSel+msg);
			return false;
		}else{
			return true;
		}
	}
}

// 用来验证查询窗口不能有非法字符
function check(str){
	var reg = /^([a-zA-Z])|[0-9]|([\u0391-\uFFE5]+)|([-_,])$/;
	var result=false;
	for(var i =0; i<str.length;i++){
		var code =str.substring(i,i+1);
			if(!reg.test(code)&&code!=" "){
				result=true;
			}
	}
	return result;
}
//隐藏所有错误提示框
function hidAllDiv(){
	var objs=document.getElementsByTagName("div");
	for(var i=0;i<objs.length;) {
		if(objs[i].style.display=="inline"||objs[i].style.display=="block"){
			if(objs[i].id.length>=4){
				if(objs[i].id.substring(objs[i].id.length-4,objs[i].id.length)=="_div"){
					objs[i].parentNode.removeChild(objs[i]);
					i=0;
				}else{
					i++;
				}
			}else{
				i++;
			}
		}else{
			i++;
		}
	}
}