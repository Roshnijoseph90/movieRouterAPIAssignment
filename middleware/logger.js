const myLogger = function(req,res,next){
    console.log("logged")
    console.log(req.body)
   next()
}
module.exports = {myLogger}