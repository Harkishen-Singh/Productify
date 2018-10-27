
chrome.storage.sync.get('mainMemory', (details) => {
    let allUrls = details.mainMemory.allUrls, 
        allURlsNode = '',allBlockedNodes = '',
        blockedWebsites = details.mainMemory.blockedWebsites;
    console.warn(allUrls)
    for(let i =1; i< allUrls.length; i++) {
        allURlsNode += '<div class="row" style="border-bottom: 1px solid black;margin:5px;padding-bottom: 10px;">' +
            '<div class="col-md-10" style="font-size:15px;"> <b> '+ allUrls[i].url + ' </b></div>' + 
            '<div class="col-md-2"><button id="'+allUrls[i].url +'" class="btn btn-danger">Block</button></div></div>';
        // let button = document.createElement('button');
        // button.className = 'btn btn-danger'
        // button.addEventListener('click', )
        
    }
    // if (allURlsNode.length === 0) {
    //     console.log('no urls viewd')
    //     let x = document.getElementById('all_urls');
    //     x.innerHTML = 'No URLs viewed yet.';
    //     x.style.border = '2px solid black';
    //     x.style.borderRadius = '5px';
    //     x.style.height = '400px';
    // }
    
    document.getElementById('all_urls_view').innerHTML=allURlsNode;
    for(let i =1; i< allUrls.length; i++) {
        document.getElementById(allUrls[i].url).addEventListener('click',addBlocking, false)
    }

    // blocked ones

    console.warn(blockedWebsites)
    for(let i =0; i< blockedWebsites.length; i++) {
        if (blockedWebsites[i] === 'https://www.defaultsomethingss.com/*') 
            continue
        allBlockedNodes += '<div class="row" style="border-bottom: 1px solid black;margin:5px;padding-bottom: 10px;">' +
            '<div class="col-md-10" style="font-size:15px;"> <b> '+ blockedWebsites[i] + ' </b></div>' + 
            '<div class="col-md-2"><button id="'+blockedWebsites[i] +'" class="btn btn-success">Allow</button></div></div>';
        // let button = document.createElement('button');
        // button.className = 'btn btn-danger'
        // button.addEventListener('click', )
        
    }
    // if (blockedWebsites.length === 1 && blockedWebsites[0] === 'https://www.defaultsomethingss.com/*' ) {
    //     console.log('black working ***')
    //     let x = document.getElementById('blocked_urls');
    //     x.innerHTML = 'No Blocked Websites yet.';
    //     x.style.border = '2px solid black';
    //     x.style.borderRadius = '5px';
    //     x.style.height = '400px';
    // }
        // document.getElementById('blocked_urls_view').innerHTML='<h3>No URLs Blocked yet.</h3>';
    document.getElementById('blocked_urls_view').innerHTML=allBlockedNodes;
    for(let i =0; i< blockedWebsites.length; i++) {
        if(!(blockedWebsites[i] === 'https://www.defaultsomethingss.com/*'))
        document.getElementById(blockedWebsites[i]).addEventListener('click',removeBlocking, false)
    }


})

function addBlocking(element) {
    console.log('thisss' + this.id)
    console.log(this.id)
    chrome.storage.sync.get('mainMemory', (details) => {
        if (! (this.id in details.mainMemory.blockedWebsites)) {
            details.mainMemory.blockedWebsites.push(this.id);
            let allURls = details.mainMemory.allUrls;
            for(let j=0;j<allURls.length; j++) {
                if(allURls[j].url===this.id) {
                    console.warn('same URL found. deleting from allowed list')
                    allURls.splice(j,1)
                }
            }
            chrome.storage.sync.set({'mainMemory': details.mainMemory})
            alert('Added '+this.id+' to List of Blocked websites');
            window.location.reload();
        }
    })
}

function removeBlocking(element) {
    console.log('removeBLocking invoked' + this.id)
    console.log(this.id)
    chrome.storage.sync.get('mainMemory', (details) => {
        if (! (this.id in details.mainMemory.blockedWebsites)) {
            let blockedWebsites = details.mainMemory.blockedWebsites;
            for(let j=0;j<blockedWebsites.length; j++) {
                if(blockedWebsites[j]===this.id ) {
                    console.warn('***deleting from blocked list')
                    console.warn('j is '+j)
                    details.mainMemory.blockedWebsites.splice(j,1)
                    console.warn(details.mainMemory.blockedWebsites)
                }
            }
            details.mainMemory.allUrls.push({url:this.id, time:''});
            // details.mainMemory.blockedWebsites = blockedWebsites;
            chrome.storage.sync.set({'mainMemory': details.mainMemory})
            alert('Removed '+this.id+' from List of Blocked websites');
            window.location.reload();
        }
    })
}

