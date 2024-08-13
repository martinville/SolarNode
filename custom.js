FuncGetAdminMode();

function FuncGetAdminMode(){
const xhr = new XMLHttpRequest();
xhr.open("GET", "api/getadminmode");
xhr.send();
xhr.responseType = "text";
xhr.onload = () => {
  if (xhr.readyState == 4 && xhr.status == 200) {
    console.log(xhr.response);
	//alert(xhr.response);
	if(xhr.response=="Admin mode enabled (Note: system is now vulnrable until you exit admin mode."){			
			document.getElementById("idAdminModestatus").style.visibility = "visible"; 
	}else{			
			document.getElementById("idAdminModestatus").style.visibility = "hidden"; 
	}
	
  } else {
    console.log(`Error: ${xhr.status}`);
	
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
		console.log(xhr.response);
		//alert(xhr.response);
		if(xhr.response=="Admin mode disabled (Note: system is now secure until you enable admin mode."){			
				document.getElementById("idAdminModestatus").style.visibility = "hidden"; 
		}
		
	  } else {
		console.log(`Error: ${xhr.status}`);
		
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
		console.log(xhr.response);		
		alert(xhr.response);
	  } else {
		console.log(`Error: ${xhr.status}`);		
	  }
	};
	document.getElementById("idAdminPassword").value="";
}

function FuncUpdateSystem(){	
	alert("System will now update in the background. You will receive a notification once the update is complete.");
	document.getElementById("idSystemUpdating").style.visibility = "visible";
	const xhr = new XMLHttpRequest();
	xhr.open("GET", "api/updatesystem");
	xhr.send();
	xhr.responseType = "text";
	xhr.onload = () => {
	  if (xhr.readyState == 4 && xhr.status == 200) {
		console.log(xhr.response);		
		alert(xhr.response);
		document.getElementById("idSystemUpdating").style.visibility = "hidden";
	  } else {
		console.log(`Error: ${xhr.status}`);
		
	  }
	};
	document.getElementById("idAdminPassword").value="";
}