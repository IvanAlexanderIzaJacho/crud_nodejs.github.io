import {pool} from '../db.js'

export const getEmployees = async (req, res) => {
  try{
    const [rows] = await pool.query('select * from Cliente')
    res.json(rows)
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong'
    })

  }
}

export const getEmployee = async (req, res) => {
  try {
    const [rows] = await pool.query('select * from Cliente where idCliente = ?', [req.params.idCliente])
    if (rows.length <= 0) return res.status(404).json ({
      message: 'No hay datos en el id'
    })
    res.json(rows[0])
    
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong'
    })
  }
}

export const createEmployees = async (req, res) => {
  const {dniCliente, apellidoCliente, nombreCliente, direccionCliente, edadCliente} = req.body
  try {
    const [rows] = await pool.query('insert into Cliente (dniCliente, apellidoCliente, nombreCliente, direccionCliente, edadCliente) values (?, ?, ?, ?, ?)',[dniCliente, apellidoCliente, nombreCliente, direccionCliente, edadCliente])
    res.send({ 
      idCliente: rows.insertId, 
      dniCliente,
      apellidoCliente,
      nombreCliente,
      direccionCliente,
      edadCliente,
     })
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong'
    })
    
  }
}


export const deleteEmployees = async (req, res) => {
  try {
    const [result] = await pool.query('delete from Cliente where idCliente = ?', [req.params.idCliente])

    if (result.affectedRows <= 0) return res.status(404).json({
      message: 'Cliente Id no existe'
  
    })
    res.sendStatus(204)
    
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong'
    })
  }
}

export const updateEmployees = async (req, res) => {
  const {idCliente} = req.params
  const {dniCliente, apellidoCliente, nombreCliente, direccionCliente, edadCliente} = req.body
  try {
    const [result] = await pool.query('update Cliente set dniCliente = IFNULL(?, dniCliente), apellidoCliente = IFNULL(?, apellidoCliente), nombreCliente = IFNULL(?, nombreCliente), direccionCliente = IFNULL(?, direccionCliente), edadCliente = IFNULL(?, edadCliente) where idCliente = ?', [dniCliente, apellidoCliente, nombreCliente, direccionCliente, edadCliente, idCliente])
    if (result.affectedRows === 0) return res.status(404).json({
      message: 'Cliente no encontrado'
    })
    const [rows] = await pool.query('select * from Cliente where idCliente = ?', [idCliente])
  
    res.json(rows[0])
  
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong'
    })
  }
}