// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// A generic onclick callback function.
function genericOnClick(info, tab) {
    var url = 'popup.html#' + info.selectionText;
    console.log(url);
    chrome.windows.create({
        url: url,
        width: 520,
        height: 660
    });
}

var id = chrome.contextMenus.create({
    "title": "Make SKU from Highlighted Text",
    "contexts": ["selection"],
    "onclick": genericOnClick
});