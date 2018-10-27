// initialising the chrome storage
let initialiseMainMemory = {
        blockedWebsites:["https://www.defaultsomethingss.com/*"],
        allUrls:[{url: "https://www.defaultsomethingss.com/*", time: '0'}],
        dictionaryWords:[],
        wordId: 0,
        articleListURL:[]
};
let savedArticles2 = {
    savedArticles :[]
}
function setup() {
    chrome.storage.local.set({'mainMemory': initialiseMainMemory})
    chrome.storage.local.set({'savedArticlesCodeZero': savedArticles2})
}

chrome.runtime.onInstalled.addListener(setup);

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
            "top": 200,
            "left": 300,
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
            details.mainMemory.dictionaryWords = words;
            details.mainMemory.wordId = x;          
            chrome.storage.local.set({'mainMemory': details.mainMemory})          
        });
    }

    if (clickData.menuItemId == "translation" && text )
    {
        var googleUrl = "https://translate.google.com/#auto/en/" + fixedEncodeURI(clickData.selectionText);
        var search = {
            "url": googleUrl,
            "type": "popup",
            "top": 200,
            "left": 300,
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
        console.log('list of blocked urls below-- background')
        console.log(blockedUrls)
        chrome.webRequest.onBeforeRequest.addListener(blockRequest, {
            urls: 
            blockedUrls
            // [
            //     "https://www.facebook.com/"
            //   ]
          
          }, ['blocking']); 
      });
      
} updateFilters(); 
setInterval(updateFilters,2000)

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {	
    if(request.domOBJ){	
        console.warn('received domOBJ message')	
        chrome.storage.local.get('mainMemory', (details) => {	
            let allUrls = details.mainMemory.allUrls;	
            for( let i=0; i< allUrls.length; i++) {	
                if (allUrls[i].url === request.domOBJ.url) {	
                    details.mainMemory.allUrls[i].time = request.domOBJ.totalTime;	
                    chrome.storage.local.set({'mainMemory': details.mainMemory})	
                }	
            }	
            	
        })	
    }	
    else if(request.savedArticles) {
        console.warn('got inside saved articles')
        // $.ajax({
        //     url:'https://localhost:5000/',
        //     data: 'object=' +JSON.stringify(messageObject)  ,
        //     success: function(r,status){
        //         console.warn('ajax request with result: '+r+' status: '+status);
        //     },
        //     error: function(xhr,status,error){
        //         throw error;
        //     }
        // })
        chrome.storage.local.get('savedArticlesCodeZero', (details) => {
            let allSavedArticles = details.savedArticlesCodeZero.savedArticles;
            if (allSavedArticles.length===0){
                console.log('in ==0 case')
                let a = []
                a.push(request.savedArticles)
                console.log('a is ')
                console.log(a)
                details.savedArticlesCodeZero.savedArticles.push(request.savedArticles)
                chrome.storage.local.set({'savedArticlesCodeZero':details.savedArticlesCodeZero})
            }
            else if (!(request.savedArticles in allSavedArticles)){
                console.log('NORMAL CASES')
                details.savedArticlesCodeZero.savedArticles.push(request.savedArticles);
                chrome.storage.local.set({'savedArticlesCodeZero':details.savedArticlesCodeZero})
            }
        })
    }
})

setInterval(()=> {
    chrome.storage.local.get('savedArticlesCodeZero', (details) => {
        console.warn('saved articles below')
        console.warn(details.savedArticlesCodeZero.savedArticles)
    })
}, 5000)

chrome.runtime.sendMessage({urlCurr: document.URL})

