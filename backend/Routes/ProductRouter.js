import express from 'express'
import { ensureAuthentication } from '../Middlewares/Auth.js';


const productRouter = express.Router();

productRouter.get('/',ensureAuthentication,(req,res)=>{
    res.status(200).json([
        {
            name:"Mobile",
            price:10000
        },
        {
            name:"Tv",
            price:20000
        }
    ])
});



export default productRouter;