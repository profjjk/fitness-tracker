const db = require("../models");

module.exports = function(app) {
  // Get last workout.
  app.get('api/workouts', (req, res) => {
    db.Workout.findOne({})
      .then(dbWorkout => {
        console.log(dbWorkout)
        res.json(dbWorkout)
      })
      .catch(err => {
        console.log(err)
        res.json(err);
      });
  })
  // Get last 7 workouts.
  app.get('api/workouts/range', (req, res) => {
    db.Workout.find({}).limit(7)
      .then(dbWorkout => {
        console.log(dbWorkout)
        res.json(dbWorkout)
      })
      .catch(err => {
        console.log(err)
        res.json(err);
      });
  })
  // Create a new workout.
  app.post('/api/workouts', ({ body }, res) => {
    db.Workout.create(body)
      .then(dbWorkout => {
        console.log(dbWorkout)
      })
      .catch(err => {
        console.log(err)
      })
  })
  // Modify current workout with new exercise.
  app.put('/api/workouts/:id', ({ body }, res) => {
    db.Exercise.create(body)
      .then(({ _id }) => db.Workout.findOneAndUpdate({}, // How to get workout ID for query?
        { $push: { exercises: _id }}, { new: true }))
      .then(dbWorkout => {
        console.log(dbWorkout)
        res.json(dbWorkout);
      })
      .catch(err => {
        console.log(err)
        res.json(err)
      });
  });
}