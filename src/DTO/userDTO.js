export class UserDTO {
    // constructor(user){
    //     this.first_name = user.first_name
    //     this.last_name = user.last_name
    //     this.age = user.age
    //     this.roll = user.roll
    //     this.email = user.email
    //     this.cart = user.cart
    //     this.password = user.password
    // }
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
