
function handleAdminDashboard(req,res){
    let message=req.params.msg||null;
    const user=req.session.user;
    console.log("user ",user)
    return res.render('admin/dashboard',{message,user})
}


module.exports={handleAdminDashboard}