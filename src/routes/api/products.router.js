const { Router } = require('express')

const router= Router()

const ProductManager = require('./../../managers/ProductManager.js')
const manager = new ProductManager('./../../productos.json')


router.get('/', (req,res) => {
   const products = manager.getProducts()
    const limit = +req.query.limit
    if(!limit){
        res.status(200).send({products})
    }else{
        res.status(200).send(products.slice(0,limit));
    }
})

router.get('/:pid', (req, res) => {
    const id = Number(req.params.pid);
    const product = manager.getProductById(id);

    if(product) {
        res.status(200).send({product});
    } else {
        res.status(404).send({ message: 'Producto no encontrado' });
    }
})

const generateID = () => {
    let id
    const items= manager.getProducts()
    if(items.length === 0) id = 1
    else id = items[items.length - 1].id + 1
    return id
}

router.post('/', (req,res) => {
    const productID=generateID()
    const productTitle = req.body.title
    const productDescription = req.body.description
    const productPrice = req.body.price
    const productThumbnail = req.body.thumbnail
    const productCode = req.body.code
    const productStock = req.body.stock
    const productStatus=true
    const productCategory=req.body.category
   
    const products = manager.getProducts()

    const newProduct = { id: productID, title: productTitle, description: productDescription, price: +productPrice, thumbnail: productThumbnail, code: productCode, stock: productStock, status: productStatus, category: productCategory }

    //Valida que todos los argumentos sean obligatorios
    if(!productTitle || !productDescription || !productPrice || !productCode || !productStatus || !productCategory){
        console.error('Completa todos los campos')
        return
    }else{
        console.log(newProduct)
        const products = manager.getProducts()
        products.push(newProduct)
        res.status(201).send({ mensaje: 'Producto creado', products})
    }
})

router.put('/:pid', (req, res) => {
    const id = +req.params.pid
    const datosNuevos = req.body
    const productIndex = manager.getProducts().findIndex(item => item.id === id)
    if (productIndex < 0) {
        return res.status(404).send({ message: 'Producto no encontrado' })
    }
    manager.getProducts()[productIndex] = datosNuevos
    
    let products = manager.getProducts()
    res.status(202).send({ message: 'Producto actualizado', products })
})

router.delete('/:pid', (req, res) => {
   const id = +req.params.pid
   const deleteById = manager.getProducts().find(product => product.id === id)
   console.log('deleteById: ', deleteById.id)
   console.log('Borrar: ', deleteById)

   if (deleteById !== -1) {
    const products = manager.getProducts()
    console.log('DeleteProduct: ' + deleteById.id)
       products.splice(deleteById, 1);
       res.status(201).send({ mensaje: 'Producto borrado', products})
  }
})

module.exports = router