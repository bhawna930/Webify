const express = require("express");
require("dotenv").config();




const userRouter = require("./routes/userRoute");


//SET INSTANCES HERE ONLY
const app = express();

//VARIABLE DECLARATION HERE ONLY
const PORT = process.env.PORT || 4888;


// I WANT TO RUN A MIDDLEWARE
app.use(express.json());


//WE WILL MAKE ROUTES

app.use("/api/user",userRouter);







dbConnect().then(() => {
  app.listen(PORT, () => {
    console.log("Server running on port: ", PORT);
  });
});