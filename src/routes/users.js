const router = require("express").Router();
const {getUsers,getUser,createUsers,updateUser,deleteUser} = require("../controlers/users")

router.get("/users", getUsers);
router.get("/users/:user_id", getUser);
router.post("/users", createUsers);
router.patch("/users/:user_id", updateUser);
router.delete("/users/:user_id", deleteUser);

module.exports = router;