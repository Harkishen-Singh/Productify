"use strict";
chrome.storage.local.get('mainMemory', function (details) {
    var allUrls = details.mainMemory.allUrls, allURlsNode = '', allBlockedNodes = '', blockedWebsites = details.mainMemory.blockedWebsites,
    urltrim='';
    console.warn(allUrls);
<<<<<<< HEAD
    for (var i = 1; i < allUrls.length; i++) {
        
        if(allUrls[i].url.length >= 86){
            urltrim = allUrls[i].url.substring(0,86) + "..." ;
        allURlsNode += '<div class="row" style="border-bottom: 1px solid black;margin:5px;padding-bottom: 10px;max-width:90%;">' +
            '<div class="col-md-10" style="font-size:15px;"><span style="padding-right:5px;background-color:red;color:white;border-radius:5px;padding:5px;" >'
            + parseInt(allUrls[i].time) / 60 + ' mins</span> <p style="font-weight:bold;">' + urltrim + '</p></div>' +
            '<div class="col-md-2"><button id="' + allUrls[i].url + '" class="btn btn-danger" style="position:static;margin-top:2px;margin-right:2px;">Block</button></div></div>';
        }
        else{
            allURlsNode += '<div class="row" style="border-bottom: 1px solid black;margin:5px;padding-bottom: 10px;max-width:90%;">' +
                '<div class="col-md-10" style="font-size:15px;"><span style="padding-right:5px;background-color:red;color:white;border-radius:5px;padding:5px;" >'
                + parseInt(allUrls[i].time) / 60 + ' mins</span> <p style="font-weight:bold;">' + allUrls[i].url + '</p></div>' +
                '<div class="col-md-2"><button id="' + allUrls[i].url + '" class="btn btn-danger" style="position:static;margin-top:2px;margin-right:2px;">Block</button></div></div>';
=======
    if (!(allUrls.length === 1 && allUrls[0].url === "https://www.defaultsomethingss.com/*")) {
        for (var i = 1; i < allUrls.length; i++) {
            allURlsNode += '<div class="row" style="border-bottom: 1px solid black;margin:5px;padding-bottom: 10px;overflow-x:auto;max-width:90%;">' +
                '<div class="col-md-10" style="font-size:15px;"><span style="padding-right:5px;background-color:red;color:white;border-radius:5px;padding:5px;" >'
                + parseInt(allUrls[i].time) / 60 + ' mins</span> <b> ' + allUrls[i].url + ' </b></div>' +
                '<div class="col-md-2"><button id="' + allUrls[i].url + '" class="btn btn-danger">Block</button></div></div>';
        }
        document.getElementById('all_urls_view').innerHTML = allURlsNode;
        for (var i = 1; i < allUrls.length; i++) {
            document.getElementById(allUrls[i].url).addEventListener('click', addBlocking, false);
>>>>>>> b9ad93be276cd076355d43041707da452482b242
        }
    }
    else {
        document.getElementById('all_urls_view').innerHTML = 'No websites Visited Yet.';
    }
    // blocked ones
    console.warn(blockedWebsites);
    if (!(blockedWebsites.length === 1 && blockedWebsites[0] === 'https://www.defaultsomethingss.com/*')) {
        console.warn(blockedWebsites);
        for (var i = 0; i < blockedWebsites.length; i++) {
            if (blockedWebsites[i] === 'https://www.defaultsomethingss.com/*')
                continue;
            allBlockedNodes += '<div class="row" style="border-bottom: 1px solid black;margin:5px;padding-bottom: 10px;">' +
                '<div class="col-md-10" style="font-size:15px;"> <b> ' + blockedWebsites[i] + ' </b></div>' +
                '<div class="col-md-2"><button id="' + blockedWebsites[i] + '" class="btn btn-success">Allow</button></div></div>';
        }
        document.getElementById('blocked_urls_view').innerHTML = allBlockedNodes;
        for (var i = 0; i < blockedWebsites.length; i++) {
            if (!(blockedWebsites[i] === 'https://www.defaultsomethingss.com/*'))
                document.getElementById(blockedWebsites[i]).addEventListener('click', removeBlocking, false);
        }
    }
    else {
        document.getElementById('blocked_urls_view').innerHTML = 'No websites Blocked.';
    }
    var words = details.mainMemory.dictionaryWords;
    var wordsNode = '';
    for (var i = 0; i < words.length; i++) {
        wordsNode += '<div class="row" style="margin:5px;padding-bottom: 10px;"></div>' +
            '<div style="font-size:15px;"> <b>' + words[i].word + ' </b></div>';
    }
    document.getElementById('word_view').innerHTML = wordsNode;
});
function addBlocking(element) {
    var _this = this;
    console.log('thisss' + this.id);
    console.log(this.id);
    chrome.storage.local.get('mainMemory', function (details) {
        if (!(_this.id in details.mainMemory.blockedWebsites)) {
            details.mainMemory.blockedWebsites.push(_this.id);
            var allURls = details.mainMemory.allUrls;
            for (var j = 0; j < allURls.length; j++) {
                if (allURls[j].url === _this.id) {
                    console.warn('same URL found. deleting from allowed list');
                    allURls.splice(j, 1);
                }
            }
            chrome.storage.local.set({ 'mainMemory': details.mainMemory });
            alert('Added ' + _this.id + ' to List of Blocked websites');
            window.location.reload();
        }
    });
}
function removeBlocking(element) {
    var _this = this;
    console.log('removeBLocking invoked' + this.id);
    console.log(this.id);
    chrome.storage.local.get('mainMemory', function (details) {
        if (!(_this.id in details.mainMemory.blockedWebsites)) {
            var blockedWebsites = details.mainMemory.blockedWebsites;
            for (var j = 0; j < blockedWebsites.length; j++) {
                if (blockedWebsites[j] === _this.id) {
                    console.warn('***deleting from blocked list');
                    console.warn('j is ' + j);
                    details.mainMemory.blockedWebsites.splice(j, 1);
                    console.warn(details.mainMemory.blockedWebsites);
                }
            }
            details.mainMemory.allUrls.push({ url: _this.id, time: '' });
            // details.mainMemory.blockedWebsites = blockedWebsites;
            chrome.storage.local.set({ 'mainMemory': details.mainMemory });
            alert('Removed ' + _this.id + ' from List of Blocked websites');
            window.location.reload();
        }
    });
}
// article view below
function articleViewHandler() {
    chrome.storage.local.get('savedArticlesCodeZero', function (details) {
        var allSavedArticles = details.savedArticlesCodeZero.savedArticles;
        var orderedList = document.createElement('ol');
        var totalArticles = allSavedArticles.length;
        // for(let i=0; i< totalArticles; i++) {
        //     let x = document.createElement('p');
        //     x.id = allSavedArticles[i].URL;
        //     x.innerHTML = allSavedArticles[i].URL + '<br>';
        //     x.addEventListener('click', assignActionsArticles, false )
        //     document.getElementById('articleTitle').appendChild(x)
        // }
        if (totalArticles) {
            for (var i = 0; i < totalArticles; i++) {
                var List = document.createElement('li');
                List.id = allSavedArticles[i].URL;
                List.innerHTML = allSavedArticles[i].URL + '<br>';
                List.addEventListener('click', assignActionsArticles, false);
                orderedList.appendChild(List);
            }
            document.getElementById('articleTitle').appendChild(orderedList);
        }
        else {
            var element = document.createElement('p');
            element.innerHTML = 'No articles saved Yet.';
            document.getElementById('articleTitle').appendChild(element);
            document.getElementById('articleBody').innerHTML = "<span style='margin-left:20px;'>Empty!<br> Please click the download Icon on the bottom left of the page" +
                " to save the Article for offline view.</span>";
        }
    });
}
articleViewHandler();
function assignActionsArticles(el) {
    var _this = this;
    console.log('invoked eventhandler with ' + this.id);
    var id = this.id;
    chrome.storage.local.get('savedArticlesCodeZero', function (details) {
        var allSavedArticles2 = details.savedArticlesCodeZero.savedArticles;
        for (var j = 0; j < allSavedArticles2.length; j++) {
            if (allSavedArticles2[j].URL === _this.id) {
                document.getElementById('articleBody').innerHTML = '<b>Date : </b>' + allSavedArticles2[j].date + '<br>' + allSavedArticles2[j].message;
                break;
            }
        }
    });
}
