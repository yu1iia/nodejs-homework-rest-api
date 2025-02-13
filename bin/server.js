const mongoose = require('mongoose')
require('dotenv').config()
mongoose.Promise = global.Promise

const app = require('../app')

const { DB_HOST, PORT = 3000 } = process.env

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log('Database connection successful')
    })
  })
  .catch(error => {
    console.log(error)
    process.exit(1)
  })
