const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const { Sequelize, QueryTypes } = require('sequelize');

const sequelize = new Sequelize('postgres://qrdnizpriwmume:bbcf84fd4c8e3e98a1433eddbb076e301eee1827d739f9aa049d2ecdc611a0b1@ec2-52-44-55-63.compute-1.amazonaws.com:5432/ddc696pgqhcb1r') // Example for postgres

sequelize.authenticate()
.then(() => {
  console.log('Connection to database established successfully')
})
.catch(err => {
  console.log('Unable to connect to database: ', err)
})



app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.text())
app.use(bodyParser.raw())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('share'));

app.get('/', (req, res) => {
  res.send('jancuk!!')
})

app.get('/getData', async (req, res) => {
  try {
    let data = await sequelize.query('select * from logistics', { type: QueryTypes.SELECT })
    res.send(data)
  } catch (e) {
    res.send(e)
  }
})

app.post('/postData', async (req, res) => {
  let { no_container, size, type, slot, row, tier, created_on } = req.body;
  try {
    let data = await sequelize.query(`insert into logistics (no_container, size, type, slot, row, tier, created_on) values ('${no_container}', ${size}, '${type}', ${slot}, ${row}, ${tier}, '${created_on}')`, { type: QueryTypes.SELECT })
    res.send(data)
  } catch (e) {
    res.send(e)
  }
})

app.delete('/deleteData', async (req, res) => {
  let { id } = req.query
  try {
    let data = await sequelize.query(`delete from logistics where id=${id}`, { type: QueryTypes.SELECT })
    res.send(data)
  } catch (e) {
    res.send(e)
  }
})

app.put('/updateData', async (req, res) => {
  let { no_container, size, type, slot, row, tier, id } = req.body
  try {
    let data = await sequelize.query(`update logistics set no_container = '${no_container}', size = ${size}, type = '${type}', slot = ${slot}, row = ${row}, tier = ${tier} where id=${id}`, { type: QueryTypes.SELECT })
    res.send(data)
  } catch (e) {
    res.send(e)
  }
})



app.listen(process.env.PORT || 3000)
