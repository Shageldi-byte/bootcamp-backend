import express from "express";
import multer from "multer";
import { addStory, deleteStory, getAllStories, updateStory } from "./story.service.mjs";

const storyController = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/story')
  },
  filename: function (req, file, cb) {
    const extension = file.originalname.split('.').reverse()[0];
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix+'.'+extension);
  }
})

const upload = multer({ storage: storage })

storyController.get('/get-all-stories', getAllStories);
storyController.post('/add-story', upload.single('image'), addStory);
storyController.put('/update-story/:id',upload.single('image'),updateStory)
storyController.delete('/delete-story/:id',deleteStory);

export default storyController;