var defaultIP = "10.0.2.252/printer/";

function loadOptions() {

    var ip = defaultIP;
    var autocomplete = defaultAutocomplete;
    
    if (localStorage.address != undefined) {
        ip = localStorage.address;
    }
    var field = document.getElementById("ip");
    field.value = ip;
}

function saveOptions() {
    var field = document.getElementById("ip");
    var ip = field.value;

	var check = document.getElementById("autocomplete");
	


    localStorage.address = ip;

}

document.addEventListener('load', loadOptions);
document.getElementById('save').addEventListener('click',
    saveOptions);