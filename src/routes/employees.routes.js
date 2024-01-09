import {Router} from 'express'

import {getEmployees, createEmployees, updateEmployees, deleteEmployees, getEmployee} from '../controllers/employees.controller.js'

const router = Router()

router.get('/employees', getEmployees)
router.get('/employees/:idCliente', getEmployee)

router.post('/employees', createEmployees)

router.patch('/employees/:idCliente', updateEmployees)

router.delete('/employees/:idCliente', deleteEmployees)

export default router 
