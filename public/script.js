let captchaText = '';

function generateCaptcha() {
    fetch('/generate-captcha')
        .then(response => response.json())
        .then(data => {
            captchaText = data.captchaText; // Get from server
            const canvas = document.getElementById('captcha');
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = '30px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#000000';

            for (let i = 0; i < captchaText.length; i++) {
                ctx.fillText(captchaText[i], (i + 0.5) * (canvas.width / captchaText.length), canvas.height / 2);
            }
        });
}

function validateCaptcha() {
    const userInput = document.getElementById('captchaInput').value;

    fetch('/validate-captcha', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userInput })
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('message').textContent = data.message;
        });
}

generateCaptcha();
