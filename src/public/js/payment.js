let paymentBtn = document.querySelector('#pago')
let payContainer = document.querySelector('#payForm')

paymentBtn.addEventListener('click', async (event)=>{
    event.preventDefault()

    try {
        fetch('/api/payment/payment-intents', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            }
        })
        .then(resp => resp.json())
        .then(resp => {
            console.log(resp)
            console.log(resp.status.error==='error')
            
            if(!(resp.status==='error')){
                payContainer.innerHTML = `  <form action="">
                                                <p>Ingrese el numero de la tarjeta</p>
                                                <input type="number">
                                        
                                                <p>Ingrese la fecha de expiracion de la tarjeta</p>
                                                <input type="number">
                                        
                                                <p>Ingrese el CVC de la tarjeta</p>
                                                <input type="number">
                                            </form>`
            }
        })
    } catch (error) {
        console.log(error);   
    }
})