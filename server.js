const express = require(`express`)
require(`dotenv`).config()
require(`express-async-errors`)
const helmet = require(`helmet`)
const mongoose = require(`mongoose`)
const bodyParser = require(`body-parser`)

// Own libraries
const routes = require(`./src/routes`)
const errorHandler = require(`./src/middlewares/errorHandler`)
const notFound = require(`./src/middlewares/notFound`)

const app = express()

// Initial setup
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
const port = process.env.PORT || 3000

// Routing
app.use(`/v1`, routes)
app.use(errorHandler)
app.use(notFound)

// Connect to database
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@terrendo01-vqcxb.mongodb.net/main?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.emit('ready')
    console.log('DB connection is ready!')
}).catch(err => console.error(err))

// Start server
app.on('ready', () => {
  app.listen(port, () => console.log(`API running on PORT ${port}`))
})
mongoose.set(`useCreateIndex`, true)