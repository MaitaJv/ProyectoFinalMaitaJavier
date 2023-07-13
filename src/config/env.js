import dotenv from 'dotenv'

dotenv.config()

export default {
    mongoUrl: process.env.MONGO_URL,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD,
    testMail: process.env.TEST_MAIL,
    testMailPass: process.env.TEST_MAIL_PASS,
    privateKey: process.env.PRIVATE_KEY
}