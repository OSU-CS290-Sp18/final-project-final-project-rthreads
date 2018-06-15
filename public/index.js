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




function insertNewMessage(){
	var messageText = document.getElementById('chat-text-input').value;
	var messageTime = new Date();
	var hour = messageTime.getHours();
	var minutes = messageTime.getMinutes();
	messageTime = hour + ":" + minutes;
	var messageTemplate = Handlebars.templates.message;
	var newMessageHTML = messageTemplate ({
		text : messageText,
		time: messageTime
	});
	var chatContainer = document.querySelector('.comments');
	chatContainer.insertAdjacentHTML('beforeend', newMessageHTML);
	document.getElementById('chat-text-input').value = " ";

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
		chatAccept.addEventListener('click', insertNewMessage);
	}

	if (closeButton) {
		closeButton.addEventListener('click', closeChat);
	}

});
