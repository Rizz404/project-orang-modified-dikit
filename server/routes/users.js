import express from "express";
import { getUser, getsUserFriends, addRemoveFriend } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getsUserFriends);

/* UPDATE */
// jadi nanti bisa add dan delete friend
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
