// JS injections

class TimeCalculate {	

    private timeOrphan: any;
    private totalTime: number;
    private URL: string;
    private timeViewed: any;
    private stopTime: any;
    private startTime: number=0;

    constructor() {	
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
            	
        }, 3000)	
    }	
    
    calculate() {	
        return 3;	
    }	

    diffTime() {	
        this.timeViewed = Math.abs(this.stopTime - this.startTime); 	
        alert('Time viewed : '+this.timeViewed);	
        console.log('Time Watched : '+this.timeViewed)	
    }	

    addCurrentUrlAfterCheckMemory() {
        chrome.storage.local.get('mainMemory', (details) => {
            let allUrls = details.mainMemory.allUrls;
            console.warn('allUrls below')
            console.warn(allUrls);
            
            var i;
            let present = false;
            for(i=0;i<allUrls.length;++i){
                if(allUrls[i].url == this.URL){
                    present = true;
                    break;
                }
            }
    
            if (! (present)) {
                    allUrls.push({url:this.URL, time:''});
                    details.mainMemory.allUrls = allUrls;
                    console.log('updated urls below')
                    console.log(allUrls)
                    chrome.storage.local.set({'mainMemory': details.mainMemory})
            }
        });
    }

    savedArticles() {
        var DOMs = document.querySelectorAll('body');
        var articleSize = DOMs.length;
        console.warn('Current Article size : '+articleSize)
        console.warn('DOMs below')
        var message:String = '', date:any = Date();
    
        for(let i=0; i< DOMs.length; i++) {
            message += DOMs[i].innerHTML;
        }
        console.log('content page is below')
        console.log(message)
    
    
        var messageObject = {
            'URL': document.URL,
            'message':message,
            'date': date
        }
    
        chrome.runtime.sendMessage({savedArticles: messageObject})
        // currently the Mobile Application feature is disabled, until the base of the extension matures
        /*  
        $.ajax({
            url:'http://127.0.0.1:5000/saveArticle',
            data: 'object=' +JSON.stringify(messageObject)  ,
            success: function(r,status){
                console.warn('ajax request with result: '+r+' status: '+status);
            },
            error: function(xhr,status,error){
                throw error;
            }
        })
        */
    }
}	

let object = new TimeCalculate();	
window.onload = function() {
    object.startTimerCounter();
    object.addCurrentUrlAfterCheckMemory();
}


