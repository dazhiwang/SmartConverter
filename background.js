var amazon_url = /^https?:\/\/(?:[^./?#]+\.)?amazon\.com/;

//Global dict variable to hold array of units
var units_dictionary = {
	// length (metric)
	"kilometers":1000, "km":1000, "meters":1.0, "m":1.0, "centimeters":0.01, "cm":0.01, "Millimeters":0.001, "mm":0.001, 
	// length (imperial)
	"miles":1609.34, "mi.":1609.34, "yards":0.9144, "yd.":0.9144, "feet":0.3048, "ft.":0.3048, "Inches":0.0254, "in.":0.0254,
	// weight (metric)
	"kilograms":1000, "kg":1000, "grams":1.0, "g":1.0,
	// weight (imperial)
	"pounds":453.592, "lb.":453.592, "ounces":28.3495, "oz.":28.3495,
	// volume (metric)
	"liters":1000, "L":1000, "milliliters":1.0, "mL":1.0,
	// volume (imperial)
	"gallons":3785.41, "gal.":3785.41, "pints":473.176, "pt.":473.176
};

var length_metric_units = {
	"kilometers":true, "km":true, "meters":true, "m":true, "centimeters":true, "cm":true, "Millimeters":true, "mm":true
}

var length_imperial_units = {
	"miles":true, "mi.":true, "yards":true, "yd.":true, "feet":true, "ft.":true, "Inches":true, "in.":true
}

var weight_metric_units = {
	"kilograms":true, "kg":true, "grams":true, "g":true
}

var weight_imperial_units = {
	"pounds":true, "lb":true, "ounces":true, "oz":true
}

var volume_metric_units = {
	"liters":true, "L":true, "milliliters":true, "mL":true
}

var volume_imperial_units = {
	"gallons":true, "gal":true, "pints":true, "pt":true
}

function print_words(wordArr) {
	
	for(x = 0; x < wordArr.length; ++x) {
		console.log(wordArr[x])
		console.log('\n')
	}
}

// test for chrome storage API
var settings_dict = {"length":"m", "weight":"kg", "volume":"mL"};
chrome.storage.sync.set(settings_dict);

// When browser action button is clicked, add listener
chrome.tabs.onUpdated.addListener(function(id, info, tab) {
	console.log("Tab was updated")
	var active_tab_url = tab.url

	// If page load is complete, tab is active, and current tab is amazon, send message to content script
	if(info.status == "complete" && tab.active && active_tab_url.match(amazon_url)) {

		// Query tabs for current tab
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {text: "match_found"})
			console.log("Message sent to content script with tab id: " + tabs[0].id)
		});
	} else {
		console.log("Site is not amazon")
	}
})

// Call process words when page_reader sends dom content
chrome.runtime.onMessage.addListener(
	function(message, sender, sendResponse) {
		console.log("Received dom content")
		console.dir(message)

		var wordArr = [];
		var text = message.text

		wordArr = text.split(/\s+/);

		console.log("Printing wordArr")

		//get settings information from chrome.storage
		var settings = {"length": "m", "weight":"kg", "volume":"mL"}

		var converted_dict = {};

		// Loop through words to find units
		for(x = 0; x < wordArr.length; ++x) {
			word = wordArr[x]
			// Check if current word is in dictionary of units
			if(word in units_dictionary) {
				
				
				console.log("The word " + word + " is a unit")
				if (length_metric_units[word] || length_imperial_units[word]) { // check if it's length unit
					console.log("This word is unit of length")
					if (settings["length"] == "metric") { // convert to metric
						if (length_imperial_units[word]) { // check if conversion needed
							var target_unit = "";
							var converted_val = "";
							var tmp_val = parseFloat(wordArr[x-1])*units_dictionary[word];
							if (tmp_val >= 500) {
								target_unit = "km";
							}
							else if (tmp_val >= 0.5 && tmp_val < 500) {
								target_unit = "m";
							}
							else if (tmp_val >= 0.005 && tmp_val < 0.5) {
								target_unit = "cm";
							}
							else {
								target_unit = "mm";
							}
							converted_val = (tmp_val/units_dictionary[target_unit]).toFixed(2).toString();
							converted_dict[wordArr[x-1]+" "+word] = converted_val+" "+target_unit;
						}
					}
					else if (settings["length"] == "imperial"){ // convert to imperial
						if (length_metric_units[word]) { // check if conversion needed
							var target_unit = "";
							var converted_val = "";
							var tmp_val = parseFloat(wordArr[x-1])*units_dictionary[word];
							if (tmp_val >= 804.672) {
								target_unit = "mi.";
							}
							else if (tmp_val >= 0.4572 && tmp_val < 804.672) {
								target_unit = "yd.";
							}
							else if (tmp_val >= 0.1524 && tmp_val < 0.4572) {
								target_unit = "ft.";
							}
							else {
								target_unit = "in.";
							}
							converted_val = (tmp_val/units_dictionary[target_unit]).toFixed(2).toString();
							converted_dict[wordArr[x-1]+" "+word] = converted_val+" "+target_unit;
						}
					}
					else { // convert to specified unit
						
						var target_unit = settings["length"];
						console.log("The target unit is: " + target_unit)
						var converted_val = (parseFloat(wordArr[x-1])*units_dictionary[word]/units_dictionary[target_unit]).toFixed(2).toString();
						console.log("The converted val is: " + converted_val)
						converted_dict[wordArr[x-1]+" "+word] = converted_val+" "+target_unit;
					}
				}
				else if (weight_metric_units[word] || weight_imperial_units[word]) { // check if it's weight unit

					console.log("This word is unit of weight")
					if (settings["weight"] == "metric") {
						if (weight_imperial_units[word]) {
							var target_unit = "";
							var converted_val = "";
							var tmp_val = parseFloat(wordArr[x-1])*units_dictionary[word];
							if (tmp_val >= 500) {
								target_unit = "kg";
							}
							else {
								target_unit = "g";
							}
							converted_val = (tmp_val/units_dictionary[target_unit]).toFixed(2).toString();
							converted_dict[wordArr[x-1]+" "+word] = converted_val+" "+target_unit;
						}
					}
					else if (settings["weight"] == "imperial") {
						if (weight_metric_units[word]) {
							var target_unit = "";
							var converted_val = "";
							var tmp_val = parseFloat(wordArr[x-1])*units_dictionary[word];
							if (tmp_val >= 226.796) {
								target_unit = "lb.";
							}
							else {
								target_unit = "oz.";
							}
							converted_val = (tmp_val/units_dictionary[target_unit]).toFixed(2).toString();
							converted_dict[wordArr[x-1]+" "+word] = converted_val+" "+target_unit;
						}
					}
					else {
						var target_unit = settings["weight"];
						var converted_val = (parseFloat(wordArr[x-1])*units_dictionary[word]/units_dictionary[target_unit]).toFixed(2).toString();
						console.log("The previous word is: " + wordArr[x-1])
						console.log("The target unit is " + target_unit + " and the converted value is " + converted_val)
						converted_dict[wordArr[x-1]+" "+word] = converted_val+" "+target_unit;
					}
				}
				else if (volume_metric_units[word] || volume_imperial_units[word]) { // check if it's volume unit
					if (settings["volume"] == "metric") {
						if (volume_imperial_units[word]) {
							var target_unit = "";
							var converted_val = "";
							var tmp_val = parseFloat(wordArr[x-1])*units_dictionary[word];
							if (tmp_val >= 500) {
								target_unit = "L";
							}
							else {
								target_unit = "mL";
							}
							converted_val = (tmp_val/units_dictionary[target_unit]).toFixed(2).toString();
							converted_dict[wordArr[x-1]+" "+word] = converted_val+" "+target_unit;
						}
					}
					else if (settings["volume"] == "imperial") {
						if (volume_metric_units[word]) {
							var target_unit = "";
							var converted_val = "";
							var tmp_val = parseFloat(wordArr[x-1])*units_dictionary[word];
							if (tmp_val >= 1892.71) {
								target_unit = "gal.";
							}
							else {
								target_unit = "pt.";
							}
							converted_val = (tmp_val/units_dictionary[target_unit]).toFixed(2).toString();
							converted_dict[wordArr[x-1]+" "+word] = converted_val+" "+target_unit;
						}
					}
					else {
						var target_unit = settings["volume"];
						var converted_val = (parseFloat(wordArr[x-1])*units_dictionary[word]/units_dictionary[target_unit]).toFixed(2).toString();
						converted_dict[wordArr[x-1]+" "+word] = converted_val+" "+target_unit;
					}
				}
			}
		}

	    console.log("Process Complete")
	    console.dir(wordArr)
	    console.log("Converted dict")
	    console.dir(converted_dict)	

		// call sendResponse to send list of units to convert
		sendResponse({dict: converted_dict})
		return true;
	}
);

