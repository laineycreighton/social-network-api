//Models & Mongoose Tools
const { User, Thought } = require("../models");
const { ObjectId } = require("mongoose").Types;
const { default: mongoose } = require("mongoose");

module.exports = {

    //---------- Get All Thoughts ----------//
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //---------- Get A Thought ----------//
    async getThoughtById(req, res) {
        try {
            const thought = await Thought.findOne({
                _id: req.params.thoughtId,
            }).select("-__v");
            if (!thought) {
                res.status(404).json({ message: "No thought found with this id!" });
                return;
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //---------- Create A Thought ----------//
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thought._id } },
                { new: true }
            );
            if (!user) {
                res.status(404).json({ message: "No user found with this id!" });
                return;
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //---------- Update A Thought ----------//
    async updateThoughtbyId(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!thought) {
                return res
                    .status(404)
                    .json({ message: "No thought found with this id!" });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //---------- Delete A Thought ----------//
    async deleteThoughtbyId(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({
                _id: req.params.thoughtId,
            });
            if (!thought) {
                return res
                    .status(404)
                    .json({ message: "No thought found with this id!" });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //---------- Create A Reaction ----------//
    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: { reactions: req.body } },
                { runValidators: true, new: true }
            );
            if (!thought) {
                return res
                    .status(404)
                    .json({ message: "No thought found with this id!" });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //---------- Delete A Reaction ----------//
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );
            if (!thought) {
                return res
                    .status(404)
                    .json({ message: "No thought found with this id!" });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};