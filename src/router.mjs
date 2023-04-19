import bootcamp from "./bootcamp/bootcamp.mjs";
import express from "express";
import sepgit from "./sepgit/sepgit.mjs";

const router = express.Router();

router.use('/sepgit',sepgit);
router.use('/bootcamp',bootcamp);

export default router;