import multer from "multer";
import {
    addVideoCourseQuery,
    deleteVideoCourseQuery,
    getVideoCourseQuery,
    updateVideoCourseQuery
} from "../constant/query.mjs";
import {db} from "../../database/connection.mjs";
import {responseGenerator} from "../../response/app.response.mjs";
import {badRequest} from "../../response/error.response.mjs";

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/bootcamp/video-course/image');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

export const uploadVideoCourse = multer({ storage: storage });

export async function addVideoCourse(req,res){
    const { title_tm, title_ru, title_en, desc_tm, desc_en, desc_ru } = req.body;
    const image = req.file.filename;

    const query = addVideoCourseQuery;
    const values = [title_tm, title_ru, title_en, image, desc_tm, desc_en, desc_ru];

    try {
        const result = await db.query(query, values);
        res.json(responseGenerator(result.rows[0]));
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function updateVideoCourse(req,res){
    const { title_tm, title_ru, title_en, desc_tm, desc_en, desc_ru } = req.body;
    const id = req.params.id;

    let image;
    if (req.file) {
        image = req.file.filename;
    }

    const values = [id, title_tm, title_ru, title_en, desc_tm, desc_en, desc_ru];

    let query = updateVideoCourseQuery;
    if (image) {
        query += ', image = $8';
        values.push(image);
    }
    query += ' WHERE id = $1 RETURNING *';

    try {
        const result = await db.query(query, values);
        res.json(responseGenerator(result.rows[0]));
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export function deleteVideoCourse(req,res){
    db.query(deleteVideoCourseQuery,[req.params.id])
        .then(result=>{
            res.json(responseGenerator('success'));
        })
        .catch(err=>{
            badRequest(res);
        })
}

export function getVideoCourse(req,res){
    db.query(getVideoCourseQuery)
        .then(result=>{
            res.json(responseGenerator(result.rows));
        })
        .catch(err=>{
            badRequest(res);
        })
}