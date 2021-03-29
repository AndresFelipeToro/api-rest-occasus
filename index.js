'use strict'



const config=require('./config')
const app=require('./app')
const mongoose=require('mongoose')

mongoose.connect(config.db,(err, res)=>{
  if(err) {
    return console.log(`Error al conectar a la base de datos: ${err}`)
  }
  console.log('Conexión a la base de datos establecida...')

  app.listen(config.port,  () =>{
    console.log(`API REST corriendo en http://localhost:${config.port}`)
  })

})
