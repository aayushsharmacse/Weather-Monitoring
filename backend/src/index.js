import 'dotenv/config';
import connectDB from "./db/index.js";
// import app from "./app.js";
import server from "./app.js";

connectDB()
.then(()=>{
    server.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("Error from src/index.js, connection might be failed");
    throw err;
})