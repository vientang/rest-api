import express from 'express'
import morgan from 'morgan'
import cors from 'cors';
import router from './router'
import { protect } from './modules/auth'
import { createUser, signIn } from './handlers/users';

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.status(200)
    res.json({ message: 'Hello from express' })
})

app.use('/api', protect, router)
app.post('/user', createUser)
app.post('/signin', signIn)
export default app;