/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const resume = require('../resume.json');

module.exports = function(controller) {

    controller.hears('sample','message,direct_message', async(bot, message) => {
        await bot.reply(message, 'I heard a sample message.');
    });

    let subjects = []

    Object.keys(resume).forEach(function(key) {
        subjects.push(key)
    });

    console.log(subjects);

    controller.hears('hi','message,direct_message', async(bot, message) => {
        await bot.reply(message, 'Hi you.');
    });

    controller.on('message,direct_message', async(bot, message) => {
        await bot.reply(message, `Echo: ${ message.text }`);
    });

}
