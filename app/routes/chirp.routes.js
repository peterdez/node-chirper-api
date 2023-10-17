module.exports = app => {
    const chirps = require("../controllers/chirp.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Chirp
    router.post("/", chirps.create);
  
    // Retrieve all Chirps
    router.get("/", chirps.findAll);
  
    // Retrieve all published Chirps
    router.get("/published", chirps.findAllPublished);
  
    // Retrieve a single chirp with id
    router.get("/:id", chirps.findOne);
  
    // Update a Chirp with id
    router.put("/:id", chirps.update);
  
    // Delete a Chirp with id
    router.delete("/:id", chirps.delete);
  
    // Delete all Chirps
    router.delete("/", chirps.deleteAll);
  
    app.use('/api/chirps', router);
  };