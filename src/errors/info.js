export const generateProductErrorInfo = (product)=>{
    return `One or more properties were incomplete or not valid.
    List of required properties:
        - title: needs to be a String, recived: ${product.title}
        - description: needs to be a String, recived: ${product.description}
        - code: needs to be a Number, recived: ${product.code}
        - price: needs to be a Number, recived: ${product.price}
        - status: needs to be a String, recived: ${product.status}
        - stock: needs to be a Number, recived: ${product.stock}
        - category: needs to be a String, recived: ${product.category}
        - thumbnail: needs to be a String, recived: ${product.thumbnail}`
}

export const generateCartProductErrorInfo = (pid)=>{
    return `The product that are you looking for wasn't in DB.
    List of required properties:
        - pid: needs to be a mongo ObjectId, recived ${pid}`
}