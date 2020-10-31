/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

 const resume = require('../resume.json');
 const { Botkit, BotkitConversation } = require('botkit');

function payloadCreator (obj, label) {
  let subjects = []
  if (Array.isArray(obj)) {
    obj.forEach(function(ele) {
      subjects.push(
        {
          title: ele[label],
          payload: ele[label],
        }
        )
    });
  } else if(typeof obj === "string"){
      subjects.push(
        {
          title: obj,
          payload: obj,
        });
  } else if(obj[0] != undefined){
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

module.exports = function(controller) {
  if (controller.adapter.name === 'Web Adapter') {
    console.log('Loading sample web features...');

    let array = []
    let hashIndex = {}
    controller.hears(hashIndex, 'message', async (bot, message) => {
      console.log('yayay')
      await bot.reply(message,{
          text: 'Here are some quick replies',
          quick_replies: subjects[hashIndex[`${message['text']}`]]
      });

    })

    let subjects = resume
    controller.hears("resume", 'message', async (bot, message) => {
      subjects = resume
      await bot.reply(message,{
          text: 'Here are some quick replies',
          quick_replies: payloadCreator(resume, "")
      });

      controller.hears(Object.keys(subjects), 'message', async (bot, message) => {
        subjects = subjects[`${message["text"]}`]
        let name = ''
        if (Array.isArray(subjects)) {
          name = Object.keys(subjects[0])[0];
          await bot.reply(message,{
            text: `Here are some quick replies for ${message['text']}`,
            quick_replies: payloadCreator(subjects, `${name}`)
          });
          let idx = 0
          subjects.forEach(function(ele) {
            hashIndex[ele[name]] = idx
            idx += 1
          });
        } else {
          if ( subjects[0] != undefined && typeof subjects[0] != 'string' ) {
            subjects = subjects[0]
          }
          await bot.reply(message,{
              text: `Here are some quick replies for ${message['text']}`,
              quick_replies: payloadCreator(subjects, `${message["text"]}`)
          });
        }

        controller.hears( Object.keys(subjects).concat(Object.keys(hashIndex)), 'message', async (bot, message) => {
          
          if ( Array.isArray(subjects) || typeof subjects  === 'string'){
            await bot.reply(message,{
              text: subjects[hashIndex[message['text']]]
            });
          } else {
            subjects = subjects[`${message["text"]}`]
            if ( subjects[0] != undefined && typeof subjects[0] != 'string' ) {
              subjects = subjects[0]
            }
            await bot.reply(message,{
                text: `Here are some quick replies for ${message['text']}`,
                quick_replies: payloadCreator(subjects, `${message["text"]}`)
            });
          }
        });
      });
    });
  }
}
