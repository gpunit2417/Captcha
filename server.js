// const express = require('express');
// const bodyParser = require('body-parser');
// const session = require('express-session');

// const app = express();
// const port = 3000;

// app.use(bodyParser.json());
// app.use(express.static('public'));

// app.use(session({
//     secret: 'your_secret_key', // Change this to a secure key
//     resave: false,
//     saveUninitialized: true
// }));

// // Endpoint to generate and store captcha
// app.get('/generate-captcha', (req, res) => {
//     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let captchaText = '';
//     for (let i = 0; i < 6; i++) {
//         captchaText += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
//     req.session.captchaText = captchaText; // Store in session
//     res.json({ captchaText });
// });

// // Validate captcha
// app.post('/validate-captcha', (req, res) => {
//     const { userInput } = req.body;
//     const storedCaptcha = req.session.captchaText;

//     if (storedCaptcha && storedCaptcha === userInput) {
//         res.json({ message: 'CAPTCHA validated successfully!' });
//     } else {
//         res.json({ message: 'CAPTCHA validation failed. Please try again.' });
//     }
// });

// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path'); // Import path module

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Session setup
app.use(session({
    secret: 'gdtvbiidh-21332', 
    resave: false,
    saveUninitialized: true
}));

// Serve index.html at root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Generate captcha
app.get('/generate-captcha', (req, res) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captchaText = '';
    for (let i = 0; i < 6; i++) {
        captchaText += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    req.session.captchaText = captchaText; // Store in session
    res.json({ captchaText });
});

// Validate captcha
app.post('/validate-captcha', (req, res) => {
    const { userInput } = req.body;
    const storedCaptcha = req.session.captchaText;

    if (storedCaptcha && storedCaptcha === userInput) {
        res.json({ message: 'CAPTCHA validated successfully!' });
    } else {
        res.json({ message: 'CAPTCHA validation failed. Please try again.' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
