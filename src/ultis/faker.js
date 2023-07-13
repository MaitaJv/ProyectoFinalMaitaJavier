import { faker } from '@faker-js/faker'

faker.local = 'es'
export const generateProduct = ()=>{
    return{
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.random.numeric(),
        price: faker.commerce.price(),
        status: 'true',
        stock: faker.random.numeric(),
        category: faker.commerce.department(),
        thumbnail: faker.image.business()
    }
}