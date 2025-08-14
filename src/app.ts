import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import todoRouter from './routes/todoRoutes'
import { HttpError } from 'http-errors'

const app = express()

app.use(express.json())

app.use('/todos', todoRouter)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || err.status || 500
    const message = err.message || 'something went wrong'
    res.status(statusCode).json({
        errors: [
            {
                type: err.name,
                message,
                location: '',
                path: '',
            },
        ],
    })
})

export default app
