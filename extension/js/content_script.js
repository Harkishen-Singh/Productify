"use strict";
// JS injections
var TimeCalculate = /** @class */ (function () {
    function TimeCalculate() {
        this.startTime = 0;
        this.customIcon = new Array(1);
        this.timeOrphan = new Date();
        this.totalTime = 0; // in seconds	
        this.URL = document.URL;
        this.customIcon[0] = (chrome.extension.getURL('icons/save.png'));
        this.onPageLoad();
    }
    TimeCalculate.prototype.onPageLoad = function () {
        var _this = this;
        var saveIconElement = document.createElement('img');
        saveIconElement.src = this.customIcon[0];
        // saveIconElement.setAttribute("src", this.customIcon[0]);
        saveIconElement.setAttribute("alt", "Save Current Article");
        saveIconElement.style.position = 'fixed';
        saveIconElement.style.left = '3%';
        saveIconElement.style.height = '50px';
        saveIconElement.style.width = '50px';
        saveIconElement.style.bottom = '3%';
        saveIconElement.style.opacity = '50%';
        saveIconElement.onclick = function () {
            _this.savedArticles();
        };
        document.body.appendChild(saveIconElement);
    };
    TimeCalculate.prototype.startTimerCounter = function () {
        var _this = this;
        this.startTime = this.timeOrphan;
        setInterval(function () {
            _this.totalTime += _this.calculate();
            var objectDOM = {
                'url': _this.URL,
                'totalTime': _this.totalTime
            };
            chrome.runtime.sendMessage({ domOBJ: objectDOM });
        }, 3000);
    };
    TimeCalculate.prototype.calculate = function () {
        return 3;
    };
    TimeCalculate.prototype.diffTime = function () {
        this.timeViewed = Math.abs(this.stopTime - this.startTime);
        alert('Time viewed : ' + this.timeViewed);
        console.log('Time Watched : ' + this.timeViewed);
    };
    TimeCalculate.prototype.addCurrentUrlAfterCheckMemory = function () {
        var _this = this;
        chrome.storage.local.get('mainMemory', function (details) {
            var allUrls = details.mainMemory.allUrls;
            console.warn('allUrls below');
            console.warn(allUrls);
            var i;
            var present = false;
            for (i = 0; i < allUrls.length; ++i) {
                if (allUrls[i].url == _this.URL) {
                    present = true;
                    break;
                }
            }
            if (!(present)) {
                allUrls.push({ url: _this.URL, time: '' });
                details.mainMemory.allUrls = allUrls;
                console.log('updated urls below');
                console.log(allUrls);
                chrome.storage.local.set({ 'mainMemory': details.mainMemory });
            }
        });
    };
    TimeCalculate.prototype.savedArticles = function () {
        alert('Article Successfully Saved!');
        var DOMs = document.querySelectorAll('body');
        var articleSize = DOMs.length;
        console.warn('Current Article size : ' + articleSize);
        console.warn('DOMs below');
        var message = '', date = Date();
        for (var i = 0; i < DOMs.length; i++) {
            message += DOMs[i].innerHTML;
        }
        console.log('content page is below');
        console.log(message);
        var messageObject = {
            'URL': document.URL,
            'message': message,
            'date': date
        };
        chrome.runtime.sendMessage({ savedArticles: messageObject });
        // currently the Mobile Application feature is disabled, until the base of the extension matures
        /*
        $.ajax({
            url:'http://127.0.0.1:5000/saveArticle',
            data: 'object=' +JSON.stringify(messageObject)  ,
            success: function(r,status){
                console.warn('ajax request with result: '+r+' status: '+status);
            },
            error: function(xhr,status,error){
                throw error;
            }
        })
        */
    };
    return TimeCalculate;
}());
var object = new TimeCalculate();
window.onload = function () {
    object.startTimerCounter();
    object.addCurrentUrlAfterCheckMemory();
    // object.savedArticles();
};
