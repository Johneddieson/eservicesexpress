const { createUser, updateUser, deleteUser, getUser, getUserByID,
    login} = require("./user.controller")
const router = require("express").Router();
const { checkToken } = require("../../auth/token-validation");

router.post("/createuser", createUser);
router.patch("/updateuser", updateUser);
router.post("/deleteuser", deleteUser);
router.get("/getuser", getUser);
router.get("/getuserById/:id", getUserByID);
router.post("/login", login)
module.exports = router;


