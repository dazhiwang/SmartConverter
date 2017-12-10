var conversions_dict = {}
var highlighting_enabled = "false"

function convert() {
    // For every key, do the conversion
    for(var key in conversions_dict) {
        if(conversions_dict.hasOwnProperty(key)) {

            // Loop through array
            for(var val in conversions_dict[key]) {
                if(highlighting_enabled === "true") {
                    console.log("The key is " + key + " and converting to " + conversions_dict[key][val])
                    var spanClass = "highlight"
                    var replaceWith = "<mark> " + conversions_dict[key][val] + "</mark>"
                    document.body.innerHTML = document.body.innerHTML.replace(key, replaceWith)

                } 
                if(highlighting_enabled === "false"){
                    document.body.innerHTML = document.body.innerHTML.replace(key, conversions_dict[key][val])
                }
                
            }
        }
    }
} 

// Add listener 
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {

    // Confirm message and execute callback function
    if(message.text == "match_found") {

        chrome.runtime.sendMessage({text: document.body.innerText}, 

        // Callback function should take array of dicts that need to be converted
        function(dict) {
            // Get all text nodes
            conversions_dict = dict["dict"]
            var bool_str = ""


            // Send request for highlighting enabled
            chrome.runtime.sendMessage({method: "getHighlighting"}, function(response) {
                highlighting_enabled = response.status
            });

            setTimeout(convert, 1000)

        });
    }
});