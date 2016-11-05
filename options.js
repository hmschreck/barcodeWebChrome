var defaultIP = "10.0.2.252/printer/";

function loadOptions() {

        
    if (typeof localStorage.address == "string") {
       document.getElementById("hostname").value = defaultIP;
    } else {
       document.getElementById("hostname").value = localStorage.address;
    }
}

function saveOptions() {
    var field = document.getElementById("hostname");
    var ip = field.value;

    localStorage.address = ip;

}

loadOptions()
// document.addEventListener('load', loadOptions);
document.getElementById('save').addEventListener('click',
    saveOptions);
