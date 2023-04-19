import multer from 'multer';
import {
    deleteCourseItemQuery,
    getCourseItemQuery,
    insertCourseItemQuery,
    updateCourseItemQuery
} from "../constant/query.mjs";
import {db} from "../../database/connection.mjs";
import {responseGenerator} from "../../response/app.response.mjs";
import {badRequest} from "../../response/error.response.mjs";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/bootcamp/course-item');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

export const uploadCourseItem = multer({storage: storage});

export async function addCourseItem(req, res) {
    const {name_tm, name_ru, name_en, desc_tm, desc_ru, desc_en, item_type, position, course_id} = req.body;

    // Get the file path of the uploaded icon image
    const iconFilePath = req.file? req.file.filename : '';
    try {
        const queryText = insertCourseItemQuery;
        const values = [name_tm, name_ru, name_en, desc_tm, desc_ru, desc_en, iconFilePath, item_type, position, course_id];
        const {rows} = await db.query(queryText, values);

        res.json(responseGenerator(rows[0]));
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
}

export async function updateCourseItem(req, res) {
    const id = req.params.id;
    const {name_tm, name_ru, name_en, desc_tm, desc_ru, desc_en, item_type, position, course_id} = req.body;

    try {
        let query = updateCourseItemQuery;
        const values = [id, name_tm, name_ru, name_en, desc_tm, desc_ru, desc_en, item_type, position, course_id];

        if (req.file) {
            const icon = req.file.filename;
            query += `, icon = $11`;
            values.push(icon);
        }

        query += ` WHERE id = $1 RETURNING *`;

        const result = await db.query(query, values);
        res.json(responseGenerator(result.rows[0]));
    } catch (e) {
        console.error(e);
        res.status(500).send('Error updating course item');
    }
}

export function deleteCourseItem(req, res) {
    db.query(deleteCourseItemQuery, [req.params.id])
        .then(result => {
            res.json(responseGenerator('success'))
        }).catch(err => {
            badRequest(res);
        })
}

export function getCourseItems(req, res) {
    db.query(getCourseItemQuery,[req.params.type,req.params.course_id])
        .then(result=>{
            res.json(responseGenerator(result.rows));
        })
        .catch(err=>{
            badRequest(res);
        })

}