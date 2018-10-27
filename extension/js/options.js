
chrome.storage.local.get('mainMemory', (details) => {
    let allUrls = details.mainMemory.allUrls, 
        allURlsNode = '';
    console.warn(allUrls)
    for(let i =0; i< allUrls.length; i++) {
        allURlsNode += '<div class="row" style="border-bottom: 1px solid black;margin:5px;padding-bottom: 10px;">' +
            '<div class="col-md-10" style="font-size:15px;"> <b> '+ allUrls[i] + ' </b></div>' + 
            '<div class="col-md-2"><button id="'+allUrls[i] +'" class="btn btn-danger">Block</button></div></div>';
        // let button = document.createElement('button');
        // button.className = 'btn btn-danger'
        // button.addEventListener('click', )
        
    }
    if (allURlsNode.length === 0)
        document.getElementById('all_urls_view').appendChild(document.createElement('h3').innerHTML='No URLs viewed yet.');
    document.getElementById('all_urls_view').innerHTML=allURlsNode;
    for(let i =0; i< allUrls.length; i++) {
        document.getElementById(allUrls[i]).addEventListener('click',addBlocking, false)
    }
})

function addBlocking(element) {
    console.log('thisss' + this.id)
    console.log(this.id)
    chrome.storage.local.get('mainMemory', (details) => {
        if (! (this.id in details.mainMemory.blockedWebsites)) {
            details.mainMemory.blockedWebsites.push(this.id);
            chrome.storage.local.set({'mainMemory': details.mainMemory})
            alert('Added '+this.id+' to List of Blocked websites')
        }
    })
}

