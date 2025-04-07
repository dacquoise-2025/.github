"use strict"
//==========================================
const BOT_TOKEN = '8097089647:AAH5mvaphEFw_WCdpddfQ2RSGju2Gx4dPYQ'; // замени на токен своего бота
const CHAT_ID = '-4634341701';     // замени на ID своего чата
const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

function sendEmailTelegram(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  const message = `
<b>Новая заявка с сайта</b>
Имя: ${formData.get('fname')}
Фамилия: ${formData.get('lname')}
Телефон: ${formData.get('uphone')}
Email: ${formData.get('umail')}
Сообщение: ${formData.get('ucomm')}
  `;

  fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
      parse_mode: 'HTML'
    })
  })
  .then(response => {
    if (response.ok) {
      document.querySelector('.form__send-result').textContent = 'Сообщение отправлено!';
      form.reset();
    } else {
      document.querySelector('.form__send-result').textContent = 'Ошибка при отправке.';
    }
  })
  .catch(error => {
    console.error('Ошибка:', error);
    document.querySelector('.form__send-result').textContent = 'Ошибка сети.';
  });
}
