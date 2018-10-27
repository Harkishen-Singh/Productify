let blocks = document.getElementById('blockWebs');

chrome.storage.local.get('mainMemory', (details) => {
    let blocked = details.mainMemory.blockedWebsites;
    blocks.innerHTML = blocked.length -1;
    console.log('front_page.js is '+blocked.length-1)
});