import request from 'supertest'
import app from '../src/app'
import { DataSource } from 'typeorm'
import { AppDataSource } from '../src/config/data-source'
import { Todo } from '../src/entity/Todo'

describe('Todo Service', () => {
    let connection: DataSource

    beforeAll(async () => {
        connection = await AppDataSource.initialize()
    })

    beforeEach(async () => {
        await connection.dropDatabase()
        await connection.synchronize()
    })

    // afterAll(async () => {
    //     await connection.destroy()
    // })

    it('should return 400 status code if title is missing', async () => {
        const todoData = {
            title: '',
        }
        const response = await request(app).post('/todos').send(todoData)
        expect(response.statusCode).toBe(400)
    })

    it('should return 201 status code', async () => {
        const todoData = {
            title: 'title',
        }
        const response = await request(app).post('/todos').send(todoData)
        expect(response.statusCode).toBe(201)
    })

    it('should persist the data in the database', async () => {
        const todoData = {
            title: 'title',
        }

        await request(app).post('/todos').send(todoData)

        const todoRepo = connection.getRepository(Todo)
        const todos = await todoRepo.find()

        expect(todos).toHaveLength(1)
        expect(todos[0].title).toBe('title')
        expect(todos[0].completed).toBe(false)
    })
})
