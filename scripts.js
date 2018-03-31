//
// JavaScript Document 
// Author: Chris Obigho
// Build Date: 03/30/2018
//

document.addEventListener('DOMContentLoaded', function(){ 
	document.getElementById("domainform").onsubmit = function() {
		event.preventDefault();
		var div = document.getElementById('content');
		div.innerHTML = '';
		div.innerHTML += '<center><img src="img/loader.gif" alt="loading..."></center>';
		
		var domain = document.getElementById('s').value;
		
		if ( domain == "" ) {
			var fullurl = "https://www.reddit.com/top/.json?count=50";
		} else {
			var newdomain = domain.replace(/\//g, ''); // remove all slashes
			var requrl = "https://www.reddit.com/domain/";
			var fullurl = requrl + domain + ".json";
		};

		function loadJSON(path, success, error){
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function()
			{
				if (xhr.readyState === XMLHttpRequest.DONE) {
					if (xhr.status === 200) {
						if (success)
							success(JSON.parse(xhr.responseText));
					} else {
						if (error)
							error(xhr);
					}
				}
			};
			xhr.open("GET", path, true);
			xhr.send();
		};
		
		loadJSON(fullurl,
			function(data) { 
				//console.log(data); 
				div.innerHTML = '';
				var listing = data.data.children;
				var html = '';
				
				for ( var i=0, l=listing.length; i<l; i++ ) {
					var obj = listing[i].data;
					
					var votes		= obj.score;
					var title		= obj.title;
					var subtime		= obj.created_utc;
					var thumb		= obj.thumbnail;
					var comm		= obj.num_comments;
					var author		= obj.author;
					var subrdt		= "/r/"+obj.subreddit;
					var redditurl	= "http://www.reddit.com"+obj.permalink;
					var subrdturl	= "http://www.reddit.com/r/"+obj.subreddit+"/";
					var exturl		= obj.url;
					
					var timeago = timeSince(subtime);
					
					if (obj.thumbnail === 'default' || obj.thumbnail === 'nsfw' || obj.thumbnail === '') {
						thumb = 'img/default-thumb.png';
					};
					
					html += '<div class="col-12-xs unit mr-3 mb-5">\n';
					html += '<img src="'+thumb+'" class="thumbimg">\n';
					html += '<div class="linkdetails"><h2 class="crunch">'+title+'</h2>\n';
					html += '<p class="crunch">Posted '+timeago+'</p>';
					html += '<p class="crunch">Posted by '+author+'</p>';
					html += '<p class="crunch">Posted to <a href="'+subrdturl+'" target="_blank">'+subrdt+'</a></p>';
					html += '<p class="crunch">'+comm+' Comments</p>';
					html += '<p class="crunch"><a href="'+exturl+'" class="blubtn" target="_blank">visit link</a></p>';
					html += '<p class="crunch"><a href="'+redditurl+'" class="blubtn" target="_blank">view on reddit</a></p>';
					html += '</div></div>\n';
				}
				htmlOutput(html);
			},
			function(xhr) { 
				//console.error(xhr); 
			}
		);
	};
}, false);

function htmlOutput(html) {
	var div = document.getElementById('content');
	div.innerHTML += html;
};

function timeSince(date) {
	var seconds = Math.floor(((new Date().getTime()/1000) - date))
	var interval = Math.floor(seconds / 31536000);
	
	if (interval >= 1) {
		if(interval == 1) return interval + " year ago";
	else 
		return interval + " years ago";
	}
	interval = Math.floor(seconds / 2592000);
	
	if (interval >= 1) {
		if(interval == 1) return interval + " month ago";
	else
		return interval + " months ago";
	}
	interval = Math.floor(seconds / 86400);
	
	if (interval >= 1) {
		if(interval == 1) return interval + " day ago";
	else
		return interval + " days ago";
	}
	interval = Math.floor(seconds / 3600);
	
	if (interval >= 1) {
		if(interval == 1) return interval + " hour ago";
	else
		return interval + " hours ago";
	}
	interval = Math.floor(seconds / 60);
	
	if (interval >= 1) {
		if(interval == 1) return interval + " minute ago";
	else
		return interval + " minutes ago";
	}
	return Math.floor(seconds) + " seconds ago";
};
