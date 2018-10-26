
chrome.storage.local.get('mainMemory', (details) => {
    let allUrls = details.mainMemory.allUrls, 
        allURlsNode = '';
    for(let i =0; i< allUrls.length; i++) {
        allURlsNode += '<div class="row" style="border-bottom: 1px solid black;margin:5px;padding-bottom: 10px;">' +
            '<div class="col-md-10" style="font-size:15px;"> <b> '+ allUrls[i] + ' </b></div>' + 
            '<div class="col-md-2"><button class="btn btn-danger">Block</button></div></div>';
    }
    if (allURlsNode.length === 0)
        document.getElementById('all_urls_view').appendChild(document.createElement('h3').innerHTML='No URLs viewed yet.');
    document.getElementById('all_urls_view').innerHTML=allURlsNode;
})