let paymentBtn = document.querySelector('#pago')

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
            
            if(resp.status==='error') document.querySelector('#mensaje').textContent = resp.error
        })
    } catch (error) {
        console.log(error);   
    }
})