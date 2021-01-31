require('dotenv').config()
const express = require('express')
const axios = require('axios')

const app = express()
const port = 3000
const baseUrl = 'https://api.telegram.org/bot'

const sq = require('../db/db')
const User = require('../models/users')
const MessageButton = require('../telegram/MessageButton')
const message = new MessageButton()
app.use(require('body-parser').json())

app.post('/:token/setWebhook/', (req, res) => {
  if (req.params.token === process.env.BOT_TOKEN) {
    axios.post(baseUrl + process.env.BOT_TOKEN + '/setWebhook', { url: req.body.url })
      .then(r => {
        // console.log(r)
        res.send('Webhook is set')
      })
      .catch((err) => {
        console.log(err)
        res.status(400).send('Error')
    })
  } else {
    res.status(400).send('Wrong token')
  }
})

app.post('/handler/', async (req, res) => {
  console.log('----------\nmessage:', req.body.message?.text, '\n----------')
  try {
    await User.create({
      firstName: req.body.message.from.first_name,
      lastName: req.body.message.from.last_name,
      username: req.body.message.from.username,
      telegramId: req.body.message.from.id,
    })
  } catch(e) {
    console.log(e)
  }
  if (req.body.message)
    try {
      await axios.post(baseUrl + process.env.BOT_TOKEN + '/sendMessage', { chat_id: req.body.message.chat.id,
        text: 'Hello from server',
        reply_markup: message.getInlineKeyboardMarkup('New Button, Man')
      })
      res.send('Success')
    } catch(e) {
      console.log(e)
      res.status(400).send('Error')
    }
  else if (req.body.callback_query) {
    console.log(req.body.callback_query.data)
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
