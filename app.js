const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

const pool = mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    user:'root',
    password:'',
    database:'nodejs_beers'
})

app.get('/',(req,res)=>{
    pool.getConnection((err, connection)=>{
        if(err) throw err
        console.log(`connected as id ${connection.treadid}`)

        connection.query('SELECT * from beers', (err,rows)=>{
            connection.release()

            if(!err){
                res.send(rows)
            }
            else{
                console.log(err)
            }

        })
    })
})

app.get('/:id',(req,res)=>{
    pool.getConnection((err, connection)=>{
        if(err) throw err
        console.log(`connected as id ${connection.treadid}`)

        connection.query('SELECT * from beers WHERE id = ?',[req.params.id],(err,rows)=>{
            connection.release()
            if(!err){
                res.send(rows)
            }
            else{
                console.log(err)
            }
        })
    })
})


app.delete('/:id',(req,res)=>{
    pool.getConnection((err, connection)=>{
        if(err) throw err
        console.log(`connected as id ${connection.treadid}`)

        connection.query('DELETE from beers WHERE id = ?',[req.params.id],(err,rows)=>{
            connection.release()
            if(!err){
                res.send(`Beer with the Record Id :${[req.params.id]} has been removed`)
            }
            else{
                console.log(err)
            }
        })
    })
})


app.post('',(req,res)=>{
    pool.getConnection((err, connection)=>{
        if(err) throw err
        console.log(`connected as id ${connection.treadid}`)

        const params = req.body

        connection.query('INSERT INTO beers SET ?', params,(err,rows)=>{
            connection.release()
            if(!err){
                res.send(`Beer with the Record name :${params.name} has been removed`)
            }
            else{
                console.log(err)
            }
        })

        console.log(req.body)
    })
})



app.put('',(req,res)=>{
    pool.getConnection((err, connection)=>{
        if(err) throw err
        console.log(`connected as id ${connection.treadid}`)

        const {id,name,tagline,description,image}=req.body

        connection.query('UPDATE beers SET name = ?,tagline = ?, description = ?, image = ? WHERE id = ?', [name,tagline,description,image,id], (err,rows)=>{
            connection.release()
            if(!err){
                res.send(`Beer with the Record name : ${name} has been removed`)
            }
            else{
                console.log(err)
            }
        })

        console.log(req.body)
    })
})
app.listen(port,()=>console.log(`Listen on port ${port}`))