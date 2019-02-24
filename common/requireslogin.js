module.exports={
    requiresLogin: function (req,res,next) {
        console.log('Invoked',req.session,req.session.userId)
        if (req.session && req.session.userId) {
            return next();
        } else {
            var err = new Error('You must be logged in to view this page.');
            err.status = 401;
            return res.redirect('/support/login');
        }
    }
}
