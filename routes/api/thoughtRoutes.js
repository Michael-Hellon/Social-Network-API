const router = require('express').Router();

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction
} = require("../../controllers/thoughtController.js");

// /api/thoughts
router.route("/")
  .get(getAllThoughts)
  .post(createThought);

// /api/thoughts/:id
router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought); 

// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions")
  .post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId")
  .post(deleteReaction);



module.exports = router;