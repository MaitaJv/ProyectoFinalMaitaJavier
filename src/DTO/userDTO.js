export class UserDTO {
    async user(user){
        return {
            first_name: user.first_name,
            last_name: user.last_name,
            age: user.age,
            roll: user.roll,
            email: user.email,
            cart: user.cart,
            password: user.password,
            owner: user.email,
        }
    }
    async userByEmail(email){
        return {
            email: email.email || email
        }
    }
}
