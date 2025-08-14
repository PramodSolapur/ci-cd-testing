import app from './app'
import { Config } from './config'
import { AppDataSource } from './config/data-source'

const startServer = async () => {
    try {
        const PORT = Config.PORT
        await AppDataSource.initialize()
        console.log('Database is connected')
        app.listen(PORT, () => {
            console.log('Server is running')
        })
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

void startServer()
