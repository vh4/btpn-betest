import express from "express"
import Router from "./routes/api.js";
import * as dotenv from "dotenv";
import session from "express-session"
import mongoose from 'mongoose'

dotenv.config();
const app = express();



const url = `mongodb+srv://tony:${process.env.DATABASE_PASSWORD}@cluster0.lpgifuv.mongodb.net/btpn?retryWrites=true&w=majority`
mongoose.connect(
    url,{
        useUnifiedTopology: true,
        useNewUrlParser: true,
    },
    () => console.log('connected to mongodb.')
)

const db = mongoose.connection;
db.on('error', ()=>{
    console.log("Database Error Connection")
})

//express json
app.use(express.json());
app.use(Router);

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log('server listening on port 3000');
})

