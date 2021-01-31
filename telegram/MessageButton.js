class MessageButton {
    getInlineKeyboardButton(text) {
        return [{
            text,
            callback_data: text
        }]
    }
    getInlineKeyboardMarkup(text) {
        return { inline_keyboard: [this.getInlineKeyboardButton(text)]}
    }
}

module.exports = MessageButton;