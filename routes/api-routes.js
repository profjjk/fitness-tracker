const db = require("../models");

module.exports = function(app) {
  // Get last workout.
  app.get('api/workouts', (req, res) => {
    console.log("Request: ")
    console.log(req)
    db.Workout.find({}) // Missing query parameters
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
    console.log("Request: ")
    console.log(req)
    db.Workout.find({}) // Missing query parameters
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
    console.log("Body: ")
    console.log(body)
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
    // How do I get the id from the URL using { body } ?
    console.log("Body: ")
    console.log(body)
    db.Exercise.create(body)
      .then(({ _id }) => db.Workout.findOneAndUpdate({}, // Missing query parameters
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