function restrictTo(roles){
    return function(req,res,next){
        if(!roles.includes(req.session.user.role)){
            return res.send('UnAuthorized User');
        }

        next();
    }
}

module.exports={restrictTo};