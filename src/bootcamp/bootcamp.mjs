import authController from "./auth/auth.controller.mjs";
import express from "express";
import courseController from "./course/course.controller.mjs";
import courseItemController from "./course-item/course-item.controller.mjs";
import videoCourseController from "./video-course/video-course.controller.mjs";
import videoCourseItemController from "./video-course-item/video-course-item.controller.mjs";
import otherController from "./other/other.controller.mjs";

const bootcamp = express.Router();

bootcamp.use('/auth', authController);
bootcamp.use('/course',courseController);
bootcamp.use('/course-item',courseItemController);
bootcamp.use('/video-course',videoCourseController);
bootcamp.use('/video-course-item',videoCourseItemController);
bootcamp.use('/other',otherController);

export default bootcamp;