var reddit_url = /^https?:\/\/(?:[^./?#]+\.)?amazon\.com/;

//Global dict variable to hold array of units
var units_dictionary = {
	"lb": 1, "kg": 1, "oz": 1, "m": 1
}

// When browser action button is clicked, add listener
chrome.tabs.onUpdated.addListener(function(id, info, tab) {
	console.log("Tab was updated")
	var active_tab_url = tab.url

	// If page load is complete, tab is active, and current tab is reddit, send message to content script
	if(info.status == "complete" && tab.active && active_tab_url.match(reddit_url)) {

		// Query tabs for current tab
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {text: "match_found"})
			console.log("Message sent to content script with tab id: " + tabs[0].id)
		});
	} else {
		console.log("Site is not reddit")
	}
})

// Call process words when page_reader sends dom content
chrome.runtime.onMessage.addListener(
	function(message, sender, sendResponse) {
		console.log("Received dom content")
		console.dir(message)

		var wordArr = [];
		var text = message.text
		wordArr = text.split(" ");

		// Loop through words to find units
		for(x = 0; x < wordArr.length; ++x) {

			// Check if current word is in dictionary of units
			if(wordArr[x] in units_dictionary) {
				// Get the number one before it in the array, i.e. 100 pounds 
				// Do stuff here

			}
		}

	    console.log("Process Complete")
	    console.dir(wordArr)	

		// call sendResponse to send list of units to convert
		sendResponse({dict: wordArr})
		return true;
	}
);

