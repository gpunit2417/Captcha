const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/validate-captcha', (req, res) => {
  const { captchaText, userInput } = req.body;

  if (captchaText == userInput) {
    res.json({ message: 'CAPTCHA validated successfully!' });
  } else {
    res.json({ message: 'CAPTCHA validation failed. Please try again.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});