import { db } from "../../database/connection.mjs";
import { responseGenerator } from "../../response/app.response.mjs";
import { badRequest } from "../../response/error.response.mjs";
import { addStoryQuery, deletStoryQuery, getAllStoriesQuery, getOldStory, updateStoryQuery } from "../constant/query.mjs";

export function getAllStories(req,res){
    db.query(getAllStoriesQuery)
    .then(result=>{
        res.json(responseGenerator(result.rows));
    })
    .catch(err=>{
        badRequest(res);
    })
}

export function addStory(req,res){
    let image = req.file.filename;
    const {
        fullname, organzation, text_tm, text_ru, text_en
    } = req.body;
    db.query(addStoryQuery,[fullname, organzation, image, text_tm, text_ru, text_en])
    .then(result=>{
        if(result.rows.length){
            res.json(responseGenerator(result.rows[0]));
        } else {
            badRequest(res);
        }
    })
    .catch(err=>{
        badRequest(res);
    })
}

export async function updateStory(req,res){
    let id = req.params.id;
    let image = '';
    if(typeof req.file === 'undefined' || req.file == null){
        await db.query(getOldStory,[id])
        .then(result=>{
            if(result.rows.length){
                image = result.rows[0].image;
            }
        })
    } else {
        image = req.file.filename;
    }
    
    const {
        fullname, organzation, text_tm, text_ru, text_en
    } = req.body;
    db.query(updateStoryQuery,[fullname, organzation, image, text_tm, text_ru, text_en,id])
    .then(result=>{
        if(result.rows.length){
            res.json(responseGenerator(result.rows[0]));
        } else {
            badRequest(res);
        }
    })
    .catch(err=>{
        badRequest(res);
    })
}

export function deleteStory(req, res){
    db.query(deletStoryQuery,[req.params.id])
    .then(response=>{
        res.json(responseGenerator(null));
    })
    .catch(err=>{
        badRequest(res);
    })
}