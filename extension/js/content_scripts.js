
let currentUrl = document.URL;
console.log('current url '+currentUrl)
function addCurrentUrlAfterCheckMemory() {
    chrome.storage.local.get('mainMemory', (details) => {
        let allUrls = details.mainMemory.allUrls;
        console.warn('allUrls below')
        console.warn(allUrls);
        if (! (currentUrl in allUrls)) {
            if(allUrls.length===1) {
                allUrls[0] = currentUrl;
            }
            else {
                allUrls.push(currentUrl);
            }
            
            details.mainMemory.allUrls = allUrls;
            console.log('updated urls below')
            console.log(allUrls)
            chrome.storage.local.set({'mainMemory': details.mainMemory})
        }
    });
} addCurrentUrlAfterCheckMemory();