export class ProductsDTO{
    // constructor(title, description, price, thumbnail, code, stock, status, category){
    //     this.title = title
    //     this.description = description
    //     this.price = price
    //     this.thumbnail = thumbnail
    //     this.code = code
    //     this.stock = stock
    //     this.status = status
    //     this.category = category
    // }
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