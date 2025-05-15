import dotenv from "dotenv"
import { Product } from "./backend-dist/models/product.js"
import { User } from "./backend-dist/models/user.js"
import users from "./data/users.js"
import products from "./data/product.js"

dotenv.config()

const importData = async () => {
    try {

        // await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)

        const adminUser = createdUsers[0]._id

        const sampleProducts = products.map(product => {
            return { ...product, user: adminUser }
        })

        await Product.insertMany(sampleProducts)

        console.log('Data imported ! ')
        process.exit();

    } catch (error) {
        console.log(`import error ${error}`)
        process.exit(1);
    }
}

const destroyData = async () => {
    try {

        // await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('Data destroyed ! ')
        process.exit();

    } catch (error) {
        console.log(`destroyed error ${error}`)
        process.exit(1);
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}