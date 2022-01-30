const bot = require("./config/botconfig")
const Category = require("./models/category");
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_URI);
const { InlineKeyboard, ReplyKeyboard, ForceReply, Row, KeyboardButton, InlineKeyboardButton } = require("node-telegram-keyboard-wrapper");
const callbackQuery = require("./callbackquery");
const Activity = require("./models/activity")
const activityStore = require("./models/activityState");
bot.onText(/\/add_activity/, async (msg, match) => {

    try {
        const chatId = msg.chat.id;
        const resp = `Please select the category`;
        let categoryList = await Category.find({});
        const inlineKeyboard = new InlineKeyboard();
        for (let category of categoryList) {
            let lastRow = new Row(
                new InlineKeyboardButton(category.name, "callback_data", `addactvity_category_${category._id}`)
            )
            inlineKeyboard.push(lastRow);
        }
        const options = {
            reply_markup: inlineKeyboard.getMarkup()
        }
        bot.sendMessage(chatId, resp, options);
    } catch (err) {
        console.log(err);
        console.log(err.message);
    }

});

callbackQuery(bot);

bot.on('message', async (msg) => {
    try {
        if (msg.text == "/add_activity") {
            return;
        }
        const chatId = msg.chat.id;
        let state = activityStore.get(chatId);
        console.log(state);
        if (state && typeof state == 'object') {
            const activity = new Activity({
                chatId: chatId,
                habit: state['habit'],
                quantity: parseInt(msg.text)
            })
            await activity.save();
        }
        bot.sendMessage(chatId, 'Successfuly Saved Activity');
    } catch (err) {
        console.log(err.message);
    }

});