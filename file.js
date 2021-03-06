const TeleBot = require('telebot');
const bot = new TeleBot('1957876389:AAGg-_ukeoo3maxsh7jYvOc0Vg04q0vBKAk');

var lastMessage;
var photoUrl = 'https://telegram.org/img/tl_card_destruct.gif';

bot.on('/start', msg => {

    // Send image with caption
    return bot.sendPhoto(
        msg.from.id, photoUrl, {caption: 'This is a default caption.'}
    ).then(re => {
        // Get message id and chat
        lastMessage = [msg.from.id, re.result.message_id];
        bot.sendMessage(msg.from.id, 'Now set a new caption using /edit <caption>');
    });

});

bot.on('/edit', msg => {

    if (!lastMessage) {
        return bot.sendMessage(msg.from.id, 'Type /start and then /edit <caption>');
    }

    let [chatId, messageId] = lastMessage;
    let caption = msg.text.replace('/edit ', '');

    if (caption == '/edit') caption = 'No caption.';

    // Change caption
    return bot.editMessageCaption({chatId, messageId}, caption).then(() => {
        bot.sendMessage(msg.from.id, `Caption changed to: ${ caption }`);
    });

});

bot.start();
