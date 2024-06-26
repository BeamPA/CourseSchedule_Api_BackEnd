const express = require('express')
const router = express.Router()
const pool = require('../databases/db')

router.get('/getAllUser' ,async(request ,response) => {
    try {
        const query = await pool.query("SELECT * FROM mykuusertable")
        const rows = await query[0]
        response.json(rows)
    } catch (error) {
        console.error(error);
        response.json({
            status: 'error',
            message: error
        })
    }
})

router.post('/register' ,async(request ,response) => {
    const {name ,lastname ,email ,password} = request.body
    try {
        const query = await pool.query("INSERT INTO mykuusertable (name ,lastname ,email ,password) VALUES (?,?,?,?)" ,[name,lastname,email,password])
        const rows = await query[0]
        response.json({
            status: 'success',
            rows: rows
        })
    } catch (error) {
        console.error(error);
        response.json({
            status: 'error',
            message: error
        })
    }
})

router.post('/login' ,async(request ,response) => {
    const {email} = request.body
    try {
        const query = await pool.query("SELECT * FROM mykuusertable WHERE email = ?",[email])
        if (query[0].length > 0) {
            response.json({
                status: 'success',
                rows: query[0]
            })
        } else {
            response.json({
                status: "User not found"
            })
        }
    } catch (error) {
        console.error(error);
        response.json({
            status: 'error',
            message: error
        })
    }
})

module.exports = router