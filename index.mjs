import cors from "cors";
import express from "express";
import router from "./src/router.mjs";

const app = express();

app.use(cors());
app.use('/public', express.static('public'));
app.use(express.json({limit: '500mb', extended: true}));
app.use(express.urlencoded({limit: "500mb", extended: true, parameterLimit:500000}));
app.use('/api',router);

app.listen(5665,()=>{
    console.log('listening on port 5665');
})