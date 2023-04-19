import multer from 'multer';
import {
    addCourseQuery,
    deleteCourseQuery, getCourseItemQuery, getCourseReviews,
    getCoursesQuery,
    getSingleCourseQuery,
    updateCourseQuery
} from "../constant/query.mjs";
import {db} from "../../database/connection.mjs";
import {responseGenerator} from "../../response/app.response.mjs";
import fs from "fs";
import path from 'path';
import {badRequest} from "../../response/error.response.mjs";
import {COURSE_TYPE} from "../constant/constant.mjs";

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/bootcamp/course');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

export const uploadCourse = multer({ storage: storage });



export async function addCourse(req,res){
    const {
        name_tm,
        name_en,
        name_ru,
        short_desc_tm,
        short_desc_ru,
        short_desc_en,
        highlight_tm,
        highlight_ru,
        highlight_en,
        desc_tm,
        desc_ru,
        desc_en,
        price,
    } = req.body;
    const image = req.file.filename;

    try {
        const query = addCourseQuery;
        const values = [
            name_tm,
            name_en,
            name_ru,
            short_desc_tm,
            short_desc_ru,
            short_desc_en,
            highlight_tm,
            highlight_ru,
            highlight_en,
            desc_tm,
            desc_ru,
            desc_en,
            price,
            image,
        ];
        const result = await db.query(query, values);
        res.json(responseGenerator(result.rows[0]));
    } catch (err) {
        console.error(err);
        res.status(500).send('Error inserting data into database');
    }
}


export async function updateCourse(req,res){
    const { name_tm, name_en, name_ru, short_desc_tm, short_desc_ru, short_desc_en, highlight_tm, highlight_ru, highlight_en, desc_tm, desc_ru, desc_en, price } = req.body;
    const id = req.params.id;
    let image = req.file ? req.file.filename : null;

    let query = updateCourseQuery;
    let values = [name_tm, name_en, name_ru, short_desc_tm, short_desc_ru, short_desc_en, highlight_tm, highlight_ru, highlight_en, desc_tm, desc_ru, desc_en, price];

    if (image) {
        query += ', image = $14 WHERE id = $15 RETURNING *;';
        values.push(image);
    } else {
        query += ' WHERE id = $14 RETURNING *;';
    }
    values.push(id);

    db.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error updating data');
        } else if (result.rowCount === 0) {
            res.status(404).send('Record not found');
        } else {
            res.status(200).json(responseGenerator(result.rows[0]));
        }
    });
}

export function deleteCourse(req,res){
    const id = req.params.id;

    let query = `SELECT image FROM bootcamp.course WHERE id = $1`;

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error getting data');
        } else if (result.rowCount === 0) {
            res.status(404).send('Record not found');
        } else {
            // get the image file path from the query result
            const imagePath = result.rows[0].image;

            // delete the image file
            if (imagePath) {
                fs.unlink('public/bootcamp/course/'+ imagePath, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }

            // delete the record from the database
            query = deleteCourseQuery;

            db.query(query, [id], (err, result) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Error deleting data');
                } else if (result.rowCount === 0) {
                    res.status(404).send('Record not found');
                } else {
                    res.status(200).send('Data deleted successfully');
                }
            });
        }
    });
}

export function getCourse(req,res){
    db.query(getCoursesQuery)
        .then(result=>{
            res.json(responseGenerator(result.rows))
        })
        .catch(err=>{
            console.log(err);
            badRequest(res);
        })
}

export async function getSingleCourse(req,res){
    try{
        const id = req.params.id;
        const course_result = await db.query(getSingleCourseQuery,[id]);
        const about_result = await db.query(getCourseItemQuery,[COURSE_TYPE.about,id]);
        const tool_result = await db.query(getCourseItemQuery,[COURSE_TYPE.tool,id]);
        const map_result = await db.query(getCourseItemQuery,[COURSE_TYPE.map,id]);
        const faq_result = await db.query(getCourseItemQuery,[COURSE_TYPE.faq,id]);
        const review_result = await db.query(getCourseReviews,[id]);

        res.json(responseGenerator({
            data: course_result.rows[0],
            curriculum: about_result.rows,
            tools: tool_result.rows,
            journeys: map_result.rows,
            faq: faq_result.rows,
            reviews: review_result.rows
        }));
    } catch (e){
        badRequest(res);
    }

}