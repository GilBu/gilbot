/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

 const resume = require('../resume.json');
 const { Botkit, BotkitConversation } = require('botkit');

function payloadCreator (obj) {
  let subjects = []
  if(obj[0] != undefined){
    Object.keys(obj[0]).forEach(function(key) {
      subjects.push(
        {
          title: key,
          payload: key,
        }
        )
      });
  }else {
      Object.keys(obj).forEach(function(key) {
      subjects.push(
        {
          title: key,
          payload: key,
        }
        )
      });
    }
  return subjects
}

function quickReply (last, subjects, controller) {
  
  controller.hears(Object.keys(subjects), 'message', async (bot, message) => {
    subjects = subjects[`${message["text"]}`]
    await bot.reply(message,{
        text: 'Here are some more quick replies',
        quick_replies: payloadCreator(subjects)
    });
  });
  if (typeof subjects != "object") {
    last = true;
  }
  return {last, subjects}
}

module.exports = function(controller) {

  if (controller.adapter.name === 'Web Adapter') {

    console.log('Loading sample web features...');

    controller.hears("resume", 'message', async (bot, message) => {

      await bot.reply(message,{
          text: 'Here are some quick replies',
          quick_replies: payloadCreator(resume)
      });
    });

    // console.log(typeof resume['volunteer'][0]['organization'])
    let pack = {}
    let last = false;
    let subjects = resume;
    pack = quickReply(last, subjects, controller)
    last = pack['last']
    subjects = pack['subjects']
    subjects = quickReply(last, subjects, controller)
    last = pack['last']
    subjects = pack['subjects']

  }

    // let dialog = new BotkitConversation('dialog', controller);

    // dialog.ask('What would you like the quick reply to say?', [], 'reply_title');
    // dialog.say({
    //     text: 'Here is your dynamic button:',
    //     quick_replies: async(template, vars) => { return [{title: vars.reply_title, payload: vars.reply_title }]}
    // });

    // const MY_DIALOG_ID = 'convo';
    // let convo = new BotkitConversation(MY_DIALOG_ID, controller);

    //     // send a greeting
    // convo.say('Howdy!');

    // // ask a question, store the response in 'name'
    // convo.ask('What is your name?', async(response, convo, bot) => {
    //     console.log(`user name is ${ response }`);
    //     // do something?
    // }, 'name');

    // // use add action to switch to a different thread, defined below...
    // convo.addAction('favorite_color');

    // // add a message and a prompt to a new thread called `favorite_color`
    // convo.addMessage('Awesome {{vars.name}}!', 'favorite_color');
    // convo.addQuestion('Now, what is your favorite color?', async(response, convo, bot) => {
    //     console.log(`user favorite color is ${ response }`);
    // },'color', 'favorite_color');

    // // go to a confirmation
    // convo.addAction('confirmation' ,'favorite_color');

    // // do a simple conditional branch looking for user to say "no"
    // convo.addQuestion('Your name is {{vars.name}} and your favorite color is {{vars.color}}. Is that right?', [
    //     {
    //         pattern: 'no',
    //         handler: async(response, convo, bot) => {
    //             // if user says no, go back to favorite color.
    //             await convo.gotoThread('favorite_color');
    //         }
    //     },
    //     {
    //         default: true,
    //         handler: async(response, convo, bot) => {
    //             // do nothing, allow convo to complete.
    //         }
    //     }
    // ], 'confirm', 'confirmation');

    //     controller.addDialog(dialog);

    //     controller.hears('dialog', 'message', async (bot, message) => {
    //         await bot.beginDialog('dialog');
    //     });
}
