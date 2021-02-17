const db = require("./models");

module.exports = function(app) {
  // Post new exercise to current workout.
  app.post('/api/workouts', ({ body }, res) => {
    db.Exercise.create(body)
      .then(({ _id }) => db.Workout.findOneAndUpdate({}, 
        { $push: { exercises: _id }}, { new: true }))
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err)
      });
  });
}