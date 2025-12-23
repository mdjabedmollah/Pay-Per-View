export const isSeller =(req,res,next)=>{
try {
    req.user.role==='seller' ?next(): res.status(403).json({
        success:false,
        message:"role not match"
    })
} catch (error) {
    console.log("seller middleware error",error)
}
}
export const isBuyer =(req,res,next)=>{
try {
    req.user.role==='buyer' ?next(): res.status(403).json({
        success:false,
        message:"role not match"
    })
} catch (error) {
    console.log("buyer middleware error",error)
}
}

export const isAdmin =(req,res,next)=>{
try {
    req.user.role==='admin' ?next(): res.status(403).json({
        success:false,
        message:"role not match"
    })
} catch (error) {
    console.log("admin middleware error",error)
}
}