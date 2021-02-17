const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  cardio: {
    name: String,
    distance: Number,
    duration: Number
  },
  resistance: {
    name: String,
    weight: Number,
    sets: Number,
    reps: Number,
    duration: Number
  }
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;