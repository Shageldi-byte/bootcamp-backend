import express from "express";
import multer from "multer";
import { addMedia, deleteMedia, getMedia, updateMedia } from "./media.service.mjs";

const mediaController = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/media')
  },
  filename: function (req, file, cb) {
    const extension = file.originalname.split('.').reverse()[0];
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix+'.'+extension);
  }
})

const upload = multer({ storage: storage })

mediaController.get('/get-media-by-type', getMedia);
mediaController.post('/add-media',upload.fields([
    {name: 'image',maxCount: 1},
    {name:'media_file',maxCount: 1}
]),addMedia);
mediaController.put('/update-media/:id',upload.fields([
    {name: 'image',maxCount: 1},
    {name:'media_file',maxCount: 1}
]),updateMedia);
mediaController.delete('/delete-media/:id',deleteMedia);

export default mediaController;