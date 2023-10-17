const db = require("../models");
const Chirp = db.chirps;

// Create and Save a new Chirp
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a Chirp
    const chirp = new Chirp({
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ? req.body.published : false
    });
  
    // Save Chirp in the database
    chirp
      .save(chirp)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Chirp."
        });
      });
  };

// Retrieve all Chirps from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Chirp.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving chirps."
        });
      });
  };

// Find a single Chirp with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Chirp.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Chirp with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Chirp with id=" + id });
      });
  };

// Update a Chirp by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Chirp.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Chirp with id=${id}. Maybe Chirp was not found!`
          });
        } else res.send({ message: "Chirp was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Chirp with id=" + id
        });
      });
  };

// Delete a Chirp with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Chirp.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Chirp with id=${id}. Maybe Chirp was not found!`
          });
        } else {
          res.send({
            message: "Chirp was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Chirp with id=" + id
        });
      });
  };

// Delete all Chirps from the database.
exports.deleteAll = (req, res) => {
    Chirp.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Chirps were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all chirps."
        });
      });
  };

// Find all published Chirps
exports.findAllPublished = (req, res) => {
    Chirp.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving chirps."
        });
      });
  };