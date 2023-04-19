import express from 'express';
import {authenticateToken} from "../auth/jwt.service.mjs";
import {
    addVideoCourse,
    deleteVideoCourse,
    getVideoCourse,
    updateVideoCourse,
    uploadVideoCourse
} from "./video-course.service.mjs";

const videoCourseController = express.Router();

videoCourseController.post('/add-video-course',authenticateToken,uploadVideoCourse.single('image'),addVideoCourse);
videoCourseController.put('/update-video-course/:id',authenticateToken,uploadVideoCourse.single('image'),updateVideoCourse);
videoCourseController.patch('/delete-video-course/:id',authenticateToken,deleteVideoCourse);
videoCourseController.get('/get-video-course',getVideoCourse);
export default videoCourseController;