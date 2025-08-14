import { config } from 'dotenv'
config()

const { PORT, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST } =
    process.env

export const Config = {
    PORT,
    DB_PORT,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
}
