// DEPENDENCIES
// ====================================================
const db = require("../models/");


// ROUTERS
// ====================================================
module.exports = function(app) {
  // Get last workout.
  app.get('/api/workouts', (req, res) => {
    db.Workout.find({}).sort({ day: -1 }).limit(1)
      .then(lastWorkout => {
        console.log("--- Last Workout ---");
        console.log(lastWorkout);
        res.json(lastWorkout);
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      });
  })

  // Get last 7 workouts.
  app.get('/api/workouts/range', (req, res) => {
    db.Workout.find({}).sort({ day: -1 }).limit(7)
      .then(weekWorkouts => {
        console.log("--- Last 7 Workouts ---");
        console.log(weekWorkouts);
        res.json(weekWorkouts.reverse());
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      });
  })

  // Create a new workout.
  app.post('/api/workouts', (req, res) => {
    db.Workout.create(req.body)
      .then(newWorkout => {
        console.log("--- New Workout ---");
        console.log(newWorkout);
        res.json({ _id: newWorkout._id });
      })
      .catch(err => {
        console.log(err);
      })
  })

  // Modify current workout with new exercise.
  app.put('/api/workouts/:id', (req, res) => {
    console.log('--- Add Exercise ---')
    console.log(req.body);
    db.Workout.findOneAndUpdate({ _id: req.params.id },
      { $push: { exercises: req.body }}, { new: true })
      .then(updWorkout => {
        console.log('--- Updated Workout ---');
        console.log(updWorkout);
        res.json(updWorkout);
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      });
  });
}