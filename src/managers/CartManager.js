const fs = require('fs')
const filename = './jsons/carrito.json'
const filenameCarts = './jsons/carts.json'
let readContent = fs.readFileSync(filename, 'utf-8')
let readCarts = fs.readFileSync(filenameCarts, 'utf-8')

class CartManager {
    #products 
    #carts
    #path

    constructor(path) {
       // this.#products = []
        //this.path = path
        this.path = path
        try {
            this.#products = this.getProducts()
            this.#carts = this.getCarts()
        } catch (error) {
            this.#products = []
            this.#carts = []
        }
    }

    #generateID = () => {
        let id
        if(this.#products.length === 0) id = 1
        else id = this.#products[this.#products.length - 1].id + 1
        return id
    }

    #cartID = () => {
        let id
        if(this.#carts.length === 0) id = 1
        else id = this.#carts[this.#carts.length - 1].id + 1
        return id
    }
    
    getProducts = () => {
        if(fs.existsSync(filenameCarts)){
            return JSON.parse(readContent)
        }else{
            console.log('El archivo no existe');
            return this.#products
        }
    }
    getCarts = () => {
        if(fs.existsSync(filenameCarts)){
            return JSON.parse(readCarts)
        }else{
            console.log('El carrito no existe');
            return this.#carts
        }
    }
/*
    updateProduct(id, data) {
        const updateById = this.#products.find(product => product.id === id)
       console.log('\n Resultado de updateById para futuro update: \n', updateById )
       updateById.title = data
       fs.writeFileSync(filename, JSON.stringify(this.#products, null, '\t'))
    }*/

    //Buscar un producto por su id
    getProductById = (id) => {
        let existingProduct = this.#products.find(product => product.id === id)

        if (!existingProduct) throw new Error(`NOT FOUND: No existe ningún producto con el id ingresado: ${id}`);
        console.log('\n Resultado de búsqueda por id: \n',existingProduct)
        
        return existingProduct;
    }
    

    deleteProduct(id) {
        const deleteById = this.#products.find(product => product.id === id)
        console.log('deleteById: ', deleteById.id)
        console.log('Borrar: ', deleteById)

        if (deleteById !== -1) {
            this.#products.splice(deleteById, 1);
            fs.writeFileSync(filename, JSON.stringify(this.#products, null, '\t'))
       }
    }

}


module.exports = CartManager