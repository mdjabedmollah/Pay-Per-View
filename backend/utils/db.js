import mongoose  from "mongoose";
const Dbconnection=async()=>{
    try {
        const url =process.env.DB_URL
        await mongoose.connect(url)
        console.log("success fully connected")

    } catch (error) {
        console.log('data base error ',error)
    }
}
export default Dbconnection