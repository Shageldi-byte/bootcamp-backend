import express from "express";
import { getHome, search } from "./other.service.mjs";

const otherController = express.Router();

otherController.get('/search',search);
otherController.get('/get-home',getHome);

export default otherController;