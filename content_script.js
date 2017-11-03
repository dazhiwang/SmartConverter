console.log("Content script")

// Add listener 
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log("Content script received message")

    // Confirm message and execute callback function
    if(message.text == "match_found") {
        console.log("Sending DOM content")
        console.dir(document.body.innerText);

        chrome.runtime.sendMessage({text: document.body.innerText}, 
        // Callback function should take array of dicts that need to be converted
        function(dict) {
            console.log("We can now show converted units on page")

            // Work to display converted units goes here


    
        });
    }
});
