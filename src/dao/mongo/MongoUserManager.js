import UserModel from './models/user.js'

export class MongoUserManager{
    async addUser(user){
        try {
            return await UserModel.create(user)
        } catch (error) {
            console.log(error)
        }
    }

    async getUsers(){
        try {
            let users = await UserModel.find()
            return users
        } catch (error) {
            console.log(error)
        }
    }
    
    async getUser(email){
        try {
            let user = await UserModel.findOne({email: email})
            return user
        } catch (error) {
            console.log(error)
        }
    }

    async updateUser(email, password){
        try {
            console.log('MongoUserDAO')
            console.log('email MongoUserDAO: ', email)
            console.log('password MongoUserDAO: ', password)
            let user = await UserModel.findOne({email: email})
            let changeUser = {
                first_name: user.first_name,
                last_name: user.last_name,
                age: user.age,
                roll: user.roll,
                email: user.email,
                cart: user.cart,
                password: password
            }
            console.log('user: ', user)
            console.log('user.password: ', user.password)
            await UserModel.findOneAndDelete({_id: user._id})
            console.log('usuario eliminado')
            let newUser = await UserModel.create(changeUser)
            console.log('newUser: ', newUser)
            return newUser
        } catch (error) {
            console.log(error)
        }
    }

    async updateRoll(email, roll){
        try {
            let user = await UserModel.updateOne(
                {
                    email: email
                },
                {
                    $set:
                    {
                        'roll': roll
                    }
                }
            )
            return user
        } catch (error) {
            console.log(error)
        }
    }

    async uploadDocument(email, data){
        try {
            console.log('dataManager', data);
            let user = await UserModel.updateOne(
                {
                    email: email
                },
                {
                    $set:
                    {
                        'documents': data
                    }
                }
            )
            return user
        } catch (error) {
            console.log(error)
        }
    }

    async updateLastConnection(email, data){
        try {
            let user = await UserModel.updateOne(
                {
                    email: email
                },
                {
                    $set:
                    {
                        'last_connection': data
                    }
                }
            )
            return user
        } catch (error) {
            console.log(error)
        }
    }

    async deleteUser(email){
        try {
            await UserModel.findOneAndDelete({email: email})
        } catch (error) {
            console.log(error)
        }
    }
}