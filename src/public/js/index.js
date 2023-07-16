const ioServer = io()

let submitProduct = document.querySelector('#submitProduct')
let title = document.querySelector('#title')
let description = document.querySelector('#description')
let code = document.querySelector('#code')
let price = document.querySelector('#price')
let stock = document.querySelector('#stock')
let category = document.querySelector('#category')
let thumbnail = document.querySelector('#thumbnail')
let owner = document.querySelector('#owner')

let productID = document.querySelector('#titleDelete')
let deleteBtn = document.querySelector('#deleteProduct')

let contenedor = document.querySelector('#container')

submitProduct.addEventListener('click', (event)=>{
    event.preventDefault()

    let product = {
        title: title.value,
        description: description.value,
        code: code.value,
        price: price.value,
        stock: stock.value,
        category: category.value,
        thumbnail: thumbnail.value,
        owner: owner.value
    }

    ioServer.emit('product', product)
})

deleteBtn.addEventListener('click', (event)=>{
    event.preventDefault()

    let pid = productID.value

    ioServer.emit('deleteProduct', pid)
})

ioServer.on('mensajeServer', data =>{
    contenedor.innerHTML = ''

    data.forEach(element => {
        contenedor.innerHTML +=    `<div style="margin-top: 20px;">
                                        <h4>Titulo: ${element.title}</h4>
                                        <p>Descripcion: ${element.description}</p>
                                        <p>Categoria: ${element.category}</p>
                                        <p>Stock: ${element.stock}</p>
                                        <p>$${element.price}</p> 
                                        <p>Identificador: ${element._id}</p> 
                                    </div>
                                   `
    })
})

ioServer.on('productoAgregado', data =>{
    contenedor.innerHTML = ''

    data.forEach(element => {
        contenedor.innerHTML += `   <div style="margin-top: 20px;">
                                        <h4>Titulo: ${element.title}</h4>
                                        <p>Descripcion: ${element.description}</p>
                                        <p>Categoria: ${element.category}</p>
                                        <p>Stock: ${element.stock}</p>
                                        <p>$${element.price}</p> 
                                        <p>Identificador: ${element._id}</p> 
                                    </div>`
    })
})

ioServer.on('prodcutoEliminado', data =>{
    contenedor.innerHTML = ''

    data.forEach(element => {
        contenedor.innerHTML += `   <div style="margin-top: 20px;">
                                        <h4>Titulo: ${element.title}</h4>
                                        <p>Descripcion: ${element.description}</p>
                                        <p>Categoria: ${element.category}</p>
                                        <p>Stock: ${element.stock}</p>
                                        <p>$${element.price}</p> 
                                        <p>Identificador: ${element._id}</p> 
                                    </div>`
    })
})