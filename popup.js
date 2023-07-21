let submitBtn = document.getElementById('submit');
let openFormBtn = document.getElementById('openFormBtn');


if (document.readyState !== 'loading') {
    appendForm();
}
else{
    document.addEventListener("DOMContentLoaded", async () => {
        console.log("Loaded")
        
        const queryParameters = activeTab.url.split("?")[1];
        const urlParameters = new URLSearchParams(queryParameters);
        const currentVideo = urlParameters.get("v");
        
        console.log("currentView: ",currentVideo);
        
    });
}


// Function that appends a form under a YouTube video
function appendForm() {
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