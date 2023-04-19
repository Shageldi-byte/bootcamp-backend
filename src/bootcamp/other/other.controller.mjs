import express from 'express';
import {addReview} from "./other.service.mjs";
import {authenticateTokenOptional} from "../auth/jwt.service.mjs";

const otherController = express.Router();

otherController.post('/add-review',authenticateTokenOptional,addReview);

export default otherController;