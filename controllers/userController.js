const { ObjectId } = require("mongoose").Types;
const { default: mongoose } = require("mongoose");
const { User, Thought } = require("../models");

//---------- Get All Users ----------//
module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            return res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //---------- Get A User ----------//
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select("-__v")
                .populate("friends")
                .populate("thoughts");

            if (!user) {
                return res.status(404).json({ message: "No user with that ID" });
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //---------- Create A User ----------//
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    },

    //---------- Update A User ----------//
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!user) {
                return res.status(404).json({ message: "No user found with this id!" });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //---------- Delete A User ----------//
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({
                _id: req.params.userId,
            });

            if (!user) {
                return res.status(404).json({ message: "No such user exists" });
            }

            res.json({ message: "User successfully deleted" });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    //---------- Create A Friend ----------//
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );
            if (!user) {
                return res.status(404).json({ message: "No user found with this id!" });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //---------- Delete A Friend ----------//
    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );
            if (!user) {
                return res.status(404).json({ message: "No user found with this id!" });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};