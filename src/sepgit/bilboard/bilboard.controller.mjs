import express from "express";
import multer from "multer";
import { addBilboard, deleteBilboard, getBilboards, updateBilboard } from "./bilboard.service.mjs";

const bilboardController = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/bilboard')
  },
  filename: function (req, file, cb) {
    const extension = file.originalname.split('.').reverse()[0];
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix+'.'+extension);
  }
})

const upload = multer({ storage: storage })

bilboardController.get('/get-bilboards',getBilboards);
bilboardController.post('/add-bilboard',upload.fields([
    {name: 'image_tm', maxCount: 1},
    {name: 'image_ru', maxCount: 1},
    {name: 'image_en', maxCount: 1},
]), addBilboard);
bilboardController.put('/update-bilboard/:id',upload.fields([
    {name: 'image_tm', maxCount: 1},
    {name: 'image_ru', maxCount: 1},
    {name: 'image_en', maxCount: 1},
]), updateBilboard);
bilboardController.delete('/delete-bilboard/:id',deleteBilboard);

export default bilboardController;