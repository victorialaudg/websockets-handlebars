const express = require('express')
//const ProductManager = require('./ProductManager.js')

const app = express()

app.use(express.json())

const productsRouter = require('./routes/api/products.router.js')
const cartsRouter = require('./routes/api/carts.router.js')

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

app.use(express.urlencoded({extend:true}))


app.listen(8080, ()=>console.log('Server Up'))