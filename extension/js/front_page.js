function name(){
    chrome.storage.sync.get('mainMemory', (details) => {
        let Urls = details.mainMemory.blockedWebsites;
        let len = Urls.length;
        let words = details.mainMemory.wordId;
        document.getElementById('blocked-num').innerHTML = len - 1;
        document.getElementById('dictionary-num').innerHTML = words;
    });
}
    
setInterval(name,500);
