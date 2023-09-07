const router = require("express").Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThoughtbyId,
    deleteThoughtbyId,
    addReaction,
    deleteReaction,
} = require("../../controllers/thoughtController.js");


//Get All Thoughts
router.route("/").get(getAllThoughts).post(createThought);

//Get A Thought
router
    .route("/:thoughtId")
    .get(getThoughtById)
    .put(updateThoughtbyId)
    .delete(deleteThoughtbyId);

//Get A Thought's Reactions
router.route("/:thoughtId/reactions").post(addReaction);

//Get A Thought's Single Reaction
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);
module.exports = router;