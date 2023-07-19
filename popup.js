document.getElementById('submit').addEventListener('click', function() {
    let subtitles = document.getElementById('subtitles').value;
    // video = document.getElementsByTagName('video')[0];

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "display", subtitles: subtitles});
    });
});
