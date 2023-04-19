import jwt from 'jsonwebtoken';
import {SECRET_KEY} from "../constant/constant.mjs";

export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, SECRET_KEY, (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

export function authenticateTokenOptional(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null){
        req.user = null;
        req.id = -1;
        next();
    } else {
        jwt.verify(token, SECRET_KEY, (err, user) => {
            console.log(err)
            if (err){
                req.user = null;
                req.id = -1;
            } else {
                req.user = user
                req.id = user.id;
            }

            next()
        })
    }


}
