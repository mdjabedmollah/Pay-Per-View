import mongoose  from "mongoose";
const Dbconnection=async()=>{
    try {
        const url = "mongodb://jabed:password123@localhost:27017/Pay-Per-View?authSource=admin";
        await mongoose.connect(url)
        console.log("success fully connected")

    } catch (error) {
        console.log('data base error ',error)
    }
}
export default Dbconnection