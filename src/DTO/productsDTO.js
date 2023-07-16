export class ProductsDTO{
    addProduct = async ({title, description, price, thumbnail, code, stock, category, owner}) =>{
        let product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            category,
            owner
        }
        return product
    }
}