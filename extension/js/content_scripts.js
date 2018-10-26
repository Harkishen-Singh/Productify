console.warn('CONTENT SCRIPT IS WORKING')
let url = document.URL;
console.warn('URL of the website is '+url)

// chrome.webRequest.onBeforeRequest

if (0) {
    console.warn('got inside the loop')
    let blockingElement = document.createElement('div');
    blockingElement.id = '__blocking_node__';

    blockingElement.style.height = '100%';
    blockingElement.style.width = '100%';
    blockingElement.style.position = 'absolute';
    blockingElement.style.right = '0px';
    blockingElement.style.top = '0px';
    let content = document.createElement('h1');
    blockingElement.appendChild(content);
    document.appendChild(blockingElement);
}