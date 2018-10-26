// initialising the chrome storage
let mainMemory = {
        blockedWebsites:[""],
        allUrls:[],
        dictionaryWords:[],
        articleListURL:[]
};

chrome.runtime.onInstalled.addListener(chrome.storage.local.set({'mainMemory': mainMemory}));

var menu1 = {
    id: "meaning",
    title: "Meaning",
    contexts: ["selection"]
};

var menu2 = {
    id: "speak",
    title: "Pronunciation",
    contexts: ["selection"]
};

var menu3 = {
    id: "translation",
    title: "Translate",
    contexts: ["selection"]
}

function fixedEncodeURI (str) {
    return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
}

chrome.contextMenus.create(menu1);
chrome.contextMenus.create(menu2);
chrome.contextMenus.create(menu3);

chrome.contextMenus.onClicked.addListener( function(clickData,$scope){
    if(clickData.menuItemId == "meaning" && clickData.selectionText)
    {
        var googleUrl = "https://www.google.com/search?safe=active&q=define+" + fixedEncodeURI(clickData.selectionText);
        var search = {
            "url": googleUrl,
            "type": "popup",
            "top": 5,
            "left": 5,
            "width": Math.round(screen.availWidth/2),
            "height": Math.round(screen.availHeight/2)
        };
        chrome.windows.create(search,function(){});

        chrome.storage.local.get({userKeyIds: []}, function (result) {
            // the input argument is ALWAYS an object containing the queried keys
            // so we select the key we need
            var userKeyIds = result.userKeyIds;
            userKeyIds.push({keyPairId: keyPairId, HasBeenUploadedYet: false});
            // set the new array value to the same key
            chrome.storage.local.set({userKeyIds: userKeyIds}, function () {
                // you can use strings instead of objects
                // if you don't  want to define default values
                chrome.storage.local.get('userKeyIds', function (result) {
                    console.log(result.userKeyIds)
                });
            });
        });
    }

    if (clickData.menuItemId == "translation" && clickData.selectionText )
    {
        var googleUrl = "https://translate.google.com/#auto/en/" + fixedEncodeURI(clickData.selectionText);
        var search = {
            "url": googleUrl,
            "type": "popup",
            "top": 5,
            "left": 5,
            "width": Math.round(screen.availWidth/2),
            "height": Math.round(screen.availHeight/2)
        };
        chrome.windows.create(search,function(){});
    }

    if(clickData.menuItemId == "speak" && clickData.selectionText)
    {
        chrome.tts.speak(clickData.selectionText, {'lang': 'en-US','rate': 0.7});
    }

});
console.log('Background Working')

function blockRequest(details) {
    return {
         cancel: true
    }; 
}
function updateFilters(urls) {
      if(chrome.webRequest.onBeforeRequest.hasListener(blockRequest)) {
        chrome.webRequest.onBeforeRequest.removeListener(blockRequest); 
      }

      var blockedUrls = [];
      chrome.storage.local.get('mainMemory', (details) => {
        blockedUrls = details.mainMemory.blockedWebsites;
        chrome.webRequest.onBeforeRequest.addListener(blockRequest, {
            urls: blockedUrls
          //   [
          //       "*://*.facebook.com/*"
          //     ]
          
          }, ['blocking']); 
      });
      
} updateFilters(); 
