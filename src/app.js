const express = require('express')
const {Server} = require('socket.io')
const handlebars=require('express-handlebars')
const app = express()


app.engine('handlebars',handlebars.engine())
app.set('views','./src/views')
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.static(__dirname+'/public'))

const productsRouter = require('./routes/api/products.router.js')
const cartsRouter = require('./routes/api/carts.router.js')
const homeHandlebarsRouter = require('./routes/api/home.handlebars.js')
const realTimeProducts = require('./routes/api/realtimeproducts.js')

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/',homeHandlebarsRouter)
app.use('/realtimeproducts',realTimeProducts)

app.use(express.urlencoded({extend:true}))


const serverHttp= app.listen(8080, ()=>console.log('Server Up'))
const socketServer = new Server(serverHttp)

socketServer.on('connection',socket=>{
    console.log("Cliente conectado")
})