
function handleAdminDashboard(req,res){
    let message=req.params.msg||null;
    return res.render('/admin/dashboard',{message})
}


module.exports={handleAdminDashboard}