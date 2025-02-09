let captchaText = '';

function generateCaptcha() {
    const canvas = document.getElementById('captcha');
    const ctx = canvas.getContext('2d');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 6;
    captchaText = '';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#000000';

    for (let i = 0; i < length; i++) {
        const char = chars.charAt(Math.floor(Math.random() * chars.length));
        captchaText += char;
        ctx.fillText(char, (i + 0.5) * (canvas.width / length), canvas.height / 2);
    }
}

function validateCaptcha() {
    const userInput = document.getElementById('captchaInput').value;
    fetch('/validate-captcha', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ captchaText, userInput })
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('message').textContent = data.message;
        });
}

generateCaptcha();