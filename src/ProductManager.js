const fs = require('fs')
const filename = './productos.json'
let readContent = fs.readFileSync(filename, 'utf-8')

class ProductManager {
    #products 
    #path

    constructor(path) {
       // this.#products = []
        //this.path = path
        this.path = path
        try {
            this.#products = this.getProducts()
        } catch (error) {
            this.#products = []
        }
    }

    #generateID = () => {
        let id
        if(this.#products.length === 0) id = 1
        else id = this.#products[this.#products.length - 1].id + 1
        return id
    }
    
    getProducts = () => {
        if(fs.existsSync(filename)){
            return JSON.parse(readContent)
        }else{
            console.log('El archivo no existe');
            return this.#products
        }
        
    }

    updateProduct(id, data) {
        const updateById = this.#products.find(product => product.id === id)
       console.log('\n Resultado de updateById para futuro update: \n', updateById )
       updateById.title = data
       fs.writeFileSync(filename, JSON.stringify(this.#products, null, '\t'))
    }

    //Buscar un producto por su id
    getProductById = (id) => {
        let existingProduct = this.#products.find(product => product.id === id)

        if (!existingProduct) throw new Error(`NOT FOUND: No existe ningún producto con el id ingresado: ${id}`);
        console.log('\n Resultado de búsqueda por id: \n',existingProduct)
        
        return existingProduct;
    }
    //Verifica si el código está repetido
    getCode = (code) => {
        let repeatedCode= this.#products.some(product => product.code === code)
        return repeatedCode;
    }
    
    addProduct = (title, description, price, thumbnail, code, stock, status, category) => {
    
        let getCode = this.getCode(code)

        let id = this.#generateID()

        let newProduct = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status,
            category
        }

        //Valida que todos los argumentos sean obligatorios
        if(!title || !description || !price || !code || !stock || !status || !category){
            console.error('Completa todos los campos')
            return
        }else if(getCode){ //Valida que no ingrese el producto con código repetido
            console.error(`ERROR: El código ${code} ya fue ingresado en otro producto y está repetido.`)
        }else{
            this.#products.push(newProduct)

             fs.writeFileSync(filename, JSON.stringify(this.#products, null, '\t'))
            
        }
        
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

const productManager = new ProductManager('./productos.json')


module.exports = ProductManager