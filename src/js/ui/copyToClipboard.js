import { shortLink } from '../buisness/shortener';

const copyBtn = document.getElementById('shortener-copyBtn');

copyBtn?.addEventListener('click', (event) => {
  event.preventDefault();
  copyBtn.classList.add('checkmark');
  copyTextToClipboard(shortLink.value)
    .then(() => setTimeout(() => copyBtn.classList.remove('checkmark'), 1000));
});


async function copyTextToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log('copied to clipboard'); //ВРЕМЕННАЯ СТРОЧКА ДЛЯ ОТЛАДКИ
  } catch (error) {
    console.error(error); //ВРЕМЕННАЯ СТРОЧКА ДЛЯ ОТЛАДКИ
  };
};