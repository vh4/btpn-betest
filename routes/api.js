import express from "express"
import {GetData, Login, Token, Logout, Register} from '../controller/ApiController.js'
import {verifyToken, verifyRefreshToken} from '../middleware/LoginMiddleware.js'

const Router = express.Router();


//middleware
Router.post('/login', Login);
Router.get('/logout', verifyToken, Logout);
Router.post('/token', verifyRefreshToken, Token);


//data CRUD methods
Router.get('/users', verifyToken, GetData);
Router.post('/users', Register);


export default Router;