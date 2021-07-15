const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require('../utils/auth');

router.get('/', (req,res) => {
    res.render(`index`,{
        extractStyles:true,
        title: 'Home',
        req
    });
})


router.get('/dashboard', ensureAuthenticated, (req,res) => 
    res.render(`dashboard`,{
        extractScripts: true,
        extractStyles:true,
        title: 'Dashboard',
        username: req.body.username
    })
)



module.exports = router;