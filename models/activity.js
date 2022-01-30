const mongoose = require("mongoose")

const ActivitySchema = new mongoose.Schema({
    chatId: { type: Number },
    habit: { type: mongoose.Types.ObjectId },
    quantity: { type: Number }
}, { timestamps: true })

module.exports = mongoose.model("Activity", ActivitySchema);