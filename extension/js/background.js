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
      
      chrome.webRequest.onBeforeRequest.addListener(blockRequest, {
          urls: [
              "*://*.facebook.com/*","*://*.google.co.in/*"
            ]}, ['blocking']); 
} updateFilters(); 

