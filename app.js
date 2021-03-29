'use strict'

const express=require('express')
const bodyParser=require('body-parser')
const app=express()
const api=require('./routes/index')
const hbs=require('express-handlebars')
var cors = require('cors');


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.engine('.hbs',hbs({
  defaultLayout:'default',
  extname: '.hbs'
}))

app.set('view engine', '.hbs')

app.use(cors());
app.use('/api', api)

module.exports=app
