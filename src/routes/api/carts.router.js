const { Router } = require('express')

const router= Router()

const CartManager = require('./../../CartManager.js')
const manager = new CartManager('./../../carrito.json')

router.get('/', (req,res) => {
   const carts = manager.getCarts()
    const limit = +req.query.limit
    if(!limit){
        res.status(200).send({carts})
    }else{
        res.status(200).send(carts.slice(0,limit));
    }
})

const generateCartID = () => {
    let id
    const items= manager.getCarts()
    if(items.length === 0) id = 1
    else id = items[items.length - 1].id + 1
    return id
} 

router.get('/:cid', (req, res) => {
    const id = Number(req.params.cid);
    const product = manager.getProductById(id);

    if(product) {
        res.status(200).send({product});
    } else {
        res.status(404).send({ message: 'Producto no encontrado' });
    }
})

router.post('/', (req,res) => {
    const cartID=generateCartID()
    const cartProducts = manager.getProducts()
    const newCart = { id: cartID, products: cartProducts }

    res.status(201).send({ mensaje: 'Carrito creado', newCart})
   
})

router.post('/:cid/product/:pid', (req,res) => {
    //const productCID = Number(req.params.cid);
    const productPID = Number(req.params.pid);
    //const productAdded = manager.getProductById(productPID);
   let productQuantity = Number(req.body.quantity);
    if(!productQuantity){
        productQuantity = 1
    }
    const newProduct = { product: productPID, quantity: +productQuantity }

    console.log(newProduct)
    const products = manager.getProducts()
    products.push(newProduct)
    res.status(201).send({ mensaje: 'Producto creado', products})
})

module.exports = router