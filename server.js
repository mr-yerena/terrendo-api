const express = require(`express`)
require(`dotenv`).config()
const helmet = require(`helmet`)
const mongoose = require(`mongoose`)
const bodyParser = require(`body-parser`)

const app = express()

// Initial setup
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
const port = process.env.PORT || 3000

// Connect to database
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@terrendo01-vqcxb.mongodb.net/<dbname>?retryWrites=true&w=majority`, {
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