
let currentUrl = document.URL;
console.log('current url '+currentUrl)
function addCurrentUrlAfterCheckMemory() {
    chrome.storage.local.get('mainMemory', (details) => {
        let allUrls = details.mainMemory.allUrls;
        console.warn('allUrls below')
        console.warn(allUrls);
        
        var i;
        let present = false;
        for(i=0;i<allUrls.length;++i){
            if(allUrls[i].url == currentUrl){
                present = true;
                break;
            }
        }

        if (! (present)) {
                allUrls.push({url:currentUrl, time:''});
           
            
            details.mainMemory.allUrls = allUrls;
            console.log('updated urls below')
            console.log(allUrls)
            chrome.storage.local.set({'mainMemory': details.mainMemory})
        }
    });
} addCurrentUrlAfterCheckMemory();

