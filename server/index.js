import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'; // loads environment variables from a .env file into process.env 
import morgan from 'morgan'; // log http info
import indexRoutes from './route/index.js';
import recordRoutes from './route/record.js'
import authRoutes from './route/auth.js';
import tagRoutes from './route/tag.js';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import PassportConfig from './config/passport.js';
import path from 'path'

// Load config
dotenv.config({ path: './config/config.env'})
// Passport config
PassportConfig(passport);

const app = express();

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.urlencoded({extended: true}));
app.use(express.json());
var corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));
app.use(cookieParser());

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

// Sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use('/', indexRoutes)
app.use('/record', recordRoutes)
app.use('/tag', tagRoutes)
app.use('/auth', authRoutes)

