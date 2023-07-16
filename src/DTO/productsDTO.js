export class ProductsDTO{
    addProduct = async ({title, description, price, thumbnail, code, stock, status, category}) =>{
        let product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status,
            category
        }
        return product
    }
}