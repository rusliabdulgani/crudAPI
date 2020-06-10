const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.text())
app.use(bodyParser.raw())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('share'));

app.get('/', (req, res) => {
  
  res.send('jancuk!!')
})

app.listen(process.env.PORT || 3000)
