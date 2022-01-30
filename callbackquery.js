const Habit = require("./models/habits")
const { InlineKeyboard, ReplyKeyboard, ForceReply, Row, KeyboardButton, InlineKeyboardButton } = require("node-telegram-keyboard-wrapper");
const activityStore = require("./models/activityState");
const callbackQuery = async (bot) => {
    bot.on("callback_query", async (query) => {
        await bot.answerCallbackQuery(query.id, { text: "Action received!" })
        try {

            let queryDataStr = query.data.split('_');
            console.log(queryDataStr)
            if (queryDataStr[0] == "addactvity") {
                if (queryDataStr[1] == "category") {

                    let habitList = await Habit.find({ category: queryDataStr[2] });
                    const inlineKeyboard = new InlineKeyboard();
                    for (let habit of habitList) {
                        let lastRow = new Row(
                            new InlineKeyboardButton(habit.name, "callback_data", `addactvity_habit_${habit._id}`)
                        )
                        inlineKeyboard.push(lastRow);
                    }
                    const options = {
                        reply_markup: inlineKeyboard.getMarkup()
                    }
                    const resp = `Please select the Habit`;
                    bot.sendMessage(query.from.id, resp, options);
                }
                if (queryDataStr[1] == "habit") {
                    activityStore.add({
                        id: query.from.id,
                        habit: queryDataStr[2]
                    })
                    const resp = `Enter Quantity`;
                    bot.sendMessage(query.from.id, resp);
                }
            }

        } catch (err) {
            console.log(err);
        }

    })
}

module.exports = callbackQuery