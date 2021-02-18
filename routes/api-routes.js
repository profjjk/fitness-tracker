// DEPENDENCIES
// ====================================================
const db = require("../models/");


// ROUTERS
// ====================================================
module.exports = function(app) {
  // Get last workout.
  app.get('api/workouts', (req, res) => {
    console.log(req)
    db.Workout.findOne({})
      .then(dbWorkout => {
        console.log("--- Last Workout ---")
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
        console.log("--- Last 7 Workouts ---")
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
        console.log("--- New Workout ---")
        console.log(dbWorkout)
      })
      .catch(err => {
        console.log(err)
      })
  })

  // Modify current workout with new exercise.
  app.put('/api/workouts/:id', ({ body }, res) => {
    console.log('--- Add Exercise ---')
    console.log(body);
    db.Workout.findOneAndUpdate({}, // How do I get the id of the current workout?
      { $push: { exercises: body }}, { new: true })
      .then(dbWorkout => {
        console.log('--- Updated Workout ---')
        console.log(dbWorkout)
        res.json(dbWorkout);
      })
      .catch(err => {
        console.log(err)
        res.json(err)
      });
  });
}

// PROBLEMS
// =================================================
// 1. PUT route: adds exercise to wrong workout. Need to target correct workout by ID. How?
// 2. GET routes do not work at all. Why?