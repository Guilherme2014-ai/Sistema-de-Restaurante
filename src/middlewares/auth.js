module.exports = (req,res,next) => {
    if(req.session.user["admin"] == false){
        req.flash('message','Necessita Ser Admin')
        res.redirect('/')
        return
    }
    next()
}