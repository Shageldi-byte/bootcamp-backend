import express from 'express';
import {authenticateToken} from "../auth/jwt.service.mjs";
import {
    addCourseItem,
    deleteCourseItem,
    getCourseItems,
    updateCourseItem,
    uploadCourseItem
} from "./course-item.service.mjs";

const courseItemController = express.Router();

courseItemController.post('/add-course-item',authenticateToken,uploadCourseItem.single('icon'),addCourseItem);
courseItemController.put('/update-course-item/:id',authenticateToken,uploadCourseItem.single('icon'),updateCourseItem);
courseItemController.patch('/delete-course-item/:id',authenticateToken,deleteCourseItem);
courseItemController.get('/get-course-items-by-id/:type/:course_id', getCourseItems);

export default courseItemController;