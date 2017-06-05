	 // 验证不为空，非法字符，2-8 中文 (验证姓名)
	function nchName_blur(id,msg){
		if(!isEmpty(id,msg)){
			return false;
		}else if(!slengthCheck(id,msg)){
			return false;
		}else if(!checkCHN(id,msg)){
			return false;
		}else{
			reTrimValue(id);
			return true;
		}
	}
	
	// 控制2-8个汉字
		function slengthCheck(id, msg){
			if(delTrim(id).length<=8 && delTrim(id).length>=2){
				return true;
			}else{
			    txtName_blur_append(id,msg+"应该为2-8个汉字");
				return false;
			}
		}
		
	// 验证不为空，非法字符，和长度。
		function name_blur(id,msg,length){
			if(!isEmpty(id,msg)){
				return false;
			}else if(!illegalCheck(id,msg)){
				return false;
			}else if(!lengthCheck(id,(length/2+1),msg)){
				return false;
			}else{
				reTrimValue(id);
				return true;
			}
		}
		
	
	// 验证身份证号
		function idcard_blur(id,msg){
			if(!isEmpty(id,msg)){
				return false;
			}else if(!isIdCardNo(id,msg)){
				return false;
			}else{
				reTrimValue(id);
				return true;
			}
		}
		// 验证身份证号
		function idcard_blur_nomsg(id,msg){
			if(!isEmpty(id,msg)){
				return false;
			}else if(!isIdCardNoMsg(id,msg)){
				return false;
			}else{
				reTrimValue(id);
				return true;
			}
		}
		// 验证电话号码 (不能空,可以固话、手机)
		function tels_blur(id, msg){
			if(!isEmpty(id,msg)){
				return false;
			}
			if(!telCheck(id,msg)){
				return false;
			}
			else{
				reTrimValue(id);
				return true;
			}
		}
		
		
		// 传真 不能为空
		function myfaxnull_blur(id,msg){
			if(!isEmpty(id,msg)){
				return false;
			}
			if(!isNotAreaFax(id,msg)){
				return false;
			}
			else{
				reTrimValue(id);
				return true;
			}
		}
		
		// 验证邮政编码 （不能为空）
		function zipCode_blur(id,msg){
			if(!isEmpty(id,msg)){
				return false;
			}
			if(!isPostCode(id,msg)){
				return false;
			}else{
				reTrimValue(id);
				return true;
			}
		}
		
		
		// 验证电子邮箱 （不能为空）
		function email_blur(id,msg){
			if(!isEmpty(id,msg)){
				return false;
			}
			if(!validateEmail(id,msg)){
				return false;
			}else{
				reTrimValue(id);
				return true;
			}
		}
	
	// 非空验证 是空返回false，否则返回true;否则返回,只是判断是否为空
	function isSureEmpty(id){
		var iempty=delTrim(id);
		if(iempty.length==0){
			return false;
		}else{
			reTrimValue(id);
			return true;
		}
	}


	// 验证可为空 ,非法字符，长度。
	function any_blur(id,msg,length){
		if(!lengthCheck(id,(length/2+1),msg)){
			return false;
		}else if(!illegalCheck(id,msg)){
			return false;
		}else{
			reTrimValue(id);
			return true;
		}
	}
	
	/**
	 * 找到选中的信息涉及单位
	 */
	function messunitVal(){
		var obj= document.getElementsById("messunits");
		for(var i=0;i<obj.length;i++){
			if(obj[i].checked){
				$("#messunit").val(obj[i].value);
			}
		}
	}
	
	/**
	 * 找到选中的所需信息指定提供方式
	 */
	function messtypeVal(){
		var obj= document.getElementsById("messtypes");
		for(var i=0;i<obj.length;i++){
			if(obj[i].checked){
				$("#messtype").val(obj[i].value);
			}
		}
	}
	
	/**
	 * 找到选中的获取信息方式
	 */
	function achtypesVal(){
		var obj= document.getElementsById("achtypes");
		for(var i=0;i<obj.length;i++){
			if(obj[i].checked){
				$("#achtype").val(obj[i].value);
			}
		}
	}
	
	// 提交验证
	function checkform(){
		//messunitVal();
		//messtypeVal();
		//achtypesVal();
		
	  	var tag=true;

	  	if(!nchName_blur('appname','姓名')){
	  		tag=false;
	  	}
	  	
	  	
	  	if(!name_blur('workunit','工作单位',254)){
	  		tag=false;
	  	}
	  	
	  	if(!idcard_blur('cercode','证件号码')){
	  		tag=false;
	  	}
	  	
		if(!tels_blur('tel','联系电话')){
	  		tag=false;
	  	}
		
		if(!myfaxnull_blur('fax','传真')){
	  		tag=false;
	  	}
		
		if(!zipCode_blur('zip','邮政编码')){
	  		tag=false;
	  	}
		
		if(!email_blur('email','电子邮箱')){
	  		tag=false;
	  	}
		
		//if(!name_blur('address', '联系地址',254)){
	  		//tag=false;
	  	//}
		
		if(!name_blur('message', '内容描述',4000)){
	  		tag=false;
	  	}

		if(!name_blur('messuse', '信息用途',1000)){
	  		tag=false;
	  	}
		
	  	if(tag==true){
	  		//$("#sessionId").val($.cookie("JSESSIONID"));
		  	if(confirm("确认提交本页面数据?")){
		  		//alert(1);
		  		//$("#form1").attr("action","${pageContext.request.contextPath}/askforpublic/saveAskForPublic.action"); 
		  		//$("#form1").submit();
		  		//alert("已提交成功，请耐心等待回复...");
				//setTimeout("subtt();",500);
				//var captcha_Input = $("#captcha_Input").val();
				$.ajax( {
					type : "POST",
					url : "OpenApplication.jspx",
					data : $("#OpenApplication").serialize(),
					dataType:"json",
					success : function(msg) {
					//var data=JSON.parse(msg);
						if (msg.status == 1) {
							//alert("该验证码已作废，请刷新页面重试");
							//change_Img();
							 alert("验证码错误");
				             $("#OpenApplicationCaptcha").click();
							return false;
						//} else if (msg == "false2") {
							//alert("您输入的验证码有误");
							//change_Img();
							//return false;
						}else {
							alert("已提交成功，请耐心等待回复...");
							//setTimeout("subtt();",500);
							location.href="/qhgovement/OpenApplication.jspx";
						}
					}
				});
		  	}
	  	}
	}
	function subtt(){
		$("#form1").submit();
	}
	// 去掉空格
	function reTrimValue(id){
		var str=delTrim(id);
		document.getElementById(id).value=str;
	}
	
	// 隐藏所有错误提示框
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
