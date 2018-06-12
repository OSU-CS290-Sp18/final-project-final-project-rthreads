var allTeams = [];
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

function teamsMatchesSearchQuery(teams, searchQuery) {

  if (!searchQuery) {
    return true;
  }

  searchQuery = searchQuery.trim().toLowerCase();
  return (teams.name + " " + teams.score).toLowerCase().indexOf(searchQuery) >= 0;
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

window.addEventListener('DOMContentLoaded', function () {

  var teamsElemsCollection = document.getElementsByClassName('teams');
  for (var i = 0; i < teamsElemsCollection.length; i++) {
    allTeams.push(parseTeamElem(twitTeamsCollection[i]));
  }
var threadButton = document.getElementbyId('thread-icon');
	if(threadButton){
		threadButton.addEventListener('click', showChat);
	}
var closeButton = document.getElementbyID('chat-close-bottom');
	if(closeButton){
		closeButton.addEventListener('click', closeChat);
	}
var searchButton = document.getElementById('navbar-search-button');
  if (searchButton) {
    searchButton.addEventListener('click', doSearchUpdate);
  }

  var searchInput = document.getElementById('navbar-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', doSearchUpdate);
  }
});
