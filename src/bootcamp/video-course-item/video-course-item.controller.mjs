import express from 'express';
import {authenticateToken} from "../auth/jwt.service.mjs";
import {
    deleteVideoCourseItem, getVideoCourseItem,
    insertVideoItem,
    updateVideoCourseItem,
    uploadVideoCourseItem
} from "./video-course-item.service.mjs";

const videoCourseItemController = express.Router();

videoCourseItemController.post('/add-video-course-item',authenticateToken,uploadVideoCourseItem.single('video'),insertVideoItem);
videoCourseItemController.put('/update-video-course-item/:id',authenticateToken,uploadVideoCourseItem.single('video'),updateVideoCourseItem);
videoCourseItemController.patch('/delete-video-course-item/:id',authenticateToken,deleteVideoCourseItem);
videoCourseItemController.get('/get-video-course-item-by-video-id/:id',getVideoCourseItem);
export default videoCourseItemController;