import { db } from "../../database/connection.mjs";
import { responseGenerator } from "../../response/app.response.mjs";
import { getAllStoriesQuery, getBilboardQuery, getMediaQuery, searchBilboardQuery, searchMediaQuery, searchStoryQuery } from "../constant/query.mjs";

export async function search(req,res){
    const query = req.query.text;
    let results = {};
    await db.query(searchStoryQuery,[query])
    .then(result=>{
        results = {
            ...results,
            stories: result.rows
        }
    })

    await db.query(searchMediaQuery,[query])
    .then(result=>{
        results = {
            ...results,
            media: result.rows
        }
    })

    await db.query(searchBilboardQuery,[query])
    .then(result=>{
        results = {
            ...results,
            bilboard: result.rows
        }
    })

    res.json(responseGenerator(results))
}

export async function getHome(req,res){
    let results={};
    await db.query(getMediaQuery,['audio'])
    .then(result=>{
        results = {
            podcasts: result.rows
        }
    })

    await db.query(getAllStoriesQuery)
    .then(result=>{
        results = {
            ...results,
            stories: result.rows
        }
    })
    await db.query(getBilboardQuery)
    .then(result=>{
        results = {
            ...results,
            bilboard: result.rows
        }
    })

    res.json(responseGenerator(results));
}