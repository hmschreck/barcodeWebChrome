var defaultIP = "10.0.2.252/printer/";

function loadOptions() {

    var ip = defaultIP;
    if (localStorage.address != undefined) {
        ip = localStorage.address;
    }

    var field = document.getElementById("ip");
    field.value = ip;
}

function saveOptions() {
    var field = document.getElementById("ip");
    var ip = field.value;


    localStorage.address = ip;

}

document.addEventListener('DOMContentLoaded', loadOptions);
document.getElementById('save').addEventListener('click',
    saveOptions);