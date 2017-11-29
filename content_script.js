console.log("Content script")
var conversions_dict = {}


// var script = document.createElement('script');
// script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js';
// script.type = 'text/javascript';
// document.getElementsByTagName('head')[0].appendChild(script);

// function convert_units(node, key) {
//     // Get all child nodes of current node in array
//     console.log("Current node being checked is: " + node.nodeType)
//     console.log("Length of childnodes is: " + node.childNodes.length)

//     if(node.childNodes.length == 0) { return; }

//     // Loop through all child nodes
//     for(x = 0; x < node.childNodes.length; ++x){
//         // If text node, check to see if contains key
//         if(node.nodeType == 3) {
//             console.log("Node type is text")
//             if(node.textContent.search(key) != -1) {
//                 node.nodeValue = node.nodeValue.replace(key, conversions_dict[key])
//                 console.log("A change was made")
//                 return;
//             } 
//         } else if(node.nodeType == 1) {
//                 //console.log("Node is an element")
//                 // If element, go through child nodes
//                 //console.log("Number of childs nodes for " + node.nodeName + " is " + node.childNodes.length)

//                 var child = node.childNodes[x]
//                 convert_units(child, key)
                
                

//                 // node.childNodes.forEach(function() {
//                 //     console.log("CALLING CHILD NODES FOR node THIS: ")
//                 //     console.dir(this)
//                 //     convert_units(this, key)
//                 // });
//         } 
//     }
// }

// function convert_stuff(text_nodes, key) {
  
//     // Loop through all text nodes
//     for(var x = 0; x < text_nodes.length; ++x) {
//         console.log("Current text_node")
//         console.dir(text_nodes[x].childNodes)
//         // If node contains key, change
//         if(text_nodes[x].nodeValue.indexOf(key) !== -1) {
//                 text_nodes[x].nodeValue = text_nodes[x].nodeValue.replace(key, conversions_dict[key])
//                 console.log("A change was made")
//         } 
//     }

// }


// function get_text_nodes() {
//     var walker = document.createTreeWalker(
//         document.body, 
//         NodeFilter.SHOW_TEXT, 
//         null, 
//         false
//     );

//     var node;
//     var text_nodes = [];

//     while(node = walker.nextNode()) {
//         text_nodes.push(node.nodeValue);
//     }
//     return text_nodes;
// }
function contains(selector, text) {
  var elements = document.querySelectorAll(selector);
  return Array.prototype.filter.call(elements, function(element){
    return RegExp(text).test(element.textContent);
  });
}

function highlight(text) {

    // Get element for text
    var arr = contains('body', 'Bose')
    var el = arr[0]

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
            // For every key, do the conversion
			for(var key in conversions_dict) {
				if(conversions_dict.hasOwnProperty(key)) {

                    // Loop through array
                    for(var val in conversions_dict[key]) {

                        document.body.innerHTML = document.body.innerHTML.replace(key, conversions_dict[key][val])

                
                    // Highlight all instances
                    highlight(conversions_dict[key][val])

                    // Try to get element
                        var spanClass = "highlight"
                        var replaceWith = "<mark> " + conversions_dict[key][val] + "</mark>"
                        //document.body.innerHTML = document.body.innerHTML.replace(conversions_dict[key][val],replaceWith)

                        // Call recursive function
                        console.log("Calling convert_units on " + key + " and converting to " + conversions_dict[key][val])
                    }
 
                    

                    //convert_stuff(text_nodes, key)


				}
			}


    
        });
    }
});

// function highlight(container,what,spanClass) {
//     console.log("Content content")
//     console.dir(container.innerHTML)
//     var content = container.innerHTML
//     var replaceWith = '$1<span ' + ( spanClass ? 'class="' + spanClass + '"' : '' ) + '">$2</span>$3'
//     return (container.innerHTML = highlighted) !== content;
// }

