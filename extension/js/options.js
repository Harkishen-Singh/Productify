"use strict";
chrome.storage.local.get('mainMemory', function (details) {
    var allUrls = details.mainMemory.allUrls, allURlsNode = '', allBlockedNodes = '', blockedWebsites = details.mainMemory.blockedWebsites, timeused = 0, p_time = '';
    console.warn(allUrls);
    if (!(allUrls.length === 1 && allUrls[0].url === "https://www.defaultsomethingss.com/*")) {
        for (var i = 1; i < allUrls.length; i++) {
            timeused = allUrls[i].time;
            //to display time in secs,mins and hours
            if (timeused < 60) { //timeused is in secconds
                p_time = timeused + " secs";
            }
            else if (timeused >= 3600) {
                if (Math.floor(timeused / 3600) > 1) {
                    // x= timeused/ 3600;
                    p_time = Math.floor(timeused / 3600) + "hrs " + Math.floor((timeused / 3600 - Math.floor(timeused / 3600)) * 60) + "mins";
                }
                else {
                    p_time = Math.floor(timeused / 3600) + "hr " + Math.floor((timeused / 3600 - Math.floor(timeused / 3600)) * 60) + "mins";
                }
            }
            else {
                p_time = timeused / 60 + " mins";
            }
            console.log(p_time);
            if (p_time === " secs")
                p_time = "0 secs";
            console.log(p_time);
            if (allUrls[i].title.length > 48) {
                allURlsNode += '<div class="row" style="border-bottom: 1px solid black;margin:5px;padding-bottom: 5px;max-width:100%;">' +
                    '<div class="col-md-10" style="font-size:15px;"><sup><span style="padding-right:5px;background-color:red;color:white;border-radius:5px;padding:3px;font-size:12px;" >'
                    + p_time + '</span></sup> <b> ' + allUrls[i].title.substring(0, 47) + '....' + ' </b></div>' +
                    '<div class="col-md-2"><button id="' + allUrls[i].url + '" class="btn btn-danger" style="font-size:10px;">Block</button></div></div>';
            }
            else {
                allURlsNode += '<div class="row" style="border-bottom: 1px solid black;margin:5px;padding-bottom: 5px;max-width:100%;">' +
                    '<div class="col-md-10" style="font-size:15px;"><sup><span style="padding-right:5px;background-color:red;color:white;border-radius:5px;padding:3px;font-size:12px" >'
                    + p_time + '</span></sup> <b> ' + allUrls[i].title + ' </b></div>' +
                    '<div class="col-md-2"><button id="' + allUrls[i].url + '" class="btn btn-danger" style="font-size:10px;">Block</button></div></div>';
            }
        }
        document.getElementById('all_urls_view').innerHTML = allURlsNode;
        for (var i_1 = 1; i_1 < allUrls.length; i_1++) {
            document.getElementById(allUrls[i_1].url).addEventListener('click', addBlocking, false);
        }
    }
    else {
        document.getElementById('all_urls_view').innerHTML = 'No websites Visited Yet.';
    }
    // blocked ones
    console.warn(blockedWebsites);
    if (!(blockedWebsites.length === 1 && blockedWebsites[0] === 'https://www.defaultsomethingss.com/*')) {
        console.warn(blockedWebsites);
        for (var i_2 = 0; i_2 < blockedWebsites.length; i_2++) {
            if (blockedWebsites[i_2].url === 'https://www.defaultsomethingss.com/*')
                continue;
            if (blockedWebsites[i_2].title.length > 48) {
                allBlockedNodes += '<div class="row" style="border-bottom: 1px solid black;margin:5px;padding-bottom: 5px;">' +
                    '<div class="col-md-10" style="font-size:15px;"> <b> ' + blockedWebsites[i_2].title.substring(0, 47) + '....' + ' </b></div>' +
                    '<div class="col-md-2"><button id="' + blockedWebsites[i_2].url + '" class="btn btn-success" style="font-size:10px;">Allow</button></div></div>';
            }
            else {
                allBlockedNodes += '<div class="row" style="border-bottom: 1px solid black;margin:5px;padding-bottom: 5px;">' +
                    '<div class="col-md-10" style="font-size:15px;"> <b> ' + blockedWebsites[i_2].title + ' </b></div>' +
                    '<div class="col-md-2"><button id="' + blockedWebsites[i_2].url + '" class="btn btn-success" style="font-size:10px;">Allow</button></div></div>';
            }
        }
        document.getElementById('blocked_urls_view').innerHTML = allBlockedNodes;
        for (var i_3 = 0; i_3 < blockedWebsites.length; i_3++) {
            if (!(blockedWebsites[i_3].url === 'https://www.defaultsomethingss.com/*'))
                document.getElementById(blockedWebsites[i_3].url).addEventListener('click', removeBlocking, false);
        }
    }
    else {
        document.getElementById('blocked_urls_view').innerHTML = 'No websites Blocked.';
    }
    var words = details.mainMemory.dictionaryWords;
    var wordsNode = '';
    for (var i_4 = 0; i_4 < words.length; i_4++) {
        wordsNode += '<div class="row" style="margin:5px;padding-bottom: 10px;"></div>' +
            '<div style="font-size:15px;"> <b>' + words[i_4].word + ' </b></div>';
    }
    document.getElementById('word_view').innerHTML = wordsNode;
});
function addBlocking(element) {
    var _this = this;
    console.log('thisss' + this.id);
    console.log(this.id);
    var title = '';
    chrome.storage.local.get('mainMemory', function (details) {
        if (!(_this.id in details.mainMemory.blockedWebsites)) {
            var allURls = details.mainMemory.allUrls;
            for (var j = 0; j < allURls.length; j++) {
                if (allURls[j].url === _this.id) {
                    console.warn('same URL found. deleting from allowed list');
                    title = allURls[j].title;
                    console.log(title);
                    allURls.splice(j, 1);
                }
            }
            details.mainMemory.blockedWebsites.push({ url: _this.id, title: title });
            chrome.storage.local.set({ 'mainMemory': details.mainMemory });
            alert('Added ' + title + ' to List of Blocked websites');
            window.location.reload();
        }
    });
}
function removeBlocking(element) {
    var _this = this;
    console.log('removeBLocking invoked' + this.id);
    console.log(this.id);
    var title = '';
    chrome.storage.local.get('mainMemory', function (details) {
        if (!(_this.id in details.mainMemory.blockedWebsites)) {
            var blockedWebsites = details.mainMemory.blockedWebsites;
            for (var j = 0; j < blockedWebsites.length; j++) {
                if (blockedWebsites[j].url === _this.id) {
                    console.warn('***deleting from blocked list');
                    console.warn('j is ' + j);
                    title = details.mainMemory.blockedWebsites[j].title;
                    details.mainMemory.blockedWebsites.splice(j, 1);
                    console.warn(details.mainMemory.blockedWebsites);
                }
            }
            details.mainMemory.allUrls.push({ url: _this.id, time: '', title: title });
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
