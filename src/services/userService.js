import { MongoUserManager } from "../dao/mongo/MongoUserManager.js";
import { UserDTO } from "../DTO/userDTO.js";

const userDTO = new UserDTO
const mongoUserManager = new MongoUserManager

class UserService {
    async addUser(user){
        try {
            let usuario = await userDTO.user(user)
            return await mongoUserManager.addUser(usuario)
        } catch (error) {
            console.log(error)
        }
    }

    async getUsers(){
        try {
            let users = await mongoUserManager.getUsers()
            return users
        } catch (error) {
            console.log(error)
        }
    }

    async getUser(email){
        try {
            let userEmail = await userDTO.userByEmail(email)
            console.log('userEmailDTO: ', userEmail)
            let user = await mongoUserManager.getUser(userEmail.email)
            return user
        } catch (error) {
            console.log(error)
        }
    }

    async updateUser(email, password){
        try {
            console.log('email UserService: ', email)
            console.log('password UserService: ', password)
            let user = await mongoUserManager.updateUser(email, password)
            return user
        } catch (error) {
            console.log(error)
        }
    }

    async updateRoll(email, roll){
        try {
            let user = await mongoUserManager.updateRoll(email, roll)
            return user
        } catch (error) {
            console.log(error)
        }
    }

    async uploadDocument(email, data){
        try {
            console.log('dataService', data);
            let user = await mongoUserManager.uploadDocument(email, data)
            return user
        } catch (error) {
            console.log(error)
        }
    }
    
    async updateLastConnection(email, data){
        try {
            let user = await mongoUserManager.updateLastConnection(email, data)
            return user
        } catch (error) {
            console.log(error)
        }
    }
    async deleteUser(email){
        try {
            await mongoUserManager.deleteUser(email)
        } catch (error) {
            console.log(error)
        }
    }
}

export default UserService