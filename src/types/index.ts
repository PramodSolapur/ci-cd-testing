import { Request } from 'express'

export interface ITodo {
    title: string
    completed?: boolean
}

export interface TodoRequest extends Request {
    body: ITodo
}
