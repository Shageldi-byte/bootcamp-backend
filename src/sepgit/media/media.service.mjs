import fs from "fs";
import getMP3Duration from "get-mp3-duration";
import { db } from "../../database/connection.mjs";
import { responseGenerator } from "../../response/app.response.mjs";
import { badRequest } from "../../response/error.response.mjs";
import { addMediaQuery, deleteMediaQuery, getMediaById, getMediaQuery, updateMediaQuery } from "../constant/query.mjs";

export function getMedia(req,res){
    let type = req.query.type;
    if(typeof type === 'undefined' || type ==null){
        type = 'video';
    }
    db.query(getMediaQuery,[type])
    .then(result=>{
        res.json(responseGenerator(result.rows));
    })
    .catch(err=>{
        badRequest(req,res);
    })
}

export function addMedia(req,res){
    const {
        name, surname, job, topic_tm, topic_en, topic_ru, language, type
    } = req.body;
    const imageFile = req.files.image[0];
    const media_file = req.files.media_file[0];
    const buffer = fs.readFileSync(media_file.path);
    const duration = getMP3Duration(buffer);
    let d = new Date(duration).toISOString().slice(11, 19);
    db.query(addMediaQuery,[
        name, surname, job, imageFile.filename, topic_tm, topic_en, topic_ru, language, media_file.filename, d, type
    ]).then(result=>{
        res.json(result.rows[0]);
    }).catch(err=>{
        console.log(err);
        badRequest(res);
    })
}

export async function updateMedia(req,res){
    const id = req.params.id;
    let imageFile = req.files.image && req.files.image.length>0? req.files.image[0]:null;
    let media_file = req.files.media_file && req.files.media_file.length>0?req.files.media_file[0]:null;
    let file_name = '',file_name2=''; 
    let oldData = {};
    await db.query(getMediaById,[id])
    .then(response=>{
        oldData = response.rows[0];
    })

    if(typeof imageFile === 'undefined' || imageFile == null){
        imageFile = oldData.image;
        file_name = oldData.image;
    } else {
        imageFile = req.files.image[0];
        file_name = imageFile.filename;
    }

    if(typeof media_file === 'undefined' || media_file == null){
        media_file = oldData.file_name;
        file_name2 = oldData.file_name;
    } else {
        media_file = req.files.media_file[0]
        file_name2 = media_file.filename;
    }

    const {
        name, surname, job, topic_tm, topic_en, topic_ru, language, type
    } = req.body;
    
    const buffer = fs.readFileSync("public/media/"+file_name2);
    const duration = getMP3Duration(buffer);
    let d = new Date(duration).toISOString().slice(11, 19);
    await db.query(updateMediaQuery,[
        name, surname, job, file_name, topic_tm, topic_en, topic_ru, language, file_name2,type, d,id
    ]).then(result=>{
        res.json(result.rows[0]);
    }).catch(err=>{
        console.log(err);
        badRequest(res);
    })
}

export function deleteMedia(req,res){
    db.query(deleteMediaQuery,[req.params.id])
    .then(result=>{
        res.json(responseGenerator(null));
    })
    .catch(err=>{
        badRequest(res);
    })
}