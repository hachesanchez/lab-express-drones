const express = require('express');
const router = express.Router();

const Drone = require('./../models/Drone.model')


// Iteration #2: List the drones
router.get('/drones', (req, res, next) => {
  //res.send('hollaaa funciona')
  Drone
    .find()
    .sort({ name: 1 })
    .then(drones => res.render('drones/list', { drones }))
    .catch(err => console.log(err))
});


// Iteration #3: Add a new drone (render)
router.get('/drones/create', (req, res, next) => {
  res.render('drones/create-form')
});


// Iteration #3: Add a new drone (handler)
router.post('/drones/create', (req, res, next) => {

  const { name, propellers, maxSpeed } = req.body

  Drone
    .create({ name, propellers, maxSpeed })
    .then(res.redirect(`/drones`))
    .catch(err => console.log(err))
});


// Iteration #4: Update the drone
router.get('/drones/:id/edit', (req, res, next) => {

  const { id } = req.params

  Drone
    .findById(id)
    .then(dron => res.render('drones/update-form', dron))
    .catch(err => console.log(err))
});


// Iteration #4: Update the drone
router.post('/drones/:id/edit', (req, res, next) => {

  const { name, propellers, maxSpeed } = req.body
  const { id } = req.params

  Drone
    .findByIdAndUpdate(id, { name, propellers, maxSpeed })
    .then(res.redirect(`/drones`))
    .catch(err => console.log(err))

});


// Iteration #5: Delete the drone
router.post('/drones/:id/delete', (req, res, next) => {

  const { id } = req.params

  Drone
    .findByIdAndDelete(id)
    .then(res.redirect(`/drones`))
    .catch(err => console.log(err))

});


module.exports = router;
