const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;
const baseUrl = 'http://backend:80/api/v1';

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Routes for the application
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to get the chatbot response
app.post('/getChatbotResponse', async (req, res) => {
    const userMessage = req.body.userMessage;
    // Call the FastAPI endpoint
    try {
        console.log(`Sending message: ${userMessage}`);
        const response = await axios.get(baseUrl + '/chatbot', {
            params: {
                message: userMessage
            }
        });
        const chatbotResponse = response.data.response;
        // Send the response back to the client
        res.json({ chatbotResponse });
    } catch (error) {
        console.error(error);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});