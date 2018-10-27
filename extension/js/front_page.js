function name(){
    chrome.storage.local.get('mainMemory', (details) => {
        let Urls = details.mainMemory.blockedWebsites;
        let len = Urls.length;
        let words = details.mainMemory.wordId;
        document.getElementById('blocked-num').innerHTML = len - 1;
        document.getElementById('dictionary-num').innerHTML = words;
        let url = document.URL;
        console.warn(url)
        
        chrome.storage.local.get('savedArticlesCodeZero', (details2) => {
            let length = details2.savedArticlesCodeZero.savedArticles.length;
            document.getElementById('articles2').innerHTML = length;
        })

    });
}
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {	
    if(request.urlCurr){	
        chrome.storage.local.get('mainMemory', (details) => {
            let allUrls = details.mainMemory.allUrls;
            console.log('working .. '+allUrls)
            for(let i=0;i < allUrls.length; i++) {
                if(allUrls[i].url === request.urlCurr) {
                    console.warn('got in with '+allUrls[i].time)
                    document.getElementById('time2').innerHTML = allUrls[i].time
                }
            }
        })
    }
})
    
setInterval(name,500);

// let a = document.getElementById(mobileView);
// a.addEventListener('click', () => {
//     let b = document.createElement('input');
//     b.type = 'text';
//     b.id = 'keyEntry';
//     let c = document.createElement('button');
    
// })


