var threadBackdrop = document.getElementById("thread-backdrop");
var chatContainer = document.getElementById("chat-container"); 
var threadButton = document.getElementById("thread-icon");


function showChat(event) {
	chatContainer.style.display = "block";
	threadBackdrop.style.display = "block";
}

threadButton.addEventListener('click', showChat);
