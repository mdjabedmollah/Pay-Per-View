import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import Dbconnection from './utils/db.js'
import AuthRoute from './routes/AuthRoute.js'
dotenv.config()
const app = express()
const port = process.env.PORT || 8081
//Data base 
Dbconnection()
//middleware 
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,              
  })
);
app.use(express.urlencoded({extended:true}))
app.use(express.json())
//Api

app.use('/api/v1', AuthRoute)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
