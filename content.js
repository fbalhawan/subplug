let subtitles = [];
let subtitleDiv = null;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "display") {
        subtitles = JSON.parse(request.subtitles);
        
        // If the div doesn't exist, create it
        if (!subtitleDiv) {
            subtitleDiv = document.createElement('div');
            subtitleDiv.style.position = 'fixed';
            subtitleDiv.style.bottom = '10px';
            subtitleDiv.style.left = '50%';
            subtitleDiv.style.fontSize = '80px';
            subtitleDiv.style.backgroundColor = 'rgba(0,0,0,0.3)';
            //subtitleDiv.style.opacity = '40%';
            subtitleDiv.style.color = 'white';
            document.body.appendChild(subtitleDiv);
        }

        // Assume the first video on the page is the one to be subtitled
        let video = document.getElementsByTagName('video')[0];
        video.ontimeupdate = function() {
            subtitleDiv.textContent = '';
            for (let subtitle of subtitles) {
                if (video.currentTime >= subtitle.start && video.currentTime <= subtitle.end) {
                    subtitleDiv.textContent = subtitle.text;
                }
            }
        }
    }
});
