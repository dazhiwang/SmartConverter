var conversions_dict = {}
var highlighting_enabled = "false"


function contains(selector, text) {
  var elements = document.querySelectorAll(selector);
  return Array.prototype.filter.call(elements, function(element){
    return RegExp(text).test(element.textContent);
  });
}

function highlight(text) {

    // Get element for text
    var arr = contains('body', text)
    var el = arr[0]
    var src_str = $(el).html();
    var term = text.replace(/(\s+)/,"(<[^>]+>)*$1(<[^>]+>)*");
    var pattern = new RegExp("("+term+")", "gi");
    //console.dir(src_str)

    src_str = src_str.replace(pattern, "<mark>$1</mark>");
    src_str = src_str.replace(/(<mark>[^<>]*)((<[^>]+>)+)([^<>]*<\/mark>)/,"$1</mark>$2<mark>$4");

    $(el).html(src_str);
}

function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
        end = new Date().getTime();
    }
}

function convert() {
            // Set highlighting enabled
            //if(bool_str == "false") { highlighting_enabled = false } else {highlighting_enabled = true}

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
            //var text_nodes = get_text_nodes()
			conversions_dict = dict["dict"]
            var bool_str = ""


            // Send request for highlighting enabled
            chrome.runtime.sendMessage({method: "getHighlighting"}, function(response) {
                highlighting_enabled = response.status
            });

setTimeout(convert, 2000)
            // Set highlighting enabled
            //if(bool_str == "false") { highlighting_enabled = false } else {highlighting_enabled = true}
        });
    }
});
