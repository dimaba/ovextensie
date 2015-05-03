// Structuur webadres 9292ov:
// http://9292.nl/plan/vertrek/2015-05-02T1915?van=groningen&naar=amsterdam
// http://9292.nl/plan/ + vertrek/aankomst + datum jjjj-mm-02 + tijd Tuumm + ? + van=zoektermen%20gescheiden + & + naar=zoektermen%20gescheiden
// hoe ga ik de tijd doen?

chrome.omnibox.onInputChanged.addListener(
  function(text, suggest) {
	text = text.trim();
    suggest([
      //{content: "http://reddit.com/r/" + text.replace(" ",""), description: "Goto /r/" + text.replace(" ","")},
	  //{content: "-m", description: "View extension information and keywords"}
    ]);
  });
  
function process_date(datestring) {
    var date;
    var r_date_in_words  = /\b[0-9]{1,2}\b\s[a-z]+\b(\s[0-9]{4})?/ig;
    var r_date_in_numbers = /(\b[0-9]{1,2}[-.][0-9]{1,2}([-.][0-9]{4})?)/ig;
    var datestring_return;
    
    if (datestring.match(r_date_in_words)) {
        // if this finds a match its guaranteed to be [day][month][?year]
        // should be only one match
        var match_words = datestring.match(r_date_in_words);
        var splitdate = match_words[0].toLowerCase().split(" ");
        if  (splitdate.length === 3) {
            date = [splitdate[2], splitdate[1], splitdate[0]];
        }
        else {
            date = ["2015", splitdate[1], splitdate[0]];
        }
        var months = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];
        var monthnumber = months.indexOf(date[1]) + 1;
        date[1] = monthnumber.toString();
        if (date[1].length === 1) {date[1] = "0" + date[1];}
        if (date[2].length === 1) {date[2] = "0" + date[2];}
        datestring_return = date.join("-");
    } 
    
    else if (datestring.match(r_date_in_numbers)) {
        var match_numbers = datestring.match(r_date_in_numbers).join("");
        var r_parts = /[0-9]+/ig;
        var date_parts = match_numbers.match(r_parts);
        if (date_parts.length === 3) {
            date  = [date_parts[2], date_parts[1], date_parts[0]];
        }
        else {
            date = ["2015", date_parts[1], date_parts[0]];
        }
        if (date[1].length === 1) {date[1] = "0" + date[1];}
        datestring_return = date.join("-");
    }
    
    return datestring_return;
}

function process_time(timestring) {
    var timestring_return;
    var r_time_words = /\b[0-9]{1,2}(\s)?(uur|u|hr)(\s[0-9]{2})?/ig;
    var r_time_numbers = /\b[0-9]{1,2}[.][0-9]{2}/ig;
    var r_numberparts = /[0-9]+/ig;
    var time;
    var splittime;
    
    if (timestring.match(r_time_words)) {
        // should always return in the form of [hr][word][?mins]
        // should always return only one time
        var match_words = timestring.match(r_time_words);
        splittime = match_words[0].match(r_numberparts);
        if (splittime.length === 2) {
            time = [splittime[0],splittime[1]];
        }
        else {
            time = [splittime[0], "00"];
        }
        if (time[0].length === 1) {time[0] = "0" + time[0];}
        
        timestring_return = time.join("");
    }
    else if (timestring.match(r_time_numbers)) {
        // should always return in the form of [hr][.][mins]
        // should always return only one time
        var match_numbers = timestring.match(r_time_numbers);
        splittime = match_numbers[0].match(r_numberparts);
        time = splittime;
        if (time[0].length === 1) {time[0] = "0" + time[0];}
        
        timestring_return = time.join("");
    }
    return timestring_return;
}


function process_text(text) {
	var splittext = text.toLowerCase().split(" ");
	var urlSet = false;
	var components;
	
	function nextkeyword(splittext){
	    var keywords = ["van", "naar", "via", "op", "om"];
		for (var i = 0; i < splittext.length; i++){
			if (keywords.indexOf(splittext[i]) !== -1) {
				return splittext.slice(0,i);
			}
		}
		return splittext;
	}
	
	function getcomponent(component, text) {
		var index = text.indexOf(component);
		var value;
		
		if (index !== -1) {
			value = nextkeyword(text.slice(index+1));
		}
		else {
			value = null;
		}
		return value;
	}

	//detect search within subreddit
	if (urlSet === false) 
	{	
        components = [
        	{name: "op", value: null},
        	{name: "om", value: null},
        	{name: "van", value: null},
        	{name: "naar", value: null},
        	{name: "via", value: null}
        ];
		for (var i = 0; i < components.length; i++) {
			components[i] = getcomponent(components[i].name, splittext);
		}
		components[0] = components[0].join(" ");
		components[1] = components[1].join(" ");
		components[2] = components[2].join("-");
		components[3] = components[3].join("-");
		// only do for via if via is not null
		if (components[4]) {components[4] = components[4].join("-");}
		
		// process date
		components[0] = process_date(components[0]);
		// process time
		components[1] = process_time(components[1]);
	}

	return components;
}

// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(
  function(text) {
	var full_url;
	var urlSet = false;
	var components;
	
	try {components = process_text(text);}
	catch (err) {
	  console.log("TypeError: Could not parse input");
	  console.log(err.message);
	  components = null;
	}

	if (components) {
	  full_url = "http://9292ov.nl/plan" + "/vertrek/" + components[0] + "T" + components[1] + "?van=" + components[2] + "&naar=" + components[3];
    if (components[4]) {full_url = full_url + "&via=" + components[4];}
	  urlSet = true;}
	//detect if a web address has been generated at this point and set if necessary
	if (urlSet === false) {full_url = "http://9292ov.nl/404.html";}
	console.log(full_url);
	
	//goto web page
	chrome.tabs.getSelected(null, function(tab)
	{
		chrome.tabs.update(tab.id, {url: full_url});
	});
  }
);