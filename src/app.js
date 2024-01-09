import express from 'express'


import employesRoutes from './routes/employees.routes.js'

import indexRoutes from './routes/index.routes.js'

import {PORT} from './config.js'

const app = express()


app.use(express.json())

app.use(indexRoutes)
app.use('/api',employesRoutes)

app.use(express.static('public'));

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Direccion no reconocida'
    })
})
export default app;