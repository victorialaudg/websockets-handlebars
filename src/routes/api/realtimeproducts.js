const {Router} = require('express')
const router = Router()

const ProductManager = require('./../../managers/ProductManager.js')
const manager = new ProductManager('./../../productos.json')



router.get('/', (req,res) => {
    const products = manager.getProducts()
    res.render({products})
})

module.exports = router