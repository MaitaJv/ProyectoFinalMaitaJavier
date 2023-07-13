let boton = document.querySelector('#btn')

boton.addEventListener('click', (event)=>{
    event.preventDefault
    location.href = 'http://localhost:8080/products'
})