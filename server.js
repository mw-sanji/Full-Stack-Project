const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');


const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://shreyans:shreyans1234@cluster0.6w62dne.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Routes
const results = require('./routes/results');
app.use('/api/results', results);

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve the results page
app.get('/results.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'results.html'));
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
