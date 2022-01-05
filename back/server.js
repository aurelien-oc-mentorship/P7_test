const express = require('express')
const cors = require('cors')

const app = express()

const corsOptions = {
    origin: 'http://localhost:3000'
}

app.use(cors(corsOptions))

// -------------------------------------------------
// test helmet
const helmet = require('helmet');
app.use(helmet());
// -------------------------------------------------
// -------------------------------------------------
// test rate limit etc 
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
    windowMs: 0.1 * 60 * 1000,
    max: 100 
  })
app.use(limiter)
// -------------------------------------------------
// -------------------------------------------------
// test user routes  
const userRoutes = require('./routes/user') 
app.use('/api/auth', userRoutes) 
// -------------------------------------------------



// prise en charge du JSON
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extend: true }))

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Mon appli est fonctionelle" })
})

// set port, listen for requests
const PORT = process.env.PORT || 8080
require('./routes/tutorial.routes.js')(app)
app.listen(PORT, () => {
    console.log(` Le serveur est en écoute sur le port ${PORT}.`)
})


const db = require('./models')
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.")
  })

