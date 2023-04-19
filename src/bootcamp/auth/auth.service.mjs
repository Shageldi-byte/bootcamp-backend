import jwt from "jsonwebtoken";
import { db } from "../../database/connection.mjs";
import { responseGenerator } from "../../response/app.response.mjs";
import { badRequest } from "../../response/error.response.mjs";
import { SECRET_KEY } from "../constant/constant.mjs";
import {getProfileQuery, loginQuery, signUpQuery, webLoginQuery} from "../constant/query.mjs";

function generateAccessToken(data) {
  return jwt.sign(data, SECRET_KEY);
}


export function login(req,res){
    const {
        username,
        password
    } = req.body;

    db.query(loginQuery,[username, password])
    .then(result=>{
        if(result.rows.length){
            res.json(responseGenerator({
                ...result.rows[0],
                token: generateAccessToken(result.rows[0])
            }));
        } else {
            
            badRequest(res);
        }
    })
    .catch(err=>{
        console.log(err);
        badRequest(res);
    })

}

export function loginWeb(req,res){
    const {
        username,
        password
    } = req.body;

    db.query(webLoginQuery,[username, password])
        .then(result=>{
            if(result.rows.length){
                res.json(responseGenerator({
                    ...result.rows[0],
                    token: generateAccessToken(result.rows[0])
                }));
            } else {

                badRequest(res);
            }
        })
        .catch(err=>{
            console.log(err);
            badRequest(res);
        })

}

export function signUp(req, res){
    const {
        fullname, username, password, phone_number, address
    } = req.body;

    db.query(signUpQuery,[fullname, username, password, phone_number, address])
        .then(response=>{
            if(response.rows.length){
                let data = response.rows[0];
                res.json(responseGenerator({
                    ...data,
                    token: generateAccessToken(data)
                }))
            } else {
                badRequest(res);
            }
        })
        .catch(err=>{
            badRequest(res);
        })
}

export function getProfile(req,res){
    const {
        id
    } = req.user;

    db.query(getProfileQuery,[id])
        .then(result=>{
            res.json(responseGenerator(result.rows[0]));
        })
        .catch(err=>{
            badRequest(res);
        })
}