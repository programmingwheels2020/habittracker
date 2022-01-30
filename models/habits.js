const mongoose = require("mongoose")

const HabitSchema = new mongoose.Schema({
    name: { type: String },
    category: { type: mongoose.Types.ObjectId },
    weeklyGoal: { type: Number },
    unit: { type: String }
})

module.exports = mongoose.model("Habit", HabitSchema);