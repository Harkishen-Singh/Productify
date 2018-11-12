// initialising the chrome storage
let initialiseMainMemory = {
        blockedWebsites:[{url: "https://www.defaultsomethingss.com/*",title:''}],
        allUrls:[{url: "https://www.defaultsomethingss.com/*", time: '0',title:''}],
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

//Declaring the different options for context-menu
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
};

var menu4 = {
    id: "quora",
    title:"Quora",
    contexts: ["selection"]
};

var menu5 = {
    id:"wiki",
    title: "Wikipedia",
    contexts: ["selection"]
};

var menu6 = {
    id:"stack",
    title: "StackOverflow",
    contexts: ["selection"]
};

var menu7 = {
    id:"images",
    title: "Images",
    contexts: ["selection"]
};

var menu8 = {
    id:"news",
    title: "News",
    contexts: ["selection"]
};


function fixedEncodeURI (str) {
    return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
}

chrome.contextMenus.create(menu1);
chrome.contextMenus.create(menu2);
chrome.contextMenus.create(menu3);
chrome.contextMenus.create(menu4);
chrome.contextMenus.create(menu5);
chrome.contextMenus.create(menu6);
chrome.contextMenus.create(menu7);
chrome.contextMenus.create(menu8);

//the functions of all the contents in the context-menu
chrome.contextMenus.onClicked.addListener( function(clickData,$scope){

    var text = clickData.selectionText;

    //Search for meaning in the google
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
                
                let present = false;
                for(let i=0;i<words.length;++i){
                    if(words[i].word == text){
                        present = true;
                        break;
                    }
                }
                if(! present){
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
                }
                          
            });
    }

    //Translate the selected text
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

    //Pronounce the selected text
    if(clickData.menuItemId == "speak" && text)
    {
        chrome.tts.speak(clickData.selectionText, {'lang': 'en-US','rate': 0.7});
    }

    //Search the selected text in quora
    if(clickData.menuItemId == "quora" && text)
    {
        var quoraUrl = "https://www.quora.com/search?q=" + fixedEncodeURI(clickData.selectionText)
        var quoraSearch ={
            "url":quoraUrl,
            "type": "popup",
            "top": 200,
            "left":300,
            "width": Math.round(screen.availWidth/2),
            "height": Math.round(screen.availHeight/2)
        };

        chrome.windows.create(quoraSearch,function(){});
    }

    //Search the selected text in wikipedia
    if(clickData.menuItemId == "wiki" && text)
    {
        var wikiUrl = "https://en.wikipedia.org/wiki/" + fixedEncodeURI(clickData.selectionText)
        var wikiSearch ={
            "url":wikiUrl,
            "type": "popup",
            "top": 200,
            "left":300,
            "width": Math.round(screen.availWidth/2),
            "height": Math.round(screen.availHeight/2)
        };

        chrome.windows.create(wikiSearch , function(){});
    }

    //Search the selected text in stackoverflow
    if(clickData.menuItemId == "stack" && text)
    {
        var stackUrl = "https://www.google.com/search?safe=active&q=stackoverflow+" + fixedEncodeURI(clickData.selectionText);
        var stack = {
            "url": stackUrl,
            "type": "popup",
            "top": 200,
            "left": 300,
            "width": Math.round(screen.availWidth/2),
            "height": Math.round(screen.availHeight/2)
        };
        chrome.windows.create(stack,function(){});

    }

    //Searches for the images
    if(clickData.menuItemId == "images" && text)
    {
        var imageUrl = "https://www.google.co.in/search?tbm=isch&sa=1&ei=4k3pW7TyNIrQvgSZn56wBA&btnG=Search&q="+ fixedEncodeURI(text)
        var image = {
            "url": imageUrl,
            "type": "popup",
            "top": 200,
            "left": 300,
            "width": Math.round(screen.availWidth/2),
            "height": Math.round(screen.availHeight/2)
        };
        chrome.windows.create(image,function(){});
    }

    //Searches for the news
    if(clickData.menuItemId == "news" && text)
    {
        var newsUrl = "https://news.google.com/search?q="+ fixedEncodeURI(text)
        var news = {
            "url": newsUrl,
            "type": "popup",
            "top": 200,
            "left": 300,
            "width": Math.round(screen.availWidth/2),
            "height": Math.round(screen.availHeight/2)
        };
        chrome.windows.create(news,function(){});
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
          for (var i=0; i<details.mainMemory.blockedWebsites.length; i++){
              blockedUrls.push(details.mainMemory.blockedWebsites[i].url);
          }
        // blockedUrls = details.mainMemory.blockedWebsites;
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

