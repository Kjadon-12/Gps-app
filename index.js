const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt')
const mysql2 = require('mysql2/promise');

const db = require('./dbConnect')

const app = express();

app.use(express.json())


//configuration
db;
app.use(cors());



app.get('/', (req, res) => {
    

    db.query("SELECT T.DeviceId,T.DeviceType,T.Time ,T.location FROM gpsdata T  JOIN ( SELECT DeviceId, max(Time) AS latest FROM gpsdata GROUP BY DeviceId ) S  ON T.DeviceId=S.DeviceId and T.Time=S.latest", (err, result) => {
        if(err) {
            res.send("error")
        }
        else {
            res.send(result)
        }
    })
})






app.get('/all/data', (req, res) => {
    

    db.query("SELECT * from gpsdata", (err, result) => {
        if(err) {
            res.send("error")
        }
        else {
            res.send(result)
        }
    })
})






app.post('/register', async (req, res) => {
    
    const email = req.body.email
    
    const hashedPassword = await bcrypt.hash(req.body.password,6);
    const sqlSearch = "SELECT * FROM user WHERE email = ?"
    const search_query = await mysql2.format(sqlSearch,[email])
    const sqlInsert = "INSERT INTO user VALUES (?,?)"
    const insert_query = await mysql2.format(sqlInsert,[email, hashedPassword])


      db.query(search_query,  (err,result)=>{
        if(err) {
            res.json(err)
        }
        if(result.length >0){
            res.json("User already exists")
        }
        else{
             db.query(insert_query,  (err,result)=>{
               if(err){
                res.json(err)
               }
               res.json(result)
            })
        }
    })


})






app.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const sqlSearch = "SELECT * FROM user WHERE email = ?"
    const search_query = await mysql2.format(sqlSearch,[email])

    db.query(search_query, async (err,result)=>{
        if (err) res.json(err)
      if (result.length === 0) {
       res.json("User does not exist")
      } 
      else {
        const hashedPassword = result[0].password
    
       if (await  bcrypt.compare(password, hashedPassword)) {
    
       res.json(`${email} is logged in!`)
       } 
       else {
    
       res.json("Password incorrect!")
       }
    }
    })
    })



app.listen(5002);