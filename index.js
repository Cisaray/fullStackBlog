import express from 'express';
import mongoose from "mongoose";
import multer from "multer";
import {checkAuth, handleErrors} from "./utils/index.js";
import {registerValidation, loginValidation, postCreateValidation} from "./validations.js";
import {UserController, PostController} from './controllers/index.js'

mongoose.connect('mongodb+srv://lyadovkzst:wWwWwW@cluster0.j5wamjs.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB OK'))
    .catch(err => console.log('DB err', err))

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb)=> {
        cb(null, 'uploads')
    },
    filename: (_,file,cb) =>{
        cb(null, file.originalname);
    }
})

const upload = multer({storage})

app.use(express.json());
app.use('/uploads', express.static('uploads'))

app.post('/auth/login', loginValidation, handleErrors, UserController.login);
app.post('/auth/register', registerValidation, handleErrors, UserController.register );
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req,res) => {
    res.json({
        url: `/uploads/${req.file.filename}`
    })
})

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, handleErrors, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleErrors, PostController.update);



app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server OK');
});