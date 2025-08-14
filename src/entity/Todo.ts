import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'todo' })
export class Todo {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({ default: false })
    completed: boolean

    @CreateDateColumn()
    createdAt: number

    @UpdateDateColumn()
    updatedAt: number
}
