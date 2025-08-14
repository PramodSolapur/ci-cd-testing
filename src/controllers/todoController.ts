import { NextFunction, Response } from 'express'
import { validationResult } from 'express-validator'
import { TodoRequest } from '../types'
import { AppDataSource } from '../config/data-source'
import { Todo } from '../entity/Todo'
import createHttpError from 'http-errors'

const createTodo = async (
    req: TodoRequest,
    res: Response,
    next: NextFunction,
) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() })
    }

    const { title } = req.body

    try {
        const todoRepository = AppDataSource.getRepository(Todo)
        const todo = await todoRepository.save({ title })
        res.status(201).json(todo)
    } catch (error) {
        next(error)
    }
}

const getAllTodos = async (
    req: TodoRequest,
    res: Response,
    next: NextFunction,
) => {
    try {
        const todoRepository = AppDataSource.getRepository(Todo)
        const todos = await todoRepository.find()
        res.status(200).json(todos)
    } catch (error) {
        next(error)
    }
}

const getTodo = async (req: TodoRequest, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        if (!id) {
            const err = createHttpError(404, 'todo not found')
            next(err)
            return
        }
        const todoRepository = AppDataSource.getRepository(Todo)
        const todo = await todoRepository.findOne({ where: { id: Number(id) } })
        res.status(200).json(todo)
    } catch (error) {
        next(error)
    }
}

const deleteTodo = async (
    req: TodoRequest,
    res: Response,
    next: NextFunction,
) => {
    try {
        const id = req.params.id
        if (!id) {
            const err = createHttpError(404, 'todo not found')
            next(err)
            return
        }
        const todoRepository = AppDataSource.getRepository(Todo)
        await todoRepository.delete(Number(id))
        res.status(200).json({})
    } catch (error) {
        next(error)
    }
}

export { createTodo, getAllTodos, getTodo, deleteTodo }
