/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

 const { Botkit, BotkitConversation } = require('botkit');

module.exports = function(controller) {

    controller.hears('sample','message,direct_message', async(bot, message) => {
        await bot.reply(message, 'I heard a sample message.');
    });

    controller.hears('hi','message,direct_message', async(bot, message) => {
        await bot.reply(message, 'Hi you.');
    });

    controller.on('message,direct_message', async(bot, message) => {
        await bot.reply(message, `Echo: ${ message.text }`);
    });
}
