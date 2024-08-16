FuncGetAdminMode();
FuncGetSystemInfo();

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
	//{"cputemp":40.00,"cpucount":2,"cpufreq":240,"chipcapacity":4096,"sketchcapacity":999,"sketchfreecapacity":1280,"chipmodel":"ESP32-D0WD-V3","macaddr":"C45BBE30B984","serial":"2302246241","spaceused":268,"adminmode":1,"Uptime":"1 Mins"}
	const xhr = new XMLHttpRequest();
	xhr.open("GET", "api/getsysteminfo");
	xhr.send();
	xhr.responseType = "text";
	xhr.onload = () => {
	  if (xhr.readyState == 4 && xhr.status == 200) {
		//console.log(xhr.response);
		const obj_SysInfo = JSON.parse(xhr.response);
		//alert(obj_SysInfo.chipmodel);
		document.getElementById("idDiskInfo").innerHTML = obj_SysInfo.spaceused + "kb / " + obj_SysInfo.chipcapacity + "kb";
		document.getElementById("idUpTime").innerHTML = obj_SysInfo.Uptime;
		//Modal values
		document.getElementById("idchipmodel").innerHTML = obj_SysInfo.chipmodel;
		document.getElementById("idcputemp").innerHTML = obj_SysInfo.cputemp;
		document.getElementById("idcpucount").innerHTML = obj_SysInfo.cpucount;
		document.getElementById("idcpufreq").innerHTML = obj_SysInfo.cpufreq;
		document.getElementById("idmacaddr").innerHTML = obj_SysInfo.macaddr;
		document.getElementById("Uptime").innerHTML = obj_SysInfo.Uptime;
		document.getElementById("idchipcapacity").innerHTML = obj_SysInfo.chipcapacity;
		document.getElementById("idsketchcapacity").innerHTML = obj_SysInfo.sketchcapacity;
		document.getElementById("idsketchfreecapacity").innerHTML = obj_SysInfo.sketchfreecapacity;
		document.getElementById("idspaceused").innerHTML = obj_SysInfo.spaceused;
			
		
	  } else {
		//console.log(`Error: ${xhr.status}`);
		
	  }
	};	
}