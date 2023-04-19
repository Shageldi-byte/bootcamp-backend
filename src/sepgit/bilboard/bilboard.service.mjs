import { db } from "../../database/connection.mjs";
import { responseGenerator } from "../../response/app.response.mjs";
import { badRequest } from "../../response/error.response.mjs";
import { addBilboardQuery, deleteBilboardQuery, getBilboardById, getBilboardQuery, updateBilboardQuery } from "../constant/query.mjs";

export function getBilboards(req,res){
    db.query(getBilboardQuery)
    .then(result=>{
        res.json(responseGenerator(result.rows));
    })
    .catch(err=>{
        badRequest(res);
    })
}

export function addBilboard(req, res){
    const image_tm = req.files.image_tm[0];
    const image_ru = req.files.image_ru[0];
    const image_en = req.files.image_en[0];

    const {
        content_tm, content_ru, content_en, position
    } = req.body;

    db.query(addBilboardQuery,[
        image_tm.filename, image_en.filename, image_ru.filename, content_tm, content_ru, content_en, position
    ]).then(result=>{
        res.json(responseGenerator(result.rows[0]));
    })
    .catch(err=>{
        badRequest(res);
    })
}

export async function updateBilboard(req, res){
    const id = req.params.id;
    let image_tm = req.files.image_tm && req.files.image_tm.length>0?req.files.image_tm[0].filename:null;
    let image_ru = req.files.image_ru && req.files.image_ru.length>0?req.files.image_ru[0].filename:null;
    let image_en = req.files.image_en && req.files.image_en.length>0?req.files.image_en[0].filename:null;

    let oldData = {};
    await db.query(getBilboardById,[id])
    .then(result=>{
        oldData = result.rows[0];
    })

    if(typeof image_tm === 'undefined' || image_tm == null){
        image_tm = oldData.image_tm;
    }
    if(typeof image_ru === 'undefined' || image_ru == null){
        image_ru = oldData.image_ru;
    }
    if(typeof image_en === 'undefined' || image_en == null){
        image_en = oldData.image_en;
    }
    const {
        content_tm, content_ru, content_en, position
    } = req.body;

    await db.query(updateBilboardQuery,[
        image_tm, image_en, image_ru, content_tm, content_ru, content_en, position,id
    ]).then(result=>{
        res.json(responseGenerator(result.rows[0]));
    })
    .catch(err=>{
        badRequest(res);
    })
}

export function deleteBilboard(req, res){
    db.query(deleteBilboardQuery,[req.params.id])
    .then(result=>{
        res.json(responseGenerator(null));
    })
    .catch(err=>{
        badRequest(res);
    })
}