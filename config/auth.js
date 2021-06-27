module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('errorMsg', 'Please login to view the page');
        res.redirect('/users/login');
    },
    forwardAuthentication: (req,res,next) => {
        if(!req.isAuthenticated()){
            return next();
        }
        res.redirect('/dashboard');
    }
}