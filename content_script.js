console.log("Content script")
var conversions_dict = {}


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
    console.dir(el)
    var src_str = $(el).html();
    var term = text.replace(/(\s+)/,"(<[^>]+>)*$1(<[^>]+>)*");
    var pattern = new RegExp("("+term+")", "gi");
    //console.dir(src_str)

    src_str = src_str.replace(pattern, "<mark>$1</mark>");
    src_str = src_str.replace(/(<mark>[^<>]*)((<[^>]+>)+)([^<>]*<\/mark>)/,"$1</mark>$2<mark>$4");

    $(el).html(src_str);
}

// Add listener 
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log("Content script received message")

    // Confirm message and execute callback function
    if(message.text == "match_found") {
        console.log("Sending DOM content")

        chrome.runtime.sendMessage({text: document.body.innerText}, 
        // Callback function should take array of dicts that need to be converted
        function(dict) {
            // Get all text nodes
            //var text_nodes = get_text_nodes()
			conversions_dict = dict["dict"]


            // // Test highlighting
            // $('span').highlight('Bose');
            // console.log("THE ELEMENT FOR BOSE IS: ")

            // var c = $(arr[0]+":contains('0.20 kg')").attr("class");
            // console.log("The class is: ")
            // console.dir(c)
            var highlighting_enabled = true
            highlighting_enabled = localStorage.getItem("highlight");

            // For every key, do the conversion
			for(var key in conversions_dict) {
				if(conversions_dict.hasOwnProperty(key)) {

                    // Loop through array
                    for(var val in conversions_dict[key]) {

                        if(highlighting_enabled) {
                            //highlight(conversions_dict[key][val])

                            var spanClass = "highlight"
                            var replaceWith = "<mark> " + conversions_dict[key][val] + "</mark>"
                            document.body.innerHTML = document.body.innerHTML.replace(key, replaceWith)
                            console.log("The current key is: " + key)
                            //$('body').text().highlight('Bose');
                        }

                        //document.body.innerHTML = document.body.innerHTML.replace(key, conversions_dict[key][val])

                        console.log("Calling convert_units on " + key + " and converting to " + conversions_dict[key][val])
                        
                    }
				}
			}


    
        });
    }
});
