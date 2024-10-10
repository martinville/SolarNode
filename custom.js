FuncGetAdminMode();
FuncGetSystemInfo();
//FuncGetFileList();
//FuncGetRecipes();
FuncGetLastConStatus();
GetLoggingstatus();
//GetSystemSettings();

function FuncTabCtrl(SelectedTab)
{		
	document.getElementById("iddeviceinfo").classList.remove('active');
	document.getElementById("idinverterinfo").classList.remove('active');
	document.getElementById("idrecipes").classList.remove('active');
	document.getElementById("idfilesysteminfo").classList.remove('active');
	document.getElementById("idsystemsettings").classList.remove('active');
	
	//Hide Sections
	
	document.getElementById("idDeviceInfoSection").style.visibility = "hidden";document.getElementById("idDeviceInfoSection").style.display = "none";
	document.getElementById("idInverterInfoSection").style.visibility = "hidden";document.getElementById("idInverterInfoSection").style.display = "none";
	document.getElementById("idRecipeInfoSection").style.visibility = "hidden";document.getElementById("idRecipeInfoSection").style.display = "none";
	document.getElementById("idFileListInfoSection").style.visibility = "hidden";document.getElementById("idFileListInfoSection").style.display = "none";
	document.getElementById("idSettingsSection").style.visibility = "hidden";document.getElementById("idSettingsSection").style.display = "none";	
	
	if(SelectedTab=="iddeviceinfo"){document.getElementById("iddeviceinfo").classList.add('active');document.getElementById("idDeviceInfoSection").style.visibility = "visible";document.getElementById("idDeviceInfoSection").style.display = "block";}
	if(SelectedTab=="idinverterinfo"){document.getElementById("idinverterinfo").classList.add('active');document.getElementById("idInverterInfoSection").style.visibility = "visible";document.getElementById("idInverterInfoSection").style.display = "block";}
	if(SelectedTab=="idrecipes"){document.getElementById("idrecipes").classList.add('active');document.getElementById("idRecipeInfoSection").style.visibility = "visible";document.getElementById("idRecipeInfoSection").style.display = "block"; FuncGetRecipes();}
	if(SelectedTab=="idfilesysteminfo"){document.getElementById("idfilesysteminfo").classList.add('active');document.getElementById("idFileListInfoSection").style.visibility = "visible";document.getElementById("idFileListInfoSection").style.display = "block";FuncGetFileList();}
	if(SelectedTab=="idsystemsettings"){document.getElementById("idsystemsettings").classList.add('active');document.getElementById("idSettingsSection").style.visibility = "visible";document.getElementById("idSettingsSection").style.display = "block";}
	
	

	

	
}

function FuncGetAdminMode(){
	const xhr = new XMLHttpRequest();
	xhr.open("GET", "api/getadminmode");
	xhr.send();
	xhr.responseType = "text";
	xhr.onload = () => {
	  if (xhr.readyState == 4 && xhr.status == 200) {
		//console.log(xhr.response);
		//alert(xhr.response);
		if(xhr.response=="Admin mode enabled (Note: system is now vulnrable until you exit admin mode."){			
				document.getElementById("idAdminModestatus").style.visibility = "visible"; 
				document.getElementById("idAdminModestatus").style.display = "block";
		}else{			
				document.getElementById("idAdminModestatus").style.visibility = "hidden"; 
				document.getElementById("idAdminModestatus").style.display = "none";
		}
		
	  } else {
		//console.log(`Error: ${xhr.status}`);
		
	  }
	};	
}

function FuncDisableAdminMode(){
	const xhr = new XMLHttpRequest();
	xhr.open("GET", "api/enableadmin");
	xhr.send();
	xhr.responseType = "text";
	xhr.onload = () => {
	  if (xhr.readyState == 4 && xhr.status == 200) {
		//console.log(xhr.response);
		//alert(xhr.response);
		if(xhr.response=="Admin mode disabled (Note: system is now secure until you enable admin mode."){			
				document.getElementById("idAdminModestatus").style.visibility = "hidden"; 
				document.getElementById("idAdminModestatus").style.display = "none";
				alert("Admin mode disabled.");
		}
		
	  } else {
		//console.log(`Error: ${xhr.status}`);
		
	  }
	};
}
function FuncEnableAdminMode(){	
	var parmPassword=document.getElementById("idAdminPassword").value;
	const xhr = new XMLHttpRequest();
	xhr.open("GET", "api/enableadmin?adminpass=" + parmPassword);
	xhr.send();
	xhr.responseType = "text";
	xhr.onload = () => {
	  if (xhr.readyState == 4 && xhr.status == 200) {
		//console.log(xhr.response);		
		alert(xhr.response);
	  } else {
		//console.log(`Error: ${xhr.status}`);		
	  }
	};
	document.getElementById("idAdminPassword").value="";
	FuncGetAdminMode();
}

function FuncUpdateSystem(){	
	alert("System will now update in the background. You will receive a notification once the update is complete.");	
	document.getElementById("idSystemUpdating").style.visibility = "visible";
	document.getElementById("idSystemUpdating").style.display = "block";
	const xhr = new XMLHttpRequest();
	xhr.open("GET", "api/updatesystem");
	xhr.send();
	xhr.responseType = "text";
	xhr.onload = () => {
	  if (xhr.readyState == 4 && xhr.status == 200) {
		//console.log(xhr.response);		
		alert(xhr.response);
		document.getElementById("idSystemUpdating").style.visibility = "hidden";
		document.getElementById("idSystemUpdating").style.display = "none";
	  } else {
		//console.log(`Error: ${xhr.status}`);
		
	  }
	};
	document.getElementById("idAdminPassword").value="";
}

function FuncGetSystemInfo(){
	//{"cputemp":50.00,"cpucount":2,"cpufreq":240,"chipcapacity":4096,"sketchcapacity":1005,"sketchfreecapacity":1280,"chipmodel":"ESP32-D0WD","macaddr":"4C11AE659D2C","serial":"4C11AE659D2C","spaceused":192,"adminmode":0,"Uptime":"1 Mins","MDNS":"SOL1","SSID":"BOB","WIFIIP":"192.168.1.147"}
	const xhr = new XMLHttpRequest();
	xhr.open("GET", "api/getsysteminfo");
	xhr.send();
	xhr.responseType = "text";
	xhr.onload = () => {
	  if (xhr.readyState == 4 && xhr.status == 200) {
		//console.log(xhr.response);
		const obj_SysInfo = JSON.parse(xhr.response);
		//alert(obj_SysInfo.chipcapacity);
		
		document.getElementById("idDiskInfo").innerHTML = obj_SysInfo.spaceused + " kb / " + obj_SysInfo.chipcapacity + " kb";				
		//Modal values
		document.getElementById("idchipmodel").innerHTML = obj_SysInfo.chipmodel;
		document.getElementById("idcputemp").innerHTML = obj_SysInfo.cputemp + " &deg;C";
		document.getElementById("idcpucount").innerHTML = obj_SysInfo.cpucount;
		document.getElementById("idcpufreq").innerHTML = obj_SysInfo.cpufreq + " Mhz";
		document.getElementById("idmacaddr").innerHTML = obj_SysInfo.macaddr;		
		document.getElementById("idchipcapacity").innerHTML = obj_SysInfo.chipcapacity + " kb";;
		document.getElementById("idsketchcapacity").innerHTML = obj_SysInfo.sketchcapacity + " kb";;
		document.getElementById("idsketchfreecapacity").innerHTML = obj_SysInfo.sketchfreecapacity + " kb";;
		document.getElementById("idspaceused").innerHTML = obj_SysInfo.spaceused + " kb";
		document.getElementById("idUptime").innerHTML = obj_SysInfo.Uptime;
		//Network
		document.getElementById("idMDNSName").innerHTML = obj_SysInfo.MDNS;
		document.getElementById("idAPName").innerHTML = obj_SysInfo.SSID;
		document.getElementById("idIPAddr").innerHTML = obj_SysInfo.WIFIIP;
	
		
		
	  } else {
		//console.log(`Error: ${xhr.status}`);
		
	  }
	};	
}

function FuncSaveRecipe(){
	
	var fAddressID = document.getElementById("fAddressID").value;
	var fAddrFriendlyName = document.getElementById("fAddrFriendlyName").value;
	var fAddrSystemName = document.getElementById("fAddrSystemName").value;
	var fUOM = document.getElementById("fUOM").value;
	var fFactor1 = document.getElementById("fFactor1").value;
	var fFactor2 = document.getElementById("fFactor2").value;
	var fFactor3 = document.getElementById("fFactor3").value;
	var fFactor4 = document.getElementById("fFactor4").value;	
	var fFactor1Val = document.getElementById("fFactor1Val").value;
	var fFactor2Val = document.getElementById("fFactor2Val").value;
	var fFactor3Val = document.getElementById("fFactor3Val").value;
	var fFactor4Val = document.getElementById("fFactor4Val").value;
	
	
	
	
	var BuildURL = "api/saverecipe?fAddressID=" + fAddressID + "&fAddrFriendlyName=" + fAddrFriendlyName + "&fAddrSystemName=" + fAddrSystemName + "&fUOM=" + fUOM + "&fFactor1=" + fFactor1 + "&fFactor2=" + fFactor2 + "&fFactor3=" + fFactor3 + "&fFactor4=" + fFactor4  + "&fFactor1Val=" + fFactor1Val  + "&fFactor2Val=" + fFactor2Val  + "&fFactor3Val=" + fFactor3Val  + "&fFactor4Val=" + fFactor4Val;
	
	//alert(BuildURL);
	const xhr = new XMLHttpRequest();
	xhr.open("GET", BuildURL);
	xhr.send();
	xhr.responseType = "text";
	xhr.onload = () => {
	  if (xhr.readyState == 4 && xhr.status == 200) {
		//console.log(xhr.response);		
		alert(xhr.response);
	  } else {
		//console.log(`Error: ${xhr.status}`);		
	  }
	};
	FuncGetRecipes();
}
function FuncGetRecipes(){
	const xhr = new XMLHttpRequest();
	xhr.open("GET", "api/listrecipes");
	xhr.send();
	xhr.responseType = "text";
	xhr.onload = () => {
	  if (xhr.readyState == 4 && xhr.status == 200) {
		//console.log(xhr.response);
		//alert(xhr.response);
		var tblHeader = "<tr><td><b>ID</td><td><b>Friendly Name</td><td><b>System Name</td><td><b>UOM</td><td><b>Factor</td><td><b></td></tr>";
		document.getElementById("idRecipeFiles").innerHTML = tblHeader +  xhr.response;
		
	  } else {
		//console.log(`Error: ${xhr.status}`);
		
	  }
	};	
}

function FuncLockDevice(){
	const xhr = new XMLHttpRequest();
	xhr.open("GET", "api/unlockdevice");
	xhr.send();
	xhr.responseType = "text";
	xhr.onload = () => {
	  if (xhr.readyState == 4 && xhr.status == 200) {
		//console.log(xhr.response);
		alert(xhr.response);
		
	  } else {
		//console.log(`Error: ${xhr.status}`);
		
	  }
	};	
}

function FuncUpdateSystemName(){
	var strFriendlyName = document.getElementById("fAddrFriendlyName").value;
	var strAddrID = document.getElementById("fAddressID").value;
	strFriendlyName  = strFriendlyName.replaceAll(" ","_").toLowerCase();
	
	document.getElementById("fAddrSystemName").value = "rcp_" + strFriendlyName + "_" +  strAddrID;
}

function FuncGetFileList(){
	const xhr = new XMLHttpRequest();
	xhr.open("GET", "api/listfiles");
	xhr.send();
	xhr.responseType = "text";
	xhr.onload = () => {
	  if (xhr.readyState == 4 && xhr.status == 200) {
		//console.log(xhr.response);
		//alert(xhr.response);
		document.getElementById("idFiles").innerHTML = xhr.response;
		
	  } else {
		//console.log(`Error: ${xhr.status}`);
		
	  }
	};	
	

	/*
	const xhr2 = new XMLHttpRequest(); //already declared	
	xhr2.open("GET", "api/listgithubfiles");
	xhr2.send();
	xhr2.responseType = "text";
	xhr2.onload = () => {
	  if (xhr2.readyState == 4 && xhr2.status == 200) {
		
			var FileList=xhr2.response;
			var File = FileList.split(";");
			var BuildGitHubTable="";
				for (let i = 0; i < File.length -1 ; i++) {
					//alert(File[i]);
					BuildGitHubTable = BuildGitHubTable  + "<tr><td>" + "<img src=\"micro-sd-card.png\" alt=\"\" class=\"img-fluid\" width=\"30px;\">" + File[i] + "</td><td> <a target=\"_blank\" class=\"btn btn-sm btn-success\" href=\"api/downloadfile?filename=" + File[i] + "\" role=\"button\">Download</a></td></tr>";
				} 		
			document.getElementById("idGitHubFiles").innerHTML = BuildGitHubTable;		
		
	  } else {
		console.log(`Error: ${xhr2.status}`);
		
	  }
	};	
	*/
	
}

function FuncSaveHASettings(){
		var fHAIP=document.getElementById("fHAIP").value;
		var fHAPort=document.getElementById("fHAPort").value;
		var fHAHTTP=document.getElementById("fHAHTTP").value;
		var fToken=document.getElementById("fToken").value;
		var fEnableHA=document.getElementById("fEnableHA").value;
		var fHAPreFix=document.getElementById("fHAPreFix").value;
		
		//Build Parameters
		var ParmsToSend='fHAIP=' + fHAIP + '&fHAPort=' + fHAPort + '&fHAHTTP=' + fHAHTTP + '&fToken=' + fToken + "&fEnableHA=" + fEnableHA + "&fHAPreFix=" + fHAPreFix;
		
		
		const xhr = new XMLHttpRequest();
		var url = "api/savehssettings?" + ParmsToSend ;
		//alert(url);
		xhr.open("GET", url );	
				
		xhr.send();
		xhr.responseType = "text";
		xhr.onload = () => {
		  if (xhr.readyState == 4 && xhr.status == 200) {
			//console.log(xhr.response);
			alert(xhr.response);						
		  } else {
			//console.log(`Error: ${xhr.status}`);
			
		  }
		};
	
}

function GetHASettings(){
	//Example {"HAIP":"192.168.1.8","HAPort":"8123","HAHTTP":"http","HALongToken":"fddhdfhjf"}	
	const xhr = new XMLHttpRequest();
	xhr.open("GET", "haconfig.json");
	xhr.send();
	xhr.responseType = "text";
	xhr.onload = () => {
	  if (xhr.readyState == 4 && xhr.status == 200) {
		//console.log(xhr.response);
		const obj_SysInfo = JSON.parse(xhr.response);
		//alert(xhr.response);
	  	
		if(xhr.response=="Home Assistant settings cannot be retrieved. System is not in admin mode."){
			alert(xhr.response);
		}else{

		document.getElementById("fHAIP").value = obj_SysInfo.HAIP;
		document.getElementById("fHAPort").value = obj_SysInfo.HAPort;
		document.getElementById("fHAHTTP").value = obj_SysInfo.HAHTTP;
		document.getElementById("fToken").value = obj_SysInfo.HALongToken;
		document.getElementById("fHAPreFix").value = obj_SysInfo.HAPrefix;
		document.getElementById("fEnableHA").value = obj_SysInfo.HAEnabled;		
		//alert("HA Settings Fetched");
		}
				
	  } else {
		//console.log(`Error: ${xhr.status}`);
		
	  }
	};
}

function FuncaskDeleteFile(FileToDelete){
	if (confirm("Are you sure you want to delete file: /" + FileToDelete)) {
		const xhr = new XMLHttpRequest();
		xhr.open("GET", "api/deletefile?filename=" + FileToDelete );
		xhr.send();
		xhr.responseType = "text";
		xhr.onload = () => {
		  if (xhr.readyState == 4 && xhr.status == 200) {
			//console.log(xhr.response);
			//alert(xhr.response);
		  }
		};		  
	} else {

	}
	
	

}

function RebootDevice(){

	const xhr = new XMLHttpRequest();
	xhr.open("GET", "api/reboot");
	xhr.send();
	xhr.responseType = "text";
	xhr.onload = () => {
	  if (xhr.readyState == 4 && xhr.status == 200) {
		//console.log(xhr.response);
		alert(xhr.response);

	  } else {
		//console.log(`Error: ${xhr.status}`);
		
	  }
	};	
	
}

function FuncExecRecipes(){
	const xhr = new XMLHttpRequest();
	xhr.open("GET", "api/exec_recipes");
	xhr.send();
	xhr.responseType = "text";
	xhr.onload = () => {
	  if (xhr.readyState == 4 && xhr.status == 200) {
		//console.log(xhr.response);
		alert(xhr.response);

	  } else {
		//console.log(`Error: ${xhr.status}`);
		
	  }
	};	
}

function FuncToggleLog(){
	
	var CheckBoxVal = document.getElementById("idToggleLog").checked
	
	if(CheckBoxVal==true){
		const xhr = new XMLHttpRequest();
		xhr.open("GET", "api/enablelog");
		xhr.send();
		xhr.responseType = "text";
		xhr.onload = () => {
		  if (xhr.readyState == 4 && xhr.status == 200) {
			//console.log(xhr.response);
			if(xhr.response=="Logging enabled"){
				//alert(xhr.response);
				document.getElementById("idToggleLog").checked=true;
			}else{document.getElementById("idToggleLog").checked=false;}			
		  }
		};	
	}else{
		const xhr = new XMLHttpRequest();
		xhr.open("GET", "api/disablelog");
		xhr.send();
		xhr.responseType = "text";
		xhr.onload = () => {
		  if (xhr.readyState == 4 && xhr.status == 200) {
			//alert(xhr.response);
			if(xhr.response=="Logging disabled"){
				
				document.getElementById("idToggleLog").checked=false;
			}
		  }
		};			
		
	}

	
	
}

function GetLoggingstatus(){
	const xhr = new XMLHttpRequest();
	xhr.open("GET", "api/getloggingstatus");
	xhr.send();
	xhr.responseType = "text";
	xhr.onload = () => {
	  if (xhr.readyState == 4 && xhr.status == 200) {
		//console.log(xhr.response);
		//alert(xhr.response);
		if(xhr.response=="Logging enabled"){
			document.getElementById("idToggleLog").checked=true;
		}else{
			document.getElementById("idToggleLog").checked=false;
		}

	  } else {
		//console.log(`Error: ${xhr.status}`);
		
	  }
	};	
}

function FuncEnableLog(){
	const xhr = new XMLHttpRequest();
	xhr.open("GET", "api/enablelog");
	xhr.send();
	xhr.responseType = "text";
	xhr.onload = () => {
	  if (xhr.readyState == 4 && xhr.status == 200) {
		//console.log(xhr.response);
		alert(xhr.response);

	  } else {
		//console.log(`Error: ${xhr.status}`);
		
	  }
	};	
}

function FuncDisableLog(){
	const xhr = new XMLHttpRequest();
	xhr.open("GET", "api/disablelog");
	xhr.send();
	xhr.responseType = "text";
	xhr.onload = () => {
	  if (xhr.readyState == 4 && xhr.status == 200) {
		//console.log(xhr.response);
		alert(xhr.response);

	  } else {
		//console.log(`Error: ${xhr.status}`);
		
	  }
	};	
}

function FuncLoadLog(){	
	const xhr = new XMLHttpRequest();
	xhr.open("GET", "log.txt");
	xhr.send();
	xhr.responseType = "text";
	xhr.onload = () => {
	  if (xhr.readyState == 4 && xhr.status == 200) {
		//console.log(xhr.response);		
		document.getElementById("idLogViewer").value = xhr.response;
	  } else {
		//console.log(`Error: ${xhr.status}`);
		
	  }
	};	
}

function FuncGetLastConStatus(){	
	const xhr = new XMLHttpRequest();
	xhr.open("GET", "api/getlastconstatus");
	xhr.send();
	xhr.responseType = "text";
	xhr.onload = () => {
	  if (xhr.readyState == 4 && xhr.status == 200) {
		//console.log(xhr.response);		
		
		if(xhr.response=="Connected & Data OK"){document.getElementById("idserialcom").innerHTML = "<span class=\"badge bg-success\">" + xhr.response + "</span>";}
		if(xhr.response=="Unknown"){document.getElementById("idserialcom").innerHTML = "<span class=\"badge bg-warning\">" + xhr.response + "</span>";}
		if(xhr.response=="Serial Connection Timeout"){document.getElementById("idserialcom").innerHTML = "<span class=\"badge bg-danger\">" + xhr.response + "</span>";}
	  } else {
		//console.log(`Error: ${xhr.status}`);
		
	  }
	};	
}

function FuncEditRecipeFile(FileToEdit){
//{"addrsystemname":"rcp_battery_temp","addressid":"182","addrfriendlyname":"Battery Temp","uom":"temperature","Factor1":"Subtract","Factor2":"Divide By","Factor3":"Multiply By","Factor4":"Multiply By","Factor1Val":"1000","Factor2Val":"10","Factor3Val":"1","Factor4Val":"1"}
	document.getElementById("idEditRCP").innerHTML  = "Edit Recipe <small>" + FileToEdit + "</small>"
	//alert(FileToEdit);
	const xhr = new XMLHttpRequest();
	xhr.open("GET", FileToEdit);
	xhr.send();
	xhr.responseType = "text";
	xhr.onload = () => {
	  if (xhr.readyState == 4 && xhr.status == 200) {
		//console.log(xhr.response);
		const obj_SysInfo = JSON.parse(xhr.response);		
		//alert(xhr.response);
		document.getElementById("fAddressID").value = obj_SysInfo.addressid;
		document.getElementById("fAddrFriendlyName").value = obj_SysInfo.addrfriendlyname;
		document.getElementById("fAddrSystemName").value = obj_SysInfo.addrsystemname;
		document.getElementById("fUOM").value = obj_SysInfo.uom;
		document.getElementById("fFactor1").value = obj_SysInfo.Factor1;
		document.getElementById("fFactor2").value = obj_SysInfo.Factor2;
		document.getElementById("fFactor3").value = obj_SysInfo.Factor3;
		document.getElementById("fFactor4").value = obj_SysInfo.Factor4;
		document.getElementById("fFactor1Val").value = obj_SysInfo.Factor1Val;
		document.getElementById("fFactor2Val").value = obj_SysInfo.Factor2Val;
		document.getElementById("fFactor3Val").value = obj_SysInfo.Factor3Val;
		document.getElementById("fFactor4Val").value = obj_SysInfo.Factor4Val;			
	  } else {
		//console.log(`Error: ${xhr.status}`);
		
	  }
	};



}

function FuncSaveDeviceSettings(){
	var fDeviceMode = document.getElementById("idDeviceMode").value;
	var fDevicePollRate = document.getElementById("idDevicePollRate").value;
	
	var BuildURL = "api/savesettings?fDeviceMode=" + fDeviceMode + "&fDevicePollRate=" + fDevicePollRate;
	
	//alert(BuildURL);
	const xhr = new XMLHttpRequest();
	xhr.open("GET", BuildURL);
	xhr.send();
	xhr.responseType = "text";
	xhr.onload = () => {
	  if (xhr.readyState == 4 && xhr.status == 200) {
		//console.log(xhr.response);		
		alert(xhr.response);
	  } else {
		//console.log(`Error: ${xhr.status}`);		
	  }
	};
}

function GetSystemSettings(){
	//Example {"HAIP":"192.168.1.8","HAPort":"8123","HAHTTP":"http","HALongToken":"fddhdfhjf"}	
	const xhr = new XMLHttpRequest();
	xhr.open("GET", "systemsettings.json");
	xhr.send();
	xhr.responseType = "text";
	xhr.onload = () => {
	  if (xhr.readyState == 4 && xhr.status == 200) {
		//console.log(xhr.response);
		const obj_SysInfo = JSON.parse(xhr.response);
		//alert(xhr.response);
	  	
		if(xhr.response=="System settings cannot be retrieved. System is not in admin mode."){			
			document.getElementById("idDeviceMode").value = "";
			document.getElementById("idDevicePollRate").value = "";		
			alert(xhr.response);			
		}else{
		document.getElementById("idDeviceMode").value = obj_SysInfo.DeviceMode;
		document.getElementById("idDevicePollRate").value = obj_SysInfo.DevicePollRate;
		//alert(obj_SysInfo.DeviceMode);
		//alert(obj_SysInfo.DevicePollRate);
	
		//alert("HA Settings Fetched");
		}
				
	  } else {
		//console.log(`Error: ${xhr.status}`);
		
	  }
	};
}

