var chatText = document.getElementById("chat-text-input");
var threadBackdrop = document.getElementById("thread-backdrop");
var chatContainer = document.getElementById("chat-container");
var threadButton = document.getElementById("thread-icon");
var closeButton = document.getElementsByClassName("chat-close-button")[0];
var chatAccept = document.getElementsByClassName("chat-accept-button")[0];

function showChat(event) {
	chatContainer.style.display = "block";
	threadBackdrop.style.display = "block";
	chatText.value = "";
}

function closeChat(event) {
	chatContainer.style.display = "none";
	threadBackdrop.style.display = "none";
}

function insertNewScoreboard(teamOneName, teamOneScore, teamTwoName, teamTwoScore){
	var scoreboardTemplate = Handlebars.templates.scoreBoard;
	var scoreboardHTML = scoreboardTemplate ({
		teamOneName: teamOneName,
		teamOneScore: teamOneScore,
		teamTwoName: teamTwoName,
		teamTwoScore: teamTwoScore
	});

	var scoreContainer = document.querySelector('.score-container');
	scoreContainer.insertAdjacentHTML('beforeend', scoreboardHTML);
}

var allTeams = [];

function clearSearchAndReinsertScoreboards() {
	document.getElementById('navbar-search-input').value = "";
	doSearchUpdate();
}

function scoreboardMatchesSearchQuery(scoreboard, searchQuery) {
	if(!searchQuery) {
		return true;
	}

	searchQuery = searchQuery.trim().toLowerCase();

	return (scoreboard.teamOneName + " " + scoreboard.teamTwoName).toLowerCase().indexOf(searchQuery) >= 0;
}

function doSearchUpdate() {
	var searchQuery = document.getElementById('navbar-search-input').value;

	var scoreContainer = document.querySelector('.score-container');

	if(scoreContainer) {
		while(scoreContainer.lastChild) {
			scoreContainer.removeChild(scoreContainer.lastChild);
		}
	}

	allTeams.forEach(function (scoreboard) {
		if(scoreboardMatchesSearchQuery(scoreboard, searchQuery)) {
			insertNewScoreboard(scoreboard.teamOneName, scoreboard.teamOneScore, scoreboard.teamTwoName, scoreboard.teamTwoScore);
		}
	});
}

function parseScoreboardElem(scoreboardElem) {
	var scoreboard = {};

	var scoreboardTextElem = scoreboardElem.querySelector('.team-one-name');
	scoreboard.teamOneName = scoreboardTextElem.textContent.trim();

	var scoreboardScoreElem = scoreboardElem.querySelector('.team-one-score');
	scoreboard.teamOneScore = scoreboardScoreElem.textContent.trim();

	var scoreboardText2Elem = scoreboardElem.querySelector('.team-two-name');
	scoreboard.teamTwoName = scoreboardText2Elem.textContent.trim();

	var scoreboardScore2Elem = scoreboardElem.querySelector('.team-two-score');
	scoreboard.teamTwoScore = scoreboardScore2Elem.textContent.trim();

	return scoreboard;
}

function sendMessage() {
	var text = document.getElementById('chat-text-input').value.trim();
	if(!text) {
		alert("Please enter a message, unless you are a Warriors fan...");
	} else {

	var time = new Date();
	var hour = time.getHours();
	var minutes = time.getMinutes();
	time = hour + ":" + minutes;

	var request = new XMLHttpRequest();
	var url = "/";

	request.open('POST', url);

	var requestBody = JSON.stringify({
		text: text,
		time: time
	});

	request.addEventListener('load', function (event) {
		console.log(event.target.status);
		if (event.target.status == 200) {
			var messageTemplate = Handlebars.templates.message;
			var newMessageHTML = messageTemplate({
				text: text,
				time: time
			});
		var chatContainer = document.querySelector('.comments');
		chatContainer.insertAdjacentHTML('beforeend', newMessageHTML);
		} else {
			alert("Error storing message: " + event.target.response);
		}

	});
	
	document.getElementById('chat-text-input').value = "";
	request.setRequestHeader('Content-Type', 'application/json');
	request.send(requestBody);
	}
}

window.addEventListener('DOMContentLoaded', function () {

var scoreboardElemsCollection = document.getElementsByClassName('scoreboard');
	for(var i = 0; i < scoreboardElemsCollection.length; i++) {
		allTeams.push(parseScoreboardElem(scoreboardElemsCollection[i]));
	}

var searchButton = document.getElementById('navbar-search-button');
	if (searchButton) {
	searchButton.addEventListener('click', doSearchUpdate);
	}
var searchInput = document.getElementById('navbar-search-input');

	if (searchInput) {
		searchInput.addEventListener('input', doSearchUpdate);
	}

	if (threadButton) {
		threadButton.addEventListener('click', showChat);
	}

	if (chatAccept) {
		chatAccept.addEventListener('click', sendMessage);
	}

	if (closeButton) {
		closeButton.addEventListener('click', closeChat);
	}

});
