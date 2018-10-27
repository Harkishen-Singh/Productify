// initialising the chrome storage
let initialiseMainMemory = {
        blockedWebsites:[""],
        allUrls:[],
        dictionaryWords:[],
        wordId: 0,
        articleListURL:[]
};

chrome.runtime.onInstalled.addListener(chrome.storage.local.set({'mainMemory': initialiseMainMemory}));

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

    var text = clickData.selectionText;

    if(clickData.menuItemId == "meaning" && text)
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

        chrome.storage.local.get('mainMemory', function (details) {
            var words = details.mainMemory.dictionaryWords;
            var word_num  = details.mainMemory.wordId;
            var newWord = {
                id: word_num,
                word: text,
                url: googleUrl
            };
            var x = word_num + 1;
            words.push(newWord);           
            chrome.storage.local.set({'dictionaryWords': words,'wordId': x}, function() {});          
        });
    }

    if (clickData.menuItemId == "translation" && text )
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

    if(clickData.menuItemId == "speak" && text)
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
