import multer from 'multer';
import {db} from "../../database/connection.mjs";
import {
    getVideoItemByCourseIdQuery,
    insertVideoCourseItemQuery,
    updateVideoCourseItemQuery,
    updateVideoCourseItemQuery2
} from "../constant/query.mjs";
import {responseGenerator} from "../../response/app.response.mjs";
import {badRequest} from "../../response/error.response.mjs";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/bootcamp/video-course/video');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

export const uploadVideoCourseItem = multer({storage: storage});

export async function insertVideoItem(req, res) {
    // If file upload succeeded, insert data into Postgres
    const {
        title_tm,
        title_ru,
        title_en,
        creator,
        desc_tm,
        desc_ru,
        desc_en,
        sources,
        video_course_id,
        position,
    } = req.body;

    try {
        const values = [
            title_tm,
            title_ru,
            title_en,
            creator,
            req.file.filename,
            desc_tm,
            desc_ru,
            desc_en,
            sources,
            video_course_id,
            position,
        ];

        const result = await db.query(insertVideoCourseItemQuery, values);
        res.status(200).json(responseGenerator(result.rows[0]));
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Error inserting video item'});
    }
}

export async function updateVideoCourseItem(req, res) {
    const { id } = req.params;
    const { title_tm, title_ru, title_en, creator, desc_tm, desc_ru, desc_en, sources, views, video_course_id, position } = req.body;
    const filePath = req.file ? req.file.filename : null; // Check if a file was uploaded

    // Define the SQL query to update data in the database
    let query;
    let values;
    if (filePath) {
        query = updateVideoCourseItemQuery;
        values = [title_tm, title_ru, title_en, creator, filePath, desc_tm, desc_ru, desc_en, sources, video_course_id, position, id];
    } else {
        query = updateVideoCourseItemQuery2;
        values = [title_tm, title_ru, title_en, creator, desc_tm, desc_ru, desc_en, sources, video_course_id, position, id];
    }

    // Execute the query with the provided values using the pg pool
    db.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error updating data in the database.');
        } else {
            if (result.rowCount > 0) {
                console.log('Data updated successfully.');
                res.status(200).json(responseGenerator(result.rows[0]));
            } else {
                console.warn('Data not updated: video_url already exists or item does not exist.');
                res.status(400).send('Data not updated: video_url already exists or item does not exist.');
            }
        }
    });
}

export async function deleteVideoCourseItem(req,res){
    const { id } = req.params;

    // Define the SQL query to delete a video item from the database
    const query = `DELETE FROM bootcamp.video_item WHERE id=$1;`;
    const values = [id];

    // Execute the query with the provided values using the pg pool
    db.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error deleting data from the database.');
        } else {
            if (result.rowCount > 0) {
                console.log('Data deleted successfully.');
                res.status(200).json(responseGenerator('Data deleted successfully.'));
            } else {
                console.warn('Data not deleted: item does not exist.');
                res.status(400).send('Data not deleted: item does not exist.');
            }
        }
    });
}

export async function getVideoCourseItem(req,res){
    db.query(getVideoItemByCourseIdQuery,[req.params.id])
        .then(result=>{
            res.json(responseGenerator(result.rows))
        })
        .catch(err=>{
            badRequest(res);
        })
}