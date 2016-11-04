statusDisplay = null;

var defaultIP = "10.0.2.252/beta-printer/";

var hash = false;

var ip = defaultIP;
var ip = defaultIP;
if (localStorage.address != undefined) {
    ip = localStorage.address;
}


mainUrl = "http://" + ip;


console.log(mainUrl);


// POST the data to the server using XMLHttpRequest
function sendToPrinter() {
    // Cancel the form submit
    event.preventDefault();

    // The URL to POST our data to
    var postUrl = mainUrl + 'printr.php';

    // Set up an asynchronous AJAX POST request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', postUrl, true);

    // Prepare the data to be POSTed by URLEncoding each field's contents
    var sku = encodeURIComponent(document.getElementById('sku').value);
    var quantity = encodeURIComponent(document.getElementById('quantity').value);
    var printer = encodeURIComponent(document.getElementById('printer').value);
    document.cookie = "printer=" + printer;


    var params = 'sku=' + sku +
        '&quantity=' + quantity +
        '&printer=' + printer;

    // Replace any instances of the URLEncoded space char with +
    params = params.replace(/%20/g, '');

    // Set correct header for form data 
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    // Handle request state change events
    xhr.onreadystatechange = function() {
        // If the request completed
        if (xhr.readyState == 4) {
            statusDisplay.innerHTML = '';

            // If it was a success, close the popup after a short delay
            if (xhr.responseText.includes("error")) {
                statusDisplay.innerHTML = 'Error!';
            } else {
                statusDisplay.innerHTML = 'Printed!';
            }
            console.log(xhr.responseText);
            window.setTimeout(window.close, 1000);

        }
    };

    // Send the request and set status
    xhr.send(params);
    statusDisplay.innerHTML = 'Printing.';
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


function checkSubmit(e) {
    if (e && e.keyCode == 13) {
        console.log('submit');
        document.forms[0].submit();
    }
}




// When the popup HTML has loaded
window.addEventListener('load', function(evt) {
    hash = false;
    // Cache a reference to the status display SPAN
    var selectForm = document.getElementById('printer')
    var contentType = "application/x-www-form-urlencoded; charset=utf-8";



    if (localStorage.autocomplete != undefined) {
        if (localStorage.autocomplete == "no") {
            document.getElementById('sku').attr('autocomplete', 'off');
        }
    }




    var request = new XMLHttpRequest();
    request.open("GET", mainUrl + 'printers.php', false);
    request.setRequestHeader('Content-type', contentType);

    if (request.overrideMimeType) request.overrideMimeType(contentType);

    // exception handling
    try {
        request.send(null);
    } catch (e) {
        return null;
    }
    if (request.status == 500 || request.status == 404 || request.status == 2 || (request.status == 0 && request.responseText == '')) return null;

    lines = request.responseText.split('\n')


    for (var i = 0; i < lines.length; i++) {
        var d = lines[i];

        selectForm.options.add(new Option(d, d))


    }


    if (window.location.hash) {
        var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
        document.getElementById('sku').value = hash;
        hash = true;
    } else {

        chrome.tabs.executeScript({
            code: "window.getSelection().toString();"
        }, function(selection) {
            document.getElementById('sku').value = selection[0];
        });
    }
    for (var i = 0; i < selectForm.options.length; i++) {
        var d = selectForm.options[i];


        if (getCookie("printer") == d.text) {
            console.log("cookie printer " + d.text);
            selectForm.selectedIndex = i;
        }



    }




    statusDisplay = document.getElementById('status-display');
    // Handle the bookmark form submit event with our addBookmark function
    document.getElementById('sku-form').addEventListener('submit', sendToPrinter);
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.method == "getSelection")
        console.log(window.getSelection().toString())
});