import { Router } from 'express'
import {
    createTodo,
    deleteTodo,
    getAllTodos,
    getTodo,
} from '../controllers/todoController'
import todoValidator from '../validators/todo-validator'

const router = Router()

router.post('/', todoValidator, createTodo).get('/', getAllTodos)
router.get('/:id', getTodo).delete('/:id', deleteTodo)

export default router
