var defaultIP = "10.0.2.252/printer/";
var defaultAutocomplete = "yes";
function loadOptions() {

    var ip = defaultIP;
    var autocomplete = defaultAutocomplete;
    
    if (localStorage.address != undefined) {
        ip = localStorage.address;
    }
     if (localStorage.autoComplete != undefined) {
        autocomplete = localStorage.autoComplete;
    }
    
    
    
	var check = document.getElementById("autocomplete");
	if (autocomplete == "no"){
		check.checked = false;
	}else{
		check.checked = true;
	}
	
    var field = document.getElementById("ip");
    field.value = ip;
}

function saveOptions() {
    var field = document.getElementById("ip");
    var ip = field.value;

	var check = document.getElementById("autocomplete");
	
	if (check.checked){
		localStorage.autoComplete = "yes";
	}else{
		localStorage.autoComplete = "no";
	}
	


    localStorage.address = ip;

}

document.addEventListener('DOMContentLoaded', loadOptions);
document.getElementById('save').addEventListener('click',
    saveOptions);