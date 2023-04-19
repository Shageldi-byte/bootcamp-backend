import bilboardController from "./bilboard/bilboard.controller.mjs";
import express from "express";
import mediaController from "./media/media.controller.mjs";
import otherController from "./other/other.controller.mjs";
import storyController from "./story/story.controller.mjs";

const sepgit = express.Router();

sepgit.use('/story',storyController);
sepgit.use('/media',mediaController);
sepgit.use('/bilboard',bilboardController);
sepgit.use('/other',otherController);

export default sepgit;