const ioServer = io()

let submitProduct = document.querySelector('#submitProduct')
let title = document.querySelector('#title')
let description = document.querySelector('#description')
let code = document.querySelector('#code')
let price = document.querySelector('#price')
let statusInput = document.querySelector('#status')
let stock = document.querySelector('#stock')
let category = document.querySelector('#category')
let thumbnail = document.querySelector('#thumbnail')

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
        statusInput: statusInput.value,
        stock: stock.value,
        category: category.value,
        thumbnail: thumbnail.value
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
        contenedor.innerHTML +=    `<div>
                                        <h4>${element.title}</h4>
                                        <p>${element.description}</p>
                                        <p>${element.category}</p>
                                        <p>${element.stock}</p>
                                        <p>${element.price}</p> 
                                        <p>${element.id}</p> 
                                    </div>
                                   `
    })
})

ioServer.on('productoAgregado', data =>{
    contenedor.innerHTML = ''

    data.forEach(element => {
        contenedor.innerHTML += `<div>
                                    <h4>${element.title}</h4>
                                    <p>${element.description}</p>
                                    <p>${element.category}</p>
                                    <p>${element.stock}</p>
                                    <p>${element.price}</p> 
                                </div>`
    })
})

ioServer.on('prodcutoEliminado', data =>{
    contenedor.innerHTML = ''

    data.forEach(element => {
        contenedor.innerHTML += `<div>
                                    <h4>${element.title}</h4>
                                    <p>${element.description}</p>
                                    <p>${element.category}</p>
                                    <p>${element.stock}</p>
                                    <p>${element.price}</p> 
                                </div>`
    })
})