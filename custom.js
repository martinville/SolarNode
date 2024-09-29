FuncGetAdminMode();
FuncGetSystemInfo();
FuncGetFileList();
FuncGetRecipes();

//FuncHideFilemanager();

function FuncShowFilemanager(){
	FuncGetFileList();
	document.getElementById("idFileManager").style.visibility = "visible"; 
	document.getElementById("idFileManager").style.display = "block";	
}
function FuncHideFilemanager(){	
	document.getElementById("idFileManager").style.visibility = "hidden"; 
	document.getElementById("idFileManager").style.display = "none";	
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
	var fFactor = document.getElementById("fFactor").value;
	
	var BuildURL = "api/saverecipe?fAddressID=" + fAddressID + "&fAddrFriendlyName=" + fAddrFriendlyName + "&fAddrSystemName=" + fAddrSystemName + "&fUOM=" + fUOM + "&fFactor=" + fFactor;
	
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

function FuncUpdateSystemName(){
	var strFriendlyName = document.getElementById("fAddrFriendlyName").value;
	strFriendlyName  = strFriendlyName.replaceAll(" ","_").toLowerCase();
	document.getElementById("fAddrSystemName").value = "rcp_" + strFriendlyName;
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
		
		//Build Parameters
		var ParmsToSend='fHAIP=' + fHAIP + '&fHAPort=' + fHAPort + '&fHAHTTP=' + fHAHTTP + '&fToken=' + fToken;
		
		
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
			document.getElementById("idFiles").innerHTML = xhr.response;
			
		  } else {
			//console.log(`Error: ${xhr.status}`);
			
		  }
		};
		document.getElementById("fHAIP").value="";
		document.getElementById("fHAPort").value="";
		document.getElementById("fHAHTTP").value="";
		document.getElementById("fToken").value="";
	
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
			alert(xhr.response);
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
