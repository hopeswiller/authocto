///---DECLARE EXPRESS FRAMEWORK--------///
const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session')
const app = express();
const server = require('http').createServer(app);

///---LOAD OTHER MIDDLEWARES--------///
const dotenv = require("dotenv");
dotenv.config();
const figlet = require('./figlet.js')();
const mongoose = require("mongoose");
const flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session);

///---LOAD MODULES --------///
const passport = require("passport");
require('./config/passport')(passport);
const db = require('./config/db').MongoURI;
const uuidv4 = require('./uuid');
const ClientData = require('./models/Client');




app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set("layout extractScripts", true);
app.set("style extractStyles", true);
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({
    extended: false
}));

///---EXPRESS SESSION--------///
app.use(session({
    name: process.env.SESSION_NAME,
    resave: false,
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    /* store: new MongoStore({
        mongooseConnection: mongoose.connect('mongodb://localhost:27017/jwt_auth'),
        ttl: process.env.SESS_LIFETIME
    }), */
    /*cookie: {
        path: '/',
        secure: process.env.ENV, 
        maxAge: parseInt(process.env.LIFETIME),
        sameSite: true
    }*/
}));

app.use(passport.initialize());
app.use(passport.session());


///---CONNECT FLASH--------///
app.use(flash());
app.use((req, res, next) => {
    res.locals.successMsg = req.flash('successMsg')
    res.locals.errorMsg = req.flash('errorMsg')
    res.locals.error = req.flash('error') //flash for passport
    next();
})

///---DB CONNECTION--------///
mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Database connected...'))
    .catch(err => console.log(err));


///---ROUTES--------///
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));


///----NAMESPACES-----///

server.listen(process.env.PORT || 5050, function () {
    console.log(`Server running: http://localhost:${process.env.PORT || 5050}`)
});