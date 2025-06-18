var AuthInterFace = (function() {
	var ePortalUrl = "";
	function post(url, data,callback) {
		var thePost = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
		thePost.open("POST", url, true);
		thePost.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
		thePost.onreadystatechange=function() {
			if (thePost.readyState == 4 && thePost.status == 200) {
				if(thePost.responseText&&thePost.responseText!=""){
					if(callback){
						callback(eval("("+thePost.responseText+")"));
					}
				}
			}
		}
		thePost.send(data);
	}
	return {
		init:function(url){
			ePortalUrl=url + "InterFace.do?method=";
		},
		login : function(userId, password, service, queryString,operatorPwd,operatorUserId,validcode,passwordEncrypt,callback) {
			/* 1.��¼ */
		/*//�����Ƿ����
			 var passwordEncrypt = encodeURIComponent(encodeURIComponent(document.getElementById("passwordEncrypt").value));
			 if(passwordEncrypt&&passwordEncrypt=="true"){
					 setMaxDigits(130);
					 var key = new RSAKeyPair("10001","","9c2899b8ceddf9beafad2db8e431884a79fd9b9c881e459c0e1963984779d6612222cee814593cc458845bbba42b2d3474c10b9d31ed84f256c6e3a1c795e68e18585b84650076f122e763289a4bcb0de08762c3ceb591ec44d764a69817318fbce09d6ecb0364111f6f38e90dc44ca89745395a17483a778f1cc8dc990d87c3");
					 password = encryptedString(key, password);
				 //�ϵļ����㷨�����⣬ʹ���µ�ʵ�ַ���
				 var publicKeyExponent=document.getElementById("publicKeyExponent").value;
				 var publicKeyModulus=document.getElementById("publicKeyModulus").value;
				 RSAUtils.setMaxDigits(200);
				 var key = new RSAUtils.getKeyPair(publicKeyExponent, "", publicKeyModulus); 
				 password = RSAUtils.encryptedString(key,password.split("").reverse().join(""));//����Ҫ���ַ������з�ת��������ܵ������Ƿ���
					 if(undefined!=operatorPwd &&null!=operatorPwd && ''!=operatorPwd){
						 operatorPwd =RSAUtils.encryptedString(key,operatorPwd.split("").reverse().join(""));
					 }
			 }*/
			var content = "userId=" + userId + "&password=" + password + "&service=" + service + "&queryString=" + queryString+"&operatorPwd="+operatorPwd+"&operatorUserId="+operatorUserId+"&validcode="+validcode+"&passwordEncrypt="+passwordEncrypt;
			//var content = "userId=" + userId + "&password=" + password + "&service=" + service + "&queryString=" + queryString+"&operatorPwd="+operatorPwd+"&operatorUserId="+operatorUserId+"&validcode="+validcode;
			post(ePortalUrl + "login", content, callback);
		},
		keepalive : function(userIndex,callback) {
			/* 2.���� */
			var content = "userIndex=" + userIndex;
			post(ePortalUrl + "keepalive", content,callback);
		},
		getOnlineUserInfo : function(userIndex,callback) {
			/* 3.��ȡ�����û���Ϣ */
			var content = "userIndex=" + userIndex;
			post(ePortalUrl + "getOnlineUserInfo", content,callback);
		},
		freshOnlineUserInfo : function(userIndex,callback) {
			var content = "userIndex=" + userIndex;
			post(ePortalUrl + "freshOnlineUserInfo", content,callback); 
		},
		logout : function(userIndex,callback) {
			/* 4.���� */
			var content = "userIndex=" + userIndex;
			post(ePortalUrl + "logout", content,callback);
		},
		loginWithQrCode : function(qrCode, queryString,callback) {
			/* 5.��ά����֤ */
			var content = "qrCode=" + qrCode + "&queryString=" + queryString;
			post(ePortalUrl + "loginWithQrCode", content,callback);
		},
		visitorReg : function(phoneNum, authCode,validcode,callback) {
			/* 6.�ÿ�ע�� */
			var content = "phoneNum=" + phoneNum + "&authCode=" + authCode+"&validcode="+validcode;
			post(ePortalUrl + "visitorReg", content,callback);
		},
		pageInfo : function(queryString,callback) {
			/* 7.��ȡҳ����ʾ��Ϣ */
			var content = "queryString=" + queryString;
			post(ePortalUrl + "pageInfo", content,callback);
		},
		registerMac : function(mac, userIndex,callback) {
			/* 8.ע��MAC������֤ */
			var content = "mac=" + mac + "&userIndex=" + userIndex;
			post(ePortalUrl + "registerMac", content,callback);
		},
		cancelMac : function(mac, userIndex,callback) {
			/* 9.ȡ��MAC������֤ */
			var content = "mac=" + mac + "&userIndex=" + userIndex;
			post(ePortalUrl + "cancelMac", content,callback);
		},
		cancelMacWithUserNameAndMac : function(userId, mac,callback) {
			/* 9.ȡ��MAC������֤ */
			var content = "userId=" + userId + "&usermac=" + mac;
			post(ePortalUrl + "cancelMacWithUserNameAndMac", content,callback);
		},
			/*10.ʹ���û����������������û�*/
		logoutByUserIdAndPass:function (userId,pass,callback){
			var content = "userId=" + userId + "&pass=" + pass;
			post(ePortalUrl + "logoutByUserIdAndPass", content,callback);
		},
		/*11.�л�����*/
		switchService:function (userIndex,serviceName,callback){
			var content = "userIndex=" + userIndex + "&serviceName=" + serviceName;
			post(ePortalUrl + "switchService", content,callback);
		},
		//��ȡ����
		getServices:function(queryString,callback){
			post(ePortalUrl+"getServices" + "&queryString=" + queryString,'',callback);
		},
		registerNetWorkProtocol:function(userId,callback){
			var content = "userId=" + userId;
			post(ePortalUrl+"registerNetWorkProtocol",content,callback);
		},
		validateUserName:function(userId,userName,callback){
			var content = "userId=" + userId+"&userName="+userName;
			post(ePortalUrl+"validateUserName",content,callback);
		},
		modifyPass:function(userId,pass,callback){
			var content = "userId=" + userId+"&pass="+pass;
			post(ePortalUrl+"modifyPass",content,callback);
		},
		loginWithSmsVerifyCode : function(mobile,verifyCode, queryString,callback) {
			//������֤����֤
			var content = "mobile=" + mobile +"&verifyCode=" + verifyCode + "&queryString=" + queryString;
			post(ePortalUrl + "loginWithSmsVerifyCode", content,callback);
		},
		visitorSmsAuth : function(phoneNum, authCode,callback) {
			/* �ÿͶ�����֤ */
			var content = "phoneNum=" + phoneNum + "&authCode=" + authCode;
			post(ePortalUrl + "visitorSmsAuth", content,callback);
		}
	};
})();


function getPasswordEntry(password , b){
	//1��cookie������Ϊ��˵���״ο����������룬��������������������ĵģ���Ҫ����
	if(b==null||b==""){
		   return encryptedPassword(password);
		}
	//2��cookie�е����벻Ϊ�գ�����cookie�е����������������벻һ����˵�����������������ģ���������м���
	if (b != null && b != "" && b!=password) {
		return encryptedPassword(password);
	}
	//3��cookie�б���������������е�����һ����˵���Ǽ��ܹ��ģ������ټ���
	if (b != null && b != "" && b==password) {
		  return password;
	}
}

function encryptedPassword(password){

	//var passwordEncode = encodeURIComponent(encodeURIComponent(password)).split("").reverse().join("");
	var passwordEncode = password.split("").reverse().join("");
	//�ϵļ����㷨�����⣬ʹ���µ�ʵ�ַ���
	 var publicKeyExponent=document.getElementById("publicKeyExponent").value;
	 var publicKeyModulus=document.getElementById("publicKeyModulus").value;
	 RSAUtils.setMaxDigits(400);
	 var key = new RSAUtils.getKeyPair(publicKeyExponent, "", publicKeyModulus); 
	 var passwordEncry = RSAUtils.encryptedString(key,passwordEncode);//����Ҫ���ַ������з�ת��������ܵ������Ƿ���
	 
	 return passwordEncry;
}

function isNull(obj){
	if(undefined==obj || null==obj ||  ''==obj){
		return true;
	}
	return false;
}