import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import {register} from './controller/auth';
import authRoutes from './routes/auth';
import userRoutes from'./routes/user.js';
import postRoutes from './routes/post';
import { verifyToken } from './middleware/auth';
//middleware configuration
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
dotenv.config();
const app=express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

//Storage for file upload

const storage=multer.diskStorage({
    destination:function(req,file,cb)
    {
        cb(null,"public/assets");
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
}); 

const upload=multer({storage});
//Registration
app.post("./auth/register",upload.single("picture"),register);
a.post("/posts",verifyToken,upload.single("picture"),createPost);
//Routes
app.use("/auth",authRoutes);
app.use("/users",userRoutes);
app.use("/posts",postRoutes);
//Mongoose setup

const PORT = process.env.PORT || 6001;
mongoose
  .connect("mongodb+srv://mihiraswal0:Mihiraswal2903@cluster0.w90k0np.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));

  