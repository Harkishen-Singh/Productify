chrome.storage.local.get('mainMemory', (details) => {
    let allUrls = details.mainMemory.allUrls, 
        allURlsNode = '',allBlockedNodes = '',
        blockedWebsites = details.mainMemory.blockedWebsites;
    console.warn(allUrls)
    for(let i =1; i< allUrls.length; i++) {
        allURlsNode += '<div class="row" style="border-bottom: 1px solid black;margin:5px;padding-bottom: 10px;overflow-x:auto;max-width:90%;">' +
            '<div class="col-md-10" style="font-size:15px;"><span style="padding-right:5px;background-color:red;color:white;border-radius:5px;padding:5px;" >'
            +parseInt(allUrls[i].time)/60+' mins</span> <b> '+ allUrls[i].url + ' </b></div>' + 
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

    let words = details.mainMemory.dictionaryWords;
    let wordsNode = '';
    for(let i =0; i< words.length; i++) {
        wordsNode += '<div class="row" style="margin:5px;padding-bottom: 10px;"></div>' +
            '<div style="font-size:15px;"> <b>'+ words[i].word + ' </b></div>'; 
    }
    document.getElementById('word_view').innerHTML=wordsNode;
    
})

function addBlocking(element) {
    console.log('thisss' + this.id)
    console.log(this.id)
    chrome.storage.local.get('mainMemory', (details) => {
        if (! (this.id in details.mainMemory.blockedWebsites)) {
            details.mainMemory.blockedWebsites.push(this.id);
            let allURls = details.mainMemory.allUrls;
            for(let j=0;j<allURls.length; j++) {
                if(allURls[j].url===this.id) {
                    console.warn('same URL found. deleting from allowed list')
                    allURls.splice(j,1)
                }
            }
            chrome.storage.local.set({'mainMemory': details.mainMemory})
            alert('Added '+this.id+' to List of Blocked websites');
            window.location.reload();
        }
    })
}

function removeBlocking(element) {
    console.log('removeBLocking invoked' + this.id)
    console.log(this.id)
    chrome.storage.local.get('mainMemory', (details) => {
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
            chrome.storage.local.set({'mainMemory': details.mainMemory})
            alert('Removed '+this.id+' from List of Blocked websites');
            window.location.reload();
        }
    })
}



// article view below

function articleViewHandler() {
    chrome.storage.local.get('savedArticlesCodeZero', (details) => {
        let allSavedArticles = details.savedArticlesCodeZero.savedArticles;
        let totalArticles = allSavedArticles.length;
        for(let i=0; i< totalArticles; i++) {
            let x = document.createElement('p');
            x.id = allSavedArticles[i].URL;
            x.innerHTML = allSavedArticles[i].URL + '<br>';
            x.addEventListener('click', assignActionsArticles, false )
            document.getElementById('articleTitle').appendChild(x)
        }
    })
} articleViewHandler();

function assignActionsArticles(el) {
    console.log('invoked eventhandler with '+this.id);
    let id = this.id;
    chrome.storage.local.get('savedArticlesCodeZero', (details) => {
        let allSavedArticles2 = details.savedArticlesCodeZero.savedArticles;
        for(let j=0; j<allSavedArticles2.length; j++) {
            if (allSavedArticles2[j].URL === this.id) {
                document.getElementById('articleBody').innerHTML = '<b>Date : </b>'+ allSavedArticles2[j].date+'<br>' + allSavedArticles2[j].message;
                break;
            }
        }
    });
}


// function newProductivity() {
//     chrome.storage.local.get('mainMemory', (details) => {
//         let Urls = details.mainMemory.blockedWebsites;
//         let len = Urls.length;
//         let words = details.mainMemory.wordId;
//         // document.getElementById('blocked-num').innerHTML = len - 1;
//         // document.getElementById('dictionary-num').innerHTML = words;
//         let url = document.URL;
//         console.warn(url)
        
//         chrome.storage.local.get('savedArticlesCodeZero', (details2) => {
//             let length = details2.savedArticlesCodeZero.savedArticles.length;
//             document.getElementById('articles2').innerHTML = length;
//             console.log('url '+(Urls.length-1)+' length '+length)
//             var prod = 0
//             prod = Math.floor((((parseInt(Urls.length-1)/parseInt(length+1))) * parseInt(words +1) )*100) ;
//             console.log('prod is '+prod)
//             document.getElementById('normalS').style.width = prod+'px';
//             document.getElementById('thiss').innerText = prod;
//             // document.getElementById('unique').style.width = prod + 'px'
//             // let ele = document.createElement('div');
//             // let a1 = document.createAttribute('role')
//             // a1.value =  'progressbar';
//             // let a2 = document.createAttribute('aria-valuenow')
//             // a2.value = prod
//             // let a3 = document.createAttribute('aria-valuemin')
//             // a3.value =  '0';
//             // let a4 = document.createAttribute('aria-valuemax')
//             // a4.value =  '100';
//             // document.getElementById('adder').removeChild(ele);
//             // ele.setAttributeNode(a1)
//             // ele.setAttributeNode(a2)
//             // ele.setAttributeNode(a3)
//             // ele.setAttributeNode(a4)
//             // ele.classList.add('progress-bar')
//             // ele.classList.add('progress-bar-striped')
//             // ele.classList.add('active')
//             // ele.style.width = prod + 'px';
//             // document.getElementById('adder').appendChild(ele);



//         })

//     });
// }
// setInterval(newProductivity(), 2000);