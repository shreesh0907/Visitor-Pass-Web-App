const express = require ('express')
const dotenv = require ('dotenv')
const connectDB = require ('./config/globaldatabaseconnection')
const authRoute = require ('./routes/authRoute')
const cors = require("cors");
const visitorRoute = require ('./routes/visitorRoute')
const appointmentRoute = require ('./routes/appointmentRoute')
const passRoute = require('./routes/passRoute')
const checkRoute = require('./routes/checkRoute')
const dashboardRoute = require("./routes/dashboardRoute");

dotenv.config()
connectDB()
const app = express()


//MiddleWare
app.use(express.json())
app.use(cors());
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//Routes
app.use('/api/auth', authRoute)
app.use('/api/visitors', visitorRoute)
app.use('/api/appointments', appointmentRoute)
app.use('/api/passes', passRoute)
app.use('/api/checklogs', checkRoute)
app.use("/api/dashboard", dashboardRoute);

//Express Listening on the Port
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT} and connected to our database`);
})