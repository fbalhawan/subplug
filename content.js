let subtitles = [];
let subtitleDiv = null;


function appendForm() {
    console.log("Called!");
    const formHtml = `
    <form id="myForm">
      <label for="fname">First Name:</label><br>
      <input type="text" id="fname" name="fname"><br>
      <label for="lname">Last Name:</label><br>
      <input type="text" id="lname" name="lname">
      <input type="submit" value="Submit">
    </form>`;

    // YouTube video description container
    const descriptionDiv = document.querySelector('#bottom-row #description');

    if (descriptionDiv) {
        const div = document.createElement('div');
        div.innerHTML = formHtml;
        descriptionDiv.appendChild(div);
    } else {
        console.log('Cannot find the description div');
    }
}


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
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
        video.ontimeupdate = function () {
            subtitleDiv.textContent = '';
            for (let subtitle of subtitles) {
                if (video.currentTime >= subtitle.start && video.currentTime <= subtitle.end) {
                    subtitleDiv.textContent = subtitle.text;
                }
            }
        }
    }
});

console.log("Calling append")
appendForm();