
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

// articles

function savedArticles() {
    var DOMs = document.querySelectorAll('h, p, div');
    console.warn('DOMs below')
    var message = '', date = Date(Date.now())

    for(let i=0; i< DOMs.length; i++) {
        message += DOMs[i].innerText;
    }
    console.log('content page is below')
    console.log(message)


    var messageObject = {
        'URL': document.URL,
        'message':message,
        'date': date
    }

    chrome.runtime.sendMessage({savedArticles: messageObject})
} savedArticles();



// $.ajax({
//     url:'https://localhost:5000',
//     data: 'object=' +JSON.stringify(messageObject)  ,
//     success: function(r,status){
//         console.warn('ajax request with result: '+r+' status: '+status);
//     },
//     error: function(xhr,status,error){
//         throw error;
//     }
// })

class TimeCalculate {	
    constructor() {	
        this.startTime = '';	
        this.stopTime = '';	
        this.timeOrphan = new Date();	
        this.totalTime = 0; // in seconds	
        this.URL = document.URL;	
    }	
    startTimerCounter() {	
        this.startTime = this.timeOrphan;	
        setInterval(() => {	
            this.totalTime += this.calculate();	
            let objectDOM = {	
                'url':this.URL,	
                'totalTime':this.totalTime	
            }	
            chrome.runtime.sendMessage({domOBJ: objectDOM})	
            	
        }, 7000)	
    }	
    calculate() {	
        return 7;	
    }	
    diffTime() {	
        this.timeViewed = Math.abs(this.stopTime - this.startTime); 	
        alert('Time viewed : '+this.timeViewed);	
        console.log('Time Watched : '+this.timeViewed)	
    }	
}	
 let object = new TimeCalculate();	
window.onload = object.startTimerCounter();	
