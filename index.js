const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const MongooseConnection=require('./database/mongoose.config');
MongooseConnection.getConnection()

app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const routes = require('./application/controllers');
app.use('/api', routes);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
