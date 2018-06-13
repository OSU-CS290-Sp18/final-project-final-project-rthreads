var allScoreboards = [];
var chatText = document.getElementById("chat-text-input");
var threadBackdrop = document.getElementById("thread-backdrop");
var chatContainer = document.getElementById("chat-container");
var threadButton = document.getElementById("thread-icon");
var closeButton = document.getElementsByClassName("chat-close-button")[0];

function showChat(event) {
	chatContainer.style.display = "block";
	threadBackdrop.style.display = "block";
	chatText.value = "";
}

function closeChat(event) {
	chatContainer.style.display = "none";
	threadBackdrop.style.display = "none";
}

function clearSearchAndReinsertTwits() {
	document.getElementById('navbar-search-input').value = "";
	doSearchUpdate();
}

function teamsMatchesSearchQuery(scoreboard, searchQuery) {

  if (!searchQuery) {
    return true;
  }

  searchQuery = searchQuery.trim().toLowerCase();
  return (scoreboard.team-one-name + " " + scoreboard.team-two-name).toLowerCase().indexOf(searchQuery) >= 0;
}

function doSearchUpdate(){
	var searchQuery = document.getElementById('navbar-search-input').value;

  var scoreContainer = document.querySelector('.score-container');
  if (scoreContainer) {
    while (scoreContainer.lastChild) {
      scoreContainer.removeChild(scoreContainer.lastChild);
    }
  }
}

function parseTeamElem(scoreboardElem) {
	var scoreboard = {};
	var scoreboardTextElem = scoreboardElem.querySelector('.team-one-name');
	scoreboard.text = scoreboardTextElem.textContent.trim();
	return scoreboard;
}

window.addEventListener('DOMContentLoaded', function () {

  var scoreboardElemsCollection = document.getElementsByClassName('scoreboard');
  for (var i = 0; i < scoreboardElemsCollection.length; i++) {
    allScoreboards.push(parseScoreboardElem(scoreboardElemsCollection[i]));
  }
//var threadButton = document.getElementbyId('thread-icon');
	if(threadButton){
		threadButton.addEventListener('click', showChat);
	}
//var closeButton = document.getElementbyID('chat-close-bottom');
	if(closeButton){
		closeButton.addEventListener('click', closeChat);
	}
	var searchButton = document.getElementById('navbar-search-button');
  if (searchButton) {
    searchButton.addEventListener('click', doSearchUpdate);
  }

  var searchInput = document.getElementsById('navbar-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', doSearchUpdate);
  }
});
