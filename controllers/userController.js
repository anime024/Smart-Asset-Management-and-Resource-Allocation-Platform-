function handleUserDashboard(req,res){
    let message=req.params.msg||null;
    return res.render('user/dashboard',{message});
}


function handleUserLogout(req,res){

    req.session.destroy(function(err){
        if(err) return res.json({message:"PROBLEM IN LOGOUT "});
    })


    return res.redirect('/?msg=Log Out Succesfull');
}


module.exports={handleUserDashboard,handleUserLogout};