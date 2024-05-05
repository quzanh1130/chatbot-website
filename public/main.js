const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');

userInput.addEventListener('keypress', function(event) {
    if (event.keyCode == 13) {
        event.preventDefault(); // Prevents the default action
        sendMessage();
    }
});

function sendMessage() {
    const message = userInput.value;
    // Display user's message
    displayMessage('user', message);
    // Call OpenAI API to get chatbot's response
    getChatbotResponse(message);
    // Clear user input
    userInput.value = '';
}

// Listen for the Enter key to send a message
function displayMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    // Wrap the message in a <p> tag
    const messageParagraph = document.createElement('p');
    messageParagraph.innerText = message;
    // Append the <p> tag to the message element
    messageElement.appendChild(messageParagraph);
    chatLog.appendChild(messageElement);
    // Scroll to the bottom of the chat log
    chatLog.scrollTop = chatLog.scrollHeight;
}

// Function to get chatbot's response
function getChatbotResponse(userMessage) {
    // Make a request to your server with the user's message
    fetch('/getChatbotResponse', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userMessage }),
    })
    .then(response => response.json())
    .then(data => {
        // Display chatbot's response
        displayMessage('chatbot', data.chatbotResponse);
    });
}