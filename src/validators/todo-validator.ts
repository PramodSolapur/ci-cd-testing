import { checkSchema } from 'express-validator'

export default checkSchema({
    title: {
        trim: true,
        notEmpty: {
            errorMessage: 'Title is required',
        },
    },
})
