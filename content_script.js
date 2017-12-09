var conversions_dict = {}
var highlighting_enabled = "false"

function convert() {

    // For every key, do the conversion
    for(var key in conversions_dict) {
        if(conversions_dict.hasOwnProperty(key)) {

            // Loop through array
            for(var val in conversions_dict[key]) {

                if(highlighting_enabled === "true") {

                    var spanClass = "highlight"
                    var replaceWith = "<mark> " + conversions_dict[key][val] + "</mark>"
                    document.body.innerHTML = document.body.innerHTML.replace(key, replaceWith)
                } 
                else if(highlighting_enabled === "false"){
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
            //var text_nodes = get_text_nodes()
			conversions_dict = dict["dict"]

            // Send request for highlighting enabled
            chrome.runtime.sendMessage({method: "getHighlighting"}, function(response) {
                console.dir(response.status)
                highlighting_enabled = response.status
            });

            setTimeout(convert, 2000)

        });
    }
});
