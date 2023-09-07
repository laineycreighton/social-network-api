const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController.js");

//Get All Users
router.route("/").get(getUsers).post(createUser);

//Get A User
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

//Get A Single User's Friend
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;