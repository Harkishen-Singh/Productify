chrome.storage.local.get('mainMemory', (details) => {
    let allUrls:any = details.mainMemory.allUrls, 
        allURlsNode: string = '',allBlockedNodes:string = '',
        blockedWebsites:any = details.mainMemory.blockedWebsites,
        timeused:number = 0,
        p_time:string = '';
    console.warn(allUrls)

    if (!(allUrls.length===1 && allUrls[0].url==="https://www.defaultsomethingss.com/*")) {
        for (var i = (allUrls.length)-1; i > 0; i--) {
            timeused = allUrls[i].time;
            //to display time in secs,mins and hours

            if(timeused < 60){ //timeused is in secconds
                p_time = timeused + " secs";
            }
            else if(timeused >= 3600){
                if(Math.floor(timeused / 3600) > 1){
                    // x= timeused/ 3600;
                    p_time = Math.floor(timeused/3600) + "hrs " + Math.floor((timeused/3600 - Math.floor(timeused/3600))*60) + "mins";
                }
                else{

                    p_time = Math.floor(timeused/3600) + "hr " + Math.floor((timeused/3600 - Math.floor(timeused/3600))*60) + "mins";
                }
            }
            else{
                p_time = timeused/60 + " mins";
            }

            console.log(p_time);
            if(p_time === " secs")
                p_time = "0 secs"

                console.log(p_time);
            if (allUrls[i].title.length > 48){
                
                allURlsNode += '<div class="row" style="border-bottom: 1px solid black;margin:5px;padding-bottom: 5px;max-width:100%;">' +
                '<div class="col-md-10" style="font-size:15px;"><sup><span style="padding-right:5px;background-color:red;color:white;border-radius:5px;padding:3px;font-size:12px;" >'
                + p_time + '</span></sup> <b> ' + allUrls[i].title.substring(0,47)+'....' + ' </b></div>' +
                '<div class="col-md-2"><button id="' + allUrls[i].url + '" class="btn btn-danger" style="font-size:10px;">Block</button></div></div>';
            }
            else{
                allURlsNode += '<div class="row" style="border-bottom: 1px solid black;margin:5px;padding-bottom: 5px;max-width:100%;">' +
                '<div class="col-md-10" style="font-size:15px;"><sup><span style="padding-right:5px;background-color:red;color:white;border-radius:5px;padding:3px;font-size:12px" >'
                + p_time + '</span></sup> <b> ' + allUrls[i].title + ' </b></div>' +
                '<div class="col-md-2"><button id="' + allUrls[i].url + '" class="btn btn-danger" style="font-size:10px;">Block</button></div></div>';
            }
        }
        
        document.getElementById('all_urls_view').innerHTML=allURlsNode;
        for(let i =1; i< allUrls.length; i++) {
            document.getElementById(allUrls[i].url).addEventListener('click',addBlocking, false);
        }
    } else {
        document.getElementById('all_urls_view').innerHTML= 'No websites Visited Yet.';
    }
    

    // blocked ones
    console.warn(blockedWebsites)
    
    if (!(blockedWebsites.length===1 && blockedWebsites[0]==='https://www.defaultsomethingss.com/*')) {
        console.warn(blockedWebsites)
        for(let i =0; i< blockedWebsites.length; i++) {
            if (blockedWebsites[i].url === 'https://www.defaultsomethingss.com/*') 
                continue;
                if(blockedWebsites[i].title.length >48){
                        allBlockedNodes += '<div class="row" style="border-bottom: 1px solid black;margin:5px;padding-bottom: 5px;">' +
                        '<div class="col-md-10" style="font-size:15px;"> <b> ' + blockedWebsites[i].title.substring(0,47) + '....'+ ' </b></div>' +
                        '<div class="col-md-2"><button id="' + blockedWebsites[i].url + '" class="btn btn-success" style="font-size:10px;">Allow</button></div></div>';
                    }
                else{
                        allBlockedNodes += '<div class="row" style="border-bottom: 1px solid black;margin:5px;padding-bottom: 5px;">' +
                        '<div class="col-md-10" style="font-size:15px;"> <b> ' + blockedWebsites[i].title + ' </b></div>' +
                        '<div class="col-md-2"><button id="' + blockedWebsites[i].url + '" class="btn btn-success" style="font-size:10px;">Allow</button></div></div>';
                }
            
        }
        document.getElementById('blocked_urls_view').innerHTML=allBlockedNodes;
        for(let i =0; i< blockedWebsites.length; i++) {
            if(!(blockedWebsites[i].url === 'https://www.defaultsomethingss.com/*'))
            document.getElementById(blockedWebsites[i].url).addEventListener('click',removeBlocking, false)
        }
    } else {
        document.getElementById('blocked_urls_view').innerHTML= 'No websites Blocked.';
    }
    let words = details.mainMemory.dictionaryWords;
    let wordsNode = '';
    for(let i =0; i< words.length; i++) {
        wordsNode += '<div class="row" style="margin:5px;padding-bottom: 10px;"></div>' +
            '<div style="font-size:15px;"> <b>'+ words[i].word + ' </b></div>'; 
    }
    document.getElementById('word_view').innerHTML=wordsNode;
    
});

function addBlocking( this: HTMLElement, element: any) {
    console.log('thisss' + this.id)
    console.log(this.id)
    let title = '';
    chrome.storage.local.get('mainMemory', (details) => {
        if (! (this.id in details.mainMemory.blockedWebsites)) {
            
            let allURls = details.mainMemory.allUrls;
            for(let j=0;j<allURls.length; j++) {
                if(allURls[j].url===this.id) {
                    console.warn('same URL found. deleting from allowed list')
                    title = allURls[j].title;
                    console.log(title);
                    allURls.splice(j,1)
                }
            }
            details.mainMemory.blockedWebsites.push({url:this.id, title:title});
            chrome.storage.local.set({'mainMemory': details.mainMemory})
            alert('Added '+title+' to List of Blocked websites');
            window.location.reload();
        }
    })
}

function removeBlocking(this: HTMLElement, element: any) {
    console.log('removeBLocking invoked' + this.id)
    console.log(this.id)
    let title = '';
    chrome.storage.local.get('mainMemory', (details) => {
        if (! (this.id in details.mainMemory.blockedWebsites)) {
            let blockedWebsites = details.mainMemory.blockedWebsites;
            for(let j=0;j<blockedWebsites.length; j++) {
                if(blockedWebsites[j].url===this.id ) {
                    console.warn('***deleting from blocked list')
                    console.warn('j is '+j)
                    title = details.mainMemory.blockedWebsites[j].title;
                    details.mainMemory.blockedWebsites.splice(j,1)
                    console.warn(details.mainMemory.blockedWebsites)
                }
            }
            details.mainMemory.allUrls.push({url:this.id, time:'',title:title});
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
        let allSavedArticles: any = details.savedArticlesCodeZero.savedArticles;
        let orderedList: HTMLElement = document.createElement('ol');
        let totalArticles: number = allSavedArticles.length;

        // for(let i=0; i< totalArticles; i++) {
        //     let x = document.createElement('p');
        //     x.id = allSavedArticles[i].URL;
        //     x.innerHTML = allSavedArticles[i].URL + '<br>';
        //     x.addEventListener('click', assignActionsArticles, false )
        //     document.getElementById('articleTitle').appendChild(x)
        // }

        if (totalArticles) {
            for(let i=0; i< totalArticles; i++) {
                let List = document.createElement('li');
                // List.id = allSavedArticles[i].URL;
                console.log("z")
                List.innerHTML = '<div class="row" style="padding-top:5px;padding-bottom:5px;"><div id="'+ allSavedArticles[i].URL +'" class="col-md-10"><b>'+ allSavedArticles[i].title
                +'</b></div>'+'<div id ="'+ allSavedArticles[i].title +'" class="col-md-2">'
                +'<img style ="height:25px;width:25px;" src="'+ chrome.extension.getURL('icons/trash.png') +'"  /> </div></div>';
                console.log(List.innerHTML);
                console.log("x")
                // List.addEventListener('click', assignActionsArticles, false );
                // document.getElementById(allSavedArticles[i].title).addEventListener('click',removeArticle, false);
                orderedList.appendChild(List);
                console.log(orderedList)

            }
            document.getElementById('articleTitle').appendChild(orderedList);
            for(let i =1; i< totalArticles; i++) {
                document.getElementById(allSavedArticles[i].title).addEventListener('click',removeArticle, false);
            }

        } else {
            let element: HTMLElement = document.createElement('p');
            element.innerHTML = 'No articles saved Yet.';
            document.getElementById('articleTitle').appendChild(element);
            document.getElementById('articleBody').innerHTML = "<span style='margin-left:20px;'>Empty!<br> Please click the download Icon on the bottom left of the page"+
                " to save the Article for offline view.</span>";
        }
        
    })
} articleViewHandler();

function assignActionsArticles(this: HTMLElement, el: any) {
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

function removeArticle(this:HTMLElement, el:any){
    console.log('remove the article' + this.id);
    let id = this.id;
    let url = '';
    chrome.storage.local.get('savedArticlesCodeZero', (details) => {
        let allSavedArticles: any = details.savedArticlesCodeZero.savedArticles;
        
        for(let j=0;j<allSavedArticles.length; j++) {
            console.log("Reached")
            if(allSavedArticles[j].title===this.id) {
                console.warn('same URL found. deleting from saved Articles')
                url = allSavedArticles[j].url;
                console.log(this.id);
                details.savedArticlesCodeZero.savedArticles.splice(j,1)
            }
        }
        
        chrome.storage.local.set({'savedArticlesCodeZero': details.savedArticlesCodeZero})
        alert('Removed '+this.id+' from Articles');
        window.location.reload();
    })
}