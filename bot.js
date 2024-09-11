const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const cheerio = require('cheerio');
const cron = require('node-cron');

const token = 'YOUR_TELEGRAM_BOT_TOKEN';
const chatId = 'YOUR_CHAT_ID'; // Replace with your chat ID or the recipient's chat ID

const bot = new TelegramBot(token, { polling: true });

// Function to check award availability
async function checkAvailability() {
  try {
    const response = await axios.get('URL_TO_AIRLINE_AWARD_PAGE');
    const $ = cheerio.load(response.data);

    // Adjust the selector based on the website's HTML
    const available = $('#availability').text(); 

    // Send the result to Telegram
    bot.sendMessage(chatId, `Award availability: ${available}`);
  } catch (error) {
    console.error('Error checking availability:', error);
    bot.sendMessage(chatId, 'Failed to check award availability.');
  }
}

// Schedule the bot to run every hour
cron.schedule('0 * * * *', () => {
  console.log('Checking availability...');
  checkAvailability();
});

console.log('Bot is running and will check availability every hour.');
