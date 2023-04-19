import express from 'express';
import {addCourse, deleteCourse, getCourse, getSingleCourse, updateCourse, uploadCourse} from "./course.service.mjs";
import {authenticateToken} from "../auth/jwt.service.mjs";

const courseController = express.Router();

courseController.post('/add-course', authenticateToken, uploadCourse.single('image'), addCourse);
courseController.put('/update-course/:id', authenticateToken, uploadCourse.single('image'), updateCourse);
courseController.patch('/delete-course/:id',authenticateToken,deleteCourse);
courseController.get('/get-courses',getCourse);
courseController.get('/get-single-course/:id',getSingleCourse);

export default courseController;