import {db} from "../../database/connection.mjs";
import {responseGenerator} from "../../response/app.response.mjs";

export async function addReview(req,res){
    try {
        const { fullname, email, phone_number, message, course_id } = req.body;

        const query = {
            text: 'INSERT INTO bootcamp.review(fullname, email, phone_number, message, course_id, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;',
            values: [fullname, email, phone_number, message, course_id, req.id],
        };

        const result = await db.query(query);

        res.status(201).json(responseGenerator(result.rows[0]));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}